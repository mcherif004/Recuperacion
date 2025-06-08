<?php

require_once "connection.php";


$idCategoria = htmlspecialchars($_REQUEST['categoria']);

$jsondata["data"] = array();

try {

	$stmt = $pdo->prepare("SELECT * FROM `eventos` WHERE idCategoria=?");
	$stmt->execute([$idCategoria]);
	while ($row = $stmt->fetch()) {
        $jsondata["data"][] = $row;
    }
} catch (PDOException $e) {
	$jsondata["mensaje"][]="Error";
}

header('Content-type: application/json; charset=utf-8');
echo json_encode($jsondata);
$pdo=null;

exit();
