<?php

require_once "connection.php";
$usuario = htmlspecialchars($_REQUEST['usuario']);
$evento = htmlspecialchars($_REQUEST['idEvento']);
$entradas = htmlspecialchars($_REQUEST['entradas']);
$precioUni = htmlspecialchars($_REQUEST['precioUnitario']);
$fecha = htmlspecialchars($_REQUEST['fecha']);
$jsondata["data"] = [];

try {
   
	$stmt = $pdo->prepare(query: "INSERT INTO compras VALUES(NULL,'$usuario','$evento','$entradas','$precioUni', '$fecha')");
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

