from datetime import datetime
from pydantic import BaseModel

class EventoSchema(BaseModel):
    id: int
    nombre: str
    descripcion: str
    fecha_inicio: datetime
    fecha_fin: datetime
    lugar: str
    cupos: int
    categoria_id: int

    model_config = {
        "from_attributes": True
    }