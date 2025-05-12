# Ejercicio: Colordle (Versión en PHP)

## Objetivo del juego

Crear una aplicación web en PHP que simule un juego tipo Mastermind, en el que el usuario debe adivinar un patrón secreto de 4 colores representados por sus iniciales. El jugador cuenta con 9 intentos para acertar la secuencia.

---

## Colores disponibles

Los colores se representan mediante sus iniciales (una sola letra en mayúscula):

- Azul (A)  
- Rojo (R)  
- Morado (M)  
- Blanco (B)  
- Negro (N)  
- Verde (V)

---

## Dinámica del juego

- Al iniciar el juego, se genera aleatoriamente un patrón de 4 colores (iniciales) que se guarda en una variable de sesión.
- El usuario dispone de 9 filas (intentos) para adivinar el patrón.
- Cada fila tiene 6 columnas, distribuidas de la siguiente forma:
  - Las primeras 4 columnas son inputs de tipo texto donde el jugador debe ingresar las iniciales en mayúsculas.
  - Las 2 columnas restantes se usan para mostrar la corrección:
    - Primera columna: cantidad de letras correctas en la posición correcta.
    - Segunda columna: cantidad de letras que existen en el patrón pero están en la posición incorrecta.

---

## Lógica de validación

- Al enviar un intento, se valida que los 4 campos estén completos. Si no lo están, se marcan con borde rojo.
- Una vez enviados, los datos se comparan con el patrón almacenado:
  - Si el intento es correcto (los 4 colores en orden), el juego termina y se muestra un botón para jugar de nuevo.
  - Si se alcanza el intento número 9 sin acertar, el juego finaliza y también se muestra el botón de reinicio.

---

## Requisitos técnicos

- El juego debe estar desarrollado en PHP.
- Se deben usar sesiones para guardar tanto el patrón aleatorio como los intentos del usuario.
- No se requiere JavaScript para la funcionalidad del juego.