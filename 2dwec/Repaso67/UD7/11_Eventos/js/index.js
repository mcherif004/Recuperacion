

$(inicio);//Esperar a que Cargue todo el documento 
function inicio(){
  //Llamada a una función sin parámetros
  // $("p").on("click",mensaje);
  // function mensaje(){
  //   alert("Párrafo pulsado.")
  // }
  //Llamada a una función con parámetros, usando ON
  // $("p").on("click",{
  //   nombre: "María",
  //   apellido: "Ojeda"
  // },mensajeParametros);
  // function mensajeParametros(e){
  //   alert(e.data.nombre + " " + e.data.apellido);
  // }
  //Ejecución de una función anónima con click
  // $("p").on("click",function(){
  //   alert($(this).text());
  // });
  // //El evento se ejecute una sola vez
  // $("p").one("click",function(){
  //     alert($(this).text()+ " ha sido pulsado por primera vez");
  // });
  //Varios eventos asociados al mismo selector con ON
  // $("p").on({
  //   mouseenter: function(){
  //     $(this).css("background-color", "lightgray");
  //   },
  //   mouseleave: function(){
  //     $(this).css("background-color", "lightblue");
  //   },
  //   click: function(){
  //     $(this).css("background-color", "yellow");
  //   }
  // });
  // //Eliminar todos los manejadores de eventos
  // $("#quitarEvento").on("click",function(){
  //   $("p").off();
  // });

  //TRIGGER simular la ejecución de un evento
  $("#cuenta1").on("click",function(){
    $("#contador1").text(parseInt($("#contador1").text()) + 1);
  });

  $("#cuenta2").on("click",function(){
    $("#contador2").text(parseInt($("#contador2").text()) + 1);
    $("#cuenta1").trigger("click");//Simulamos click sobre cuenta1
  });
}