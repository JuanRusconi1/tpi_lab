from datetime import datetime
from pydantic import BaseModel

class InscripcionSchema(BaseModel):
    id: int
    evento_id: int
    usuario_id: int
    fecha_inscripcion: datetime

    model_config = {
        "from_attributes": True
    }