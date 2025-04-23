<?php
/*Condiciones*/

// 1. Número positivo o negativo: Escribe un script que verifique si un número es positivo, negativo o cero.
$numero = 12;

if ($numero > 0) {
    echo("El numero $numero es positivo");
} else if ($numero == 0) {
    echo("El numero $numero es neutro");
} else if ($numero < 0) {
    echo("El numero $numero es negativo");
} else {
    echo("Error");
}

// 2. Mayor de tres números: Dado tres números, determina cuál es el mayor de los tres.
echo("\n");
$numero1 = 5;
$numero2 = 10;
$numero3 = 15;

$arrayNum = [$numero1, $numero2, $numero3];

$maxNum = max($arrayNum);

echo("El numero mayor es $maxNum");

// 3. Clasificación por edades: Escribe un programa que clasifique a una persona según su edad: "niño","adolescente", "adulto" o "anciano".
echo("\n");
$edad = 10;

if ($edad > 0 && $edad < 13) {
    echo("");
} else if ($edad )

// 4. Días de la semana: Crea un script que reciba un número entre 1 y 7, y muestre el día de la semana correspondiente (1 es Lunes, 7 es Domingo).
echo("\n");
