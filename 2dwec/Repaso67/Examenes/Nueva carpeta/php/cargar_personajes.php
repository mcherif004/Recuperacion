<?php
$conexion = new mysqli("localhost", "root", "", "super_mario");

if ($conexion->connect_error) {
    die(json_encode(["error" => "Error de conexión: " . $conexion->connect_error]));
}

if (!isset($_GET['tipo'])) {
    echo json_encode([]);
    exit;
}

$tipo = $_GET['tipo'];

$sql = "SELECT nombre FROM personaje WHERE tipo = ?";
$stmt = $conexion->prepare($sql); // Usamos $conexion en lugar de $conn
$stmt->bind_param("s", $tipo);
$stmt->execute();
$result = $stmt->get_result();

$personajes = [];
while ($row = $result->fetch_assoc()) {
    $personajes[] = $row;
}

echo json_encode($personajes);
?>
