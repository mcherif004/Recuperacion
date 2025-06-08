
$(inicio);//Esperar a que argue todo el documento 
function inicio(){
    //EXTRAER INFORMACIÓN DE UN ELEMENTO (Como un GET): paréntesis sin parámetros
    console.log($("p.importante").html());
    console.log($("p.importante").text());
    console.log($("input").val());
    
    //MODIFICAR INFORMACIÓN (SET): valor entre paréntesis
    $("p.importante").html("Nuevo texto párrafo 3");
    $("p#primero").text("Nuevo texto párrafo 1");
    $("input").val("Nuevo valor para el input");

    //EXTRAER INFORMACIÓN DE UN ATRIBUTO (GET)
    console.log($("a").attr("href"));

    //MODIFICAR INFORMACIÓN DE ATRIBUTOS
    //$("a").attr("href","https://www.iesgrancapitan.org/");//Solo un atributo
    $("a").attr({
        "tittle": "Todos los enlaces",
        "href":"https://www.iesgrancapitan.org"
    });

    //FUNCIONES CALLBACK: los métodos text, html, val y attr tiene una función callback con dos parámetros:el índice del elemento actual de la lista y el valor original que tiene
    $("button#cambiar").click(function(){
        $("a").attr("href",function(i,hrefOriginal){//i es el índice 0, 1 y 2
            return hrefOriginal + "/nuevo";
        });
    });
}