from pydantic import BaseModel

class Categoria_eventoSchema(BaseModel):
    id: int
    nombre: str
    descripcion: str

    model_config = {
        "from_attributes": True
    }