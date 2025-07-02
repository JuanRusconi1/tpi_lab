from sqlalchemy.orm import Session
from app.models.inscripcion import Inscripcion
from app.models.evento import Evento
from app.schemas.inscripcion import InscripcionSchema
from typing import List, Optional
from datetime import datetime
from sqlalchemy import func

def get_inscripcion(db: Session, inscripcion_id: int) -> Optional[InscripcionSchema]:
    inscripcion = db.query(Inscripcion).filter(Inscripcion.id == inscripcion_id).first()
    if inscripcion:
        return InscripcionSchema.model_validate(inscripcion)
    return None

def get_inscripciones(db: Session, skip: int = 0, limit: int = 100) -> List[InscripcionSchema]:
    inscripciones = db.query(Inscripcion).offset(skip).limit(limit).all()
    return [InscripcionSchema.model_validate(i) for i in inscripciones]

def create_inscripcion(db: Session, inscripcion: InscripcionSchema) -> Optional[InscripcionSchema]:
    evento = db.query(Evento).filter(Evento.id == inscripcion.evento_id).first()
    if not evento or evento.cupos <= 0:
        return None  # No hay cupos disponibles o evento no existe
    db_inscripcion = Inscripcion(
        evento_id=inscripcion.evento_id,
        usuario_id=inscripcion.usuario_id,
        fecha_inscripcion=inscripcion.fecha_inscripcion
    )
    evento.cupos -= 1
    db.add(db_inscripcion)
    db.commit()
    db.refresh(db_inscripcion)
    return InscripcionSchema.model_validate(db_inscripcion)

def update_inscripcion(db: Session, inscripcion_id: int, inscripcion: InscripcionSchema) -> Optional[InscripcionSchema]:
    db_inscripcion = db.query(Inscripcion).filter(Inscripcion.id == inscripcion_id).first()
    if db_inscripcion:
        db_inscripcion.evento_id = inscripcion.evento_id
        db_inscripcion.usuario_id = inscripcion.usuario_id
        db_inscripcion.fecha_inscripcion = inscripcion.fecha_inscripcion
        db.commit()
        db.refresh(db_inscripcion)
        return InscripcionSchema.model_validate(db_inscripcion)
    return None

def delete_inscripcion(db: Session, inscripcion_id: int) -> Optional[InscripcionSchema]:
    db_inscripcion = db.query(Inscripcion).filter(Inscripcion.id == inscripcion_id).first()
    if db_inscripcion:
        evento = db.query(Evento).filter(Evento.id == db_inscripcion.evento_id).first()
        if evento:
            evento.cupos += 1
        db.delete(db_inscripcion)
        db.commit()
        return InscripcionSchema.model_validate(db_inscripcion)
    return None

def get_inscripciones_activas_usuario(db: Session, usuario_id: int, skip: int = 0, limit: int = 10) -> List[InscripcionSchema]:
    ahora = datetime.now()
    inscripciones = db.query(Inscripcion).filter(
        Inscripcion.usuario_id == usuario_id,
        Evento.fecha_fin > ahora
    ).offset(skip).limit(limit).all()
    return [InscripcionSchema.model_validate(i) for i in inscripciones]

def get_historial_inscripciones_usuario(db: Session, usuario_id: int, skip: int = 0, limit: int = 10) -> List[InscripcionSchema]:
    inscripciones = db.query(Inscripcion).join(Evento).filter(
        Inscripcion.usuario_id == usuario_id
    ).order_by(Inscripcion.fecha_inscripcion.desc()).offset(skip).limit(limit).all()
    return [InscripcionSchema.model_validate(i) for i in inscripciones]

def get_total_inscripciones_activas(db: Session) -> int:
    ahora = datetime.now()
    return db.query(Inscripcion).join(Evento).filter(Evento.fecha_fin > ahora).count()

def get_promedio_inscriptos_por_evento(db: Session) -> float:
    total_eventos = db.query(Evento).count()
    if total_eventos == 0:
        return 0.0
    total_inscripciones = db.query(func.count(Inscripcion.id)).scalar()
    return total_inscripciones / total_eventos

def get_evento_con_mas_inscripciones(db: Session) -> Optional[int]:
    result = db.query(Inscripcion.evento_id, func.count(Inscripcion.id).label('total'))\
        .group_by(Inscripcion.evento_id)\
        .order_by(func.count(Inscripcion.id).desc())\
        .first()
    if result:
        return result.evento_id
    return None
