<?php
// Mostrar errores en PHP para depuración
error_reporting(E_ALL);
ini_set('display_errors', 1);

$conexion = new mysqli("localhost", "root", "", "super_mario");

if ($conexion->connect_error) {
    die(json_encode(["error" => "Error de conexión: " . $conexion->connect_error]));
}

// Ejecutar consulta
$resultado = $conexion->query("SELECT * FROM aventura");

// Si no hay resultados, devolver un array vacío
if ($resultado->num_rows === 0) {
    echo json_encode([]);
    exit;
}

// Convertir resultados en array
$aventuras = [];
while ($fila = $resultado->fetch_assoc()) {
    $aventuras[] = $fila;
}

// Asegurar que la respuesta es JSON puro
header('Content-Type: application/json');
echo json_encode($aventuras);
$conexion->close();
?>
