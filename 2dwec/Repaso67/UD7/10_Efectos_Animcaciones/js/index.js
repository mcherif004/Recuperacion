

$(inicio);//Esperar a que Cargue todo el documento 
function inicio(){
  //ANIMACIONES EN JQUERY
  //$(delector).efecto(velocidad) -> slow (600), fast(200) o milisegundos
  //Definir una velocidad
  jQuery.fx.speeds.muyRapido = 50;
  
  //OCULTAR Y MOSTRAR ELEMENTOS
  $("#ocultar").click(function(){
    $("p").hide("muyRapido"); //Oculta los párrafos en 1.5 segundos
  });
  $("#mostrar").click(function(){
    $("p").show(1500); 
  });
  $("#toggle").click(function(){
    $("p").toggle(1500); 
  });

  //EFECTOS DE DESVANECIMIENTO -  Apareer y desaparecer
  $("#fadeIn").click(function(){
    $("#div1").fadeIn(); //mostrar inmeditamente
    $("#div2").fadeIn("slow");
    $("#div3").fadeIn(3000);
  });
  $("#fadeOut").click(function(){
    $("#div1").fadeOut(); //ocultar inmeditamente
    $("#div2").fadeOut("slow");
    $("#div3").fadeOut(3000);
  });
  $("#fadeToggle").click(function(){
    $("#div1").fadeToggle(); //ocultar inmeditamente
    $("#div2").fadeToggle("slow");
    $("#div3").fadeToggle(3000);
  });
//EFECTOS DESLIZANTES (slide) - PERSIANA
  $("#slideDown").on("click",function(){
    $("#panel").slideDown(); 
  });
  $("#slideUp").on("click",function(){
    $("#panel").slideUp(); 
  });
  $("#slideToggle").on("click",function(){
    $("#panel").slideToggle(); 
  });

  //ANIMCACIONES PERSONALIZADAS
  //$(selector).animate({propiedades}, velocidad, funciób_callback);
  $("#animar").on("click",function(){
    $("#div1").animate({
      left: '250px',
      opacity: '0.5',
      height: '150px',
      width: '200px'
    });
    //para esperar a que termine la anterior
    $("#div1").delay(2000);

    $("#div1").animate({
      opacity: '1',
      height: '100px',
      width: '100px'
    },"slow");

    $("#div1").animate({
      fontSize: '+=10' //Aumenta el tamaño en 10 px
    },2000);
  });
  $("#pararAnimar").on("click",function(){
    $("#div1").stop(true,true);//Termina todas las animaciones y salta al final
  });

  //FUNCIONES CALLBACK
  $("#callback").on("click",function(){
    $("p").hide(3000, function(){
      alert("El párrafo se ha ocultado.")
    });
  });
}