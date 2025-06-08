//SINTAXIS: $(selector).accion()
//Esperar a la que la página se cargue
//1- Con función anónima
// $(document).ready(function(){//Deprecated
//     alert("Página cargada");
// });
//2-Función con nombre
// $(document).ready(inicio);//Deprecated
// function inicio(){
//     alert("Página cargada");
//     document.getElementById("hola").innerHTML ="Hola!";//Puedo seguir accediendo al DOM con JS
// }
//3- Versión reducida - es la menos intuitiva
$(function(){
    alert("Página cargada");
})