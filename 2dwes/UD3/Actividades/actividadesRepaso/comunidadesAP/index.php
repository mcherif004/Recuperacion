<?php
// Desarrolla una aplicación en PHP que permita al usuario jugar un trivial sobre provincias y comunidades autónomas de España.

/*Requisitos:

Crea un array asociativo en PHP donde las claves sean las comunidades autónomas y los valores sean arrays con las provincias correspondientes.

Muestra un formulario donde se presenten  el nombre de una provincia aleatoria y el usuario deba seleccionar la comunidad autónoma correcta.

Verifica si la respuesta es correcta y muestra un mensaje de acierto o error.

Permite repetir la pregunta con una nueva provincia aleatoria.

Crea un ejercicio mejorado con aportaciones propias.
*/

$comunidades = require 'config.php';

// Crear array provincia => comunidad
$provincias = [];
foreach ($comunidades as $comunidad => $lista) {
    foreach ($lista as $provincia) {
        $provincias[$provincia] = $comunidad;
    }
}

$mensaje = '';

// Procesar formulario
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $provincia = $_POST["provincia"];
    $respuesta = $_POST["respuesta"];
    $correcta = $provincias[$provincia];

    if ($respuesta === $correcta) {
        $mensaje = "<p class='correcto'>Correcto. $provincia pertenece a $correcta.</p>";
    } else {
        $mensaje = "<p class='error'>Incorrecto. $provincia pertenece a $correcta.</p>";
    }
}

// Elegir nueva provincia aleatoria
$provinciaAleatoria = array_rand($provincias);
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Comunidades Autónomas</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f4f4f4;
            margin: 50px;
            padding: 50px;
        }

        .container {
            max-width: 500px;
            margin: 50px auto;
            background-color: #ffffff;
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }

        h2 {
            text-align: center;
            color: #333;
        }

        p {
            font-size: 1rem;
            color: #333;
        }

        select {
            width: 100%;
            padding: 10px;
            font-size: 1rem;
            margin-top: 10px;
            margin-bottom: 20px;
            border: 1px solid #ccc;
            border-radius: 6px;
        }

        button {
            background-color: #007BFF;
            color: white;
            border: none;
            padding: 10px 20px;
            font-size: 1rem;
            border-radius: 6px;
            cursor: pointer;
            width: 100%;
            transition: background-color 0.3s;
        }

        button:hover {
            background-color: #0056b3;
        }

        .mensaje {
            margin-top: 15px;
            font-weight: bold;
        }

        .correcto {
            color: green;
        }

        .error {
            color: red;
        }
    </style>
</head>
<body>
    <h2>Selecciona la comunidad autónoma correspondiente</h2>

    <!-- Imprimir mensaje -->
    <?= $mensaje ?>

    <form method="post">
        <p><strong>Provincia:</strong> <?= htmlspecialchars($provinciaAleatoria) ?></p>
        <input type="hidden" name="provincia" value="<?= htmlspecialchars($provinciaAleatoria) ?>">
        <select name="respuesta" required>
            <option value="">-- Selecciona una comunidad --</option>
            <?php foreach ($comunidades as $comunidad => $provinciasLista) { 
                echo "<option value=\"" . htmlspecialchars($comunidad) . "\">" . htmlspecialchars($comunidad) . "</option>";
            } ?>
        </select>
        <button type="submit">Enviar</button>
    </form>
</body>
</html>