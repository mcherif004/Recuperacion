$(function(){
    $("#ajax").on("click", function(){
        let nom = $("#nombre").val();
        let apellido = $("#apellido").val();
        let parametros = {
            "nombre": nom,
            "apellido": apellido
        }

        // Realizar la peticion ajax usando jquery
        $.ajax({
            url: "saludo.php",
            method: "POST",
            data: parametros,
            dataType: "text"
        }).then(function(respuesta){
            $("#mostrar").text(respuesta);
        }).fail(function(error){
            console.error("Error en la petición: ", error);
        }).always(function(){
            console.log("Petición finalizada");
        })
    })

    // EVETO get usando 
    $("#enviarGet").on("click", function(){
        $.get("saludo.php", {
            "nombre": "Raúl",
            "apellido": "García"
        }).then(function(respuesta){
            $("#mostrar").text(respuesta);
        }).fail(function(error){
            console.error("Error en la petición: ", error);
        }).always(function(){
            console.log("Petición finalizada");
        })
    })

    // EVETO post usando .on
    $("#enviarPost").on("click", function(){
        $.post("holamundo.php").then(function(respuesta){
            alert("Respuesta: " + respuesta)
        }).fail(function(error){
            console.error("Error en la petición: ", error);
        }).always(function(){
            console.log("Petición finalizada");
        });
        $.post("saludo.php", {
            "nombre": "Raúl",
            "apellido": "García"
        }).then(function(respuesta){
            $("#mostrar").text(respuesta);
        }).fail(function(error){
            console.error("Error en la petición: ", error);
        }).always(function(){
            console.log("Petición finalizada");
        })
    })

    // Obtener JSON del servidor
    $("#getJSON").on("click", function(){
        $.getJSON("json.php").then(function(respuesta){
            $.each(respuesta, function(clave, value){
                alert(clave + ": " + value.nombreColor);
            })
        }).fail(function(error){
            console.error("Error en la petición: ", error);
        })
    })
});