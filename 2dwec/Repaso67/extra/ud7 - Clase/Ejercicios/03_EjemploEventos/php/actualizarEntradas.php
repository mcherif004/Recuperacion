<?php

require_once "connection.php";


$idEvento = htmlspecialchars($_REQUEST['evento']);
$tickets=htmlspecialchars($_REQUEST['tickets']);

$jsondata["data"] = array();

try {

	$stmt = $pdo->prepare("UPDATE `eventos` SET entradas=entradas-? WHERE id=?");
	$stmt->execute([$tickets, $idEvento]);
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


