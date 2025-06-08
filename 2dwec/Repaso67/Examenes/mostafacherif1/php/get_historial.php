<?php
include 'db.php';

$sql = "SELECT c.id, p1.nombre AS personaje1, p2.nombre AS personaje2, c.resultado, c.fecha 
        FROM combates c
        JOIN personajes p1 ON c.personaje1 = p1.id
        JOIN personajes p2 ON c.personaje2 = p2.id
        ORDER BY c.fecha DESC";

$result = $conn->query($sql);
$historial = array();

while ($row = $result->fetch_assoc()) {
    $historial[] = $row;
}

echo json_encode($historial);
$conn->close();
?>
