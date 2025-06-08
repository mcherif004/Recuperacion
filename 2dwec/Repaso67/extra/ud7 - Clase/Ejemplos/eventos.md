# Eventos de jQuery sobre Botones

Este archivo contiene una lista de **todos los eventos comunes de jQuery** asociados a botones. Cada evento está comentado y explicado para que puedas entender su propósito y cómo utilizarlos adecuadamente en tus proyectos web.

## Tabla de Contenido

- [Eventos de jQuery sobre Botones](#eventos-de-jquery-sobre-botones)
  - [Tabla de Contenido](#tabla-de-contenido)
  - [1. `click`](#1-click)
  - [2. `dblclick`](#2-dblclick)
  - [3. `mousedown`](#3-mousedown)
  - [4. `mouseup`](#4-mouseup)
  - [5. `mouseenter`](#5-mouseenter)
  - [6. `mouseleave`](#6-mouseleave)
  - [7. `mousemove`](#7-mousemove)
  - [8. `focus`](#8-focus)
  - [9. `blur`](#9-blur)
  - [10. `keydown`](#10-keydown)
  - [11. `keypress`](#11-keypress)
  - [12. `keyup`](#12-keyup)
  - [13. `submit`](#13-submit)
  - [14. `change`](#14-change)
  - [15. `input`](#15-input)
  - [16. `focusin`](#16-focusin)
  - [17. `focusout`](#17-focusout)
  - [18. `select`](#18-select)

---

## 1. `click`
**Descripción**: Se activa cuando el usuario hace clic en el botón.

```javascript
$("#miBoton").click(function() {
    alert("¡Has hecho clic en el botón!");
});
```

## 2. `dblclick`
**Descripción**: Se activa cuando el usuario hace doble clic en el botón.

```javascript
$("#miBoton").dblclick(function() {
    alert("¡Has hecho doble clic en el botón!");
});
```

## 3. `mousedown`
**Descripción**: Se activa cuando el usuario presiona el botón del ratón sobre el botón.

```javascript
$("#miBoton").mousedown(function() {
    alert("¡Has presionado el botón del ratón sobre el botón!");
});
```

## 4. `mouseup`
**Descripción**: Se activa cuando el usuario suelta el botón del ratón sobre el botón.

```javascript
$("#miBoton").mouseup(function() {
    alert("¡Has soltado el botón del ratón sobre el botón!");
});
```

## 5. `mouseenter`
**Descripción**: Se activa cuando el puntero del ratón entra en el área del botón.

```javascript
$("#miBoton").mouseenter(function() {
    alert("¡El puntero del ratón ha entrado en el área del botón!");
});
```

## 6. `mouseleave`
**Descripción**: Se activa cuando el puntero del ratón sale del área del botón.

```javascript
$("#miBoton").mouseleave(function() {
    alert("¡El puntero del ratón ha salido del área del botón!");
});
```

## 7. `mousemove`
**Descripción**: Se activa cuando el puntero del ratón se mueve dentro del área del botón.

```javascript
$("#miBoton").mousemove(function() {
    alert("¡El puntero del ratón se está moviendo dentro del área del botón!");
});
```

## 8. `focus`
**Descripción**: Se activa cuando el botón recibe el foco.

```javascript
$("#miBoton").focus(function() {
    alert("¡El botón ha recibido el foco!");
});
```

## 9. `blur`
**Descripción**: Se activa cuando el botón pierde el foco.

```javascript
$("#miBoton").blur(function() {
    alert("¡El botón ha perdido el foco!");
});
```

## 10. `keydown`
**Descripción**: Se activa cuando una tecla es presionada mientras el botón tiene el foco.

```javascript
$("#miBoton").keydown(function() {
    alert("¡Una tecla ha sido presionada mientras el botón tiene el foco!");
});
```

## 11. `keypress`
**Descripción**: Se activa cuando una tecla es presionada y soltada mientras el botón tiene el foco.

```javascript
$("#miBoton").keypress(function() {
    alert("¡Una tecla ha sido presionada y soltada mientras el botón tiene el foco!");
});
```

## 12. `keyup`
**Descripción**: Se activa cuando una tecla es soltada mientras el botón tiene el foco.

```javascript
$("#miBoton").keyup(function() {
    alert("¡Una tecla ha sido soltada mientras el botón tiene el foco!");
});
```

## 13. `submit`
**Descripción**: Se activa cuando se envía un formulario que contiene el botón.

```javascript
$("#miFormulario").submit(function() {
    alert("¡El formulario ha sido enviado!");
});
```

## 14. `change`
**Descripción**: Se activa cuando el valor de un elemento de formulario cambia.

```javascript
$("#miInput").change(function() {
    alert("¡El valor del input ha cambiado!");
});
```

## 15. `input`
**Descripción**: Se activa cuando el valor de un elemento de entrada cambia.

```javascript
$("#miInput").on('input', function() {
    alert("¡El valor del input está cambiando!");
});
```

## 16. `focusin`
**Descripción**: Se activa cuando un elemento dentro del botón recibe el foco.

```javascript
$("#miBoton").focusin(function() {
    alert("¡Un elemento dentro del botón ha recibido el foco!");
});
```

## 17. `focusout`
**Descripción**: Se activa cuando un elemento dentro del botón pierde el foco.

```javascript
$("#miBoton").focusout(function() {
    alert("¡Un elemento dentro del botón ha perdido el foco!");
});
```

## 18. `select`
**Descripción**: Se activa cuando el usuario selecciona texto dentro de un campo de entrada.

```javascript
$("#miInput").select(function() {
    alert("¡Has seleccionado texto dentro del input!");
});
```
