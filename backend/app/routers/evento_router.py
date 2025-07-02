from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.schemas.evento import EventoSchema
from app.services import evento_service
from app.config.database import get_db
from app.security.auth import get_current_user

router = APIRouter(prefix="/api/v1/eventos", tags=["eventos"])

@router.get("/", response_model=List[EventoSchema])
def listar_eventos(skip: int = 0, limit: int = 100, db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    return evento_service.get_eventos(db, skip=skip, limit=limit)

@router.post("/", response_model=EventoSchema)
def crear_evento(evento: EventoSchema, db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    return evento_service.create_evento(db, evento)

@router.get("/disponibles", response_model=List[EventoSchema])
def listar_eventos_disponibles(skip: int = 0, limit: int = 10, db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    print(limit)
    return evento_service.get_eventos_disponibles(db, skip=skip, limit=limit)


@router.put("/{evento_id}", response_model=EventoSchema)
def actualizar_evento(evento_id: int, evento: EventoSchema, db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    evento_actualizado = evento_service.update_evento(db, evento_id, evento)
    if evento_actualizado is None:
        raise HTTPException(status_code=404, detail="Evento no encontrado")
    return evento_actualizado

@router.delete("/{evento_id}", response_model=EventoSchema)
def eliminar_evento(evento_id: int, db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    evento_eliminado = evento_service.delete_evento(db, evento_id)
    if evento_eliminado is None:
        raise HTTPException(status_code=404, detail="Evento no encontrado")
    return evento_eliminado

@router.get("/buscar/", response_model=List[EventoSchema])
def buscar_eventos_endpoint(query: str, skip: int = 0, limit: int = 10, db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    return evento_service.buscar_eventos(db, query=query, skip=skip, limit=limit)

@router.get("/categoria/{categoria_id}", response_model=List[EventoSchema])
def listar_eventos_por_categoria(categoria_id: int, skip: int = 0, limit: int = 10, db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    return evento_service.get_eventos_por_categoria(db, categoria_id=categoria_id, skip=skip, limit=limit)

@router.get("/total", response_model=int)
def total_eventos(db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    return evento_service.get_total_eventos(db)

@router.get("/{evento_id}", response_model=EventoSchema)
def obtener_evento(evento_id: int, db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    evento = evento_service.get_evento(db, evento_id)
    if evento is None:
        raise HTTPException(status_code=404, detail="Evento no encontrado")
    return evento
