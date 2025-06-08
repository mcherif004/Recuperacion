// Se ejecuta la función cuando el DOM está completamente cargado
$(function () {
    $("#ajax").on("click",function(){
        var nom = $("#nombre").val();//Obtenermos el valor del input id="nombre"
        var apellido = $("#apellido").val();
        var parametros = {
            "nombre" : nom,
            "apellido": apellido
        };

        //Realizar la petición AJAX usando JQuery
        $.ajax({
            url: "saludo.php",
            method: "POST",
            data: parametros,
            dataType: "text"
        }).then(function(respuesta){
            $("#mostrar").text(respuesta);
        }).fail(function(error){
            console.error("Error con la petición: "+ error);
        }).always(function(){
            console.log("Petición realizada.");
            
        });
    });
    //EVENTO get usando .on()
    $("#enviarGet").on("click",function(){
        $.get("saludo.php",{
            "nombre": "Antonio",
            "apellido": "Ojeda Solís"
        }).then(function(respuesta){
            $("#mostrar").text(respuesta);
        }).fail(function(error){
            console.error("Error con la petición: "+ error);
        });
    });

    //EVENTO post usando .on
    $("#enviarPost").on("click",function(){
        $.post("holamundo.php")
            .then(function (respuesta){
                alert("Respuesta: "+ respuesta);
            })
            .fail(function(){
                alert("Error con POST y holamundo.php");
            });
        $.post("saludo.php",{
            "nombre": "Antonio",
            "apellido": "Ojeda Solís"
        }).then(function(respuesta){
            $("#mostrar").text(respuesta);
        }).fail(function(error){
            console.error("Error con la petición POST: "+ error);
        });
    });

    //Obtener JSON del servidor
    $("#getJSON").on("click",function(){
        $.getJSON("json.php")
            .then(function(respuesta){
                $.each(respuesta, function(clave,valor){
                    alert(clave + ": "+ valor.nombreColor);
                });
            })
            .fail(function(){
                console.error("Error con la lectura de JSON.");
            });
    });
});
