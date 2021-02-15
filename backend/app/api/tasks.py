from fastapi.encoders import jsonable_encoder

from app.schemas import Meme
from app.core.manager import manager


async def send_message(message: Meme):
    obj_data = jsonable_encoder(message)
    await manager.broadcast(obj_data)
