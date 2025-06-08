<?php
include 'db.php';

$sql = "SELECT id, nombre, planeta, imagen FROM personajes";
$result = $conn->query($sql);

$personajes = [];
while ($row = $result->fetch_assoc()) {
    $personajes[] = $row;
}

echo json_encode($personajes);
$conn->close();
?>
