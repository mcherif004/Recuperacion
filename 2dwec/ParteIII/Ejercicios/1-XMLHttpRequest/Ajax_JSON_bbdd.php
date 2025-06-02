<?php
//Cabecera para que la respuesta sea en formato JSON y con codificación UTF-8
header("Content-Type: application/json; charset=UTF-8");


//Vamos a definir manualmente la petición
//$objeto = json_decode('{"tabla":"alumnos","valor":200}');

//Decodificar el JSON recibido a través de la petición
$objeto = json_decode($_GET["objeto"],false);//false, indica que se debe convertir en u objeto en lugar de un array

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
    //Hacemos la consulta
    $sql = "SELECT idAlumno, alumno, puntuacion FROM $objeto->tabla WHERE puntuacion >= $objeto->valor";

    //Ejecutamos la consulta
    $resultado = $conexion->query($sql);

    //Crear un array para almacenar los resultados
    $salida = array();

    //Obtenemos todas las filas del resultado como un array 
    $salida = $resultado->fetch_all(MYSQLI_ASSOC);

    //Convertirmos el array en formato JSON y lo mostramos
    echo json_encode($salida);
}

//Cerrar la conexión
$conexion->close();

?>