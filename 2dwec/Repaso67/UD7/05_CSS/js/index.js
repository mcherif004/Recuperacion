
$(inicio);//Esperar a que Cargue todo el documento 
function inicio(){
    //EXTRAER PROPIEDADES CSS
    //1- Utilizando estios de css
    console.log($("h1").css("font-size"));
    //2- Utilizando formato CamelCase - CORRECTA
    console.log($("h1").css("fontSize"));

    //MODIFICAR PROPIEDADES CSS
    //Una sola propiedad
    $("h1").css("fontSize","60px");
    console.log($("h1").css("fontSize"));
    //Varias propiedades
    $("h1").css({
        "fontSize":"40px",
        "color":"pink"
    });
    console.log($("h1").css("fontSize"));

    //MODIFICAR CLASES CSS
    $("h3").addClass("verde");
    $("h3").removeClass("verde");
    //$("h3").toggleClass("verde");
    console.log($("h3").hasClass("verde"));//Devuelve true o false
    
}