from fastapi import FastAPI
from app.routers.search import router as search_router
from app.routers.weather import router as weather_router
from app.routers.favorites import router as favorites_router
from app.exceptions import ExternalAPIError
from fastapi.responses import JSONResponse
from app.logging_middleware import log_requests
from app.routers.atbash import router as atbash_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

allow_origins=["http://localhost:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allow_origins,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.middleware("http")(log_requests)

@app.exception_handler(ExternalAPIError)
def handle_external_api_error(req, exc):
    return JSONResponse(
        status_code=503,
        content={"detail": str(exc)}
    )

@app.get("/health")
def get_health():
    return {"status" : "ok"}

app.include_router(search_router)
app.include_router(weather_router)
app.include_router(favorites_router)
app.include_router(atbash_router)