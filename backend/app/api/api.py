from fastapi import APIRouter

from app.api.endpoints import memes

api_router = APIRouter()
api_router.include_router(memes.router, prefix="/memes", tags=["memes"])
