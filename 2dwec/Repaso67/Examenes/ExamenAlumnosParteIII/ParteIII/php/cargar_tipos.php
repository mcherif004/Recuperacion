<?php
$conexion = new mysqli("localhost", "root", "", "super_mario");

if ($conexion->connect_error) {
    die(json_encode(["error" => "Error de conexión: " . $conexion->connect_error]));
}

$sql = "SELECT DISTINCT tipo FROM personaje"; // Asegúrate de que la tabla se llame "personajes"
$result = $conexion->query($sql);

$tipos = [];
while ($row = $result->fetch_assoc()) {
    $tipos[] = $row;
}

echo json_encode($tipos);
?>
