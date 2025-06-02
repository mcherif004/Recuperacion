<?php
//Cabecera para que la respuesta sea en formato JSON y con codificación UTF-8
header("Content-Type: application/json; charset=UTF-8");

//Configuración conexión BBDD
$servidor = "localhost";
$usuario = "root";
$password = "";
$bbdd = "maria";

//Creo la conexión
$conexion = new mysqli($servidor,$usuario,$password,$bbdd);

//Comprobar si la conexión ha fallado
if($conexion->connect_error){
    die("Error en la conexión: ". $conexion->connect_error);
}else{
//CONSULTAR LOS ALUMNOS Y DIRECCIÓN (GET)
if($_SERVER["REQUEST_METHOD"] === "GET"){
    $objeto = json_decode($_GET["objeto"],false);

    if(!$objeto || !isset($objeto->tabla)){
        die(json_encode(["error" => "Faltan datos en la consulta","datos recibidos" => $_GET["objeto"]]));
    }
    //Comprobamos si me pide alumno 
    if($objeto->tabla === "alumnos" && isset($objeto->nombre)){
        //Consultamos alumnos 
        $sql = "SELECT idAlumno, alumno, puntuacion FROM alumnos WHERE alumno = ?";
        $stmt = $conexion->prepare($sql);
        $stmt->bind_param("s",$objeto->nombre);
        $stmt->execute();
        $resultado = $stmt->get_result();
        echo json_encode($resultado->fetch_all(MYSQLI_ASSOC));
        $stmt->close();
    }
    //Conprobamos si me pide dirección
    elseif($objeto->tabla === "direccion" && isset($objeto->idAlumno)){
        $sql = "SELECT * FROM direccion WHERE idAlumno = ?";
        $stmt = $conexion->prepare($sql);
        $stmt->bind_param("i",$objeto->idAlumno);
        $stmt->execute();
        $resultado = $stmt->get_result();
        echo json_encode($resultado->fetch_all(MYSQLI_ASSOC));
        $stmt->close();
    }else{
        echo json_encode(["error"=> "Consulta no válida."]);
    }
}
elseif ($_SERVER["REQUEST_METHOD"] === "POST") {
    $jsonRecibido = file_get_contents("php://input");
    $datos = json_decode($jsonRecibido, false);

    if (!$datos || !isset($datos->tabla)) {
        die(json_encode(["error" => "Faltan datos en la creación.", "datos_recibidos" => $jsonRecibido]));
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
        echo json_encode(["error" => "Datos no válidos para la creación."]);
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
        echo json_encode(["error" => "Error en la actualización.", "mysql_error" => $stmt->error]);
    }

    $stmt->close();
}
// 🔹 ACTUALIZAR SOLO LA PUNTUACIÓN (PATCH)
elseif ($_SERVER["REQUEST_METHOD"] === "PATCH") {
    $jsonRecibido = file_get_contents("php://input");
    $datos = json_decode($jsonRecibido, false);

    if (!$datos || !isset($datos->tabla) || !isset($datos->idAlumno) || !isset($datos->puntuacion)) {
        die(json_encode(["error" => "Faltan datos para la actualización."]));
    }

    if ($datos->tabla === "alumnos") {
        $sql = "UPDATE alumnos SET puntuacion = ? WHERE idAlumno = ?";
        $stmt = $conexion->prepare($sql);
        $stmt->bind_param("ii", $datos->puntuacion, $datos->idAlumno);

        if ($stmt->execute()) {
            if ($stmt->affected_rows > 0) {
                echo json_encode(["success" => true]);
            } else {
                echo json_encode(["error" => "No se encontró el alumno o la puntuación no cambió."]);
            }
        } else {
            echo json_encode(["error" => "Error en la consulta SQL.", "sql_error" => $stmt->error]);
        }
        $stmt->close();
    } else {
        echo json_encode(["error" => "Tabla no válida."]);
    }
}
// ELIMINAR ALUMNO (DELETE)
elseif ($_SERVER["REQUEST_METHOD"] === "DELETE") {
    $jsonRecibido = file_get_contents("php://input");
    $datos = json_decode($jsonRecibido, false);

    if (!$datos || !isset($datos->tabla) || !isset($datos->idAlumno)) {
        die(json_encode(["error" => "Faltan datos para la eliminación."]));
    }

    if ($datos->tabla === "alumnos") {
        $sql = "DELETE FROM alumnos WHERE idAlumno = ?";
        $stmt = $conexion->prepare($sql);
        $stmt->bind_param("i", $datos->idAlumno);

        if ($stmt->execute()) {
            if ($stmt->affected_rows > 0) {
                echo json_encode(["success" => true]);
            } else {
                echo json_encode(["error" => "No se encontró el alumno con ID " . $datos->idAlumno]);
            }
        } else {
            echo json_encode(["error" => "Error en la consulta SQL.", "sql_error" => $stmt->error]);
        }
        $stmt->close();
    } else {
        echo json_encode(["error" => "Tabla no válida."]);
    }
}
}
?>