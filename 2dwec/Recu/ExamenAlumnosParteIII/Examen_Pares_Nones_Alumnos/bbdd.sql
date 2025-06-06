-- Base de datos para el juego Pares o Nones - Street Fighter
CREATE DATABASE IF NOT EXISTS street_fighter;
USE street_fighter;

DROP TABLE IF EXISTS combates;
DROP TABLE IF EXISTS personajes;
DROP TABLE IF EXISTS paises;

CREATE TABLE paises (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

CREATE TABLE personajes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    pais_id INT,
    imagen VARCHAR(100),
    FOREIGN KEY (pais_id) REFERENCES paises(id)
);

CREATE TABLE combates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    jugador VARCHAR(50),
    oponente VARCHAR(50),
    ganador VARCHAR(50),
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insertar países
INSERT INTO paises (nombre) VALUES ('Japón'), ('EE.UU.'), ('Brasil'), ('China');

-- Insertar personajes
INSERT INTO personajes (nombre, pais_id, imagen) VALUES 
('Ryu', 1, 'ryu.png'),
('E. Honda', 1, 'ehonda.png'),
('Ken', 2, 'ken.png'),
('Guile', 2, 'guile.png'),
('Blanka', 3, 'blanka.png'),
('Chun-Li', 4, 'chunli.png');
