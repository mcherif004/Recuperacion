<?php
// Ejercicio de Tablas de Multiplicar

/*
En este ejercicio habra que realizar 5 niveles los cuales tendran 5 casillas vacias por cada nivel
Realizar un bucle que nos cree las tablas del 1 al 10 en un unico table (usar 2 for)
Generar un array con pares de numeros aleatorios.
Crear un form con un select que tenga entre 1 y 5 niveles en el nivel 0 mostrar las tablas de multiplicar completa. 
Agregar logica a la tabla para que muestra una cantidad de inputs segun el array
Mostrar tablas con los inputs con una clase (rojo (mal) verde(bien) amarillo (en blanco))
*/

$nivel = isset($_POST['nivel']) ? (int)$_POST['nivel'] : 0; // Nivel seleccionado
$paresAleatorios = isset($_POST['paresAleatorios']) ? json_decode($_POST['paresAleatorios'], true) : [];

// Si no hay pares aleatorios en el POST, generarlos
if (empty($paresAleatorios) && $nivel > 0) {
    for ($i = 0; $i < $nivel * 5; $i++) {
        $paresAleatorios[] = [rand(1, 10), rand(1, 10)];
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tablas de Multiplicar</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f9;
            color: #333;
            align-items: center;
            margin: 0;
            padding: 10px;
            text-align: center;
        }
        table {
            width: 80%;
            border-collapse: collapse;
            margin: 20px auto;
            background-color: #fff;
            text-align: center;
        }
        th, td {
            padding: 10px;
            text-align: center;
            border: solid black 1px;
        }
        th {
            background-color: green;
            color: white;
        }
        .rojo {
            background-color: #ffcccc;
        }
        .verde {
            background-color: #ccffcc;
        }
        .amarillo {
            background-color: #ffffcc;
        }
        .respuesta input {
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            border: none;
            text-align: center;
            font-size: 1em;
            padding: 8px;
            background: transparent;
        }
        td.respuesta {
            padding: 0;
        }
    </style>
</head>
<body>
    <h1>Tablas de Multiplicar</h1>
    
    <!-- Formulario para seleccionar niveles -->
    <form method="POST">
        <label for="nivel">Selecciona el nivel (0-5):</label>
        <select name="nivel" id="nivel">
            <?php for ($i = 0; $i <= 5; $i++) { ?>
                <option value="<?= $i ?>" <?= $nivel === $i ? 'selected' : '' ?>><?= $i ?></option>
            <?php } ?>
        </select>
        <button type="submit">Generar</button>
    </form>

    <?php if ($nivel === 0) { ?>
        <!-- Mostrar tabla completa si el nivel es 0 -->
        <table>
            <tr>
                <th>x</th>
                <?php for ($i = 1; $i <= 10; $i++) { ?>
                    <th>Tabla del <?= $i ?></th>
                <?php } ?>
            </tr>
            <?php for ($i = 1; $i <= 10; $i++) { ?>
                <tr>
                    <th><?= $i ?></th>
                    <?php for ($j = 1; $j <= 10; $j++) { ?>
                        <td><?= $i * $j ?></td>
                    <?php } ?>
                </tr>
            <?php } ?>
        </table>
    <?php } elseif ($nivel > 0) { ?>
        <!-- Mostrar tabla con inputs si el nivel es mayor a 0 -->
        <form method="POST">
            <input type="hidden" name="nivel" value="<?= $nivel ?>">
            <input type="hidden" name="paresAleatorios" value='<?= json_encode($paresAleatorios) ?>'>
            <table>
                <tr>
                    <th>x</th>
                    <?php for ($i = 1; $i <= 10; $i++) { ?>
                        <th>Tabla del <?= $i ?></th>
                    <?php } ?>
                </tr>
                <?php for ($i = 1; $i <= 10; $i++) { ?>
                    <tr>
                        <th><?= $i ?></th>
                        <?php for ($j = 1; $j <= 10; $j++) { ?>
                            <?php
                            // Verificar si el par está en el array
                            $esParAleatorio = false;
                            foreach ($paresAleatorios as $par) {
                                if ($par[0] === $i && $par[1] === $j) {
                                    $esParAleatorio = true;
                                    break;
                                }
                            }

                            if ($esParAleatorio) {
                                $inputName = "respuesta_{$i}_{$j}";
                                $respuestaUsuario = isset($_POST[$inputName]) ? (int)$_POST[$inputName] : null;
                                $resultadoCorrecto = $i * $j;

                                // Estilo de los inputs
                                $clase = 'amarillo'; // Por defecto
                                if ($respuestaUsuario !== null) {
                                    if ($respuestaUsuario === $resultadoCorrecto) {
                                        $clase = 'verde'; // Correcto
                                    } else {
                                        $clase = 'rojo'; // Incorrecto
                                    }
                                }

                                // Mostrar input con la clase correspondiente
                                echo "<td class='$clase respuesta'><input type='number' name='$inputName' value='" . ($respuestaUsuario ?? '') . "'></td>";
                            } else {
                                // Mostrar el valor calculado si no está en el array
                                echo "<td>" . ($i * $j) . "</td>";
                            }
                            ?>
                        <?php } ?>
                    </tr>
                <?php } ?>
            </table>
            <button type="submit">Corregir</button>
        </form>
    <?php } ?>
</body>
</html>