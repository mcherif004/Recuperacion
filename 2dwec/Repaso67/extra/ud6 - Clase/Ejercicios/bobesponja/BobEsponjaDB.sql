
CREATE DATABASE IF NOT EXISTS BobEsponjaDB;
USE BobEsponjaDB;

-- Tabla de Residencias
CREATE TABLE IF NOT EXISTS residencias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    direccion VARCHAR(150),
    tipo_residencia ENUM('Casa', 'Restaurante', 'Barco', 'Otro') NOT NULL
);

-- Tabla de Personajes
CREATE TABLE IF NOT EXISTS personajes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    ocupacion VARCHAR(100),
    tipo ENUM('Esponja', 'Estrella de Mar', 'Cangrejo', 'Calamar', 'Plankton', 'Otro') NOT NULL,
    puntuacion_popularidad INT CHECK (puntuacion_popularidad BETWEEN 0 AND 100),
    habilidad_especial VARCHAR(150),
    id_residencia INT,
    FOREIGN KEY (id_residencia) REFERENCES residencias(id) ON DELETE SET NULL
);

-- Insertar residencias
INSERT INTO residencias (nombre, direccion, tipo_residencia) VALUES
('Piña debajo del mar', 'Calle Concha 1', 'Casa'),
('Roca', 'Calle Concha 2', 'Casa'),
('Casa de Calamardo', 'Calle Concha 3', 'Casa'),
('El Crustáceo Crujiente', 'Avenida Coral 1', 'Restaurante'),
('Cubeta Rancia', 'Avenida Plankton 2', 'Restaurante');

-- Insertar personajes
INSERT INTO personajes (nombre, ocupacion, tipo, puntuacion_popularidad, habilidad_especial, id_residencia) VALUES
('Bob Esponja', 'Cocinero en Crustáceo Crujiente', 'Esponja', 95, 'Hacer hamburguesas perfectas', 1),
('Patricio Estrella', 'Desempleado', 'Estrella de Mar', 70, 'Dormir todo el día', 2),
('Calamardo Tentáculos', 'Cajero en Crustáceo Crujiente', 'Calamar', 60, 'Tocar el clarinete', 3),
('Don Cangrejo', 'Dueño del Crustáceo Crujiente', 'Cangrejo', 80, 'Avaricia extrema', 4),
('Plankton', 'Dueño del Cubeta Rancia', 'Plankton', 50, 'Genio del mal', 5);
