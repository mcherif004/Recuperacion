$(inicio);

function inicio() {
    // Llamada a una función sin parámetros
    // $("p").on("click", mensaje);
    // function mensaje(){
    //     alert("Has hecho click en un párrafo");
    // }

    // Llamada a una función con parámetros, usando ON
    // $("p").on("click", {
    //     nombre: "Raúl",
    //     apellido: "Bermúdez"
    // }, mensajeParametros);
    // function mensajeParametros(e){
    //     alert(e.data.nombre + " " + e.data.apellido);
    // }

    // Ejecución de una función anónima con click
    // $("p").on("click", function(){
    //     alert($(this).text());
    // })

    // El evento se ejute una sola vez
    // $("p").one("click", function(){
    //     alert($(this).text());
    // })

    // Varios eventos asociados al mismo selector on
    $("p").on({
        mouseenter: function(){
            $(this).css("background-color", "lightgray");
        },
        mouseleave: function(){
            $(this).css("background-color", "lightblue");
        },
        click: function(){
            $(this).css("background-color", "yellow");
        }
    })

    // Eliminar todos los manejadores de eventos
    $("#quitarEvento").on("click", function(){
        $("p").off();
    })

    // Trigger simular la ejecución de un evento
    $("#cuenta1").on("click", function(){
        $("#contador1").text(parseInt($("#contador1").text()) + 1);
    })

    $("#cuenta2").on("click", function(){
        $("#contador2").text(parseInt($("#contador2").text()) + 1);
        $("#cuenta1").trigger("click");
    })
}