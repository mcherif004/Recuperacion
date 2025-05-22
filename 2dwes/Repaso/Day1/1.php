<?php
    // Crear un script que calcule el promedio de N numeros ingresados por el usuario mediante un formulario

    /*
        Requisitos: uso de formularios ($_POST)
        Validacion de datos (No vacio y tiene que ser numerico)
        Estructuras de control (if-else, foreach)
        Mostrar el resultado con formato
    */
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calculadora Promedios</title>
</head>
<body>
    <form method="post" action="">
        <label for="numero">Introduce un numero: </label>
        <input type="text" name="numero" id="numero">

        <input type="submit" name="enviar" id="enviar">

        <?php

            $promedio = 0;
            $numeros = [];

            if (isset($_POST['numero'])) {
                if (!empty($_POST['numero']) && is_numeric($_POST['numero'])) { // strlen() tambien sirve pero mejor !empty
                    $numero = $_POST['numero'];
                    $arrayNuevo = array_push($numeros, $numero);
                    echo ($arrayNuevo);
                }
            }
        ?>
    </form>
</body>
</html>