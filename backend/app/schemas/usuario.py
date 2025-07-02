from pydantic import BaseModel, EmailStr
from enum import Enum

class RolEnum(str, Enum):
    ADMINISTRADOR = "Administrador"
    CLIENTE = "Cliente"

class UsuarioSchema(BaseModel):
    id: int
    nombre: str
    email: EmailStr
    password: str
    rol: RolEnum

    model_config = {
        "from_attributes": True
    }