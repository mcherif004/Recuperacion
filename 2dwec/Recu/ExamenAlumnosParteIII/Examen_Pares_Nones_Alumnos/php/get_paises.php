<?php
include("db.php");

$sql = "SELECT * FROM paises";
$resultado = $conn->query($sql);

$paises = array();
while ($fila = $resultado->fetch_assoc()) {
    $paises[] = $fila;
}

echo json_encode($paises);
?>
