<?php
$conexion = new mysqli("localhost", "root", "", "super_mario");
$id = $_POST['id'];
$conexion->query("DELETE FROM aventura WHERE id = $id");
$conexion->close();
?>
