// Sintaxis $(selector).accion();
// Esperar a que la página se cargue
// 1.- Con función anónima
// $(document).ready(function(){ // Deprecated
//     alert("Página cargada");
// });

// 2.- Función con nombre
// $(document).ready(inicio); // Deprecated
// function inicio(){
//     alert("Página cargada");
//     document.getElementById("hola").innerHTML = "Hola Mundo";
// }

// 3.- Version reducida es la menos intuitiva
$(function () { 
    alert("Página cargada");
    document.getElementById("hola").innerHTML = "Hola Mundo";
})