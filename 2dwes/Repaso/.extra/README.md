# Repaso Completo de PHP – Desde las Bases hasta Avanzado

Este documento te guiará paso a paso por los fundamentos de PHP, incluyendo sintaxis, estructuras de control, funciones, formularios, POO, sesiones y cookies.
Cada sección incluye una breve explicación, ejemplo de código con todas sus variantes, ejercicios prácticos y consejos útiles.

---

## Índice

1. Sintaxis básica de PHP
2. Condicionales (`if`, `else`, `elseif`)
3. Estructura `switch`
4. Bucles (`for`, `while`, `do...while`, `foreach`)
5. Funciones
6. Formularios
7. Programación Orientada a Objetos (POO)
8. Sesiones
9. Cookies

---

## 1. Sintaxis básica de PHP

**Explicación:**
PHP se ejecuta en el servidor y sus bloques deben empezar con `<?php` y cerrar con `?>`. Las variables comienzan con `$`, no se tipan explícitamente, y cada instrucción debe terminar en `;`.

**Ejemplo:**

```php
<?php
$nombre = "Señor";
echo "¡Hola, $nombre!";
?>
```

**Ejercicios:**

1. Declara tres variables: un nombre, una edad y una ciudad. Muestra un mensaje con `echo`.
2. Suma dos números y guarda el resultado en una variable. Muestra el resultado.
3. Declara una variable booleana y una decimal. Usa `var_dump()` para ver su tipo.
4. Une dos cadenas en una tercera variable. Muestra el resultado.
5. Define una constante con tu lenguaje favorito y muéstrala.

**Tips:**

* Usa `var_dump($variable)` para ver su tipo y valor.
* Comillas dobles permiten variables dentro de strings (`"Hola $nombre"`), simples no (`'Hola $nombre'`).
* Termina siempre con `;`. No hacerlo te rompe el script.

---

## 2. Condicionales

**Explicación:**
Las estructuras `if`, `else` y `elseif` permiten ejecutar bloques de código dependiendo de si una condición es verdadera.

**Ejemplo:**

```php
<?php
$edad = 20;
if ($edad >= 18) {
    echo "Eres mayor de edad.";
} elseif ($edad >= 13) {
    echo "Eres adolescente.";
} else {
    echo "Eres niño.";
}
?>
```

**Ejercicios:**

1. Verifica si un número es positivo, negativo o cero.
2. Comprueba si una persona puede entrar a un club (mayor de 18 años).
3. Evalúa si un número es par o impar.
4. Crea un sistema simple de acceso con usuario y contraseña.
5. Usa `elseif` para calificar una nota (A, B, C, D, F).

**Tips:**

* Compara con `===` para evitar errores de tipo.
* Usa paréntesis aunque la condición sea simple.
* Haz que tu lógica sea explícita. No adivines.

---

## 3. Switch

**Explicación:**
`switch` evalúa una variable y ejecuta el caso que coincida. Es útil cuando tienes múltiples condiciones fijas.

**Ejemplo:**

```php
<?php
$dia = "lunes";
switch ($dia) {
    case "lunes":
        echo "Ánimo, es lunes.";
        break;
    case "viernes":
        echo "¡Por fin viernes!";
        break;
    default:
        echo "Es un día cualquiera.";
}
?>
```

**Ejercicios:**

1. Mostrar el nombre del día de la semana según un número del 1 al 7.
2. Muestra un mensaje diferente según la estación del año.
3. Simula un menú de opciones (1. Jugar, 2. Configurar, 3. Salir).
4. Responde diferentes mensajes a comandos: "saludar", "despedir", "ayuda".
5. Implementa un convertidor de unidades básico (km, m, cm).

**Tips:**

* Usa `break` para evitar ejecuciones no deseadas.
* Usa `default` como caso por defecto.
* Agrupa casos que compartan acción.

---

## 4. Bucles

**Explicación:**
Los bucles permiten ejecutar código varias veces. `for` se usa para contar, `while` para repetir mientras se cumpla una condición, `do...while` ejecuta al menos una vez, y `foreach` es ideal para arrays.

**Ejemplo (todos los tipos):**

```php
<?php
// FOR
for ($i = 1; $i <= 5; $i++) {
    echo "FOR: $i\n";
}

// WHILE
$i = 1;
while ($i <= 5) {
    echo "WHILE: $i\n";
    $i++;
}

// DO...WHILE
$i = 1;
do {
    echo "DO WHILE: $i\n";
    $i++;
} while ($i <= 5);

// FOREACH
$frutas = ["Manzana", "Pera", "Banana"];
foreach ($frutas as $fruta) {
    echo "FOREACH: $fruta\n";
}
?>
```

**Ejercicios:**

1. Muestra los números del 1 al 10 con `for`.
2. Calcula la suma de los números del 1 al 100 con `while`.
3. Usa `do...while` para pedir un número hasta que sea mayor que 0.
4. Crea un array de nombres y recórrelo con `foreach`.
5. Imprime la tabla de multiplicar del 5 con cualquier bucle.

**Tips:**

* Evita bucles infinitos.
* Usa `continue` para saltar una vuelta, y `break` para salir.
* `foreach` es la opción más limpia para arrays.

---

## 5. Funciones

**Explicación:**
Las funciones permiten encapsular lógica reutilizable. Se definen con `function` y pueden devolver valores con `return`.

**Ejemplo:**

```php
<?php
function saludar($nombre) {
    return "Hola, $nombre";
}
echo saludar("Señor");
?>
```

**Ejercicios:**

1. Crea una función que sume dos números.
2. Una función que devuelva si un número es par o impar.
3. Una función que reciba un nombre y edad y devuelva una presentación.
4. Una función que calcule el factorial de un número.
5. Una función que convierta grados Celsius a Fahrenheit.

**Tips:**

* Evita funciones muy largas. Divide y vencerás.
* Siempre que sea posible, devuelve un valor (`return`).
* Usa nombres claros y descriptivos.

---

## 6. Formularios

**Explicación:**
Los formularios HTML permiten enviar datos al servidor. En PHP se procesan mediante `$_GET` o `$_POST`.

**Ejemplo:**
Formulario HTML:

```html
<form method="post" action="procesar.php">
  <input type="text" name="nombre">
  <input type="submit" value="Enviar">
</form>
```

procesar.php:

```php
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = $_POST['nombre'];
    echo "Hola, $nombre";
}
?>
```

**Ejercicios:**

1. Crear un formulario que pida nombre y edad y los muestre en pantalla.
2. Formulario para enviar comentarios y guardarlos en un array.
3. Crea un login simple con usuario y contraseña.
4. Formulario con radio buttons para elegir un color y mostrarlo.
5. Valida que un campo no esté vacío antes de mostrarlo.

**Tips:**

* Usa `htmlspecialchars()` para evitar XSS.
* Valida todos los campos del formulario en el servidor.
* Usa `isset()` para comprobar si los datos existen.

---

## 7. Programación Orientada a Objetos (POO)

**Explicación:**
La POO permite organizar el código en clases y objetos, facilitando la reutilización y el mantenimiento. Se usan `class`, `public`, `private`, `__construct`, y métodos para encapsular comportamientos.

**Ejemplo:**

```php
<?php
class Persona {
    private $nombre;

    public function __construct($nombre) {
        $this->nombre = $nombre;
    }

    public function saludar() {
        return "Hola, soy $this->nombre";
    }
}

$yo = new Persona("Señor");
echo $yo->saludar();
?>
```

**Ejercicios:**

1. Crea una clase `Coche` con marca y modelo, y un método que los muestre.
2. Implementa una clase `Calculadora` con métodos para sumar, restar, multiplicar y dividir.
3. Crea una clase `Usuario` con propiedades privadas y getters/setters.
4. Usa herencia para crear una clase `Empleado` que extienda de `Persona`.
5. Simula una clase `Banco` con métodos para depositar y retirar saldo.

**Tips:**

* Usa `private` para proteger los datos internos.
* Usa `__construct` para inicializar valores.
* Reutiliza código con herencia.

---

## 8. Sesiones

**Explicación:**
Las sesiones permiten guardar información entre diferentes páginas, como si fuera memoria del usuario.

**Ejemplo:**

```php
<?php
session_start();
$_SESSION['usuario'] = "Señor";
echo $_SESSION['usuario'];
?>
```

**Ejercicios:**

1. Inicia sesión y guarda un nombre de usuario.
2. Crea un contador de visitas usando `$_SESSION`.
3. Implementa un sistema de login que recuerde al usuario.
4. Destruye la sesión con `session_destroy()`.
5. Guarda preferencias de idioma en la sesión.

**Tips:**

* Siempre llama a `session_start()` al inicio.
* Las sesiones se guardan en el servidor.
* Usa `unset($_SESSION['clave'])` para eliminar valores.

---

## 9. Cookies

**Explicación:**
Las cookies son pequeños archivos guardados en el navegador del usuario. Se usan para guardar datos entre sesiones.

**Ejemplo:**

```php
<?php
setcookie("usuario", "Señor", time() + 3600);
if (isset($_COOKIE['usuario'])) {
    echo "Hola, " . $_COOKIE['usuario'];
}
?>
```

**Ejercicios:**

1. Crea una cookie con el nombre del usuario.
2. Guarda una preferencia de color con cookies.
3. Crea un aviso de "cookies aceptadas".
4. Usa cookies para recordar el último acceso.
5. Borra una cookie manualmente.

**Tips:**

* Las cookies se establecen antes de cualquier salida HTML.
* Usa `time() + segundos` para definir su duración.
* Elimina una cookie con `setcookie("nombre", "", time() - 3600);`