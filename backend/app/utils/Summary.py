import pandas as pd
import json
from datetime import datetime

def Summary(forecast_temp_path= "app/temp/Systems HW - North SSA EPM ISC.xlsm"):
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

        #Power
        (["Cognitive"], ["Colombia","Venezuela","LCR"], 1),
        (["Cognitive"], ["Colombia","Venezuela","LCR"], [1, 2]),
        (["Cognitive"], ["Colombia","Venezuela","LCR"], 3),

        #Storage CVL
        (["Storage HW", "Storage TPS"], ["Colombia","Venezuela","LCR"], 1),
        (["Storage HW", "Storage TPS"], ["Colombia","Venezuela","LCR"], [1, 2]),
        (["Storage HW", "Storage TPS"], ["Colombia","Venezuela","LCR"], 3),

        #Z CVL
        (["Mainframe", "Z Middleware"], ["Colombia","Venezuela","LCR"], 1),
        (["Mainframe", "Z Middleware"], ["Colombia","Venezuela","LCR"], [1, 2]),
        (["Mainframe", "Z Middleware"], ["Colombia","Venezuela","LCR"], 3),




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

        with open("app/summary.json", "w") as f:
            json.dump(data, f, indent=2)
        print("✅ Resultado guardado")