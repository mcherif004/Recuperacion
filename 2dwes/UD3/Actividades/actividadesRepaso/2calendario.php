<?php
/* 
5. Dado el mes y año almacenados en variables, escribir un programa que muestre el 
calendario mensual correspondiente. Marcar el día actual en verde y los festivos 
en rojo.
*/

date_default_timezone_set('CET');

// Variables: dia, mes y año
$day = date('l'); // Dia
$daysInMonth = date('j'); // Dias del mes
$month = date('n'); // Mes
$year = date('Y'); // Año
$firstday = date('w', strtotime("$year-$month-01")); // Numero del primer dia

$dm = 1; // Inicializamos el contador de días en 1

//! echo ("Primer dia:". $firstday ."Dia de hoy:" . $day . "Dias del mes:" . $daysInMonth . "Mes:" . $month . "Año:" . $year);

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calendario</title>
    <style>
        table {
            width: 80%;
            margin: 20px auto;
            border-collapse: collapse;
            border: 2px solid black;
        }
        th, td {
            height: 100px;
            width: 120px;
            text-align: center;
            border: 1px solid black;
        }
        .dia-actual {
            background-color: green;
            color: white;
        }
        .festivo {
            background-color: red;
            color: white;
        }
    </style>
</head>
<body>
    <!-- Creamos la tabla con formato de calendario -->

    <!-- Crear una tabla con los dias maximos del mes -->
    <table>
        <tr>
            <th>Lun</th>
            <th>Mar</th>
            <th>Mie</th>
            <th>Jue</th>
            <th>Vie</th>
            <th>Sab</th>
            <th>Dom</th>
        </tr>
        <tr>
        <?php
            $currentDay = 0;

            // Rellenar los días en blanco antes del primer día del mes
            for ($i = 0; $i < $firstday; $i++) {
                echo '<td></td>';
                $currentDay++;
            }

            // Rellenar los días del mes
            for ($i = 1; $i <= $daysInMonth; $i++) {
                $class = '';
                if ($i == $day) {
                    $class = 'dia-actual';
                }

                echo '<td class="' . $class . '">' . $i . '</td>';
                $currentDay++;

                if ($currentDay % 7 == 0) {
                    echo '</tr><tr>';
                }
            }

            // Rellenar los días en blanco al final del mes
            while ($currentDay % 7 != 0) {
                echo '<td></td>';
                $currentDay++;
            }
        ?>
        </tr>
    </table>
</body>
</html>