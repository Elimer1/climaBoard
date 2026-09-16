from fastapi import APIRouter, Query
from typing import Annotated
from app.services.geocoding_service import get_location_service

router = APIRouter()

@router.get("/search")
def get_locations(search: Annotated[str, Query(min_length=2, max_length=100)]):
    return get_location_service(search)

