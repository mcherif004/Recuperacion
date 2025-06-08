

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

DROP SCHEMA IF EXISTS eventosGC ;

-- -----------------------------------------------------
-- 
-- -----------------------------------------------------
CREATE SCHEMA eventosGC DEFAULT CHARACTER SET utf8 ;
USE eventosGC ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

-- -----------------------------------------------------
-- Table clientes
-- -----------------------------------------------------
DROP TABLE IF EXISTS clientes ;

CREATE TABLE clientes (
  id INT NOT NULL AUTO_INCREMENT,
  nomApe VARCHAR(45) NOT NULL,
  domicilio VARCHAR(45) NOT NULL,
  telefono VARCHAR(9) NOT NULL,
  
  PRIMARY KEY (id))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table categorias
-- -----------------------------------------------------
DROP TABLE IF EXISTS categorias ;

CREATE TABLE IF NOT EXISTS categorias (
  id INT NOT NULL AUTO_INCREMENT,
  descripcion VARCHAR(45) NOT NULL,
  
  PRIMARY KEY (id))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table eventos
-- -----------------------------------------------------
DROP TABLE IF EXISTS eventos ;

CREATE TABLE IF NOT EXISTS eventos (
  id INT NOT NULL AUTO_INCREMENT,
  descripcion VARCHAR(60) NOT NULL,
  idcategoria VARCHAR(6) NOT NULL,
  entradas SMALLINT NOT NULL,
  precioEntrada DECIMAL(6,0) NOT NULL,
  PRIMARY KEY (id))  
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table compras
-- -----------------------------------------------------
DROP TABLE IF EXISTS compras ;

CREATE TABLE IF NOT EXISTS compras (
  id INT NOT NULL AUTO_INCREMENT,
  idCliente INT NOT NULL,
  idEvento INT NOT NULL,
  entradas INT NOT NULL,
  precio INT NOT NULL,
  fecha DATE NOT NULL,
  PRIMARY KEY (id))  
ENGINE = InnoDB;

 
 
INSERT INTO `clientes` (`id`, `nomApe`, `domicilio`, `telefono`) VALUES 
(1, 'Maria Pérez Contreras', 'c/El Sol','611111111'),
(2, "Pedro Leal Orestes", 'c/La luna, 7', '711222222'),
(3, "Elena Gómez Rodrigo", 'c/Las estrellas', '622223333'),
(4, "Fco Javier Maroto Iglesias", 'c/El espacio, 8', '688888888'),
(5, "Pilar Castellano Contreras", 'c/El álamo, 10', '677767676');

--
-- Volcado de datos para la tabla `categorias`
--
  
INSERT INTO categorias VALUES 
(1, 'Festivales'),
(2, 'Congresos'),
(3, 'Conciertos'),
(4, 'Actos culturales'),
(5, 'Muestras de arte'),
(6, 'Presentación de un libro');

--
-- Volcado de datos para la tabla `eventos`
--
 
INSERT INTO eventos VALUES 
(1, 'Cooltural Fest',1,30,60),
(2, 'Festival Internacional de Jazz de San Sebastián',4, 6, 30),
(3, 'Congreso Internacional de Aprendizaje',2,10, 20),
(4, 'Queen + AdamLambert', 3, 15, 55),
(5, 'Festival Internacionacional de Teatro clásico en Almagro', 4, 12, 30),
(6, 'Cabo de Palo', 1, 10, 45),
(7, 'Paul MacCartney',3, 2, 601),
(8, 'Casas Vacias, de Brenda Navarro', 6, 20, 5),
(9, 'Viña Rock', 1, 5, 57),
(10, 'Alejandro Sanz', 3, 10, 47),
(11, 'Congreso Internacional sobre la Imagen',2, 10, 210),
(12, 'Las señoras de la fres, de Chadia Arab', 6, 15, 10),
(13, 'Boulder, de Eva Baltasar', 6, 7, 4),
(14, 'Bibao BBK Live', 4, 6, 75),
(15, 'Congreso Internacional sobre sostenibilidad medioambiental',2, 5, 100),
(16, 'Obras Maestras dela colección del museo Guggenheim',5, 105, 14),
(17, 'El otro tesoro. Los estuches del tesoro del Delfín',5, 30, 34);

