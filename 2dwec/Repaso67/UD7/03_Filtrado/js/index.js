
$(function(){//Esperamos a que se cargue la página
   //.has:opera sobre elementos que contienen otros elementos incluidos en el has
   //$("div#textos").has("p").css("color","red");
   //.not: opera sobre elemntos que NO contienen otros elementos indluidos
   //$("p").not(".importante").css("color","red");
   //.filter: opera en elementos que coninciden con mi búsqueda
   //$("p").filter(".importante").css("color","red");
   //.find: devuelve descendientes de un elemento
   //$("div#textos").find("span").css("color","red");
   //.first, .last: Devuelve el primer o último elemento de una lista
   //$("p").first().css("color","red");
   //$("p").last().css("color","blue");

   //ENCADENADO DE SELECCIONES - OJO! Es potente pero confuso...
   $("div#textos")
   .find("p")
   .eq(0)//Me quedo el primero de los que ha encontrado
   .html("Texto cambiado de párrafo primero")
   .end()//Vuelvo a empezar con la selección anterior - vuelvo a tener todos los párrafos
   .last()
   .html("Texto cambiado de párrafo último")
})