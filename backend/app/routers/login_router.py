from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm
from app.security import auth
from app.config.database import get_db
from app.models.usuario import Usuario

router = APIRouter(prefix="/api/v1/login", tags=["login"])

@router.post("/", summary="Autenticar usuario y obtener token JWT")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    usuario = auth.autenticar_usuario(db, form_data.username, form_data.password)
    if not usuario:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenciales incorrectas",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = auth.crear_token_acceso({"sub": usuario.email, "rol": usuario.rol})
    return {"access_token": access_token, "token_type": "bearer", "user_id": usuario.id, "rol": usuario.rol}
