<?php
// Cabecera para que la respuesta sea en formato JSON y con codificaci贸n UTF-8
header("Content-Type: application/json; charset=UTF-8");

// Configuraci贸n conexi贸n BBDD
$servidor = "localhost";
$usuario = "root";
$password = "";
$bbdd = "maria";

// Creo la conexi贸n
$conexion = new mysqli($servidor, $usuario, $password, $bbdd);

// Comprobar si la conexi贸n ha fallado
if ($conexion->connect_error) {
    die("Error en la conexi贸n: " . $conexion->connect_error);
} else {
    // CONSULTAR LOS ALUMNOS Y DIRECCI脫N (GET)
    if ($_SERVER["REQUEST_METHOD"] === "GET") {
        $objeto = json_decode($_GET['objeto'], false);
        if(!$objeto || !isset($objeto->tabla)) {
            die(json_encode(['error' => 'Faltan datos en la consulta', 'Datos recibidos' => $_GET['objeto']]));
        }

        // Comprobamos si me pide alumno
        if ($objeto->tabla === 'alumnos' && isset($objeto->nombre)) {
            // Consultamos alumnos
            $sql = "SELECT idAlumno, alumno, puntuacion FROM alumnos WHERE alumno = ?";
            $stmt = $conexion->prepare($sql);
            $stmt->bind_param('s', $objeto->nombre);
            $stmt->execute();
            $resultado = $stmt->get_result();
            echo json_encode($resultado->fetch_all(MYSQLI_ASSOC));
            $stmt->close();
        }
        // Comprobamos si me pide direcci贸n
        elseif($objeto->tabla === 'direccion' && isset($objeto->idAlumno)) {
            $sql = "SELECT * FROM direccion WHERE idAlumno = ?";
            $stmt = $conexion->prepare($sql);
            $stmt->bind_param('i', $objeto->idAlumno);
            $stmt->execute();
            $resultado = $stmt->get_result();
            echo json_encode($resultado->fetch_all(MYSQLI_ASSOC));
            $stmt->close();
        }
        else {
            echo json_encode(['error' => 'Faltan datos en la consulta']);
        }
    } 
    // Creaci贸n de usuario por POST
    elseif ($_SERVER["REQUEST_METHOD"] === "POST") {
        $jsonRecibido = file_get_contents("php://input");
        $datos = json_decode($jsonRecibido, false);
    
        if (!$datos || !isset($datos->tabla)) {
            die(json_encode(["error" => "Faltan datos en la creaci贸n.", "datos_recibidos" => $jsonRecibido]));
        }
    
        if ($datos->tabla === "alumnos" && isset($datos->nombre) && isset($datos->puntuacion)) {
            $sql = "INSERT INTO alumnos (alumno, puntuacion) VALUES (?, ?)";
            $stmt = $conexion->prepare($sql);
            $stmt->bind_param("si", $datos->nombre, $datos->puntuacion);
    
            if ($stmt->execute()) {
                echo json_encode(["success" => true, "idAlumno" => $stmt->insert_id]);
            } else {
                echo json_encode(["error" => "No se pudo crear el alumno."]);
            }
            $stmt->close();
        } else {
            echo json_encode(["error" => "Datos no v谩lidos para la creaci贸n."]);
        }
    }
    // ACTUALIZAR ALUMNO (PUT)
    elseif ($_SERVER["REQUEST_METHOD"] === "PUT") {
        $jsonRecibido = file_get_contents("php://input");
        $datos = json_decode($jsonRecibido, false);

        if (!$datos || !isset($datos->tabla) || $datos->tabla !== "alumnos" || !isset($datos->idAlumno) || !isset($datos->nombre) || !isset($datos->puntuacion)) {
            die(json_encode(["error" => "Faltan datos para actualizar."]));
        }

        $sql = "UPDATE alumnos SET alumno = ?, puntuacion = ? WHERE idAlumno = ?";
        $stmt = $conexion->prepare($sql);
        $stmt->bind_param("sii", $datos->nombre, $datos->puntuacion, $datos->idAlumno);

        if ($stmt->execute()) {
            echo json_encode(["success" => true]);
        } else {
            echo json_encode(["error" => "Error en la actualizaci贸n.", "mysql_error" => $stmt->error]);
        }

        $stmt->close();
    }
    // 馃敼 ACTUALIZAR SOLO LA PUNTUACI脫N (PATCH)
    elseif ($_SERVER["REQUEST_METHOD"] === "PATCH") {
        $jsonRecibido = file_get_contents("php://input");
        $datos = json_decode($jsonRecibido, false);

        if (!$datos || !isset($datos->tabla) || !isset($datos->idAlumno) || !isset($datos->puntuacion)) {
            die(json_encode(["error" => "Faltan datos para la actualizaci贸n."]));
        }

        if ($datos->tabla === "alumnos") {
            $sql = "UPDATE alumnos SET puntuacion = ? WHERE idAlumno = ?";
            $stmt = $conexion->prepare($sql);
            $stmt->bind_param("ii", $datos->puntuacion, $datos->idAlumno);

            if ($stmt->execute()) {
                if ($stmt->affected_rows > 0) {
                    echo json_encode(["success" => true]);
                } else {
                    echo json_encode(["error" => "No se encontr贸 el alumno o la puntuaci贸n no cambi贸."]);
                }
            } else {
                echo json_encode(["error" => "Error en la consulta SQL.", "sql_error" => $stmt->error]);
            }
            $stmt->close();
        } else {
            echo json_encode(["error" => "Tabla no v谩lida."]);
        }
    }
    // ELIMINAR ALUMNO (DELETE)
    elseif ($_SERVER["REQUEST_METHOD"] === "DELETE") {
        $jsonRecibido = file_get_contents("php://input");
        $datos = json_decode($jsonRecibido, false);

        if (!$datos || !isset($datos->tabla) || !isset($datos->idAlumno)) {
            die(json_encode(["error" => "Faltan datos para la eliminaci贸n."]));
        }

        if ($datos->tabla === "alumnos") {
            $sql = "DELETE FROM alumnos WHERE idAlumno = ?";
            $stmt = $conexion->prepare($sql);
            $stmt->bind_param("i", $datos->idAlumno);

            if ($stmt->execute()) {
                if ($stmt->affected_rows > 0) {
                    echo json_encode(["success" => true]);
                } else {
                    echo json_encode(["error" => "No se encontr贸 el alumno con ID " . $datos->idAlumno]);
                }
            } else {
                echo json_encode(["error" => "Error en la consulta SQL.", "sql_error" => $stmt->error]);
            }
            $stmt->close();
        } else {
            echo json_encode(["error" => "Tabla no v谩lida."]);
        }
    }
}
?>