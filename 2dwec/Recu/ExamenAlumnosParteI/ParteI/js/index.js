import { Heroe } from "./heroe.js";
import { Enemigo } from "./enemigo.js";
import { Aventura } from "./aventura.js";

// Función de validación del formulario
function validarFormulario(event) {
    event.preventDefault();  // Evita el envío del formulario

    const nombreMundoInput = document.getElementById("nombreMundo");
    const mensajeError = document.getElementById("mensajeError");
    const checkboxes = document.querySelectorAll('input[name="heroe"]:checked');
    const radioEnemigo = document.querySelector('input[name="enemigo"]:checked');

    let errores = [];

    // Validación del nombre del mundo
    if (nombreMundoInput.value.trim().length < 5) {
        errores.push("El nombre del mundo debe tener al menos 5 caracteres.");
    }

    // Validación de los héroes seleccionados
    if (checkboxes.length < 2) {
        errores.push("Debe seleccionar al menos 2 héroes.");
    }

    // Validación del enemigo seleccionado
    if (!radioEnemigo) {
        errores.push("Debe seleccionar un enemigo.");
    }

    // Mostrar los errores o éxito
    if (errores.length > 0) {
        // Mostrar los errores en el div con el id "mensajeError"
        mensajeError.innerHTML = errores.join("<br>");
        mensajeError.style.color = "red";
        return;
    }

    // Crear instancias de los héroes seleccionados
    const heroes = Array.from(checkboxes).map(checkbox => new Heroe(checkbox.value));

    // Crear instancia del enemigo seleccionado
    const enemigo = new Enemigo(radioEnemigo.value);

    // Crear la aventura
    const aventura = new Aventura(nombreMundoInput.value, heroes, enemigo);

    // Mostrar los detalles en la consola
    console.log(aventura.toString());

    // Mostrar mensaje de éxito en el div con el id "mensajeError"
    mensajeError.innerHTML = "La aventura ha comenzado exitosamente.";
    mensajeError.style.color = "green";
}

// Asignar el evento al formulario
document.getElementById("aventuraForm").addEventListener("submit", validarFormulario);