import requests
from app.exceptions import ExternalAPIError

def get_forecast(latitude: float, longitude: float): 
    url = "https://api.open-meteo.com/v1/forecast"
    params = {
    "latitude": latitude,
    "longitude": longitude,
    "current": "temperature_2m,weather_code,wind_speed_10m",
    "daily": "temperature_2m_max,temperature_2m_min,weather_code",
    "wind_speed_unit": "mph",
    "temperature_unit": "fahrenheit",
    "precipitation_unit": "inch"
}

    try:
        response = requests.get(url, params=params, timeout=5)
        response.raise_for_status()
    except requests.exceptions.RequestException:
        raise ExternalAPIError("Weather service is currently unavailable")

    return response.json()

def get_current_service(latitude: float, longitude: float):
    forecast = get_forecast(latitude, longitude)
    return forecast["current"]

def get_daily_service(latitude: float, longitude: float):
    forecast = get_forecast(latitude, longitude)
    return forecast["daily"]

def compare_service(latitude1: float, longitude1: float, latitude2: float, longitude2: float):
    forecast1 = get_forecast(latitude1, longitude1)
    forecast2 = get_forecast(latitude2, longitude2)
    return{
        "city1": {
        "current": forecast1["current"],
        "daily": forecast1["daily"]
    },
        "city2": {
        "current": forecast2["current"],
        "daily": forecast2["daily"]
    }
    }
if __name__ == "__main__":
    result = get_forecast(52, 50)
    print(result) 