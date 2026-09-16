import requests
from app.exceptions import ExternalAPIError

def get_location_service(search: str):
    url = "https://geocoding-api.open-meteo.com/v1/search"
    params = {
        "name": search,
        "count": 5,
        "format": "json",
        "language": "en"
    }
    try:
        response = requests.get(url, params=params, timeout=5)
        response.raise_for_status()
    except requests.exceptions.RequestException:
        raise ExternalAPIError("Location service is currently unavailable")
    return response.json()

if __name__ == "__main__":
    print(get_location_service("new york"))