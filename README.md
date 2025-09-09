# SteamPlus 🎮

SteamPlus es una plataforma de comercio electrónico inspirada en Steam, diseñada para la compra y venta de videojuegos. Este proyecto demuestra el uso de tecnologías web modernas para crear una experiencia de usuario fluida y reactiva.

## ✨ Características Principales

-   **Catálogo de Juegos**: Visualiza una lista completa de juegos disponibles con imágenes, precios y descripciones.
-   **Página de Detalle**: Cada juego tiene su propia página con información detallada, incluyendo descripción, stock y precio.
-   **Simulación de Compra**: Los usuarios (previamente registrados) pueden simular la compra de juegos.
-   **Interfaz Moderna**: Diseño atractivo y responsivo construido con Tailwind CSS, inspirado en la estética de las plataformas de videojuegos.
-   **Backend Robusto**: API RESTful para gestionar juegos, usuarios y pedidos, conectada a una base de datos PostgreSQL.

## 🚀 Tecnologías Utilizadas

-   **Frontend**:
    -   [Next.js](https://nextjs.org/) - Framework de React para renderizado en el servidor y generación de sitios estáticos.
    -   [React](https://reactjs.org/) - Biblioteca para construir interfaces de usuario.
    -   [Tailwind CSS](https://tailwindcss.com/) - Framework de CSS para un diseño rápido y personalizable.
-   **Backend**:
    -   [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction) - Para la creación de los endpoints de la API.
    -   [PostgreSQL](https://www.postgresql.org/) - Sistema de gestión de bases de datos relacional.
    -   `node-postgres` (pg) - Cliente de PostgreSQL para Node.js.

## 🛠️ Instalación y Puesta en Marcha

Sigue estos pasos para configurar el proyecto en tu entorno local.

### Prerrequisitos

-   Node.js (v18 o superior)
-   npm, yarn o pnpm
-   Una instancia de PostgreSQL en ejecución.

### Pasos

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/tu-usuario/SteamPlus.git
    cd SteamPlus
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    # o
    yarn install
    # o
    pnpm install
    ```

3.  **Configurar las variables de entorno:**
    Crea un archivo `.env.local` en la raíz del proyecto y añade la cadena de conexión a tu base de datos:
    ```env
    DATABASE_URL="postgresql://USUARIO:CONTRASEÑA@HOST:PUERTO/NOMBRE_DB"
    ```

4.  **Ejecutar las migraciones de la base de datos:**
    (Opcional: si tienes un script para ello) Importa el archivo `schema.sql` en tu base de datos para crear las tablas necesarias.

5.  **Iniciar el servidor de desarrollo:**
    ```bash
    npm run dev
    ```

    Abre http://localhost:3000 en tu navegador para ver la aplicación.

## 📁 Estructura del Proyecto (Simplificada)

