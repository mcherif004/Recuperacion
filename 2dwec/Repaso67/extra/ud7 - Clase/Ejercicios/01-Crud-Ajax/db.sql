-- Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS ejemploCrud_JQUERY;
USE ejemploCrud_JQUERY;

-- Crear la tabla contacts
CREATE TABLE contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,  -- En MySQL se usa AUTO_INCREMENT para la clave primaria
    firstname VARCHAR(255) NOT NULL,    -- Se debe definir el tamaño del VARCHAR
    lastname VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE           -- UNIQUE para evitar correos duplicados
);

-- Crear un índice único en la columna email (opcional, ya está incluido con UNIQUE)
CREATE UNIQUE INDEX contacts_email_uindex ON contacts (email);

-- Insertar datos en la tabla
INSERT INTO contacts (firstname, lastname, email) VALUES
('Juan', 'Pérez', 'juan.perez@example.com'),
('María', 'Ojeda', 'maria.ojeda@example.com'),
('Carlos', 'Gómez', 'carlos.gomez@example.com'),
('Ana', 'Rodríguez', 'ana.rodriguez@example.com'),
('Pedro', 'Fernández', 'pedro.fernandez@example.com'),
('Laura', 'Martínez', 'laura.martinez@example.com'),
('David', 'Sánchez', 'david.sanchez@example.com'),
('Elena', 'García', 'elena.garcia@example.com'),
('Luis', 'Torres', 'luis.torres@example.com'),
('Paula', 'Ramírez', 'paula.ramirez@example.com');
