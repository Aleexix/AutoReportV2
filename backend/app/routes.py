from flask import Blueprint, request, send_file, jsonify
import os
from .utils.forecast_processor import procesar_forecast

main = Blueprint('main', __name__)

@main.route('/')
def home():
    return jsonify({"message": "¡Backend funcionando correctamente!"})

@main.route('/upload-epm', methods=['POST'])
def upload_epm():
    if 'file' not in request.files:
        return jsonify({"error": "No se envió ningún archivo"}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({"error": "Nombre de archivo vacío"}), 400

  # Obtener ruta absoluta del backend/
    base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))

# Crear carpeta temp si no existe
    temp_dir = os.path.join(base_dir, 'temp')
    os.makedirs(temp_dir, exist_ok=True)

# Ruta completa del archivo subido
    upload_path = os.path.join(temp_dir, file.filename)
    file.save(upload_path)

    forecast_base_path = os.path.join(base_dir, 'data', 'forecast_base.xlsx')


    try:
        resultado_path = procesar_forecast(upload_path, forecast_base_path)
        return send_file(resultado_path, as_attachment=True)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
