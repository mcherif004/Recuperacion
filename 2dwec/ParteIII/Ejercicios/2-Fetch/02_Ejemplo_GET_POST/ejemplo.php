<?php
    //Preguntamos por el valor de la variable
    if($_REQUEST['valor']=="POST"){
        echo "Hola ".$_REQUEST["nombre"]." has pulsado el botón POST";
    }else{
        echo "Hola ".$_REQUEST["nombre"]." has pulsado el botón GET";
    }
?>