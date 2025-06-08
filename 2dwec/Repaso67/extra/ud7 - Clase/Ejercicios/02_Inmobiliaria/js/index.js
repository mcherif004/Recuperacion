$(function(){
    obtenerZonas();
    $("#enviar").on("click", validarDatos);
})

function obtenerZonas(){
    let select = $("#zona");
    $.get("php/zonas.php").then(function(response){
        $.each(response.data, function(clave, valor){
            let option = "<option value='" + valor.idzona + "'>" + valor.descripcion +"</option>";
            select.append(option);
        })
    })
}

function validarDatos(e){
    e.preventDefault();
    $(".error").html("");
    let dni = $("#dni").val();
    let zona = $("#zona").children(":selected").val();
    let nhabitaciones = $("input[name='numhab']:checked").val();
    let precio = $("#precio").children(":selected").val();

    if (dni == ""){
        $(".error").html("El dni no puede estar vacio");
        return;
    } else if (zona === ""){
        $(".error").html("Debes elegir una zona");
        return;
    } else if (nhabitaciones === undefined){
        $(".error").html("Debes elegir un numero de habitaciones");
        return;
    } else if (precio === ""){
        $(".error").html("Debes elegir el precio");
        return;
    }

    let tabla = $(".table tbody");
    tabla.empty();

    // Hago la peticion para ver las posibles reservas por ese precio
    $.getJSON(`./php/inmuebles.php?zona=${zona}&habitaciones=${nhabitaciones}&precio=${precio}`).then(function(response){
        $.each(response.data, function(clave, valor){
            let option = $("<tr>").append(
                $("<td>").text(valor.idinmuebles),
                $("<td>").text(valor.domicilio),
                $("<td>").text(`${valor.precio}€`)
              );
            option.on("click", () => {
                option.toggleClass("selected");
            });
            tabla.append(option);
        })

        // Creo El boton grabar
        $(".capaGrabar").html(
            "<button type='button' onclick='reservar()' class='boton btn btn-primary btn-lg mt-3'>Grabar</button>"
        );
    }).fail((error) => {
        console.error("Error al obtener los inmuebles:", error);
        Swal.fire("Error", "No se pudo obtener la lista de inmuebles.", "error");
    }); 
}

function reservar() {
    let seleccionados = $(".selected td:first-child");

    if (seleccionados.length === 0) {
        Swal.fire("Atención", "Debe seleccionar al menos un inmueble para reservar.", "warning");
        return;
    }

    seleccionados.each(function () {
        let datos = {
        dni: $("#dni").val().toUpperCase(),
        inmueble: $(this).text(),
        };

        $.ajax({
        url: "./php/reservas.php",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(datos),
        })
        .done(() => {
            Swal.fire({
            text: "Se ha realizado la reserva",
            icon: "success",
            }).then(() => {
            reload();
            });
        })
        .fail(() => {
            Swal.fire({
            text: "Algo ha salido mal",
            icon: "warning",
            }).then(() => {
            reload();
            });
        });
    });
}

function reload() {
    $(".capaGrabar").empty();
    $("#frm")[0].reset();
    $("tbody").empty();
    $(".is-valid, .is-invalid").removeClass("is-valid is-invalid");
}