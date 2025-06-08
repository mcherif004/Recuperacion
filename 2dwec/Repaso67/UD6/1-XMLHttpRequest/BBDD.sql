CREATE DATABASE IF NOT EXISTS `maria` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `maria`;
CREATE TABLE IF NOT EXISTS `alumnos`( `idAlumno` int(3) NOT NULL, `alumno` varchar(30) NOT NULL, `puntuacion` int(11) NOT NULL ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
ALTER TABLE `alumnos` ADD PRIMARY KEY (`idAlumno`);
ALTER TABLE `alumnos` MODIFY `idAlumno` int(3) NOT NULL AUTO_INCREMENT;
INSERT INTO `alumnos` (idAlumno,alumno,puntuacion) VALUES (1,"Maria",140), (2,"Carmen",230), (3,"Dani",150), (4,"Gloria",180), (5,"Azahara",95), (6,"Antonio",100), (7,"Menchu",110), (8,"Juan",120), (9,"Alejandro",140), (10,"Rocio",200), (11,"Gonzalo",250), (12,"Martin",100), (13,"Ivan",80), (14,"Sara",140), (15,"Paula",150);

CREATE TABLE IF NOT EXISTS `direccion` (
    `idDireccion` int(3) NOT NULL AUTO_INCREMENT,
    `idAlumno` int(3) NOT NULL,
    `calle` varchar(100) NOT NULL,
    `ciudad` varchar(50) NOT NULL,
    `codigo_postal` varchar(10) NOT NULL,
    PRIMARY KEY (`idDireccion`),
    FOREIGN KEY (`idAlumno`) REFERENCES `alumnos`(`idAlumno`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Insertar direcciones asociadas a los alumnos
INSERT INTO `direccion` (idAlumno, calle, ciudad, codigo_postal) VALUES
(1, "Calle Mayor 12", "Madrid", "28001"),
(2, "Avenida de la Paz 5", "Barcelona", "08002"),
(3, "Plaza España 3", "Sevilla", "41013"),
(4, "Calle del Sol 22", "Valencia", "46005"),
(5, "Paseo Marítimo 45", "Málaga", "29016"),
(6, "Gran Vía 10", "Madrid", "28013"),
(7, "Calle Serrano 8", "Madrid", "28006"),
(8, "Rambla Cataluña 25", "Barcelona", "08007"),
(9, "Calle Feria 12", "Sevilla", "41002"),
(10, "Avenida Constitución 30", "Granada", "18001"),
(11, "Calle San Juan 9", "Zaragoza", "50001"),
(12, "Paseo Independencia 14", "Zaragoza", "50002"),
(13, "Calle Larios 20", "Málaga", "29005"),
(14, "Calle Colon 15", "Valencia", "46004"),
(15, "Calle San Vicente 28", "Bilbao", "48001");
