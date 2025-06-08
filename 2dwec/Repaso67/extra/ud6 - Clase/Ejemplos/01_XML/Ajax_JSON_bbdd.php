<?php
// Cabecera para que la respuesta sea en formato JSON y con codificación UTF-8
header("Content-type: application/json; charset=utf-8");

//  Vamos a definir manualmente la petición
// $objeto = json_decode('{"tabla":"alumnos", "valor": 200}');

// Decodificar el JSON recibido a travé de la petición
$objeto = json_decode($_GET['objeto'], false); // false indica que se debe convertir en un objeto en lugar de array
// Configuración conexión BBDD
$servidor = "localhost";
$usuario = "root";
$password = "";
$bbdd = "maria";

// Creo la conexión
$conexion = new mysqli($servidor, $usuario, $password, $bbdd);

// Comprobar si la conexion ha fallado
if ($conexion->connect_error) {
    die("La conexión ha fallado: " . $conexion->connect_error);
} else{
    // Hacemos la consulta
    $consulta = "SELECT * FROM $objeto->tabla WHERE puntuacion >= $objeto->valor";

    // Ejecutamos la consulta
    $resultado = $conexion->query($consulta);

    // Almacenamos los resultados en un array
    $datos = array();

    // Obtenemos todas las filas del resultado como un array
    $datos = $resultado->fetch_all(MYSQLI_ASSOC);

    // Convertimos el array en formato JSON y lo mostramos
    echo json_encode($datos);
}

// Cerramos la conexión
$conexion->close();