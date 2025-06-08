$(inicio);
function inicio(){
    // Metodos para añadir/mover elementos en el DOM
    // append() - Añade contenido al final de los elementos seleccionados
    // prepend() - Añade contenido al principio de los elementos seleccionados
    // after() - Añade contenido después de los elementos seleccionados
    // before() - Añade contenido antes de los elementos seleccionados

//     alert("Crear estructura con append/prepend/after/before");
//     $("div")
//     .append("<div class='hijo'>1.- Append (Añadido al final)</div>")
//     .prepend("<div class='hijo'>2.- Prepend (Añadido al principio)</div>")
//     .before("<div class='hermano'>3.- Before (Añadido antes)</div>")
        //.after("<div class='hermano'>4.- After (Añadido después)</div>");

        // alert("Movemos el primer elemento de la lista al final");
        //$(elemento).appendTo(destino) - Mueve el elemento al final del destino
        // $("ul li:first").appendTo("ul");
        //$(destino).append(elemento) - Añade el elemento al final del destino
        // $("ul").append($("ul li:first"));

        alert("Clonamos el primer elemento de la lista y lo añadimos al final");
        //$(elemento).clone() - Clona el elemento
        $("ul li:first").clone().appendTo("ul");

        // CREACIÓN DE ELEMENTOS
        let enlace1 = $("<a href='http://www.google.com'>Mi enlace</a>");
        let enlace2 = $("<a/>", {
            class: "nuevo",
            href: "http://www.google.com",
            html: "Mi <strong>otro</strong> enlace" // Contenido HTML
        });
        // $("p").append(enlace1); // Añade el enlace al final del parrafo
        // enlace2.appendTo($("p"));

        //.insertAfter() - Añade el contenido después de los elementos seleccionados
        // enlace1.insertAfter($("ul"));
        //.insertBefore() - Añade el contenido antes de los elementos seleccionados
        // enlace2.insertBefore($("ul"));

        //.after()
        $("li").after("<li>Nuevo li</li>");

        // ELIMINAMOS ELEMENTOS
        // remove() - Elimina los elementos seleccionados
        // $("ul").remove();

        // Eliminamos el contenido
        $("div.origen").empty();
}