$(function () { // Esperamos a que se cargue la página
    // .has: opera sobre elementos que contienene otros elementos incluidos en el has
    // $("div#textos").has("p").css("color", "red");

    // .not: opera sobre elementos que no contienen los elementos incuidos
    // console.log($("div").not(".importante").css("color", "blue"));

    // .filter: opera sobre elementos que cumplen la condición
    // $("p").filter(".importante").css("color", "red");

    // .find: devuelve descendientes de un elemento
    // $("div#textos").find("span").css("color", "red");

    // .first, .last: devuelve el primer o ultimo elemento de una lista
    // $("p").first().css("color", "red");
    // $("p").last().css("color", "blue");

    // ENCADENADO DE SELECCIONES
    $("div#textos")
    .find("p")
    .eq(0) // Me quedo con el primero que he encontrado
    .html("Texto cambiado")
    .end() // Vuelvo a empezar con la selección anterior - vuelvo a tener todos los párrafos
    .last()
    .html("Texto cambiado último párrafo");
});