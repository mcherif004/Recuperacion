<?php
include 'db.php';

// Asegurar que la respuesta es JSON
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $personaje1 = trim($_POST["personaje1"] ?? '');
    $personaje2 = trim($_POST["personaje2"] ?? '');
    $resultado = trim($_POST["resultado"] ?? ''); // Guardamos el nombre del ganador

    // Depuración: Mostrar los nombres recibidos en el log del servidor
    error_log("Personaje 1 recibido: " . $personaje1);
    error_log("Personaje 2 recibido: " . $personaje2);
    error_log("Resultado recibido: " . $resultado);

    // Verificar que los valores no estén vacíos
    if (empty($personaje1) || empty($personaje2) || empty($resultado)) {
        echo json_encode(["success" => false, "message" => "Todos los datos son obligatorios"]);
        exit;
    }

    // Obtener los IDs de los personajes asegurando coincidencias exactas
    $sql_get_ids = "SELECT id, nombre FROM personajes WHERE BINARY nombre = ? OR BINARY nombre = ?";
    $stmt = $conn->prepare($sql_get_ids);
    $stmt->bind_param("ss", $personaje1, $personaje2);
    $stmt->execute();
    $result = $stmt->get_result();

    $ids = [];
    while ($row = $result->fetch_assoc()) {
        $ids[$row["nombre"]] = $row["id"];
    }

    // Depuración: Verificar IDs obtenidos
    error_log("IDs encontrados: " . json_encode($ids));

    if (count($ids) < 2) {
        echo json_encode(["success" => false, "message" => "No se encontraron ambos personajes en la base de datos"]);
        exit;
    }

    // Insertar el nuevo combate en la base de datos
    $sql = "INSERT INTO combates (personaje1, personaje2, resultado) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("iis", $ids[$personaje1], $ids[$personaje2], $resultado);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Combate guardado correctamente"]);
    } else {
        echo json_encode(["success" => false, "message" => "Error al guardar el combate: " . $stmt->error]);
    }

    $stmt->close();
    $conn->close();
}
?>
