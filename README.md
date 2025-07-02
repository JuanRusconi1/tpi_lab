Pasos para iniciar los proyectos
Tener en cuenta que necesitamos 2 terminales o ventanas de visual studio para poder levantar el backend y el frontend
Backend
abrir en visual studio el proyecto y por consola ingresar a la carpeta de backend. crear el entorno virtual con: python -m venv venv. 
Activar el entorno virtual ingresando en la terminal venv/Scripts/activate, luego correr el comando: pip install -r ./app/requirements.txt, para instalar dependencias del proyecto.
Crear la base de datos ej:'venia', actualizar el archivo dentro de ./app/config/database.py con los nombres y credenciales donde creamos la BD.
Por ultimo escribimos por consola 'uvicorn app.main:app' para poder levantar la api. luego dar de alta un usuario en la bd, con el rol de 'Administrador'. 

Frontend
Antes de comenzar necesitamos tener instalados node.js y npm
abrir el proyecto en visual studio y abrir una terminal, escribir en la terminal 'cd frontend', una vez dentro de la carpeta crear un archivo .env.local, dentro del archivo de entorno definir
APIURL='' (url de nuestra api ej: http://localhost:8000/api/v1)
SECRET_KEY='' (una sucesion de caracteres que nos sirve para nuestra secret key de jwt)
luego de crear nuestro archivo, en la consola ingresamos 'npm install' para instalar las dependencias del proyecto, luego ingresar por terminal 'npm run dev' y ingresar a la url que indica
ej de url de frontend (http://localhost:3000/) next por defecto inicia el desarrollo en el puerto 3000 en el caso de estar ocupado suma de a 1 hasta encontrar un puerto libre.
