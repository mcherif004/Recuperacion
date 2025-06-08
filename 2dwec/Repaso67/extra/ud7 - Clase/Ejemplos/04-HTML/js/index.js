$(inicio); // Esperar a que cargue todo el documento

function inicio(){
    // EXTRAER INFORMACION DE UN ELEMENTO (Como un GET): paréntesis parametros

    console.log($("p.importante").html());
    console.log($('p.importante').text());
    console.log($("input").val());

    // MODIFICAR INFORMACIÓN DE UN ELEMENTO (Como un SET): paréntesis parametros
    $("p.importante").html("Nuevo texto párrafo 3");
    $("p#primero").html("Nuevo texto párrafo 1");
    $("input").val("Nuevo valor para el input");

    // EXTRAER INFORMACIÓN DE UN ATRIBUTO (GET)
    console.log($("a").attr("href"));

    // MODIFICAR INFORMACIÓN DE UN ATRIBUTO (SET)
    $("a").attr("href", "https://www.iesgrancapitan.org/");
    $("a").attr({
        "title": "Instituto",
        "href": "https://www.iesgrancapitan.org"
    });

    // FUNCIONES CALLBACK: los atributos text, html, val y attr tiene una función callback con dos parámetros indice del elemento actual de la lista y el valor original que tiene
    $("button#cambiar").click(function(){
        $("a").attr("href", function(i, origValue){ // i es el indice
            return origValue + "/nuevo";
        })
    })
}