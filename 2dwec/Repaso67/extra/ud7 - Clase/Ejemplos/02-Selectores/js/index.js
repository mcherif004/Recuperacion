$(function () { // Esperamos a que se cargue la página
    /**
     * https://api.jquery.com/category/selectors/
     * Para ver el comportamiento de selectores: https://www.w3schools.com/jquery/trysel.asp
     * ${"p"} // Seleccionamos su etiqueta
     * ${"#primero"} // Seleccionamos su id
     * ${".importante"} // Seleccionamos su clase
     * $("p[name='primero']") // Seleccionamos su atributo
     * ${"a[target='_blank']"} // Seleccionamos pseudoselectores
     */
   
    let parrafos = $("p"); // Guarda los elementos en este momento

    // Eventos
    $("p").mouseover(function() {
        // $("p").css("color", "red"); // Todos los párrafos
        $(this).css("color", "red"); // El párrafo que se está pasando por encima
    })
    $("p").mouseout(function() {
        // $("p").css("color", "black"); // Todos los párrafos
        $(this).css("color", "black"); // El párrafo que se está pasando por encima
    })
    $("p#primero").click(function() {
        alert("Has hecho click en el primer párrafo");
    })
    $("p.importante").click(function() {
        alert("Has hecho click en un párrafo importante");
    })
});