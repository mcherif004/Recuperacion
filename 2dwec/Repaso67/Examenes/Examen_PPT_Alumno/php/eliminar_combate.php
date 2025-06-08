<?php
include 'db.php';
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $personaje1 = $_POST["personaje1"];
    $personaje2 = $_POST["personaje2"];
    $fecha = $_POST["fecha"]; // Recibir la fecha del combate

    // Obtener los IDs de los personajes desde la base de datos
    $sql_get_ids = "SELECT id FROM personajes WHERE nombre = ? OR nombre = ?";
    $stmt = $conn->prepare($sql_get_ids);
    $stmt->bind_param("ss", $personaje1, $personaje2);
    $stmt->execute();
    $result = $stmt->get_result();

    // Guardar los IDs de los personajes
    $ids = [];
    while ($row = $result->fetch_assoc()) {
        $ids[] = $row["id"];
    }

    if (count($ids) < 2) {
        echo json_encode(["success" => false, "message" => "No se encontraron los personajes en la base de datos"]);
        exit;
    }

    // Eliminar SOLO el combate específico con la fecha correspondiente
    $sql = "DELETE FROM combates WHERE (personaje1 = ? AND personaje2 = ? OR personaje1 = ? AND personaje2 = ?) AND fecha = ? LIMIT 1";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("iiiis", $ids[0], $ids[1], $ids[1], $ids[0], $fecha);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Combate eliminado"]);
    } else {
        echo json_encode(["success" => false, "message" => "Error al eliminar el combate"]);
    }

    $stmt->close();
    $conn->close();
}
?>