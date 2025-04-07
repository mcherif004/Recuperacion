// Selecciona el formulario

// Conociendo el id
const formulario1 = document.getElementById("miFormulario");
// // Con el tagName
// const formulario2 = document.getElementsByTagName("form")[0];
// // Con forms
// const formulario3 = document.forms[0];

window.onload = iniciar;

function iniciar() {
    document.getElementById('enviar').addEventListener('click', validarNombre);
    document.getElementById('enviar').addEventListener('click', validarTelefono);
    document.getElementById('enviar').addEventListener('click', validaFecha);
    document.getElementById('enviar').addEventListener('click', validaCheck);
}

function validarNombre(e) {
    e.preventDefault();
    const elementoNombre = document.getElementById("nombre");
    if (elementoNombre.value == "") {
        alert("El campo no puede estar vacio");
        return false;
    }
    return true
}

function validarTelefono(e) {
    e.preventDefault();
    const elementoNombre = document.getElementById("telefono");
    if (isNaN(elementoNombre.value) || elementoNombre.value == "") {
        alert("El campo no puede ser numerico y no puede estar vacio");
        return false;
    }
    return true
}

function validaFecha() {
    e.preventDefault();
    // Obtener los valores del formulario
    var dia = parseInt(document.getElementById("dia").value, 10);
    var mes = parseInt(document.getElementById("mes").value, 10);
    var ano = parseInt(document.getElementById("ano").value, 10);

    // Validar rango del año, mes y día
    if (isNaN(dia) || dia < 1 || dia > 31) {
        alert("El día debe estar entre 1 y 31");
        return false;
    }
    if (isNaN(mes) || mes < 1 || mes > 12) {
        alert("El mes debe estar entre 1 y 12");
        return false;
    }
    if (isNaN(ano) || ano < 1900 || ano > 2100) {
        alert("El año debe estar entre 1900 y 2100");
        return false;
    }

    // Crear la fecha ajustando el índice del mes
    var fecha = new Date(ano, mes - 1, dia);

    // Verificar si la fecha es válida
    if (fecha.getFullYear() !== ano || fecha.getMonth() !== mes - 1 || fecha.getDate() !== dia) {
        alert("La fecha no es válida (día/mes incorrectos)");
        return false;
    }
    return true;
}

function validaCheck(){
    const campoCheck = document.getElementById('mayor');
    if(!campoCheck.checked){
        alert('Debes ser mayor de edad para continuar');
        return false;
    }
    return true;
}

function validar(e){
    e.preventDefault();
    if(validarNombre() && validarTelefono() && validaFecha() && validaCheck()){
        alert('Formulario enviado correctamente');
        return true;
    }else{
        alert('Error en el formulario');
        return false;
    }
}

function limpiarFormulario() {
    const elementoNombre = document.getElementsByTagName('input');
    for (const elemento of elementosInput) {
        //Limpiamos el valor de los inputs
        if(elemento.type == 'text'){
            elemento.value = '';
        }
    }
}

function error(elemento) {
    elemento.className = 'error';
    elemento.focus();
}

function limpiarError(elemento) {
    elemento.className = '';
}