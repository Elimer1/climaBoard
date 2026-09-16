from fastapi import APIRouter, Query
from typing import Annotated
from app.services.favorites_service import delete_favorite_service, get_favorites_service, add_favorite_service
from app.schemas.favorite import Favorite

ExplorerName = Annotated[
    str,
    Query(
        min_length=3,
        max_length=30,
        pattern=r"^[a-zA-Z0-9_ -]+$"
    )
]

router = APIRouter(prefix="/favorites")

@router.get("/get")
def get_favorites(explorer_name: ExplorerName):
    return get_favorites_service(explorer_name)

@router.post("/add")
def add_favorite(explorer_name: ExplorerName, favorite: Favorite):
    return add_favorite_service(explorer_name, favorite)

@router.delete("/delete")
def delete_favorite(explorer_name: ExplorerName,
    latitude: Annotated[float, Query(ge = -90, le= 90)], 
    longitude: Annotated[float, Query(ge = -180, le= 180)]
    ):
    return delete_favorite_service(explorer_name, latitude, longitude)
    
