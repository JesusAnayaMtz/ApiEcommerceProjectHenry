# [Ecommerce Proyecto Curso Henry Modulo 4]

## 📖 Descripción

El proyecto es sobre un ecommerce basico el cual puedes registrarse y poder realizar la creacion de ordenes.
Asi como la creacion de productos nuevos, consultar el listado de los productos.
Tambien podemos consultar usuarios y podemos modificalos esto lo hace el usuario que sea administrador.

---

## ✨ Características

*  **Funcionalidad Users:** Registro de usuario y login de usuario, Consultar, Editar, Eliminar Usuarios
*  **Funcionalidad Products:** Consulta, Creacion, Edicion y Eliminacion de productos.
*  **Funcionalidad Ordenes:** Creacion y Consulta de ordenes.
*  **Funcionalidad Categorias:** Consulta de Categorias.
*  **Funcionalidad Upload Files:** Subida de imagen del producto a cloudinary

---

## 🛠️ Tecnologías Utilizadas

* **Backend:** NestJS, JWT, Swagger, Cloudinary, Bcrypt.
* **Base de Datos:** PostgreSQL.
* **Despliegue:** Docker, Render
* **Otras herramientas:** Prettier, ESLint.

---

## 🏁 Cómo Empezar

Sigue estos pasos para tener una copia del proyecto funcionando localmente.

### **Pre-requisitos**

Asegúrate de tener instaladas las siguientes herramientas:
* [Node.js](https://nodejs.org/)
* [npm](https://www.npmjs.com/).
* [Docker](https://www.docker.com/)
* [Docker Hub](https://hub.docker.com/) En caso de querer desplegar en algun servidor web.


### **Instalación**

1.  **Clona el repositorio:**
    ```bash
    git clone (https://github.com/pi-rym/PM4BE-JesusAnayaMtz.git)
    ```

2.  **Navega al directorio del proyecto:**
    ```bash
    cd back
    cd ecommerce-jesus-anaya-mtz
    ```

3.  **Instala las dependencias:**
    ```bash
    npm install

    ```

4.  **Configura las variables de entorno:**
    Crea un archivo `.env` en la raíz del proyecto y añade las siguientes variables     
    ```bash
    DB_NAME=exampledb
    DB_HOST=localhost
    DB_PORT=5432
    DB_USERNAME=example
    DB_PASSWORD=example12

    CLOUDINARY_CLOUD_NAME=example
    CLOUDINARY_API_SECRET=example
    CLOUDINARY_API_KEY=253633233233

    JWT_SECRET=example123

    POSTGRES_DB=exambledb
    POSTGRES_USER=example
    POSTGRES_PASSWORD=example12
    ```
5.  **Ejecuta el proyecto:**
    ```bash
    npm run start
    # o para modo de desarrollo
    # npm run start:dev
    ```

---

## 🕹️ Uso

Una vez que el proyecto esté corriendo, puedes acceder a él en `http://localhost:3000/`.

**Ejemplo de uso de endpoints:**
leer documentacion ahi esta detallado el uso de la api
Se uso Swagger para realizar la documentacion lo mas detallada posible.

[localhost:3000/api](http://localhost:3000/api)

---

## 📧 Contacto

**[Jesus Anaya]** - [@linkedin](https://linkedin.com/in/jesusanaya2022) - j.mtz201289@gmail.com

**Link del Proyecto Desplegado:** [https://ecommercenesthenry-latest.onrender.com/](https://ecommercenesthenry-latest.onrender.com/)