from sqlalchemy import Column, Integer, DateTime, ForeignKey
from app.config.database import Base
from sqlalchemy.orm import relationship

class Inscripcion(Base):
    __tablename__ = "inscripcion"

    id = Column(Integer, primary_key=True, index=True)
    evento_id = Column(Integer, ForeignKey("evento.id"), nullable=False)
    usuario_id = Column(Integer, ForeignKey("usuario.id"), nullable=False)
    fecha_inscripcion = Column(DateTime, nullable=False)
