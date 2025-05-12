-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-05-2025 a las 13:22:02
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `maria`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumnos`
--

CREATE TABLE `alumnos` (
  `idAlumno` int(3) NOT NULL,
  `alumno` varchar(30) NOT NULL,
  `puntuacion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `alumnos`
--

INSERT INTO `alumnos` (`idAlumno`, `alumno`, `puntuacion`) VALUES
(1, 'maaaa', 2),
(2, 'Camencita', 1),
(3, 'Dani', 150),
(4, 'Gloria', 200),
(5, 'Azahara', 95),
(7, 'Menchu', 110),
(8, 'Juan', 120),
(9, 'Alejandro', 140),
(10, 'Rocio', 200),
(11, 'Gonzalo', 250),
(12, 'Martin', 100),
(13, 'Ivan', 80),
(14, 'Sara', 140),
(15, 'Paula', 150),
(17, 'JAvi', 1),
(18, 'Pepe', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `direccion`
--

CREATE TABLE `direccion` (
  `idDireccion` int(3) NOT NULL,
  `idAlumno` int(3) NOT NULL,
  `calle` varchar(100) NOT NULL,
  `ciudad` varchar(50) NOT NULL,
  `codigo_postal` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `direccion`
--

INSERT INTO `direccion` (`idDireccion`, `idAlumno`, `calle`, `ciudad`, `codigo_postal`) VALUES
(1, 1, 'Calle Mayor 12', 'Madrid', '28001'),
(2, 2, 'Avenida de la Paz 5', 'Barcelona', '08002'),
(3, 3, 'Plaza España 3', 'Sevilla', '41013'),
(4, 4, 'Calle del Sol 22', 'Valencia', '46005'),
(5, 5, 'Paseo Marítimo 45', 'Málaga', '29016'),
(7, 7, 'Calle Serrano 8', 'Madrid', '28006'),
(8, 8, 'Rambla Cataluña 25', 'Barcelona', '08007'),
(9, 9, 'Calle Feria 12', 'Sevilla', '41002'),
(10, 10, 'Avenida Constitución 30', 'Granada', '18001'),
(11, 11, 'Calle San Juan 9', 'Zaragoza', '50001'),
(12, 12, 'Paseo Independencia 14', 'Zaragoza', '50002'),
(13, 13, 'Calle Larios 20', 'Málaga', '29005'),
(14, 14, 'Calle Colon 15', 'Valencia', '46004'),
(15, 15, 'Calle San Vicente 28', 'Bilbao', '48001');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alumnos`
--
ALTER TABLE `alumnos`
  ADD PRIMARY KEY (`idAlumno`);

--
-- Indices de la tabla `direccion`
--
ALTER TABLE `direccion`
  ADD PRIMARY KEY (`idDireccion`),
  ADD KEY `idAlumno` (`idAlumno`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `alumnos`
--
ALTER TABLE `alumnos`
  MODIFY `idAlumno` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `direccion`
--
ALTER TABLE `direccion`
  MODIFY `idDireccion` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `direccion`
--
ALTER TABLE `direccion`
  ADD CONSTRAINT `direccion_ibfk_1` FOREIGN KEY (`idAlumno`) REFERENCES `alumnos` (`idAlumno`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
