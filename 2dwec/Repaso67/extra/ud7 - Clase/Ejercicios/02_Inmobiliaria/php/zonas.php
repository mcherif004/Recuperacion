<?php

require_once "connection.php";



$jsondata["data"] = array();

try {
	$stmt = $pdo->prepare("SELECT * FROM zonas order by descripcion");
	$stmt->execute();
	$jsondata["data"] = $stmt->fetchall();
} catch (PDOException $e) {
	$jsondata["mensaje"] = $e;
}

header('Content-type: application/json; charset=utf-8');
echo json_encode($jsondata);
$pdo = null;

exit();