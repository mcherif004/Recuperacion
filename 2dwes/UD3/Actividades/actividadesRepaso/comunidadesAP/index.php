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
        $mensaje = "<p style='color:green;'>Correcto. $provincia pertenece a $correcta.</p>";
    } else {
        $mensaje = "<p style='color:red;'>Incorrecto. $provincia pertenece a $correcta.</p>";
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