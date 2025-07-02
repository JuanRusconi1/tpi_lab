from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from app.schemas.inscripcion import InscripcionSchema
from app.services import inscripcion_service
from app.config.database import get_db
from app.security.auth import get_current_user
from app.schemas.evento import EventoSchema

router = APIRouter(prefix="/api/v1/inscripciones", tags=["inscripciones"])

@router.get("/", response_model=List[InscripcionSchema])
def listar_inscripciones(skip: int = 0, limit: int = 100, db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    return inscripcion_service.get_inscripciones(db, skip=skip, limit=limit)

@router.get("/total-activas", response_model=int)
def total_inscripciones_activas(db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    return inscripcion_service.get_total_inscripciones_activas(db)

@router.post("/", response_model=InscripcionSchema)
def crear_inscripcion(inscripcion: InscripcionSchema, db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    return inscripcion_service.create_inscripcion(db, inscripcion)

@router.put("/{inscripcion_id}", response_model=InscripcionSchema)
def actualizar_inscripcion(inscripcion_id: int, inscripcion: InscripcionSchema, db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    inscripcion_actualizada = inscripcion_service.update_inscripcion(db, inscripcion_id, inscripcion)
    if inscripcion_actualizada is None:
        raise HTTPException(status_code=404, detail="Inscripción no encontrada")
    return inscripcion_actualizada

@router.delete("/{inscripcion_id}", response_model=InscripcionSchema)
def eliminar_inscripcion(inscripcion_id: int, db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    inscripcion_eliminada = inscripcion_service.delete_inscripcion(db, inscripcion_id)
    if inscripcion_eliminada is None:
        raise HTTPException(status_code=404, detail="Inscripción no encontrada")
    return inscripcion_eliminada

@router.get("/usuario/{usuario_id}/activas", response_model=List[InscripcionSchema])
def inscripciones_activas_usuario(usuario_id: int, skip: int = 0, limit: int = 10, db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    return inscripcion_service.get_inscripciones_activas_usuario(db, usuario_id=usuario_id, skip=skip, limit=limit)

@router.get("/usuario/{usuario_id}/historial", response_model=List[InscripcionSchema])
def historial_inscripciones_usuario(usuario_id: int, skip: int = 0, limit: int = 10, db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    return inscripcion_service.get_historial_inscripciones_usuario(db, usuario_id=usuario_id, skip=skip, limit=limit)

@router.get("/promedio-por-evento", response_model=float)
def promedio_inscriptos_por_evento(db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    return inscripcion_service.get_promedio_inscriptos_por_evento(db)

@router.get("/evento-mas-inscripciones", response_model=Optional[int])
def evento_con_mas_inscripciones(db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    return inscripcion_service.get_evento_con_mas_inscripciones(db)

@router.get("/{inscripcion_id}", response_model=InscripcionSchema)
def obtener_inscripcion(inscripcion_id: int, db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    inscripcion = inscripcion_service.get_inscripcion(db, inscripcion_id)
    if inscripcion is None:
        raise HTTPException(status_code=404, detail="Inscripción no encontrada")
    return inscripcion