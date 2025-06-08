$(function(){
    obtenerCategorias();
    $(".grabar").css("display", "none");
    $("#categorias").on("change", obtenerEventos);
    // Gestiono un evento para que cuando se quite el foco llame a una funcion
    $("#cdgCli").on("blur", comprobarCliente);
    $("#entradas").on("input", validarEntrada);
    $(".anadir").on("click", validarDatos);
    $(".grabar").on("click", guardarBaseDatos);
});

function comprobarCliente(){
    // Obtengo el valor del input de tipo nombre
    let id = $("#cdgCli").val();
    let nombre = $("#nameCli");

    // Hago la peticion AJAX con jQuery
    $.get("php/cliente.php", {
        "cliente": id
    }).then(function(respuesta){
        if (respuesta.data.length === 1){
            nombre.val(respuesta.data[0].nomApe);
        } else{
            nombre.val("Cliente no registrado");
        }
    }).fail(function(error){
        console.error("Error en la petición: ", error);
    })
}

function obtenerCategorias(){
    axios.get("php/categorias.php")
    .then((response) => {
        let json = response.data;
        let select = $("#categorias");
        let final = json.data.sort();
        final.forEach(element => {
            select.append("<option value="+ element.id + ">"+element.descripcion + "</option>")
        });
    })
}

async function obtenerEventos(){
    let valor = $("#categorias").children(":selected");
    let id = valor.val();
    try{
        let response = await axios.get("php/eventos.php", { params: { "categoria": id } });
        json = await response.data;
        let select = $("#eventos");
        // Limpio los options
        select.empty();
        select.append("<option value=''>Seleccione eventos</option>");
        // response.data.data.sort((a, b) => a.descripcion.localeCompare(b.descripcion));
        json.data.forEach((respuesta) =>{
            select.append("<option value="+ respuesta.id + ">"+ respuesta.descripcion + "</option>");
        });
    }catch (error) {
        console.log("Tenemos un error: ", error.response.status)
    }
}

async function validarEntrada(){
    $(".errorAforo").html("");
    $(".anadir").prop("disabled", false);
    let id = $("#categorias").children(":selected").val();
    let idEvento = $("#eventos").children(":selected").val();
    let valorEntradas = $("#entradas").val();
    let entradas;
    try{
        let response = await axios.get("php/eventos.php", { params: { "categoria": id } });
        json = await response.data;
        json.data.forEach((respuesta) =>{
            if(respuesta.id == idEvento){
                entradas = respuesta.entradas;
            }
        });
        if (valorEntradas > entradas){
            $(".errorAforo").html("Las entradas disponibles son: " + entradas);
            $(".anadir").prop("disabled", true);
        }
    } catch(error){
        console.log("Tenemos un error: ", error.response.status)
    }
}

async function validarDatos(e){
    e.preventDefault();
    $("#error").html("");
    let id = $("#cdgCli").val();
    let nombreCliente = $("#nameCli").val();
    let fecha = new Date($("#fecha").val());
    let categoria = $("#categorias").children(":selected").val();
    let evento = $("#eventos").children(":selected").val();
    let entradas = $("#entradas").val();
    let descripcion = $("#eventos").children(":selected").text();

    if (id === ""){
        $("#error").html("El id del cliente no puede estar vacio");
        return;
    } else if (nombreCliente === "Nombre del cliente" || nombreCliente == "Cliente no registrado"){
        $("#error").html("Revisa el id del cliente, no existe ese cliente");
        return;
    } else if (isNaN(fecha.getTime())){
        $("#error").html("La fecha introducida no tiene el formato correcto"); 
        return;
    } else if (categoria === ""){
        $("#error").html("Debes seleccionar una categoria");
        return;
    } else if(evento === ""){
        $("#error").html("Debes seleccionar un evento");
        return;
    } else if (isNaN(entradas) || entradas <= 0){
        $("#error").html("Debes seleccionar al menos una entrada");
        return;
    }

    // Si es verdadero
    let precio;
    let response = await axios.get("php/eventos.php", { params: { "categoria": categoria } });
        json = await response.data;
        json.data.forEach((respuesta) =>{
            if(respuesta.id == evento){
                precio = respuesta.precioEntrada;
            }
        });
    let tabla = $(".table-condensed tbody");

    let fila = "<tr data-cliente='" + id + "' data-evento='"+evento+"' data-fecha='" + fecha + "'><td>" + descripcion + "</td><td>"+ entradas +"</td><td>" + precio +"</td><td>" + precio * entradas + "</td></tr>";

    tabla.append(fila);
    $(".grabar").css("display", "block");

    // una vez que esta todo añadido limpio el valor de los inputs
    $("#cdgCli").val("");
    $("#nameCli").val("");
    $("#fecha").val("");
    $("#categorias").val("");
    $("#eventos").empty().append("<option value=''>Seleccione eventos</option>");
    $("#entradas").val("");
    $(".errorAforo").html("");
    $(".anadir").prop("disabled", false);
}

function guardarBaseDatos(){
    let tabla = $(".table-condensed tbody tr");
    // Recogemos los datos de la tabla
    const table = $('.table tbody tr');

    // Por cada fila ejecutamos una petición AJAX
    table.each(function (index, element) {
        let usuario = $(tabla[index]).attr("data-cliente");
        let idEvento =  $(tabla[index]).attr("data-evento");
        let entradas =  parseInt($(tabla[index]).children().eq(1).text());
        let precioUnitario =  parseInt($(tabla[index]).children().eq(2).text());
        let fecha= $(tabla[index]).attr("data-fecha")

        // Realizamos la petición AJAX
        axios.post('php/compra.php', new URLSearchParams({
            usuario: usuario,
            idEvento: idEvento,
            entradas: entradas,
            precioUnitario: precioUnitario,
            fecha: fecha
        }))
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                // Si hay un error, lo mostramos por consola
                console.error(error);
        });

        let evento = $(tabla[index]).attr("data-evento");

        // Actualizamos el número de entradas en la base de datos
        axios.post('php/actualizarEntradas.php', new URLSearchParams({
            evento: evento,
            tickets: entradas
        }));
    });

    Swal.fire({
        title: '¡Éxito!',
        text: 'Todos los datos se han guardado correctamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
    });
}