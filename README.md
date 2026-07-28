# Chatz - Conexiones Grupales
Chatz ofrece comunicación grupal instantánea, fomentando la colaboración y conexión en comunidades, ideal para equipos y entornos grupales.

# Instalación
1. Clona el repositorio frontend con `git clone https://github.com/draquio/chat-client.git`
2. Entra en la carpeta 'client' e instala las dependencias con `npm install`
3. En el frontend crea un archivo '.env' y asigna `VITE_URL_BACKEND=http://localhost:3000`
4. Clona el repositorio con `git clone https://github.com/draquio/chat-server.git`
5. Entra en la carpeta 'server' e instala las dependencias con `npm install`
6. Copia `.env.example` a `.env` en el backend y ajusta los valores (ver más abajo)
7. Levanta el frontend y backend del proyecto con `npm run dev` para cada uno.

# Variables de entorno (backend)
Copia el archivo `.env.example` a `.env` y ajusta según tu entorno:

| Variable      | Descripción                                                        | Ejemplo                               |
|---------------|--------------------------------------------------------------------|---------------------------------------|
| `PORT`        | Puerto donde escucha el servidor                                   | `3000`                                |
| `NODE_ENV`    | Entorno de ejecución: `development` o `production`                 | `development`                         |
| `CORS_ORIGIN` | Orígenes permitidos. `*` para cualquiera, o lista separada por comas | `http://localhost:5173,https://miapp.com` |

> El script `npm run dev` carga el `.env` automáticamente con el flag nativo `--env-file`. En producción/Docker las variables se inyectan desde el entorno del contenedor.

# Docker
Construir la imagen:
```bash
docker build -t chat-server .
```

Correr el contenedor usando el `.env`:
```bash
docker run --rm -p 3000:3000 --env-file .env --name chat-server chat-server
```

Para correrlo en segundo plano usa `-d` en lugar de `--rm` y revisa los logs con `docker logs -f chat-server`.
Verifica que responde con `curl http://localhost:3000/ping` (debe devolver `on`).

# Dependencias frontend
- socket.io-client
- tailwindcss


# Dependencias backend
- cors
- express
- morgan
- socket.io


Desarrollador por [Ing. Sergio Mercado](https://draquioportfolio.vercel.app/).
<p align="center">
<img src="https://cdn0.iconfinder.com/data/icons/logos-brands-in-colors/128/react_color-256.png" alt="ReactJS" width="64" height="64"/>
<img src="https://cdn.iconscout.com/icon/free/png-512/free-nodejs-1-226034.png?f=webp&w=256" alt="NodeJs" width="64" height="64"/>
<img src="https://cdn.icon-icons.com/icons2/2389/PNG/256/socket_io_logo_icon_144874.png" alt="Socket Io" width="64" height="64"/>
<img src="https://cdn3.iconfinder.com/data/icons/teenyicons-solid-vol-3/15/tailwind-256.png" alt="Tailwind" width="64" height="64"/>
</p>