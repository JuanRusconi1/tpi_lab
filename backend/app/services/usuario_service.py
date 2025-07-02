from sqlalchemy.orm import Session
from app.models.usuario import Usuario
from app.schemas.usuario import UsuarioSchema
from typing import List, Optional
import bcrypt

def get_usuario(db: Session, usuario_id: int) -> Optional[UsuarioSchema]:
    usuario = db.query(Usuario).filter(Usuario.id == usuario_id).first()
    if usuario:
        return UsuarioSchema.model_validate(usuario)
    return None

def get_usuarios(db: Session, skip: int = 0, limit: int = 100) -> List[UsuarioSchema]:
    usuarios = db.query(Usuario).offset(skip).limit(limit).all()
    return [UsuarioSchema.model_validate(u) for u in usuarios]

def create_usuario(db: Session, usuario: UsuarioSchema) -> UsuarioSchema:
    hashed_password = bcrypt.hashpw(usuario.password.encode('utf-8'), bcrypt.gensalt())
    db_usuario = Usuario(
        nombre=usuario.nombre,
        email=usuario.email,
        password=hashed_password.decode('utf-8'),
        rol=usuario.rol
    )
    db.add(db_usuario)
    db.commit()
    db.refresh(db_usuario)
    print(db_usuario)
    return UsuarioSchema.model_validate(db_usuario)

def update_usuario(db: Session, usuario_id: int, usuario: UsuarioSchema) -> Optional[UsuarioSchema]:
    db_usuario = db.query(Usuario).filter(Usuario.id == usuario_id).first()
    if db_usuario:
        db_usuario.nombre = usuario.nombre
        db_usuario.email = usuario.email
        db_usuario.password = bcrypt.hashpw(usuario.password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
        db_usuario.rol = usuario.rol
        db.commit()
        db.refresh(db_usuario)
        return UsuarioSchema.model_validate(db_usuario)
    return None

def delete_usuario(db: Session, usuario_id: int) -> Optional[UsuarioSchema]:
    db_usuario = db.query(Usuario).filter(Usuario.id == usuario_id).first()
    if db_usuario:
        db.delete(db_usuario)
        db.commit()
        return UsuarioSchema.model_validate(db_usuario)
    return None
