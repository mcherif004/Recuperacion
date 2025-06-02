<?php
// Configuración de la conexión a la base de datos
$host = "localhost";
$user = "root"; 
$password = "";
$database = "BobEsponjaDB";

$conn = new mysqli($host, $user, $password, $database);
if ($conn->connect_error) {
    die(json_encode(["success" => false, "error" => "Conexión fallida: " . $conn->connect_error]));
}

// Establecer encabezado JSON
header("Content-Type: application/json");

// Obtener los datos JSON de la solicitud
$inputJSON = file_get_contents("php://input");
$input = json_decode($inputJSON, true);

// Verificar el método HTTP
$method = $_SERVER["REQUEST_METHOD"];

switch ($method) {
    case "GET":
        if (isset($_GET["action"]) && $_GET["action"] == "listarPersonajes") {
            //Obtener solo los nombres de los personajes para el <select>
            $sql = "SELECT nombre FROM personajes ORDER BY nombre";
            $result = $conn->query($sql);
            $personajes = $result->fetch_all(MYSQLI_ASSOC);
            echo json_encode($personajes);
        } elseif (isset($_GET["nombre"])) {
            //Obtener información completa de un personaje por nombre
            $nombre = $conn->real_escape_string($_GET["nombre"]);
            $sql = "SELECT p.*, r.nombre AS residencia, r.direccion 
                    FROM personajes p 
                    LEFT JOIN residencias r ON p.id_residencia = r.id
                    WHERE p.nombre = '$nombre'";
            $result = $conn->query($sql);
            echo json_encode($result->fetch_all(MYSQLI_ASSOC));
        } else {
            //Obtener todos los personajes con datos completos
            $sql = "SELECT p.*, r.nombre AS residencia, r.direccion 
                    FROM personajes p 
                    LEFT JOIN residencias r ON p.id_residencia = r.id";
            $result = $conn->query($sql);
            echo json_encode($result->fetch_all(MYSQLI_ASSOC));
        }
        break;

    case "POST":
        //Crear un nuevo personaje
        $nombre = $conn->real_escape_string($input["nombre"]);
        $ocupacion = $conn->real_escape_string($input["ocupacion"]);
        $tipo = $conn->real_escape_string($input["tipo"]);
        $puntuacion = intval($input["puntuacion_popularidad"]);
        $habilidad = $conn->real_escape_string($input["habilidad_especial"]);
        $id_residencia = intval($input["id_residencia"]);

        $sql = "INSERT INTO personajes (nombre, ocupacion, tipo, puntuacion_popularidad, habilidad_especial, id_residencia)
                VALUES ('$nombre', '$ocupacion', '$tipo', $puntuacion, '$habilidad', $id_residencia)";
        
        echo json_encode(["success" => $conn->query($sql)]);
        break;

    case "PUT":
        //Actualizar personaje completo
        $id = intval($input["id"]);
        $nombre = $conn->real_escape_string($input["nombre"]);
        $ocupacion = $conn->real_escape_string($input["ocupacion"]);
        $tipo = $conn->real_escape_string($input["tipo"]);
        $puntuacion = intval($input["puntuacion_popularidad"]);
        $habilidad = $conn->real_escape_string($input["habilidad_especial"]);
        $id_residencia = intval($input["id_residencia"]);

        $sql = "UPDATE personajes SET 
                nombre = '$nombre', ocupacion = '$ocupacion', tipo = '$tipo',
                puntuacion_popularidad = $puntuacion, habilidad_especial = '$habilidad',
                id_residencia = $id_residencia 
                WHERE id = $id";
        
        echo json_encode(["success" => $conn->query($sql)]);
        break;

    case "PATCH":
        //Actualizar solo la puntuación de un personaje
        $id = intval($input["id"]);
        $puntuacion = intval($input["puntuacion_popularidad"]);

        $sql = "UPDATE personajes SET puntuacion_popularidad = $puntuacion WHERE id = $id";
        echo json_encode(["success" => $conn->query($sql)]);
        break;

    case "DELETE":
        //Eliminar personaje por ID y comprobar si se eliminó algo
        $id = intval($input["id"]);
        $sql = "DELETE FROM personajes WHERE id = $id";
        $conn->query($sql);
        echo json_encode(["success" => $conn->affected_rows > 0, "rowsAffected" => $conn->affected_rows]);
        break;

    default:
        echo json_encode(["success" => false, "error" => "Método no permitido"]);
}

// Cerrar conexión
$conn->close();
?>
