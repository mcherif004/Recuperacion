<?php
// 1. Definimos un array con la lista de nombres
$a= array("María", "Antonio", "Carmen", "Antonio", "Rocío", "Gloria","Menchu", "Ramón", "Isabel", "Isabela", "Azahara", "Mariate","Fabián", "Ramón", "Rafael");

// 2. Tomamos el valor del input que viene por la URL, por GET
$nombre = $_REQUEST["nombre"];

$sugerencia = "";

// 3. Si el nombre no esta vacio lo buscamos
if ($nombre){
    $nombre = strtolower($nombre);
    $len = strlen($nombre);
    foreach($a as $n){
        // Comprobamos si la cadena pasada coincide con el comienzo de algun nombre del array
        if (stristr($nombre, substr($n, 0, $len))){
            // Si no hay ninguna sugerencia anterior
            if ($sugerencia === "") {
                $sugerencia = $n;
            }else{
                $sugerencia .= ", $n";
            }
        }
    }
    // 4. Devuelve respuesta al cliente
    echo ($sugerencia === "") ? "No hay sugerencias" : $sugerencia;
}
?>