"use strict";

$(() => {
  listarZonas(); // Mostramos las zonas disponibles
  $("#enviar").on("click", validarFormulario); // Validación del formulario
});

//Función que muestra las zonas disponibles en el menú desplegable
function listarZonas() {
  $.getJSON("./php/zonas.php")
    .done((response) => {
      let data = response.data;
      let $selectZona = $("#zona");
      data.forEach((zona) => {
        $("<option>", {
          value: zona.idzona,
          text: zona.descripcion,
        }).appendTo($selectZona);
      });
    })
    .fail((error) => console.error("Error al obtener zonas:", error));
}

//Función para validar el formulario con jQuery
function validarFormulario(event) {
  event.preventDefault(); // Evita que el formulario se envíe automáticamente

  let $dni = $("#dni");
  let $zona = $("#zona");
  let $precio = $("#precio");
  let $numHabSeleccionado = $("input[name='numhab']:checked");

  let errores = [];
  // Resetear estilos previos
  $(".error-borde").removeClass("error-borde");

  // Validar DNI
  if (!validarDNI($dni.val().trim())) {
    errores.push("El DNI ingresado no es válido.");
    $dni.closest(".input-group").find(".input-group-text").addClass("error-borde");
    //Usamos $dni[0] porque obtienes un objeto jQuery, que es una colección de elementos DOM aquneu solo haya uno, devuelve una lista
    //$dni[0].setCustomValidity("El DNI ingresado no es válido.");//Personalizo el mensaje que se va a mostrar
  } 

  //Validar zona seleccionada
  if ($zona.val() === "") {
    errores.push("Debe seleccionar una zona.");
    $zona.closest(".input-group").find(".input-group-text").addClass("error-borde");
  } 

  // Validar número de habitaciones seleccionado
  if ($numHabSeleccionado.length === 0) {
    errores.push("Debe seleccionar un número de habitaciones.");
    $("input[name='numhab']")
      .closest(".input-group")
      .find(".input-group-text")
      .addClass("error-borde");
  }


  // Validar precio
  if ($precio.val() === "") {
    errores.push("Debe seleccionar un precio máximo.");
    $precio.closest(".input-group").find(".input-group-text").addClass("error-borde");
  } 

  // Si hay errores, mostramos una alerta con SweetAlert y detenemos el envío del formulario
  if (errores.length > 0) {
    Swal.fire("Errores en el formulario", errores.join("<br>"), "warning");
  } else {
    // Si todo está correcto, enviamos la solicitud
    mostrarInmuebles($zona.val(), $numHabSeleccionado.val(), $precio.val());
  }


  // Eliminar la clase de error cuando el usuario cambie el valor
  $("#dni, #zona, #precio, input[name='numhab']").on("input change", function () {
    $(this).closest(".input-group").find(".input-group-text").removeClass("error-borde");
    $(this).closest(".form-check").find("label").removeClass("error-borde");
  });
}
//Función que comprueba si el DNI es válido
function validarDNI(dni) {
  let letras = "TRWAGMYFPDXBNJZSQVHLCKE"; // Letras válidas del DNI

  // Comprobamos que el formato sea correcto (8 números + 1 letra)
  if (!/^\d{8}[A-Z]$/.test(dni)) {
    return false;
  }

  let numero = parseInt(dni.slice(0, 8), 10); // Convertimos los primeros 8 caracteres a número
  let letra = dni.slice(-1).toUpperCase();

  // Validamos si la letra corresponde al número del DNI
  return letra === letras[numero % 23];
}



//Función que muestra los inmuebles disponibles en la tabla
function mostrarInmuebles(zona, habitaciones, precio) {
  let $tbody = $("tbody"); // Seleccionamos el cuerpo de la tabla
  $tbody.empty(); // Limpiamos los resultados previos

  $.getJSON(`./php/inmuebles.php?zona=${zona}&habitaciones=${habitaciones}&precio=${precio}`)
    .done((data) => {
      if (data.data.length === 0) {
        Swal.fire("Sin resultados", "No hay inmuebles disponibles para los filtros seleccionados.", "info");
        return;
      }

      // Iteramos sobre los inmuebles y los agregamos a la tabla
      data.data.forEach((inmueble) => {
        let $fila = $("<tr>").append(
          $("<td>").text(inmueble.idinmuebles),
          $("<td>").text(inmueble.domicilio),
          $("<td>").text(`${inmueble.precio}€`)
        );

        $fila.on("click", () => {
          $fila.toggleClass("selected");
        });

        $tbody.append($fila);
      });

      // Agregar botón para reservar
      $(".capaGrabar").html(
        "<button type='button' onclick='reservar()' class='boton btn btn-primary btn-lg mt-3'>Grabar</button>"
      );
    })
    .fail((error) => {
      console.error("Error al obtener los inmuebles:", error);
      Swal.fire("Error", "No se pudo obtener la lista de inmuebles.", "error");
    });
}

//Función que reserva los inmuebles seleccionados
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

//Función que recarga el formulario
function reload() {
  $(".capaGrabar").empty();
  $("#frm")[0].reset();
  $("tbody").empty();
  $(".is-valid, .is-invalid").removeClass("is-valid is-invalid");
}
