# Backend para la Aplicación de Gestión de Tareas

## Descripción

Este es el backend para la aplicación de gestión de tareas, desarrollado como parte de una prueba técnica para un puesto de Desarrollador Junior. Este backend proporciona una API RESTful para la gestión de tareas, autenticación de usuarios y más.

## Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución para JavaScript en el servidor.
- **Express**: Framework para construir la API.
- **Prisma**: ORM para interactuar con la base de datos.
- **SQLite**: Base de datos relacional ligera.
- **bcryptjs**: Para el hash de contraseñas.
- **jsonwebtoken**: Para la autenticación basada en tokens.
- **dotenv**: Para manejar variables de entorno.

## Dependencias

Las dependencias del proyecto están definidas en el archivo `package.json`:

- `@prisma/client`: Cliente de Prisma para interactuar con la base de datos.
- `bcryptjs`: Para encriptar contraseñas.
- `body-parser`: Middleware para analizar el cuerpo de las solicitudes.
- `cookie-parser`: Middleware para analizar cookies.
- `cors`: Middleware para habilitar CORS.
- `dotenv`: Para manejar variables de entorno.
- `express`: Framework para el servidor.
- `express-validator`: Middleware para la validación de datos.
- `jsonwebtoken`: Para la creación y verificación de tokens JWT.
- `moment`: Para manejar fechas y horas.
- `nodemon`: Para reiniciar automáticamente el servidor durante el desarrollo.
- `prisma`: ORM para la gestión de la base de datos.

## Requisitos Previos

- Node.js (v18 o superior)
- npm (v6 o superior) o yarn

## Instrucciones para Ejecutar el Proyecto

1. **Clonar el Repositorio**

   ```sh
   git clone https://github.com/AncizarTorres19/task-manager-app-backend.git
   cd task-manager-backend

2. **Instalar Dependencias**

   ```sh
    npm install
    # o
    yarn install

3. **Configurar Prisma Inicializar Prisma y la base de datos**

   ```sh
    npx prisma migrate dev --name init


4. **Crear el Archivo `.env`**

Debes crear un archivo `.env` en la raíz del proyecto. Un archivo de ejemplo `.env.example` está disponible en el repositorio. El contenido del archivo `.env` debe ser similar a:

    DATABASE_URL="sqlite:./dev.db"
    JWT_SECRET="your-secret-key"

5. **Ejecutar el Proyecto**
   ```sh
    npm run dev
    # o
    yarn dev

6. **Acceder a la API**

La API estará disponible en http://localhost:3001. Puedes utilizar herramientas como Postman para probar los diferentes endpoints.