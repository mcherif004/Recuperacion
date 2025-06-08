<?php

require_once "connection.php";

$jsondata["data"] = array();

try {

	$stmt = $pdo->prepare("SELECT * FROM categorias");
	$stmt->execute([]);
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


