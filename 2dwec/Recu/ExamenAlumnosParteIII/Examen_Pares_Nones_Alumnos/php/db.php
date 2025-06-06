<?php
$host = "localhost";
$user = "root"; // Cambia si es necesario
$password = ""; // Cambia si es necesario
$dbname = "street_fighter";

$conn = new mysqli($host, $user, $password, $dbname);
if ($conn->connect_error) {
    die("Error en la conexión: " . $conn->connect_error);
}
?>
