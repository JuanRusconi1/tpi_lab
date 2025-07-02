from sqlalchemy import Column, Integer, String, Enum as SqlEnum
from sqlalchemy.ext.declarative import declarative_base
from enum import Enum as PyEnum
from app.config.database import Base

class RolEnum(str, PyEnum):
    Administrador = "Administrador"
    Cliente = "Cliente"

class Usuario(Base):
    __tablename__ = "usuario"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False, index=True)
    password = Column(String, nullable=False)
    rol = Column(SqlEnum(RolEnum), nullable=False)
