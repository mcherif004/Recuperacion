<?php
    // Preguntamos por el valor de la variable
    if($_REQUEST['valor'] == "POST"){
        echo "Hola " . $_REQUEST['nombre'] . " has pulsado el boton POST";
    } else{
        echo "Hola " . $_REQUEST['nombre'] . " has pulsado el boton GET";
    }
?>