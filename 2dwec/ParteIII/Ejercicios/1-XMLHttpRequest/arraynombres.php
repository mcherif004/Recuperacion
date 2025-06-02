<?php
//1- Definimos un array con lista de nombres
$a= array("María", "Antonio", "Carmen", "Antonio", "Rocío", "Gloria","Menchu", "Ramón", "Isabel", "Isabela", "Azahara", "Mariate","Fabián", "Ramón", "Rafael");

//2- Tomamos el valor del input que viene porla URL, por GET
$nombre = $_REQUEST["nombre"];

$sugerencia = "";

//3.- Si el nombre no está vacío lo buscamos
if($nombre !== ""){
    $nombre = strtolower($nombre);
    $tam = strlen($nombre);
    foreach($a as $nom){
        //Comprobamos si la cadena pasada coincide con el comienzo de algún nombre del array
        if(stristr($nombre,substr($nom,0, $tam))){
            //Si no hay ninguna sugerencia anterior
            if($sugerencia === ""){
                $sugerencia = $nom;
            }else{
                //Si tiene algo ya sugerencia
                $sugerencia = "$sugerencia, $nom";
            }
            
        }
    }
}
//4.- Devolvemos la respuesta al cliente
echo ($sugerencia === "") ? "No hay sugerencias" : $sugerencia;
?>