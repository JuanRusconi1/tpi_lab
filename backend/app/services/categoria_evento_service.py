from sqlalchemy.orm import Session
from app.models.categoria_evento import CategoriaEvento
from app.schemas.categoria_evento import Categoria_eventoSchema
from typing import List, Optional

def get_categoria_evento(db: Session, categoria_id: int) -> Optional[Categoria_eventoSchema]:
    categoria = db.query(CategoriaEvento).filter(CategoriaEvento.id == categoria_id).first()
    if categoria:
        return Categoria_eventoSchema.model_validate(categoria)
    return None

def get_categorias_evento(db: Session, skip: int = 0, limit: int = 100) -> List[Categoria_eventoSchema]:
    categorias = db.query(CategoriaEvento).offset(skip).limit(limit).all()
    return [Categoria_eventoSchema.model_validate(c) for c in categorias]

def create_categoria_evento(db: Session, categoria: Categoria_eventoSchema) -> Categoria_eventoSchema:
    db_categoria = CategoriaEvento(
        nombre=categoria.nombre,
        descripcion=categoria.descripcion
    )
    db.add(db_categoria)
    db.commit()
    db.refresh(db_categoria)
    return Categoria_eventoSchema.model_validate(db_categoria)

def update_categoria_evento(db: Session, categoria_id: int, categoria: Categoria_eventoSchema) -> Optional[Categoria_eventoSchema]:
    db_categoria = db.query(CategoriaEvento).filter(CategoriaEvento.id == categoria_id).first()
    if db_categoria:
        db_categoria.nombre = categoria.nombre
        db_categoria.descripcion = categoria.descripcion
        db.commit()
        db.refresh(db_categoria)
        return Categoria_eventoSchema.model_validate(db_categoria)
    return None

def delete_categoria_evento(db: Session, categoria_id: int) -> Optional[Categoria_eventoSchema]:
    db_categoria = db.query(CategoriaEvento).filter(CategoriaEvento.id == categoria_id).first()
    if db_categoria:
        db.delete(db_categoria)
        db.commit()
        return Categoria_eventoSchema.model_validate(db_categoria)
    return None
