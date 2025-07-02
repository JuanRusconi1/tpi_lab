from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from app.config.database import Base
from sqlalchemy.orm import relationship

class Evento(Base):
    __tablename__ = "evento"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, nullable=False)
    descripcion = Column(String, nullable=False)
    fecha_inicio = Column(DateTime, nullable=False)
    fecha_fin = Column(DateTime, nullable=False)
    lugar = Column(String, nullable=False)
    cupos = Column(Integer, nullable=False)
    categoria_id = Column(Integer, ForeignKey("categoria_evento.id"), nullable=False)
