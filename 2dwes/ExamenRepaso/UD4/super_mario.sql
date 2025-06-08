-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-06-2025 a las 13:21:19
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
-- Base de datos: `super_mario`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `aventur`
--

CREATE TABLE `aventur` (
  `id` int(11) NOT NULL,
  `nombreMundo` varchar(100) NOT NULL,
  `heroe1` varchar(50) NOT NULL,
  `heroe2` varchar(50) NOT NULL,
  `enemigo` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personaj`
--

CREATE TABLE `personaj` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `tipo` enum('heroe','enemigo') NOT NULL,
  `imagen` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `personaj`
--

INSERT INTO `personaj` (`id`, `nombre`, `tipo`, `imagen`) VALUES
(1, 'Mario', 'heroe', 'img/mario.webp'),
(2, 'Luigi', 'heroe', 'img/luigi.webp'),
(3, 'Peach', 'heroe', 'img/peach.webp'),
(4, 'Toad', 'heroe', 'img/toad.png'),
(5, 'Bowser', 'enemigo', 'img/bowser.webp'),
(6, 'Goomba', 'enemigo', 'img/goomba.webp');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `aventur`
--
ALTER TABLE `aventur`
  ADD PRIMARY KEY (`id`),
  ADD KEY `heroe1` (`heroe1`),
  ADD KEY `heroe2` (`heroe2`),
  ADD KEY `enemigo` (`enemigo`);

--
-- Indices de la tabla `personaj`
--
ALTER TABLE `personaj`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `aventur`
--
ALTER TABLE `aventur`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `personaj`
--
ALTER TABLE `personaj`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `aventur`
--
ALTER TABLE `aventur`
  ADD CONSTRAINT `aventur_ibfk_1` FOREIGN KEY (`heroe1`) REFERENCES `personaj` (`nombre`) ON DELETE CASCADE,
  ADD CONSTRAINT `aventur_ibfk_2` FOREIGN KEY (`heroe2`) REFERENCES `personaj` (`nombre`) ON DELETE CASCADE,
  ADD CONSTRAINT `aventur_ibfk_3` FOREIGN KEY (`enemigo`) REFERENCES `personaj` (`nombre`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
