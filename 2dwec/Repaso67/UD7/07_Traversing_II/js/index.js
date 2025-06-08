
$(inicio);//Esperar a que Cargue todo el documento 
function inicio(){
    // Métodos para añadir/mover elementos en el DOM:
    // - .append(): añade un elemento al final como hijo
    // - .prepend(): añade un elemento al inicio como hijo
    // - .before(): añade un elemento antes del seleccionado como hermano
    // - .after(): añade un elemento después del seleccionado como hermano
    // alert("Crear estructura con append/prepend/bofore/after");
    // $("div")
    // .append("<div class='hijo'>1. Append (Añadido al final)</div>")
    // .prepend("<div class='hijo'>2. prepend (Añadido al inicio)</div>")
    // .before("<div class='hermano'>3. before (Añadido antes como hermano)</div>")
    // .after("<div class='hermano'>4. after (Añadido después como hermano)</div>");

    // alert("Movemos el primer elemento de la lista al final");
    //$(elemento).appendTo(destino): mueve el elemento dentro de otro al final
    //$("ul li:first").appendTo("ul");
    //$(destino).append(element): añade un elemento al final del destino
    // $("ul").append($("ul li:first"));
    // alert("Cclonamosel primer elemento de la lista y lo añadimos al final");
    // $("ul li:first").clone().appendTo("ul");

    //CREACIÓN  DE ELEMENTOS
    var enlace1 = $("<a href='http://www.google.com'>Mi enlace</a>");
    var enlace2 = $('<a/>',{
        html: "Mi <strong>otro</strong> enlace", //Contenido HTML
        class: "nuevo",
        href: "http://www.google.com"
    });
    // $("p").append(enlace1);//añade el enlace al final del párrafo
    // // enlace2.appendTo($("p"));

    // //.insertAfter(), insertBefore()
    // enlace1.insertBefore("ul");
    //.after()
    $("li").after("<li>Nuevo LI</li>");

    //ELIMINAR ELEMENTOS
    alert("Borramos la lista completa");
    $("ul").remove();
    //Eliminar el contenido
    $("div.origen").empty();
}