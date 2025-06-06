$(document).ready(function () {
    let jugadorPuntos = 0;
    let oponentePuntos = 0;
    let personajes = [];

    // Parte 1: Cargar países y personajes

    // Cargar países desde get_paises.php
    $.ajax({
        url: "php/get_paises.php",
        method: "GET",
        dataType: "json",
        success: function (data) {
            let selectPais = $("#pais");
            selectPais.empty();
            selectPais.append('<option value="">-- Elige un país --</option>');
            data.forEach(pais => {
                selectPais.append(`<option value="${pais.id}">${pais.nombre}</option>`);
            });
        },
        error: function (error) {
            console.error('Error al cargar los países:', error);
        }
    });

    // Al seleccionar un país, cargar personajes
    $("#pais").change(function () {
        const paisId = $(this).val();
        if (paisId) {
            axios.get(`php/get_personajes.php?pais_id=${paisId}`)
                .then((response) => {
                    personajes = response.data; // Guardar personajes
                    let selectPersonaje = $("#personaje");
                    selectPersonaje.empty();
                    selectPersonaje.append('<option value="">-- Elige personaje --</option>');
                    personajes.forEach(personaje => {
                        selectPersonaje.append(`<option value="${personaje.id}">${personaje.nombre}</option>`);
                    });
                    selectPersonaje.prop("disabled", false);
                })
                .catch(error => {
                    console.error('Error al cargar los personajes:', error);
                });
        } else {
            $("#personaje").empty().append('<option value="">-- Elige personaje --</option>').prop("disabled", true);
            $("#comenzarCombate").prop("disabled", true);
        }
    });

    // Habilitar el botón de comenzar combate al seleccionar un personaje
    $("#personaje").change(function () {
        const personajeSeleccionado = $(this).val();
        $("#comenzarCombate").prop("disabled", personajeSeleccionado === "");
    });

    // Parte 2: Selección de oponente y mostrar detalles
    $("#comenzarCombate").click(function () {
        $("#comenzarCombate").prop("disabled", true);
        const personajeSeleccionado = $("#personaje").val();
        const nombreJugador = $("#personaje option:selected").text();

        $("#nombreJugador").text(nombreJugador);
        $("#imgJugador").attr("src", `img/${nombreJugador.toLowerCase()}.png`);

        // Elegir oponente aleatorio de todos los personajes
        let oponenteSeleccionado;
        do {
            oponenteSeleccionado = personajes[Math.floor(Math.random() * personajes.length)];
        } while (oponenteSeleccionado.id === personajeSeleccionado);

        $("#nombreOponente").text(oponenteSeleccionado.nombre);
        $("#imgOponente").attr("src", `img/${oponenteSeleccionado.nombre.toLowerCase()}.png`);

        $("#seleccion").hide();
        $("#combate").show();
    });

    // Parte 3: Elección de número y lógica de pares o nones
    $("#jugarRonda").click(function () {
        const jugadorNumero = parseInt($("#numero").val());
        const eleccion = $("input[name='eleccion']:checked").val();

        if (!eleccion || isNaN(jugadorNumero) || jugadorNumero < 1 || jugadorNumero > 5) {
            Swal.fire('Error', 'Debes elegir pares o nones y un número entre 1 y 5.', 'error');
            return;
        }

        const oponenteNumero = Math.floor(Math.random() * 5) + 1;
        const suma = jugadorNumero + oponenteNumero;
        let resultado;

        if ((suma % 2 === 0 && eleccion === "pares") || (suma % 2 !== 0 && eleccion === "nones")) {
            resultado = "¡Ganaste!";
            jugadorPuntos++;
        } else {
            resultado = "¡Perdiste!";
            oponentePuntos++;
        }

        $("#resultadoTexto").text(`Tu número: ${jugadorNumero}, Oponente: ${oponenteNumero}. ${resultado}`);
        $("#marcador").text(`Jugador: ${jugadorPuntos} | Oponente: ${oponentePuntos}`);
        $("#resultado").show();

        if (jugadorPuntos === 2 || oponentePuntos === 2) {
            const ganador = jugadorPuntos === 2 ? "Jugador" : "Oponente";
            Swal.fire({
                title: `${ganador} gana el combate!`,
                text: '¡Felicidades!',
                icon: 'success',
                timer: 2000,
                willClose: () => {
                    $("#revancha").show();
                }
            });
            $("#jugarRonda").prop("disabled", true);
        }
    });

    // Parte 6: Revancha
    $("#revancha").click(function () {
        jugadorPuntos = 0;
        oponentePuntos = 0;
        $("#marcador").text(`Jugador: ${jugadorPuntos} | Oponente: ${oponentePuntos}`);
        $("#resultado").hide();
        $("input[name='eleccion']").prop("checked", false);
        $("#numero").val('');
        $("#combate").hide();
        $("#revancha").hide();
        $("#pais").val('').change();
        $("#seleccion").show();
    });
});
