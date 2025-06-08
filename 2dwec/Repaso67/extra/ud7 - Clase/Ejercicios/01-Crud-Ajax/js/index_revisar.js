// Cargar los contactos al iniciar la página
$(function () {
    $.get("index.php", function (respuesta) {
         let resultados = JSON.parse(respuesta);
         $.each(resultados, function (index, contacto) {
             mostrarRegistro(contacto);
         })
    })
 });
 
 function mostrarRegistro(contacto){
     let cuerpoTablaContactos = $("#tablaContactos tbody");
     // Crear una fila con los datos del contacto y sus botones
     let nuevaFila = "<tr data-id='"+contacto.id+"'>"
     + "<td>"+contacto.firstname+"</td>"
     + "<td>"+contacto.lastname+"</td>"
     + "<td>"+contacto.email+"</td>"
     + "<td><button class='btn btn-primary editar'>Editar</button></td>"
     + "<td><button class='btn btn-danger eliminar'>Eliminar</button></td></tr>";
 
     // Agregar la fila a la tabla
     cuerpoTablaContactos.append(nuevaFila);
 }
 
 // Asignamos eventos a los botones
 $(document).on("click", ".editar", function(){
     let fila = $(this).closest("tr"); // Encuentra la fila más cercana al boton clicado
     editarRegistro(fila);
 });
 
 // CAMBIAR A EDICIÓN
 function editarRegistro(filaActual){
     let filaOriginal = filaActual.clone(); // Guardar la fila original
     let siguienteFila = filaActual.next(); // Guardar la siguiente fila
     let cuerpoTablaContactos = $("#tablaContactos tbody");
     let filaEditable = obtenerFilaEditable(filaActual); // Obtiene la fila en versión editable
     
     filaActual.remove(); // Elimina la fila actual
     if(siguienteFila.children().length){
         $(filaEditable).insertBefore(siguienteFila);
     }//Si era la ultima fila 
     else{
         cuerpoTablaContactos.append(filaEditable);
     }
 
     $("#confirmar_edicion").on("click", function(){
         let filaEditada = $(this).closest("tr");
         let id = filaEditada.attr("data-id");
         let datos = {
             firstName: filaEditada.find("input[name='nombre']").val(),
             lastName: filaEditada.find("input[name='apellido']").val(),
             email: filaEditada.find("input[name='correo']").val() 
         }
 
         // Enviamos datos al servidor
         $.ajax("index.php?id="+id, {
             method: "PUT",
             data: datos,
             success: function(){
                 filaActual.remove(); // Elimino la editable
                 // Actualizo la original con los valores nuevos
                 filaOriginal.children()[0].textContent = datos.firstName;
                 filaOriginal.children()[1].textContent = datos.lastName;
                 filaOriginal.children()[2].textContent = datos.email;
 
                 // Reinserto la fila original con los nuevos valores
                 if(siguienteFila.children().length){
                     $(filaOriginal).insertBefore(siguienteFila);
                 }//Si era la ultima fila 
                 else{
                     cuerpoTablaContactos.append(filaOriginal);
                 }
 
                 Swal.fire("Actualizado", "El contacto ha sido actualizado", "success");
             },
             error: function(){
                 Swal.fire("Error", "Ha ocurrido un error al actualizar el contacto", "error");
             }
         })
     });
 }
 
 function obtenerFilaEditable(filaActual){
     return '<tr data-id="' + filaActual.attr('data-id') + '">' + '<td><input name="nombre" value="'+ filaActual.children()[0].textContent +'"/> </td>' + '<td><input name="apellido" value="'+ filaActual.children()[1].textContent +'"/> </td>' + '<td><input name="correo" value="'+ filaActual.children()[2].textContent +'"/> </td>' + '<td><button id="confirmar_edicion" class="btn btn-success">Confirmar</button> </td>' + '<td><button id="cancelar_edicion" class="btn btn-danger">Cancelar</button> </td>' + '</tr>'; 
 }