CREATE DATABASE torneo_saiyan;
USE torneo_saiyan;

-- Tabla de personajes
CREATE TABLE personajes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) UNIQUE NOT NULL,
    planeta VARCHAR(50) NOT NULL,
    imagen VARCHAR(255) NOT NULL,
    victorias INT DEFAULT 0
);

-- Tabla de combates
CREATE TABLE combates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    personaje1 INT,
    personaje2 INT,
    resultado VARCHAR(50), -- 'Gana Personaje1', 'Gana Personaje2' o 'Empate'
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (personaje1) REFERENCES personajes(id),
    FOREIGN KEY (personaje2) REFERENCES personajes(id)
);
INSERT INTO personajes (nombre, planeta, imagen) VALUES
('Goku', 'Planeta Vegeta', 'goku.webp'),
('Bulma', 'Planeta Tierra', 'bulma.webp'),
('Vegeta', 'Planeta Vegeta', 'vegeta.webp'),
('Piccolo', 'Namek', 'piccolo.webp'),
('Krillin', 'Planeta Tierra', 'krillin.webp'),
('Freezer', 'Desconocido', 'freezer.webp'),
('Maestro Mutenroshi', 'Planeta Tierra', 'mutenroshi.webp'),
('Cell', 'Planeta Tierra', 'cell.webp'),
('Trunks', 'Planeta Tierra', 'trunks.webp'),
('Buu', 'Desconocido', 'buu.webp'),
('Android 18', 'Planeta Tierra', 'android18.webp'),
('Shen Long', 'Desconocido', 'dragon.webp');