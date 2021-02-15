from typing import Any, List
from fastapi import APIRouter, WebSocket, WebSocketDisconnect, BackgroundTasks, Depends, status
from fastapi.responses import Response
from sqlalchemy.orm import Session
from starlette.status import HTTP_404_NOT_FOUND

from app import crud, schemas
from app.api import deps, tasks
from app.core.manager import manager

router = APIRouter()


@router.get(
    "",
    response_model=List[schemas.Meme],
    status_code=status.HTTP_200_OK
)
def read_memes(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100
) -> Any:
    """
    Retrieve latest memes.
    """
    memes = crud.meme.get_multi_latest(db=db, skip=skip, limit=limit)
    return memes


@router.post(
    "",
    response_model=schemas.Meme,
    response_model_include={"id"},
    status_code=status.HTTP_201_CREATED
)
async def create_meme(
    *,
    db: Session = Depends(deps.get_db),
    meme_in: schemas.MemeCreate,
    background_tasks: BackgroundTasks
) -> Any:
    """
    Create new meme.
    """
    meme = crud.meme.create(db=db, obj_in=meme_in)
    background_tasks.add_task(tasks.send_message, meme)
    return meme


@router.patch(
    "/{id}"
)
def update_meme(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    meme_in: schemas.MemeUpdate
) -> Any:
    """
    Update a meme.
    """
    meme = crud.meme.get(db=db, id=id)
    if not meme:
        return Response(status_code=status.HTTP_404_NOT_FOUND)
    meme = crud.meme.update(db=db, db_obj=meme, obj_in=meme_in)
    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.delete(
    "/{id}"
)
def delete_meme(
    *,
    db: Session = Depends(deps.get_db),
    id: int
) -> Any:
    """
    Delete a meme.
    """
    meme = crud.meme.get(db=db, id=id)
    if not meme:
        return Response(status_code=status.HTTP_404_NOT_FOUND)
    meme = crud.meme.remove(db=db, id=id)
    return Response(status_code=status.HTTP_200_OK)


@router.get(
    "/{id}",
    response_model=schemas.Meme,
    status_code=status.HTTP_200_OK
)
def read_meme_by_id(
    *,
    db: Session = Depends(deps.get_db),
    id: int
) -> Any:
    """
    Get a specific meme by id.
    """
    meme = crud.meme.get(db=db, id=id)
    if not meme:
        return Response(status_code=status.HTTP_404_NOT_FOUND)
    return meme


@router.websocket(
    "/ws/{client_id}"
)
async def websocket_endpoint(websocket: WebSocket, client_id: str):
    """
    Realtime Meme Feed
    """
    await manager.connect(websocket)
    await manager.broadcast(dict(id="XMeme Admin", message=f"Client #{client_id} joined the chat."))
    try:
        while True:
            data = await websocket.receive_json()
            await manager.broadcast(data)
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        await manager.broadcast(dict(id="XMeme Admin", message=f"Client #{client_id} left the chat."))
