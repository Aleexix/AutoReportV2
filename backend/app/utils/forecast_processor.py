import pandas as pd
import openpyxl
import os
import shutil
import numpy as np
from openpyxl.utils import get_column_letter, column_index_from_string


def procesar_forecast(epm_file_path, forecast_base_path):
    print("📁 Iniciando limpieza del archivo EPM...")
    # Paso 1: Leer archivo EPM
    try:
        print(f"📄 Leyendo archivo EPM desde: {epm_file_path}")
        epm_df_raw = pd.read_excel(epm_file_path, engine='openpyxl', header=None)
        print("✅ Archivo EPM leído con éxito.")
    except Exception as e:
        print(f"⚠️ Error al leer el archivo EPM: {e}")
        return None
    
    # Paso 2: Eliminar primeras 3 filas
    epm_df = epm_df_raw.iloc[3:].reset_index(drop=True)
    print("🧹 Primeras 3 filas eliminadas.")
    
    # Paso 3: Eliminar desde la fila "Overall - Total"
    print("🔍 Buscando fila 'Overall - Total'...")
    for idx, row in enumerate(epm_df.iloc[:, :10].values):
        if any('Overall - Total' in str(cell) for cell in row):
            epm_df = pd.concat([epm_df.iloc[:idx], epm_df.iloc[idx+3:]]).reset_index(drop=True)
            print(f"🗑️ Filas desde 'Overall - Total' eliminadas (índice {idx}).")
            break
    else:
        print("⚠️ No se encontró la fila 'Overall - Total'. Se continúa sin eliminar.")
    
    # Paso 4: Eliminar columnas específicas por índice
    columnas_a_eliminar = [9, 80, 86, 87]
    epm_df.drop(epm_df.columns[columnas_a_eliminar], axis=1, inplace=True)
    print("🗑️ Columnas J, CB, CH y CI eliminadas. Total de columnas ahora: {}".format(epm_df.shape[1]))
    
    # Paso 5: Asignar encabezados
    epm_df.columns = epm_df.iloc[0]
    epm_df = epm_df[1:].reset_index(drop=True)
    print("✅ Encabezados reasignados desde el propio archivo EPM.")
    
    # Paso 6: Preparar directorios
    base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
    temp_dir = os.path.join(base_dir, 'temp')
    os.makedirs(temp_dir, exist_ok=True)
    
    # Crear archivo limpio
    output_path = os.path.join(temp_dir, 'epm_limpio.xlsx')
    epm_df.to_excel(output_path, index=False)
    print(f"💾 Archivo limpio guardado en: {output_path}")
    
    # Paso 7: Crear copia temporal del archivo COPY base
    # Asegurarse que forecast_base_path tiene la extensión correcta (.xlsm)
    forecast_base_dir = os.path.dirname(forecast_base_path)
    forecast_base_name = os.path.splitext(os.path.basename(forecast_base_path))[0]
    
    # Corregir la extensión si es necesario
    forecast_base_path_corrected = os.path.join(forecast_base_dir, f"{forecast_base_name}.xlsm")
    if not os.path.exists(forecast_base_path_corrected):
        print(f"⚠️ Archivo no encontrado: {forecast_base_path_corrected}")
        # Intentar con extensión .xlsx como fallback
        alternative_path = os.path.join(forecast_base_dir, f"{forecast_base_name}.xlsx")
        if os.path.exists(alternative_path):
            forecast_base_path_corrected = alternative_path
            print(f"✅ Usando archivo alternativo: {forecast_base_path_corrected}")
        else:
            print("❌ No se encontró el archivo forecast_base con ninguna extensión.")
            return None
    
    # Mantener copy_base.xlsx como está
    copy_path = os.path.join(os.path.dirname(forecast_base_path_corrected), 'copy_base.xlsx')
    temp_copy_path = os.path.join(temp_dir, 'copy_base_temp.xlsx')
    
    if not os.path.exists(copy_path):
        print(f"⚠️ Archivo copy_base no encontrado: {copy_path}")
        # Intentar con extensión .xlsm como fallback
        copy_path_alt = os.path.join(os.path.dirname(forecast_base_path_corrected), 'copy_base.xlsm')
        if os.path.exists(copy_path_alt):
            copy_path = copy_path_alt
            print(f"✅ Usando archivo copy_base alternativo: {copy_path}")
        else:
            print("❌ No se encontró el archivo copy_base con ninguna extensión.")
            return None
    
    shutil.copy(copy_path, temp_copy_path)
    print(f"📂 Copia temporal creada: {temp_copy_path}")
    
    # Cargar el workbook COPY
    print("📊 Cargando archivo COPY para procesamiento optimizado...")
    wb = openpyxl.load_workbook(temp_copy_path)
    ws_row = wb['Row']
    ws_pivot = wb['Pivot']
    
    # Mapeo columnas Pivot <- Row
    col_mapping = {
        'B': 'R', 'C': 'B', 'D': 'E', 'E': 'AL', 'F': 'AZ', 'G': 'AF',
        'H': 'J', 'I': 'BJ', 'J': 'K', 'K': 'L', 'L': 'O', 'M': 'AJ',
        'N': 'S', 'O': 'BB', 'P': 'BA', 'Q': 'AY', 'R': 'T', 'S': 'BW',
        'T': 'CE', 'U': 'Q', 'V': 'CG', 'W': 'D', 'X': 'BX', 'Y': 'BL',
        'Z': 'AE', 'AA': 'V', 'AB': 'X', 'AC': 'W', 'AD': 'U'
    }
    
    print("📊 Preparando datos para optimización...")
    # 1. Datos para hoja Row
    data_values = epm_df.values
    max_cols = 200
    row_data = np.empty((len(data_values), max_cols), dtype=object)
    for c_idx, col in enumerate(epm_df.columns):
        col_index = c_idx + 1
        if col_index < max_cols:
            col_values = epm_df[col].fillna('').values  # evita NaN que generen desfase
            row_data[:, col_index] = col_values

    
    batch_size = 1000
    total_rows = len(data_values)
    for start_idx in range(0, total_rows, batch_size):
        end_idx = min(start_idx + batch_size, total_rows)
        batch = row_data[start_idx:end_idx]
        for r_idx, row in enumerate(batch, start=start_idx+2):
            for c_idx in range(1, max_cols):
                val = row[c_idx]
                if pd.notnull(val):
                    ws_row.cell(row=r_idx, column=c_idx+1, value=val)
    
    print("✅ Datos optimizados en hoja 'Row'.")
    
    # 2. Datos para hoja Pivot
    print("🔄 Optimizando transferencia a hoja 'Pivot'...")
    pivot_start_row = 4
    col_indices = {dest: column_index_from_string(src) for dest, src in col_mapping.items()}
    pivot_data = np.empty((total_rows, len(col_mapping)), dtype=object)
    
    for r_idx in range(total_rows):
        for col_idx, (dest_col, src_col_idx) in enumerate(col_indices.items()):
            if src_col_idx - 1 < max_cols:
                val = row_data[r_idx, src_col_idx - 1]
                if pd.notnull(val):
                    pivot_data[r_idx, col_idx] = val
    
    # Filtrar y ordenar datos antes de pasarlos a Pivot
    print("🔍 Aplicando filtros a datos de Pivot...")
    pivot_df = pd.DataFrame(pivot_data, columns=list(col_mapping.keys()))
    
    # Filtros según encabezados en Pivot
    allowed_countries = [
        "Colombia", "Costa Rica", "Dominican Republic", "El Salvador",
        "Guatemala", "Honduras", "Nicaragua", "Panama", "Venezuela"
    ]
    allowed_ut_lvl_15 = [
        "Mainframe SW", "Power", "Storage", "Z HW", "Storage HW",
        "Power HW", "Storage TPS", "Z TPS", "Power TPS"
    ]
    
    # Aplica filtros (col H → 'H', col K → 'K', col B → 'B')
    pivot_df_filtered = pivot_df[
        pivot_df['H'].isin(allowed_countries) &
        pivot_df['K'].isin(allowed_ut_lvl_15)
    ]
    
    # Ordenar por Customer Name (columna B)
    pivot_df_filtered = pivot_df_filtered.sort_values(by='B')
    print(f"✅ Datos filtrados: {len(pivot_df_filtered)} filas conservadas.")
    
    # Copiar al Excel filtrado
    for r_idx, row in enumerate(pivot_df_filtered.values):
        for col_idx, dest_col in enumerate(col_mapping.keys()):
            dest_col_idx = column_index_from_string(dest_col)
            val = row[col_idx]
            if pd.notnull(val):
                ws_pivot.cell(row=r_idx + pivot_start_row, column=dest_col_idx, value=val)

    # Guardar copy_base_temp.xlsx
    wb.save(temp_copy_path)
    print("✅ COPY base actualizado.")
    
    # 3. Crear forecast temporal y copiar datos Pivot → EPM
    print("📤 Copiando datos de Pivot a forecast temporal...")
    
    # Crear copia del forecast con extensión xlsm
    forecast_temp_path = os.path.join(temp_dir, 'Systems HW - North SSA EPM ISC.xlsm')
    shutil.copy(forecast_base_path_corrected, forecast_temp_path)
    
    # Cargar con openpyxl manteniendo VBA
    forecast_wb = openpyxl.load_workbook(forecast_temp_path, keep_vba=True)
    forecast_epm_ws = forecast_wb['EPM']
    
    # Determinar la última fila con datos en el rango B:AD de Pivot
    pivot_range_start = column_index_from_string('B')
    pivot_range_end = column_index_from_string('AD')
    last_data_row = pivot_start_row
    
    for col in range(pivot_range_start, pivot_range_end + 1):
        for row in range(pivot_start_row, ws_pivot.max_row + 1):
            if ws_pivot.cell(row=row, column=col).value is not None:
                last_data_row = max(last_data_row, row)
    
    print(f"🔢 Última fila con datos en Pivot (rango B:AD): {last_data_row}")
    
    # Copiar de Pivot!B4:AD → Forecast!B4:AD para todas las filas con datos
    pivot_cols = range(pivot_range_start, pivot_range_end + 1)
    forecast_cols = range(column_index_from_string('B'), column_index_from_string('AD') + 1)
    
    # Copiar todas las filas desde pivot_start_row hasta last_data_row
    for r in range(pivot_start_row, last_data_row + 1):
        for src_col, dest_col in zip(pivot_cols, forecast_cols):
            val = ws_pivot.cell(row=r, column=src_col).value
            # Copiamos incluso valores nulos para mantener la estructura
            forecast_epm_ws.cell(row=r, column=dest_col, value=val)
        # 3. Copiar columnas seleccionadas de EPM a hoja P2

    print("📌 Copiando columnas clave desde hoja 'EPM' a hoja 'P2'...")

    try:
        ws_epm_forecast = forecast_wb['EPM']
        ws_p2 = forecast_wb['P2']

    # 🔧 Primero, llenamos la columna AI (Brand) manualmente en EPM
        def calcular_brand(valor):
            if valor == "Storage HW":
             return "Storage HW"
            elif valor == "Storage TPS":
                return "Storage TPS"
            elif valor == "Z HW":
             return "Mainframe"
            elif valor == "Z TPS":
                return "Z Middleware"
            elif valor == "Power HW":
                return "Cognitive"
            elif valor == "Power TPS":
                return "Cognitive"
            return None

        print("🔍 Calculando valores de la columna AI (Brand)...")
        for row in range(4, ws_epm_forecast.max_row + 1):
            valor_lvl15 = ws_epm_forecast.cell(row=row, column=11).value  # Columna AH
            brand = calcular_brand(valor_lvl15)
            ws_epm_forecast.cell(row=row, column=35).value = brand  # Columna AI
        print("✅ Columna AI (Brand) calculada y completada.")

    # 📥 Luego copiamos las columnas a P2
        columnas_mapeo = {
            'AI': 'B',
            'AJ': 'C',
            'C': 'D',
            'N': 'E',
            'B': 'F',
            'D': 'G',
            'AR': 'H',
            'E': 'I',
            'S': 'J',
            'AQ': 'K',
            'AG': 'L'
        }

        start_row_epm = 4  # desde fila 4 en EPM
        start_row_p2 = 4   # fila 3 en P2
        max_row = ws_epm_forecast.max_row
        

        for epm_col, p2_col in columnas_mapeo.items():
            col_idx_epm = column_index_from_string(epm_col)
            col_idx_p2 = column_index_from_string(p2_col)

            print(f"  🔄 Copiando columna {epm_col} ➜ {p2_col}")
            for i in range(start_row_epm, max_row + 1):
                value = ws_epm_forecast.cell(row=i, column=col_idx_epm).value
                target_row = start_row_p2 + (i - start_row_epm)
                ws_p2.cell(row=target_row, column=col_idx_p2, value=value)

        print("✅ Columnas copiadas correctamente de EPM a P2.")

    except Exception as e:
        print(f"❌ Error al copiar datos de EPM a P2: {e}")

# 💾 Guardar con extensión xlsm
    forecast_wb.save(forecast_temp_path)
    print(f"✅ Forecast temporal actualizado con todas las filas de datos: {forecast_temp_path}")

    
    return forecast_temp_path