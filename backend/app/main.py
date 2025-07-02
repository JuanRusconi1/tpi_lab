from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from app.routers.usuario_router import router as usuario_router
from app.routers.inscripcion_router import router as inscripcion_router
from app.routers.evento_router import router as evento_router
from app.routers.categoria_evento_router import router as categoria_evento_router
from app.routers.login_router import router as login_router

app = FastAPI()

# Middleware de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Middleware para manejo de errores generales
@app.middleware("http")
async def catch_exceptions_middleware(request: Request, call_next):
    try:
        return await call_next(request)
    except Exception as exc:
        print(exc)
        return JSONResponse(
            status_code=500,
            content={"detail": "Error interno del servidor", "error": str(exc)}
        )

# Routers
app.include_router(usuario_router)
app.include_router(inscripcion_router)
app.include_router(evento_router)
app.include_router(categoria_evento_router)
app.include_router(login_router)

# Lineas de debugging
import uvicorn
if __name__ == "__main__":
    uvicorn.run("app.main:app")