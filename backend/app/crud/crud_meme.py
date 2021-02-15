from typing import List

from sqlalchemy.orm import Session
from sqlalchemy import desc

from app.crud.base import CRUDBase
from app.models.meme import Meme
from app.schemas.meme import MemeCreate, MemeUpdate


class CRUDMeme(CRUDBase[Meme, MemeCreate, MemeUpdate]):
    def get_multi_latest(
        self, db: Session, *, skip: int = 0, limit: int = 100
    ) -> List[Meme]:
        return db.query(Meme).order_by(desc(Meme.created_at)).offset(skip).limit(limit).all()


meme = CRUDMeme(Meme)
