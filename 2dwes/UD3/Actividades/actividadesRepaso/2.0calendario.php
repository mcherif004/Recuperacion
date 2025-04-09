<?php
/* 
5. Dado el mes y año almacenados en variables, escribir un programa que muestre el 
calendario mensual correspondiente. Marcar el día actual en verde y los festivos 
en rojo.
*/

date_default_timezone_set('CET');

// Variables: dia, mes y año
$day_today = date('j'); // Día actual
$month = date('n'); // Mes actual
$year = date('Y'); // Año actual

$daysInMonth = cal_days_in_month(CAL_GREGORIAN, $month, $year); // Total de días en el mes
$firstday = date('w', strtotime("$year-$month-01")); // Primer día del mes
$firstday = ($firstday == 0) ? 6 : $firstday - 1; // Ajuste para que empiece en Lunes
?>

<!DOCTYPE html>
<html lang="es">
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
            height: 50px;
            width: 100px;
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
    <h2 style="text-align: center;">Calendario de <?php echo date('F Y'); ?></h2>
    <table>
        <tr>
            <th>Lun</th>
            <th>Mar</th>
            <th>Mié</th>
            <th>Jue</th>
            <th>Vie</th>
            <th>Sáb</th>
            <th>Dom</th>
        </tr>
        <tr>
        <?php
            $currentDay = 0;

            // Espacios vacíos hasta el primer día del mes
            for ($i = 0; $i < $firstday; $i++) {
                echo '<td></td>';
                $currentDay++;
            }

            // Rellenar días del mes
            for ($i = 1; $i <= $daysInMonth; $i++) {
                $class = '';

                // Verificar si es el día actual
                if ($i == $day_today) {
                    $class = 'dia-actual';
                }

                // Verificar si es festivo
                if (date('w', strtotime("$year-$month-$i")) == 0) {
                    $class = 'festivo';
                }

                echo "<td class='$class'>$i</td>";
                $currentDay++;

                // Salto de línea después de cada semana
                if ($currentDay % 7 == 0) {
                    echo '</tr><tr>';
                }
            }

            // Rellenar espacios vacíos al final del mes
            while ($currentDay % 7 != 0) {
                echo '<td></td>';
                $currentDay++;
            }
        ?>
        </tr>
    </table>
</body>
</html>