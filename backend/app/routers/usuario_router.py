from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.schemas.usuario import UsuarioSchema
from app.services import usuario_service
from app.config.database import get_db
from app.security.auth import get_current_user

router = APIRouter(prefix="/api/v1/usuarios", tags=["usuarios"])

@router.get("/", response_model=List[UsuarioSchema])
def listar_usuarios(skip: int = 0, limit: int = 100, db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    return usuario_service.get_usuarios(db, skip=skip, limit=limit)

@router.get("/{usuario_id}", response_model=UsuarioSchema)
def obtener_usuario(usuario_id: int, db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    usuario = usuario_service.get_usuario(db, usuario_id)
    if usuario is None:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return usuario

@router.post("/", response_model=UsuarioSchema)
def crear_usuario(usuario: UsuarioSchema, db: Session = Depends(get_db)):
    return usuario_service.create_usuario(db, usuario)

@router.put("/{usuario_id}", response_model=UsuarioSchema)
def actualizar_usuario(usuario_id: int, usuario: UsuarioSchema, db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    usuario_actualizado = usuario_service.update_usuario(db, usuario_id, usuario)
    if usuario_actualizado is None:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return usuario_actualizado

@router.delete("/{usuario_id}", response_model=UsuarioSchema)
def eliminar_usuario(usuario_id: int, db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    usuario_eliminado = usuario_service.delete_usuario(db, usuario_id)
    if usuario_eliminado is None:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return usuario_eliminado
