// Cargar los contactos al iniciar la pÃ¡gina
$(function () {
    $.get("index.php", (response) => {
        let responses = JSON.parse(response);
        $.each(responses, (i, response) => {
            mostrarRegistro(response);
        });
    })

    function mostrarRegistro(response){
        let cuerpo = $("tbody");
        // crear una fila con los datos del contacto
        let fila = $("<tr data-id=" + response.id + ">");
        fila.append($("<td>").text(response.firstname));
        fila.append($("<td>").text(response.lastname));
        fila.append($("<td>").text(response.email));
        fila.append($("<td><button class='btn btn-primary editar'>Editar</button></td>"));
        fila.append($("<td><button class='btn btn-danger eliminar'>Eliminar</button></td>"));
        // agregar la fila al cuerpo de la tabla

        cuerpo.append(fila);
        
    }

    // asignamos eventos a los botones
    $(document).on("click",".editar", function () {
        let fila = $(this).closest("tr");
        
        editarRegistro(fila);
    });

    //edirar registro
    function editarRegistro(fila){
        let filaOriginal = fila.clone();
        let siguiente = fila.next();
        let cuerpoTablaContactos = $("#tablaContactos tbody");
        let filaEditable = obtenerFilaEditable(fila);

        fila.remove();
        if(siguiente.children().length){
            $(filaEditable).insertBefore(siguiente);
        } else {
            cuerpoTablaContactos.append(filaEditable);
        }

        // definir los eventos de los dos nueos botones
        $((".confirmar_edicion")).on("click", function () {
            let fila = $(this).closest("tr");
            let id = fila.attr("data-id");
            let datos = {
                firstname : fila.find("input[name='nombre']").val(),
                lastname : fila.find("input[name='apellido']").val(),
                email : fila.find("input[name='correo']").val()
            };
            $.ajax('index.php?id=' + id, {
                method: 'PUT',
                data: datos,
                success: function(response){
                    fila.remove();
                    filaOriginal.children().eq(0).text(datos.firstname);
                    filaOriginal.children().eq(1).text(datos.lastname);
                    filaOriginal.children().eq(2).text(datos.email);

                    //reinserto la fila original con los datos actualizados
                    if(siguiente.children().length){
                        $(filaOriginal).insertBefore(siguiente);
                    } else {
                        cuerpoTablaContactos.append(filaOriginal);
                    }
                    Swal.fire("Actualizado", "El contacto ha sido actualizado", "success");
                },
                error: function(){
                    Swal.fire("Error", "Ha ocurrido un error", "error");
                }
            });
        });$(".cancelar_edicion").on("click", function () {
            let fila = $(this).closest("tr");
            fila.remove();
            if(siguiente.children().length){
                $(filaOriginal).insertBefore(siguiente);
            } else {
                cuerpoTablaContactos.append(filaOriginal);
            }
        });
    }

    function obtenerFilaEditable(fila, response){
        return '<tr data-id="' + fila.attr('data-id') + '">' + '<td><input name="nombre" value="'+ fila.children()[0].textContent +'"/> </td>' + '<td><input name="apellido" value="'+ fila.children()[1].textContent +'"/> </td>' + '<td><input name="correo" value="'+ fila.children()[2].textContent +'"/> </td>' + '<td><button class="btn btn-success confirmar_edicion">Confirmar</button> </td>' + '<td><button class="btn btn-danger cancelar_edicion">Cancelar</button> </td>' + '</tr>';
    }

    // Eliminar una fila
    $(document).on("click", ".eliminar", function(){
        let fila = $(this).closest("tr");
        let id = fila.attr("data-id");
        let nombre = fila.children().eq(0).text();
        let apellido = fila.children().eq(1).text();

        // Debemos preguntarle al usuario si eta seguro
        Swal.fire({
            title: "¿Estás seguro?",
            text: "Vas a eliminar a '" + nombre + " " + apellido +"'. Esta acción no se puede deshacer.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: 'index.php?id=' + id,
                    type: 'DELETE',
                    success: function(){
                        fila.fadeOut(3000, function(){
                            $(this).remove();
                        });
                        Swal.fire("Eliminado", "El contacto ha sido eliminado: " + nombre + " " + apellido, "success");
                    }, error: function(){
                        Swal.fire("Error", "Ha ocurrido un error", "error");
                    }
                })
            }
        })
        
    });

    // Vamos a agregar un nuevo contacto
    $("#nuevo_contacto").on("click", function(){
        $("#nuevo_contacto").prop("disabled", true);

        // Agregamos una fila editable sin valores
        $("#tablaContactos tbody").append('<tr>' + '<td><input name="nombre" value=""/> </td>' + '<td><input name="apellido" value=""/> </td>' + '<td><input name="correo" value=""/> </td>' + '<td><button class="btn btn-success confirmar_nuevo">Confirmar</button> </td>' + '<td><button class="btn btn-danger cancelar_nuevo">Cancelar</button> </td>' + '</tr>');

        // Definimos los eventos de los botones
        let nuevaFila = $("#tablaContactos tbody").children().last();

        $(".confirmar_nuevo").on("click", function(){
            let nombre = nuevaFila.find("input[name='nombre']").val();
            let apellido = nuevaFila.find("input[name='apellido']").val();
            let correo = nuevaFila.find("input[name='correo']").val();

            if (nombre === "" || apellido === "" || correo === "") {
                Swal.fire("Error", "Todos los campos son obligatorios", "warning");
                return;
            }

            let datosPOST = {
                firstname: nombre,
                lastname: apellido,
                email: correo
            }

            $.post("index.php", datosPOST, function(response){
                nuevaFila.remove(); // Elimino la nueva fila
                datosPOST.id = response;
                mostrarRegistro(datosPOST);
                Swal.fire("Agregado", "El contacto ha sido agregado", "success");
            }).fail(function(){
                Swal.fire("Error", "Ha ocurrido un error", "error");
            });
            $("#nuevo_contacto").prop("disabled", false);
        });

        $(".cancelar_nuevo").on("click", function(){
            nuevaFila.remove();
            $("#nuevo_contacto").prop("disabled", false);
        });
    })
    
});