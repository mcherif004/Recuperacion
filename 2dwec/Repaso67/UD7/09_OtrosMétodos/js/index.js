
//$.each == jQuery.each
$(inicio);//Esperar a que Cargue todo el documento 
function inicio(){
   //METODOS DE TIPOS EN JQUERY
   /* Estos métodos sirven para verificar el tipo de una variable o valor en jQuery:
    $.isFunction(elem) → Comprueba si `elem` es una función.
    $.isEmptyObject(elem) → Comprueba si un objeto está vacío (sin propiedades propias).
    $.isPlainObject(elem) → Verifica si `elem` es un objeto simple (creado con `{}` o `new Object()`).
    $.isArray(elem) → Devuelve `true` si `elem` es un array.
    $.isNumeric(elem) → Devuelve `true` si `elem` es un número o una cadena que representa un número.
    $.type(elem) → Devuelve el tipo de `elem` como string (Ej: "number", "string", "object").
    */
   var miArray= [1,3,5];
//    alert("isArray: "+ $.isArray(miArray));
//    alert("isFunction: "+ $.isFunction(miArray));
//    alert("type: "+ $.type(miArray));
   //MÉTODOS PARA FECHAS
//    var fechayhora = $.now(); //Milisengundos desde el 1 de enero de 1970
//    alert("Fecha y hora: "+ new Date(fechayhora));
//    //MANEJO DE CADENAS
//    alert("TRIM: *" + $.trim("         espacios al ppio y fin          ") + "*");

   //GUARDAR Y ELIMINAR DATOS EN ELEMENTOS HTML -  si refrescas el  navegador se pierde
   /*
        $.data(elemento, "nombre", valor) → Guarda un dato en un elemento HTML.
        $.data(elemento, "nombre") → Obtiene un dato almacenado en un elemento.
        $.removeData(elemento, "nombre") → Elimina un dato almacenado en un elemento.
    */
    $("#nombre").click(function(){
        $("div").data("nombre","María Ojeda");
    });

    $("#nombre2").click(function(){
        alert($("div").data("nombre"));//Lo muestra si lo encuentra
    });
    $("#nombre3").click(function(){
        $("div").removeData("nombre");
    });
}