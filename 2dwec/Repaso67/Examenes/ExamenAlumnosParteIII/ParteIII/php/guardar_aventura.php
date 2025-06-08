<?php
// Habilitar errores para depuración
error_reporting(E_ALL);
ini_set('display_errors', 1);

$conexion = new mysqli("localhost", "root", "", "super_mario");

if ($conexion->connect_error) {
    die(json_encode(["error" => "Error de conexión: " . $conexion->connect_error]));
}

// Recibir los datos del formulario
$nombreMundo = $_POST['nombreMundo'] ?? '';
$heroe1 = $_POST['heroe1'] ?? '';
$heroe2 = $_POST['heroe2'] ?? '';
$enemigo = $_POST['enemigo'] ?? '';

// Validaciones básicas
if (strlen($nombreMundo) < 5 || empty($heroe1) || empty($heroe2) || empty($enemigo)) {
    die(json_encode(["error" => "Datos inválidos."]));
}

// Insertar en la base de datos
$sql = "INSERT INTO aventura (nombreMundo, heroe1, heroe2, enemigo) VALUES (?, ?, ?, ?)";
$stmt = $conexion->prepare($sql);
$stmt->bind_param("ssss", $nombreMundo, $heroe1, $heroe2, $enemigo);

if ($stmt->execute()) {
    echo json_encode(["success" => "Aventura guardada correctamente"]);
} else {
    echo json_encode(["error" => "Error al guardar la aventura: " . $stmt->error]);
}

$stmt->close();
$conexion->close();
?>
