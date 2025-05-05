from flask import Blueprint, request, send_file, jsonify
import os
import time
import logging
from selenium import webdriver
from selenium.webdriver.edge.service import Service as EdgeService
from selenium.webdriver.edge.options import Options as EdgeOptions
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By

from .utils.forecast_processor import procesar_forecast

# Configuración de logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('epm_automation.log'),
        logging.StreamHandler()
    ]
)

main = Blueprint('main', __name__)

# Configuración de rutas
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOWNLOAD_FOLDER = os.path.join(BASE_DIR, 'temp')
os.makedirs(DOWNLOAD_FOLDER, exist_ok=True)
logging.info(f"Ruta de DOWNLOAD_FOLDER: {DOWNLOAD_FOLDER}")

# Configuración de Selenium
EDGE_DRIVER_PATH = os.path.join(BASE_DIR, 'WebDriver', 'msedgedriver.exe')
COGNOS_URL = "https://w3.ibm.com/epm/app-prod/bi/?perspective=content&tab=teamContent&folder=i47BFB972345742C5936DA23E6AE48D8D"
COGNOS_USER = os.getenv("COGNOS_USER", "Alexix.Orostegui@ibm.com")
COGNOS_PASS = os.getenv("COGNOS_PASS", "Orostegui1016952406")

def configure_edge():
    edge_options = EdgeOptions()
    edge_options.use_chromium = True  # Esto es obligatorio
    edge_options.add_argument("--disable-notifications")
    edge_options.add_experimental_option("prefs", {
        "download.default_directory": DOWNLOAD_FOLDER,
        "download.prompt_for_download": False,
        "download.directory_upgrade": True
    })
    return edge_options



def wait_for_download(timeout=60):
    """Espera hasta que finalice la descarga"""
    end_time = time.time() + timeout
    while time.time() < end_time:
        if not any(f.endswith('.crdownload') for f in os.listdir(DOWNLOAD_FOLDER)):
            return True
        time.sleep(1)
    raise TimeoutError("Tiempo de espera para descarga excedido")

@main.route('/run-process', methods=['POST'])
def run_process():
    driver = None
    try:
        # 1. Configurar navegador
        driver = webdriver.Edge(
            service=EdgeService(EDGE_DRIVER_PATH),
            options=configure_edge()
        )
        driver.implicitly_wait(10)

        # 2. Navegación y login (COMPLETA LOS XPATH)
        driver.get(COGNOS_URL)
        
        # Paso 1: Selección de opción
        WebDriverWait(driver, 20).until(
            EC.element_to_be_clickable((By.XPATH, '//*[@id="downshift-0-toggle-button"]'))
        ).click()
        
        WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, '//*[@id="downshift-0-item-1"]'))
        ).click()

        WebDriverWait(driver, 20).until(
            EC.element_to_be_clickable((By.XPATH, '//*[@id="credsDiv"]'))
        ).click()

        # Paso 2: Login
        WebDriverWait(driver, 15).until(
            EC.presence_of_element_located((By.XPATH, '//*[@id="user-name-input"]'))
        ).send_keys(COGNOS_USER)
        
        driver.find_element(By.XPATH, '//*[@id="password-input"]').send_keys(COGNOS_PASS)
        driver.find_element(By.XPATH, '//*[@id="login-button"]').click()

        # Paso 3: Descarga
        WebDriverWait(driver, 40).until(
            EC.presence_of_element_located((By.XPATH, '//*[@id="com.ibm.bi.content.navigator.myContent"]'))
        ).click()
        
        WebDriverWait(driver, 50).until(
            EC.element_to_be_clickable((By.XPATH, '//*[@id="com.ibm.bi.content.navigator.myContent__panel"]/div[2]/div[2]/div/div[2]/div/label/span[2]/div/div[1]/div/a'))
        ).click()
        time.sleep(15)  # Esperar manualmente si es necesario
        iframe = driver.find_element(By.XPATH, '//*[@id="rsIFrameManager_1"]')
        driver.switch_to.frame(iframe)

        # Ahora puedes acceder al div con scroll
        scrollable_div = driver.find_element(By.CLASS_NAME, "clsViewerPage")
        driver.execute_script("arguments[0].scrollTop = arguments[0].scrollHeight", scrollable_div)

        time.sleep(5) # Esperar a que se cargue el contenido

        # Hacer clic en el botón de exportar
        WebDriverWait(driver, 90).until(
            EC.element_to_be_clickable((By.XPATH, '//*[@id="dv8999"]'))
        ).click()

        # Verifica que la descarga haya comenzado
        time.sleep(150)  # Espera corta para que comience la descarga
    
        # Verifica que hay archivos de descarga en proceso
        download_started = False
        for _ in range(10):  # Intentamos por 10 segundos
            if any(f.endswith('.crdownload') for f in os.listdir(DOWNLOAD_FOLDER)):
                download_started = True
                break
            time.sleep(1) # Espera un segundo entre intentos
    
        if not download_started:
            print("¡Advertencia! La descarga parece no haber comenzado.")
    
        # Si la descarga comenzó, espera a que termine
        wait_for_download(120)  # Esperar a que se complete la descarga
        print("¡Descarga completada!")
    
        time.sleep(2)  # Espera un poco más para asegurarse
    finally:
        if driver:
            driver.quit()

    def get_latest_file(folder):
        files = [os.path.join(folder, f) for f in os.listdir(folder) if f.endswith(('.xlsx', '.xlsm', '.xls'))]
        if not files:
            raise FileNotFoundError("No se encontró ningún archivo .xlsx")
        return max(files, key=os.path.getctime)
    try:
        archivo_descargado = get_latest_file(DOWNLOAD_FOLDER)

        # Validar que se descargó
        if not os.path.exists(archivo_descargado):
            raise FileNotFoundError("No se encontró el archivo descargado")
        # Ruta forecast base
        forecast_base = os.path.join(BASE_DIR, 'data', 'forecast_base.xlsx')
       
        # Procesar y enviar el resultado
        resultado = procesar_forecast(archivo_descargado, forecast_base)
        return send_file(
        resultado,
        as_attachment=True,
        download_name="Systems_HW_North_SSA_EPM_ISC.xlsm"
        )
    except Exception as e:
        logging.error(f"Error al procesar el archivo descargado: {str(e)}", exc_info=True)
        return jsonify({
            "error": "No se pudo procesar el archivo",
            "details": str(e)
        }), 500
