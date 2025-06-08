$(inicio);
function inicio(){
    // ASCENDIENTES
    //.parent() -> padre directo
    // $("span").parent().css("border", "2px solid blue");
    //.parents() -> todos los padres
    // $("span").parents().css("border", "2px solid blue");
    //.parentsUntil() -> todos los padres hasta un punto
    // $("span").parentsUntil("div").css("border", "2px solid blue");
    // .closest("etiqueta") -> antecesor que indico mas cercano
    // $("span").closest("ul").css("border", "2px solid blue");

    // DESCENDIENTES
    //.children() -> hijos directos
    // $("li").children().css("border", "2px solid blue");
    // Podemos pasar parametros para especificar
    // $("li").children("i.cur").css("border", "2px solid red");
    //.find() -> todos los descendientes que cumplan una condicion
    // $("ul").find("i").css("border", "2px solid blue");
    // .sibblings() -> hermanos sin el elemento
    // $("b").siblings().css("border", "2px solid blue");
    // .next() -> siguiente hermano
    // prev() -> hermano anterior
    // $("b").next().css("border", "2px solid blue");
    // $("b").prev().css("border", "2px solid blue");
    // .nextAll() -> todos los hermanos siguientes
    // .prevAll() -> todos los hermanos anteriores
    // $("b").nextAll().css("border", "2px solid blue");
    // $("b").prevAll().css("border", "2px solid blue");
    // .nextUntil() -> todos los hermanos siguientes hasta un punto
    // .prevUntil() -> todos los hermanos anteriores hasta un punto
    // $("b").nextUntil("i").css("border", "2px solid blue");
    // $("b").prevUntil("i").css("border", "2px solid blue");
}