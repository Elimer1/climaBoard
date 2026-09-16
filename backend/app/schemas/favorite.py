from pydantic import BaseModel

class Favorite(BaseModel):
    name: str
    latitude: float
    longitude: float
    country: str

