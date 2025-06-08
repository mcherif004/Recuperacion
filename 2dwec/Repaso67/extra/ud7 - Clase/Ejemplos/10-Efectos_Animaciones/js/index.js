$(inicio);
function inicio(){
    // ANIMACIONES CON JQUERY
    // $(selector).efecto(velocidad) -> slow, fast, milisegundos
    // Definir una velocidad
    jQuery.fx.speeds.muyRapido = 50;

    // OCULTAR Y MOSTRAR ELEMENTOS
    $("#ocultar").click(function(){
        $("p").hide(1500);
    });

    $("#mostrar").click(function(){
        $("p").show(1500);
    });

    // ALTERNAR LA VISIBILIDAD
    $("#toggle").click(function(){
        $("p").toggle(1500);
    });

    // EFECTOS DE DESVADECIMIENTO
    $("#fadeIn").click(function(){
        $("#div1").fadeIn(); // Aparece inmediatamente
        $("#div2").fadeIn("slow"); // Aparece lentamente
        $("#div3").fadeIn(3000); // Aparece en 3 segundos
    });

    $("#fadeOut").click(function(){
        $("#div1").fadeOut(); // Desaparece inmediatamente
        $("#div2").fadeOut("slow"); // Desaparece lentamente
        $("#div3").fadeOut(3000); // Desaparece en 3 segundos
    });

    // DESVANECIMIENTO CON TOGGLE
    $("#fadeToggle").click(function(){
        $("#div1").fadeToggle(); // Desaparece o aparece inmediatamente
        $("#div2").fadeToggle("slow"); // Desaparece o aparece lentamente
        $("#div3").fadeToggle(3000); // Desaparece o aparece en 3 segundos
    });

    // EFECTOS DESLIZANTES
    $("#slideDown").click(function(){
        $("#panel").slideDown(); // Aparece inmediatamente
    });

    $("#slideUp").click(function(){
        $("#panel").slideUp(); // Desaparece inmediatamente
    });

    // DESLIZAMIENTO CON TOGGLE
    $("#slideToggle").on("click", function(){
        $("#panel").slideToggle(); // Desaparece o aparece inmediatamente
    });

    // ANIMACIONES PERSONALIZADAS
    // $(selector).animate({propiedades}, velocidad, duncion_Callback)
    $("#animar").on("click", function(){
        $("#div1").animate({
            left: "250px",
            opacity: "0.5",
            height: "150px",
            width: "200px"
        })

        // para esperar a que termine la anterior
        $("#div1").delay(2000);

        $("#div1").animate({
            opacity: "1",
            height: "100px",
            width: "100px"
        }, "slow")

        $("#div1").animate({
            fontSize: "+=10",
        }, 2000);
    })

    $("pararAnimacion").on("click", function(){
        $("#div1").stop(true, true); // Termina todas las animaciones y salta al final
    })

    // FUNCIONES CALLBACK
    $("#callback").on("click", function(){
        $("p").hide(3000, function(){
            alert("El párrafo ha sido ocultado");
        })
    });
}