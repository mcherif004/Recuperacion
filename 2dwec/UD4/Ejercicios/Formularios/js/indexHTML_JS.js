window.onload = iniciar;

function iniciar() {
    document.getElementById("enviar").addEventListener("click", validar);
}
function validar(e) {
    //Limpiar errores previos
    borrarError();
    e.preventDefault(); //Quitamos el evento por defecto
    if (validarNombre() && validarEdad() && validarTelefono() && confirm("¿Está seguro de que desea enviar el formulario?")) {
        alert("Formulario correcto");
    }
}
function validarNombre() {
    const elemento = document.getElementById("nombre");
    if (!elemento.checkValidity()) {//Comprobamos la validación del HTML
        if (elemento.validity.valueMissing) {
            // alert("El campo nombre tiene que estar relleno");
            error(elemento, "El campo nombre tiene que estar relleno");
        }
        if (elemento.validity.patternMismatch) {
            // alert("El campo nombre no cumple el patrón");
            error(elemento, "El campo nombre no cumple el patrón");
        }
        return false;
    }
    return true;
}
function validarEdad() {
    const elemento = document.getElementById("edad");
    if (!elemento.checkValidity()) {//Comprobamos la validación del HTML
        if (elemento.validity.valueMissing) {
            // alert("El campo edad tiene que estar relleno");
            error(elemento, "El campo edad tiene que estar relleno");
        }
        if (elemento.validity.rangeOverflow) {
            // alert("El campo edad no puede ser mayor de 100");
            error(elemento, "El campo edad no puede ser mayor de 100");
        }
        if (elemento.validity.rangeUnderflow) {
            // alert("El campo edad no puede ser menor de 18");
            error(elemento, "El campo edad no puede ser menor de 18");
        }
        return false;
    }
    return true;
}
function validarTelefono() {
    const elemento = document.getElementById("telefono");
    if (!elemento.checkValidity()) {//Comprobamos la validación del HTML
        if (elemento.validity.valueMissing) {
            // alert("El campo telefono tiene que estar relleno");
            error(elemento, "El campo telefono tiene que estar relleno");
        }
        if (elemento.validity.patternMismatch) {
            // alert("El campo telefono no cumple el patrón");
            error(elemento, "El campo telefono no cumple el patrón, debe tener 9 dígitos");
        }
        return false;
    }
    return true;
}
// function error(elemento) {
//     const errores = document.getElementById("mensajeError");
//     errores.innerHTML = elemento.validationMessage; //Mensaje por defecto de la validación
//     elemento.className = "error"; //Añadimos la clase error al mensaje
//     elemento.focus(); //Focalizamos el elemento
// }
function error(elemento, mensaje) {
    const errores = document.getElementById("mensajeError");
    errores.innerHTML = mensaje; //Mensaje por defecto de la validación
    elemento.className = "error"; //Añadimos la clase error al mensaje
    elemento.focus(); //Focalizamos el elemento
}
function borrarError() {
    var formulario = document.forms[0];
    for (var i = 0; i < formulario.elements.length; i++) {
        formulario.elements[i].className = "";
    }
}