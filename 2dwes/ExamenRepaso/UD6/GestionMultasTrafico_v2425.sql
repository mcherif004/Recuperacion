-- phpMyAdmin SQL Dump
-- version 5.1.1deb5ubuntu1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Mar 08, 2023 at 10:40 PM
-- Server version: 10.8.7-MariaDB-1:10.8.7+maria~ubu2204
-- PHP Version: 8.0.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ex_gestion_multas_2223`
--

-- --------------------------------------------------------

--
-- Table structure for table `multas`
--

CREATE TABLE `multas` (
  `id` int(11) NOT NULL,
  `id_agente` int(11) NOT NULL,
  `id_conductor` int(11) NOT NULL,
  `matricula` varchar(10) NOT NULL,
  `id_tipo_sanciones` int(11) NOT NULL,
  `descripcion` varchar(256) NOT NULL,
  `fecha` date NOT NULL,
  `importe` int(11) NOT NULL,
  `descuento` int(11) NOT NULL,
  `estado` enum('Pendiente','Pagada') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `perfiles`
--

CREATE TABLE `perfiles` (
  `perfil` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

--
-- Dumping data for table `perfiles`
--

INSERT INTO `perfiles` (`perfil`) VALUES
('admin'),
('agente'),
('conductor');

-- --------------------------------------------------------

--
-- Table structure for table `tipo_sanciones`
--

CREATE TABLE `tipo_sanciones` (
  `id` int(11) NOT NULL,
  `tipo` varchar(10) NOT NULL,
  `importe` int(11) NOT NULL,
  `puntos` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

--
-- Dumping data for table `tipo_sanciones`
--

INSERT INTO `tipo_sanciones` (`id`, `tipo`, `importe`, `puntos`) VALUES
(1, 'Leve', 100, 4),
(2, 'Grave', 200, 6),
(3, 'Muy grave', 500, 8);

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `usuario` varchar(10) NOT NULL,
  `password` varchar(128) NOT NULL,
  `nombre` varchar(256) NOT NULL,
  `perfil` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`id`, `usuario`, `password`, `nombre`, `perfil`) VALUES
(1, 'admin', 'admin', 'Administrador', 'admin'),
(2, 'agente1', 'agente1', 'Agente 001', 'agente'),
(3, 'agente2', 'agente2', 'Agente 002', 'agente'),
(4, 'mafalda', 'mafalda', 'conductor1Mafalda Quino', 'conductor');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `multas`
--
ALTER TABLE `multas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_agentes` (`id_agente`),
  ADD KEY `fk_conductores` (`id_conductor`),
  ADD KEY `fk_tiposancion` (`id_tipo_sanciones`);

--
-- Indexes for table `perfiles`
--
ALTER TABLE `perfiles`
  ADD PRIMARY KEY (`perfil`);

--
-- Indexes for table `tipo_sanciones`
--
ALTER TABLE `tipo_sanciones`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `usuario` (`usuario`),
  ADD KEY `fk_perfiles` (`perfil`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `multas`
--
ALTER TABLE `multas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tipo_sanciones`
--
ALTER TABLE `tipo_sanciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `multas`
--
ALTER TABLE `multas`
  ADD CONSTRAINT `fk_agentes` FOREIGN KEY (`id_agente`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `fk_conductores` FOREIGN KEY (`id_conductor`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `fk_tiposancion` FOREIGN KEY (`id_tipo_sanciones`) REFERENCES `tipo_sanciones` (`id`);

--
-- Constraints for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `fk_perfiles` FOREIGN KEY (`perfil`) REFERENCES `perfiles` (`perfil`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
