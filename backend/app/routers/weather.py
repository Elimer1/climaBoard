from fastapi import APIRouter, Query
from typing import Annotated
from app.services.weather_service import get_daily_service, get_current_service, compare_service

Latitude = Annotated[
     float,
Query(ge = -90, le= 90)
]

Longitude = Annotated[
     float, 
     Query(ge = -180, le= 180)
]


router = APIRouter(prefix="/weather")

@router.get("/current")
def get_current_forecast(
    latitude: Latitude, 
    longitude: Longitude
    ):

    return get_current_service(latitude, longitude)


@router.get("/daily")
def get_daily_forecast(
    latitude: Latitude, 
    longitude: Longitude
    ):

    return get_daily_service(latitude, longitude)


@router.get("/compare")
def compare_weather(latitude1: Latitude, longitude1: Longitude, latitude2: Latitude, longitude2: Longitude):

    return compare_service(latitude1, longitude1, latitude2, longitude2)
