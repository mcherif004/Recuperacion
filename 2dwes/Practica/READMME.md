# 📦 Proyecto: Gestión de Protectora de Animales

Aplicación web para la gestión de una protectora de animales. Permite administrar información de los animales en adopción, gestionar usuarios con distintos roles y realizar solicitudes de adopción mediante una interfaz protegida y segura.

---

## 📑 Descripción de Roles de Usuario

Existen tres tipos de usuarios en la aplicación:

- **Administrador**
  - Gestión completa del sistema.
  - CRUD de animales, usuarios y trabajadores.
  - Acceso a todas las rutas protegidas.

- **Trabajador**
  - Gestión de animales en adopción.
  - Puede crear, editar y eliminar información de animales.
  - Sin permisos sobre usuarios ni trabajadores.

- **Adoptante**
  - Puede registrarse e iniciar sesión.
  - Consultar listado de animales disponibles.
  - Enviar solicitudes de adopción.
  - Sin permisos de edición sobre el sistema.

---

## 📂 Tecnologías y Dependencias

- PHP 8.x
- Composer
- Eloquent ORM
- Twig
- Apache + MySQL
- API pública de mascotas (para consultas externas)

---

## 📦 Creación de la Base de Datos

Crear una base de datos llamada `protectora_animales` y ejecutar el siguiente script:

```sql
CREATE DATABASE protectora_animales CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE protectora_animales;

CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  rol ENUM('administrador', 'trabajador', 'adoptante') NOT NULL
);

CREATE TABLE animals (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(100),
  raza VARCHAR(100),
  edad INT,
  descripcion TEXT,
  estado ENUM('disponible', 'adoptado', 'en tratamiento'),
  imagen VARCHAR(255)
);

CREATE TABLE adoption_requests (
  id INT PRIMARY KEY AUTO_INCREMENT,
  id_adoptante INT,
  id_animal INT,
  fecha_solicitud DATETIME,
  estado ENUM('pendiente', 'aceptada', 'rechazada'),
  FOREIGN KEY (id_adoptante) REFERENCES users(id),
  FOREIGN KEY (id_animal) REFERENCES animals(id)
);
```