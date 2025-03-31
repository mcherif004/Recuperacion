<?php 
    /**
     * Crea un script en PHP que genere y muestre un tablero de ajedrez de 8x8 utilizando una tabla HTML.

    *Requisitos:
        *El tablero debe alternar colores entre blanco y negro, como en un tablero de ajedrez real.
        *Usa una estructura de bucles para generar las filas y columnas dinámicamente.
        *Aplica estilos CSS en línea o mediante una hoja de estilos para diferenciar las casillas blancas y negras.
        *Opcional: Agrega etiquetas de coordenadas (letras en la parte superior e inferior, números en los lados).

    *Salida esperada:
        *Un tablero de ajedrez visualmente correcto dentro de una página HTML.
     */

    $letras = ["A", "B", "C", "D", "E", "F", "G", "H"];
    $columnas = 8;
    $fichas = [
        "A1" => "black", "C1" => "black", "E1" => "black", "G1" => "black",
        "B2" => "black", "D2" => "black", "F2" => "black", "H2" => "black",
        "A3" => "black", "C3" => "black", "E3" => "black", "G3" => "black",
    
        "B6" => "white", "D6" => "white", "F6" => "white", "H6" => "white",
        "A7" => "white", "C7" => "white", "E7" => "white", "G7" => "white",
        "B8" => "white", "D8" => "white", "F8" => "white", "H8" => "white"
    ];
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tablero de Ajedrez</title>
    <style>
        h1 {
            text-align: center;
        }
        table {
            border-collapse: collapse;
            margin: auto;
            text-align: center;
        }
        td, th {
            width: 50px;
            height: 50px;
            border: 1px solid black;
        }
        .black {
            background-color: black;
        }
        .white {
            background-color: white;
        }
        .sin-bordes {
            border: none;
        }
        .piece {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin: auto;
        }
        .black-piece {
            background-color:rgb(168, 25, 25);
        }
        .white-piece {
            background-color: #6F4E37;
        }
    </style>
</head>
<body>
    <h1>Tablero de Ajedrez</h1>
    <table>
        <tr>
            <th class="sin-bordes"></th>
            <?php foreach ($letras as $letra): ?>
                <th class="sin-bordes"><?php echo $letra; ?></th>
            <?php endforeach; ?>
        </tr>
        <?php for ($fila = 8; $fila >= 1; $fila--): ?>
            <tr>
                <th class="sin-bordes"><?php echo $fila; ?></th>
                <?php for ($columna = 0; $columna < $columnas; $columna++): 
                    $color = ($fila + $columna) % 2 == 0 ? 'white' : 'black';
                    $coord = $letras[$columna] . $fila;
                ?>
                    <td class="<?php echo $color; ?>" data-coord="<?php echo $coord; ?>">
                        <?php
                        if (isset($fichas[$coord])) {
                            $piezaColor = $fichas[$coord] == "black" ? "black-piece" : "white-piece";
                            echo "<div class='piece $piezaColor'></div>";
                        }
                        ?>
                    </td>
                <?php endfor; ?>
                <th class="sin-bordes"><?php echo $fila; ?></th>
            </tr>
        <?php endfor; ?>
        <tr>
            <th class="sin-bordes"></th>
            <?php foreach ($letras as $letra): ?>
                <th class="sin-bordes"><?php echo $letra; ?></th>
            <?php endforeach; ?>
        </tr>
    </table>
</body>
</html>