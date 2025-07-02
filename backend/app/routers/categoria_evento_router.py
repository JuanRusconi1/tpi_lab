from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.schemas.categoria_evento import Categoria_eventoSchema
from app.services import categoria_evento_service
from app.config.database import get_db
from app.security.auth import get_current_user

router = APIRouter(prefix="/api/v1/categorias_evento", tags=["categorias_evento"])

@router.get("/", response_model=List[Categoria_eventoSchema])
def listar_categorias(skip: int = 0, limit: int = 100, db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    return categoria_evento_service.get_categorias_evento(db, skip=skip, limit=limit)

@router.get("/{categoria_id}", response_model=Categoria_eventoSchema)
def obtener_categoria(categoria_id: int, db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    categoria = categoria_evento_service.get_categoria_evento(db, categoria_id)
    if categoria is None:
        raise HTTPException(status_code=404, detail="Categoría no encontrada")
    return categoria

@router.post("/", response_model=Categoria_eventoSchema)
def crear_categoria(categoria: Categoria_eventoSchema, db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    print(categoria)
    return categoria_evento_service.create_categoria_evento(db, categoria)

@router.put("/{categoria_id}", response_model=Categoria_eventoSchema)
def actualizar_categoria(categoria_id: int, categoria: Categoria_eventoSchema, db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    categoria_actualizada = categoria_evento_service.update_categoria_evento(db, categoria_id, categoria)
    if categoria_actualizada is None:
        raise HTTPException(status_code=404, detail="Categoría no encontrada")
    return categoria_actualizada

@router.delete("/{categoria_id}", response_model=Categoria_eventoSchema)
def eliminar_categoria(categoria_id: int, db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    categoria_eliminada = categoria_evento_service.delete_categoria_evento(db, categoria_id)
    if categoria_eliminada is None:
        raise HTTPException(status_code=404, detail="Categoría no encontrada")
    return categoria_eliminada
