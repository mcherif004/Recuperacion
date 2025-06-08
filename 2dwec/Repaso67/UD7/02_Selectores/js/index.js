
$(function(){//Esperamos a que se cargue la página
    /**
     * https://api.jquery.com/category/selectors/
     * Para ver el comportamiento de selectores:https://www.w3schools.com/jquery/trysel.asp
    $("p") //seleccionamos por su etiqueta
    $("#primero") //Seleccionamos por su id
    $(".importante") //Seleccionamos por su clase
    $("p[name=primero") //Seleccionamos elementos por atributo
    $("a[target='_blank']") //Seleccionamos por pseudoselectores
     */
    
    var parrafos = $("p"); //Guarda los elementos en ESTE MOMENTO.

    /*EVENTOS*/
    $("p").mouseover(function(){
        //$("p").css("color","red");//Todos los párrafos
        $(this).css("color","red");//Sobre el que he pasado
    });
    $("p").mouseout(function(){
        $(this).css("color","black");
    });
    $("#primero").click(function(){
        alert("Has pulsado sobre el primer párrafo");
    });
    $("p.importante").click(function(){
        alert("Has pulsado sobre el párrafo importante");
    });

})