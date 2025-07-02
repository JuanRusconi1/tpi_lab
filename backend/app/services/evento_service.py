from sqlalchemy.orm import Session
from sqlalchemy import func
from app.models.evento import Evento
from app.schemas.evento import EventoSchema
from typing import List, Optional
from datetime import datetime

def get_evento(db: Session, evento_id: int) -> Optional[EventoSchema]:
    evento = db.query(Evento).filter(Evento.id == evento_id).first()
    if evento:
        return EventoSchema.model_validate(evento)
    return None

def get_eventos(db: Session, skip: int = 0, limit: int = 100) -> List[EventoSchema]:
    eventos = db.query(Evento).offset(skip).limit(limit).all()
    return [EventoSchema.model_validate(e) for e in eventos]

def create_evento(db: Session, evento: EventoSchema) -> EventoSchema:
    db_evento = Evento(
        nombre=evento.nombre,
        descripcion=evento.descripcion,
        fecha_inicio=evento.fecha_inicio,
        fecha_fin=evento.fecha_fin,
        lugar=evento.lugar,
        cupos=evento.cupos,
        categoria_id=evento.categoria_id
    )
    db.add(db_evento)
    db.commit()
    db.refresh(db_evento)
    return EventoSchema.model_validate(db_evento)

def update_evento(db: Session, evento_id: int, evento: EventoSchema) -> Optional[EventoSchema]:
    db_evento = db.query(Evento).filter(Evento.id == evento_id).first()
    if db_evento:
        db_evento.nombre = evento.nombre
        db_evento.descripcion = evento.descripcion
        db_evento.fecha_inicio = evento.fecha_inicio
        db_evento.fecha_fin = evento.fecha_fin
        db_evento.lugar = evento.lugar
        db_evento.cupos = evento.cupos
        db_evento.categoria_id = evento.categoria_id
        db.commit()
        db.refresh(db_evento)
        return EventoSchema.model_validate(db_evento)
    return None

def delete_evento(db: Session, evento_id: int) -> Optional[EventoSchema]:
    db_evento = db.query(Evento).filter(Evento.id == evento_id).first()
    if db_evento:
        db.delete(db_evento)
        db.commit()
        return EventoSchema.model_validate(db_evento)
    return None

def get_eventos_disponibles(db: Session, skip: int = 0, limit: int = 10) -> List[EventoSchema]:
    ahora = datetime.now()
    eventos = db.query(Evento).filter(Evento.fecha_fin > ahora).offset(skip).limit(limit).all()
    return [EventoSchema.model_validate(e) for e in eventos]

def buscar_eventos(db: Session, query: str, skip: int = 0, limit: int = 10) -> List[EventoSchema]:
    eventos = db.query(Evento).filter(
        (Evento.nombre.ilike(f"%{query}%")) |
        (Evento.descripcion.ilike(f"%{query}%"))
    ).offset(skip).limit(limit).all()
    return [EventoSchema.model_validate(e) for e in eventos]

def get_eventos_por_categoria(db: Session, categoria_id: int, skip: int = 0, limit: int = 10) -> List[EventoSchema]:
    eventos = db.query(Evento).filter(Evento.categoria_id == categoria_id).offset(skip).limit(limit).all()
    return [EventoSchema.model_validate(e) for e in eventos]

def get_total_eventos(db: Session) -> int:
    return db.query(Evento).count()
