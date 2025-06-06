import pandas as pd
import json
from datetime import datetime

def calcular_forecast(forecast_temp_path= "app/temp/Systems HW - North SSA EPM ISC.xlsm"):
    tabla_raw = pd.read_excel(forecast_temp_path, sheet_name="Data Trx", header=None)
    headers = tabla_raw.iloc[2].tolist()
    tabla4 = tabla_raw.iloc[3:].copy()
    tabla4.columns = [str(col).strip().replace('\n', ' ') for col in headers]

    country_col = 'Country'
    brand_col = 'Brand'
    month_col = 'Month'
    status_col = 'Status'
    rev_col = 'Rev ($)'

    tabla4[month_col] = pd.to_numeric(tabla4[month_col], errors='coerce')

    data = {}

    # Define las combinaciones de país, brand y mes
    combinaciones = [

        #CVL
        (["Mainframe", "Cognitive"], ["Colombia","Venezuela","LCR"], 1),
        (["Mainframe", "Cognitive"], ["Colombia", "Venezuela", "LCR"], [1, 2]),
        (["Mainframe", "Cognitive"], ["Colombia","Venezuela","LCR"], 3),
        (["Mainframe"], ["Colombia","Venezuela","LCR"], 1),
        (["Mainframe"], ["Colombia","Venezuela","LCR"], [1, 2]),
        (["Mainframe"], ["Colombia","Venezuela","LCR"], 3),
        (["Cognitive"], ["Colombia","Venezuela","LCR"], 1),
        (["Cognitive"], ["Colombia","Venezuela","LCR"], [1, 2]),
        (["Cognitive"], ["Colombia","Venezuela","LCR"], 3),
        (["Storage HW", "Storage TPS"], ["Colombia","Venezuela","LCR"], 1),
        (["Storage HW", "Storage TPS"], ["Colombia","Venezuela","LCR"], [1, 2]),
        (["Storage HW", "Storage TPS"], ["Colombia","Venezuela","LCR"], 3),
        (["Storage HW"], ["Colombia","Venezuela","LCR"], 1),
        (["Storage HW"], ["Colombia","Venezuela","LCR"], [1, 2]),
        (["Storage HW"], ["Colombia","Venezuela","LCR"], 3),
        (["Storage TPS"], ["Colombia","Venezuela","LCR"], 1),
        (["Storage TPS"], ["Colombia","Venezuela","LCR"], [1, 2]),
        (["Storage TPS"], ["Colombia","Venezuela","LCR"], 3),
        (["Z Middleware"], ["Colombia","Venezuela","LCR"], 1),
        (["Z Middleware"], ["Colombia","Venezuela","LCR"], [1, 2]),
        (["Z Middleware"], ["Colombia","Venezuela","LCR"], 3),
        (["Mainframe", "Cognitive", "Storage HW", "Storage TPS", "Z Middleware"], ["Colombia","Venezuela","LCR"], 1),
        (["Mainframe", "Cognitive", "Storage HW", "Storage TPS", "Z Middleware"], ["Colombia","Venezuela","LCR"], [1, 2]),
        (["Mainframe", "Cognitive", "Storage HW", "Storage TPS", "Z Middleware"], ["Colombia","Venezuela","LCR"], 3),



        # COLOMBIA
        (["Mainframe", "Cognitive"], "Colombia", 1),
        (["Mainframe", "Cognitive"], "Colombia", [1, 2]),
        (["Mainframe", "Cognitive"], "Colombia", 3),
        (["Mainframe"], "Colombia", 1),
        (["Mainframe"], "Colombia", [1, 2]),
        (["Mainframe"], "Colombia", 3),
        (["Cognitive"], "Colombia", 1),
        (["Cognitive"], "Colombia", [1, 2]),
        (["Cognitive"], "Colombia", 3),
        (["Storage HW", "Storage TPS"], "Colombia", 1),
        (["Storage HW", "Storage TPS"], "Colombia", [1, 2]),
        (["Storage HW", "Storage TPS"], "Colombia", 3),
        (["Storage HW"], "Colombia", 1),
        (["Storage HW"], "Colombia", [1, 2]),
        (["Storage HW"], "Colombia", 3),
        (["Storage TPS"], "Colombia", 1),
        (["Storage TPS"], "Colombia", [1, 2]),
        (["Storage TPS"], "Colombia", 3),
        (["Z Middleware"], "Colombia", 1),
        (["Z Middleware"], "Colombia", [1, 2]),
        (["Z Middleware"], "Colombia", 3),
        (["Mainframe", "Cognitive", "Storage HW", "Storage TPS", "Z Middleware"], "Colombia", 1),
        (["Mainframe", "Cognitive", "Storage HW", "Storage TPS", "Z Middleware"], "Colombia", [1, 2]),
        (["Mainframe", "Cognitive", "Storage HW", "Storage TPS", "Z Middleware"], "Colombia", 3),


        # VENEZUELA
        (["Mainframe", "Cognitive"], "Venezuela", 1),
        (["Mainframe", "Cognitive"], "Venezuela", [1, 2]),
        (["Mainframe", "Cognitive"], "Venezuela", 3),
        (["Mainframe"], "Venezuela", 1),
        (["Mainframe"], "Venezuela", [1, 2]),
        (["Mainframe"], "Venezuela", 3),
        (["Cognitive"], "Venezuela", 1),
        (["Cognitive"], "Venezuela", [1, 2]),
        (["Cognitive"], "Venezuela", 3),
        (["Storage HW", "Storage TPS"], "Venezuela", 1),
        (["Storage HW", "Storage TPS"], "Venezuela", [1, 2]),
        (["Storage HW", "Storage TPS"], "Venezuela", 3),
        (["Storage HW"], "Venezuela", 1),
        (["Storage HW"], "Venezuela", [1, 2]),
        (["Storage HW"], "Venezuela", 3),
        (["Storage TPS"], "Venezuela", 1),
        (["Storage TPS"], "Venezuela", [1, 2]),
        (["Storage TPS"], "Venezuela", 3),
        (["Z Middleware"], "Venezuela", 1),
        (["Z Middleware"], "Venezuela", [1, 2]),
        (["Z Middleware"], "Venezuela", 3),
        (["Mainframe", "Cognitive", "Storage HW", "Storage TPS", "Z Middleware"], "Venezuela", 1),
        (["Mainframe", "Cognitive", "Storage HW", "Storage TPS", "Z Middleware"], "Venezuela", [1, 2]),
        (["Mainframe", "Cognitive", "Storage HW", "Storage TPS", "Z Middleware"], "Venezuela", 3),


        # LCR
        (["Mainframe", "Cognitive"], "LCR", 1),
        (["Mainframe", "Cognitive"], "LCR", [1, 2]),
        (["Mainframe", "Cognitive"], "LCR", 3),
        (["Mainframe"], "LCR", 1),
        (["Mainframe"], "LCR", [1, 2]),
        (["Mainframe"], "LCR", 3),
        (["Cognitive"], "LCR", 1),
        (["Cognitive"], "LCR", [1, 2]),
        (["Cognitive"], "LCR", 3),
        (["Storage HW", "Storage TPS"], "LCR", 1),
        (["Storage HW", "Storage TPS"], "LCR", [1, 2]),
        (["Storage HW", "Storage TPS"], "LCR", 3),
        (["Storage HW"], "LCR", 1),
        (["Storage HW"], "LCR", [1, 2]),
        (["Storage HW"], "LCR", 3),
        (["Storage TPS"], "LCR", 1),
        (["Storage TPS"], "LCR", [1, 2]),
        (["Storage TPS"], "LCR", 3),
        (["Z Middleware"], "LCR", 1),
        (["Z Middleware"], "LCR", [1, 2]),
        (["Z Middleware"], "LCR", 3),
        (["Mainframe", "Cognitive", "Storage HW", "Storage TPS", "Z Middleware"], "LCR", 1),
        (["Mainframe", "Cognitive", "Storage HW", "Storage TPS", "Z Middleware"], "LCR", [1, 2]),
        (["Mainframe", "Cognitive", "Storage HW", "Storage TPS", "Z Middleware"], "LCR", 3)

    ]

    for Brand, Country, Month in combinaciones:
        if isinstance(Country, str):
            Country = [Country]
        
        # Normalizar Month a lista si es entero
        if isinstance(Month, int):
            Month = [Month]
        filtro = (
            (tabla4[country_col].isin(Country)) &
            (tabla4[brand_col].isin(Brand)) &
            (tabla4[month_col].isin(Month)) &
            (tabla4[status_col].isin(["At Risk", "Won"]))
        )

        nombre_Brand = "-".join(Brand)
        if len(Country) == 1:
            country_str = Country[0]
        else:
            country_str = "-".join(Country)
            
        if len(Month) == 1:
            month_str = str(Month[0])
        else:
            month_str = "-".join(map(str, Month))
            
        clave = f"{nombre_Brand}_{country_str}_{month_str}"
        valor = tabla4.loc[filtro, rev_col].sum()
        data[clave] = valor

    # Solo guarda si es viernes
    if datetime.today().weekday() == 3:  # 4 = viernes
        with open("app/resultado.json", "w") as f:
            json.dump(data, f, indent=2)
        print("✅ Resultado guardado en app/resultado.json (viernes)")
    else:
        print("⛔ Hoy no es viernes. No se guarda el archivo.")