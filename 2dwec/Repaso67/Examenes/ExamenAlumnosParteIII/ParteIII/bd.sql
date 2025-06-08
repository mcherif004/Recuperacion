CREATE DATABASE IF NOT EXISTS super_mario;
USE super_mario;

-- Tabla de Personajes (Héroes y Enemigos)
CREATE TABLE personaje (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    tipo ENUM('heroe', 'enemigo') NOT NULL,
    imagen VARCHAR(255) NOT NULL
);

-- Insertar personajes iniciales
INSERT INTO personaje (nombre, tipo, imagen) VALUES
('Mario', 'heroe', 'img/mario.webp'),
('Luigi', 'heroe', 'img/luigi.webp'),
('Peach', 'heroe', 'img/peach.webp'),
('Toad', 'heroe', 'img/toad.png'),
('Bowser', 'enemigo', 'img/bowser.webp'),
('Goomba', 'enemigo', 'img/goomba.webp');

-- Tabla de Aventuras (Ahora con campos específicos para cada héroe)
CREATE TABLE aventura (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombreMundo VARCHAR(100) NOT NULL,
    heroe1 VARCHAR(50) NOT NULL,
    heroe2 VARCHAR(50) NOT NULL,
    enemigo VARCHAR(50) NOT NULL,
    FOREIGN KEY (heroe1) REFERENCES personaje(nombre) ON DELETE CASCADE,
    FOREIGN KEY (heroe2) REFERENCES personaje(nombre) ON DELETE CASCADE,
    FOREIGN KEY (enemigo) REFERENCES personaje(nombre) ON DELETE CASCADE
);
