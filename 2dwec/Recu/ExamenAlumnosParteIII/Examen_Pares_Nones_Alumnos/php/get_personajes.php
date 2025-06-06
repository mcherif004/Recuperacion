<?php
include("db.php");

$personajes = array();

if (isset($_GET["pais_id"])) {
    $pais_id = intval($_GET["pais_id"]);
    $sql = "SELECT * FROM personajes WHERE pais_id = $pais_id";
} else {
    $sql = "SELECT * FROM personajes"; // DEVUELVE TODOS si no se pasa pais_id
}

$resultado = $conn->query($sql);

while ($fila = $resultado->fetch_assoc()) {
    $personajes[] = $fila;
}

echo json_encode($personajes);
?>
