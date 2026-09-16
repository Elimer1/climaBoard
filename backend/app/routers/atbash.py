from fastapi import APIRouter, Query
from typing import Annotated
from app.services.atbash_service import atbash_service

router = APIRouter()

@router.get("/atbash")
def get_atbash_text(text: Annotated[str, Query(min_length=1, max_length=1000)]):
    return {"result": atbash_service(text)}