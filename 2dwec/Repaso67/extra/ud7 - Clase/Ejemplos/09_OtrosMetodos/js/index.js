$(inicio);
function inicio(){
    // MÉTODOS DE TIPOS EN JQUERY
    // isFunction() - Comprueba si el objeto es una función
    // .isNumeric() - Comprueba si el objeto es un número
    // .isPlainObject() - Comprueba si el objeto es un objeto plano
    // .isArray() - Comprueba si el objeto es un array
    // .isEmptyObject() - Comprueba si el objeto está vacío
    // type() - Devuelve el tipo de objeto
    // let miArray = [1,2,5];
    // alert("isArray: " + $.isArray(miArray));
    // alert("isPlainObject: " + $.isPlainObject(miArray));
    // alert("type: " + $.type(miArray));

    // MÉTODOS DE FECHAS EN JQUERY
    // let fechaHora = $.now(); // Milisegundos desde 1970
    // alert("Fecha y hora: " + new Date(fechaHora));

    // MANEJO DE CADENAS
    // alert("TRIM: " + $.trim("  Hola Mundo  "));

    // GUARDAR Y ELIMINAR DATOS EN ELEMENTOS HTML
    /**
     * $.data(elemento, clave, valor) - Guarda un valor en un elemento HTML
     * $.removeData(elemento, clave) - Elimina un valor de un elemento HTML
     * $.data(elemento, clave) - Obtiene un valor de un elemento HTML
     */

    $("#nombre").click(function(){
        $("div").data("nombre", "Raúl Bermúdez");
    });

    $("#nombre2").click(function(){
        alert($("div").data("nombre"));
    });

    $("#nombre3").click(function(){
        $("div").removeData("nombre");
    });
}