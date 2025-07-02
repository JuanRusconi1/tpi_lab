from sqlalchemy import Column, Integer, String
from app.config.database import Base

class CategoriaEvento(Base):
    __tablename__ = "categoria_evento"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, nullable=False)
    descripcion = Column(String, nullable=False)
