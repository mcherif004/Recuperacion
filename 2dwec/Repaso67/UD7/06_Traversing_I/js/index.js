
$(inicio);//Esperar a que Cargue todo el documento 
function inicio(){
    //ASCENDIENTES
    //.parent(): padre directo
    //$("span").parent().css("border","2px solid blue");
    //.parents(): todos los antecesors hasta html
    // $("span").parents().css("border","2px solid blue");
    //.parentsUntil(): todos los antecesores hasta uno en concreto
    // $("span").parentsUntil("div").css("border","2px solid blue");
    //.closest("etiqueta"): antecesor que indico más cercano
    //$("span").closest("ul").css("border","2px solid blue");
    //DESCENDIENTES
    //.children(): devuelve los hijos directos
    //$("li").children().css("border","2px solid red");
    //$("li").children("i.cur").css("border","2px solid red");//Podemos pasar parámetros para especificar el tipo
    //.find(): hijos, nietos.... que cumplan una condición
    //$("div").find("b").css("border","2px solid red");
    //HERMANOS
    //.siblings():todos los hermanos, él mismo NO
    // $("b").siblings().css("border","2px solid green");
    // $("b").next().css("border","2px solid green");//siguiente
    // $("b").prev().css("border","2px solid green");//anterior
    // $("b").prevAll().css("border","2px solid green");
    // $("b").nextAll().css("border","2px solid green");
    //.nextUntil(),prevUntil()
    
}