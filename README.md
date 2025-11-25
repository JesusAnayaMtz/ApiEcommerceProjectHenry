# 🛒 Ecommerce API – NestJS + TypeORM + PostgreSQL

API REST completa para un sistema de Ecommerce, desarrollada con **NestJS**, **TypeORM** y **PostgreSQL**, implementando autenticación JWT, manejo avanzado de roles, carga de imágenes con Cloudinary, control de pedidos, categorías, usuarios y productos.

Este proyecto fue desarrollado como parte del bootcamp **Henry Full Stack Developer**.

---

## 🚀 Características principales

- 🔐 **Autenticación JWT** (login + roles)
- 👥 **Roles:** admin, user
- 👤 Gestión de usuarios (CRUD + roles)
- 🛒 Manejo de productos (alta, edición, eliminación, stock)
- 🗂️ Categorías
- 🧾 Creación de órdenes y detalle de compras
- ☁️ **Cloudinary** para subir imágenes
- 🗄️ **PostgreSQL + TypeORM**
- 🐳 **Docker & docker-compose listos para correr el proyecto**
- 📄 Seed automático de datos básicos
- 🧩 Interceptores, Guards, Middlewares y DTOs con validaciones
- 🛠️ Documentación con Swagger (opcional si la habilitas)

---

## 🧱 Arquitectura del Proyecto

src/
├── config/            # Configuración de TypeORM y Cloudinary
├── decorators/        # Decoradores personalizados (Roles)
├── file-upload/       # Módulo de carga de archivos
├── interceptors/      # Validación de payloads
├── middlewares/       # Logger de datos
├── migration/         # Migraciones de BD
├── modules/
│   ├── auth/          # Login, JWT, Guards y AuthService
│   ├── categories/    # CRUD categorías
│   ├── products/      # CRUD productos + stock + imágenes
│   ├── orders/        # Órdenes y detalle de órdenes
│   ├── users/         # CRUD usuarios + roles
│   └── utils/         # Seeder de BD
├── seeder/            # Servicio para poblar datos
├── app.module.ts
└── main.ts



---

## 📦 **Tecnologías utilizadas**

### **Backend**
- NestJS
- TypeORM
- PostgreSQL
- JWT + bcrypt

### **Storage**
- Cloudinary (imagenes de productos)

### **Infraestructura**
- Docker / Docker Compose
- Render

### **Herramientas**
- Git / GitHub  
- ESLint / Prettier  
- Interceptores / Pipes / Guards  

---

## ⚙️ **Instalación y ejecución**

### 🧩 **1. Clonar el repositorio**

- git clone https://github.com/JesusAnayaMtz/ApiEcommerceProjectHenry.git
- cd back
- cd ecommerce-jesus-anaya-mtz

### 📁 **2. Instalar dependencias**
- npm install

### 🔧 **3. Configurar variables de entorno**
- .env.development
  
- PORT=3001
- DATABASE_HOST=localhost
- DATABASE_PORT=5432
- DATABASE_USER=postgres
- DATABASE_PASSWORD=tu_password
- DATABASE_NAME=ecommerce
- CLOUDINARY_NAME=xxxx
- CLOUDINARY_API_KEY=xxxx
- CLOUDINARY_API_SECRET=xxxx
- JWT_SECRET=supersecretkey

### 🐳 **4. Levantar Base de datos con Docker**
- docker-compose up -d

### ▶️ **5. Ejecutar la aplicación**
npm run start:dev

Se cargarán:
- usuarios base
- categorías
- productos iniciales

---

### 📌 **Endpoints principales**
🔐 Auth
- POST /auth/login

### 👤 **Users**
- GET    /users
- POST   /users
- PATCH  /users/:id
- DELETE /users/:id

### 🗂️ **Categories**
- GET    /categories
- POST   /categories
- PATCH  /categories/:id
- DELETE /categories/:id

### 🛒 **Products**
GET    /products
POST   /products
PATCH  /products/:id
DELETE /products/:id

### 🧾 **Orders**
POST /orders
GET  /orders/user/:id

---
🧑‍💻 Autor

- Jesús Anaya Martínez
- Full Stack Developer
- 📧 Email: j.mtz201289@gmail.com

🔗 LinkedIn: https://www.linkedin.com/in/jesusanaya/
---

📄 Licencia

Este proyecto es de uso académico y libre con fines educativos.




