<?php

require_once "connection.php";

$data = json_decode(file_get_contents('php://input'));
$zona = htmlspecialchars($_REQUEST['zona']);
$habitaciones = htmlspecialchars($_REQUEST['habitaciones']);
$precio = htmlspecialchars($_REQUEST['precio']);


$jsondata["data"] = array();

try {
	$stmt = $pdo->prepare("SELECT * FROM `inmuebles` WHERE habitaciones=$habitaciones and precio<=$precio and zona=$zona");
	$stmt->execute();
	$jsondata["data"] = $stmt->fetchall();
} catch (PDOException $e) {
	$jsondata["mensaje"] = $e;
}

header('Content-type: application/json; charset=utf-8');
echo json_encode($jsondata);
$pdo = null;

exit();

