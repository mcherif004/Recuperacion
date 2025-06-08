$(function(){
    // Al cargar la página obtengo personajes y el historial de partidas
    obtenerPersonajes();
    mostrarHistorial();
    let nVictorias = 0;
})

function mostrarHistorial(){
    // Solicito por GET el historial de partidas para mostrarlo en la tabla
    axios.get("php/get_historial.php")
    .then(function(response){
        // Obtengo la tabla donde se mostrará el historial
        let tabla = $("#tablaHistorial");
        // Recorro la respuesta y añado una fila por cada partida
        $.each(response.data, function(clave, valor){
            let fila = "<tr><td></td><td>" + valor.personaje1 + "</td><td>" + valor.personaje2 + "</td><td>" + valor.resultado + "</td><td>" + valor.fecha + "</td><td>No</td></tr>";
            tabla.append(fila);
        })
    })
}

function obtenerPersonajes(){
    // Creo un conjunto para almacenar los planetas sin repetir
    let conjuntoPlanetas = new Set();
    // Solicito por GET la lista de personajes
    $.get("php/get_personajes.php").then(function(response){
        // Divido la respuesta en un array separando por ":"
        let array = response.split(":");
        let contador = 0;
        // Recorro el array, y sé que en la posición 3 está el planeta
        $.each(array, function(clave, valor){
            if (contador === 3){
                conjuntoPlanetas.add(valor.split(",")[0]);
                contador = 0;
            } else {
                contador++;
            }
        })
        // Recorro el conjunto de planetas y creo las opciones del select
        conjuntoPlanetas.forEach(valor => {
            let value = valor.split('"')[1];
            let opcion = "<option value='" + value + "'>" + value + "</option>";
            $("#planeta").append(opcion);
        });
    })

    // Añado evento para habilitar el segundo select cuando se elige un planeta
    $("#planeta").on("change", habilitarBoton);
}

function habilitarBoton (){
    // Si hay un planeta seleccionado, cargo los personajes
    let value = $("#planeta").children(":selected").val();
    if (value != ""){
        let personajes = [];
        // Solicito los personajes por GET
        $.get("php/get_personajes.php").then(function(response){
            let array = response.split(":");
            let contador = 0;
            // Sé que en la posición 2 está el nombre del personaje
            $.each(array, function(clave, valor){
                if (contador == 2){
                    personajes.push(valor.split(",")[0]);
                } else if (contador == 3){
                    contador = 0;
                } else {
                    contador++;
                }
            })
            // Limpio los datos y selecciono personajes válidos
            let personajesFinal = [];
            contador = 0;
            personajes.forEach((indice) => {
                if (contador == 0 || contador == 4){
                    personajesFinal.push(indice);
                    contador = 1;
                } else {
                    contador++;
                }
            })
            // Añado las opciones al select de personajes
            personajesFinal.forEach((valor) =>{
                let nvalor = valor.split('"')[1];
                let opcion = "<option value='" + nvalor.toLowerCase() + ".webp'>" + nvalor + "</option>";
                $("#personaje").append(opcion);
            })
        })
        // Habilito el select de personajes
        $("#personaje").prop("disabled", false);
        // Evento para empezar el combate al seleccionar personaje
        $("#personaje").on("change", empezarCombate);
    }
}

function empezarCombate(){
    // Habilito el botón de confirmar personaje
    $("#confirmarPersonaje").prop("disabled", false);
    // Al confirmar personaje, se lanza la batalla
    $("#confirmarPersonaje").on("click", comenzarBatalla);
}

function comenzarBatalla(){
    // Oculto la sección de selección y muestro la arena de combate
    $("#seleccionPersonaje").css("display", "none");
    $("#arena").css("display", "block");
    $("#seccionJuego").css("display", "block");

    // Obtengo personaje seleccionado y configuro las imágenes y nombres
    let select = $("#personaje").children(":selected").val().toLowerCase();
    let nombre = $("#personaje").children(":selected").text();
    $("#jugador1").html(nombre);
    $("#imgJugador1").prop("src", "img/" + select);

    $("#jugador2").html("Goku");
    $("#imgJugador2").prop("src", "img/goku.webp");

    // Configuro eventos para los botones de piedra, papel y tijera
    $("#piedra").on("click", () => {
        $("#piedra").toggleClass("selected");
        elegir();
        $("#piedra").toggleClass("selected");
    });
    $("#papel").on("click", () => {
        $("#papel").toggleClass("selected");
        elegir();
        $("#papel").toggleClass("selected");
    });
    $("#tijera").on("click", () => {
        $("#tijera").toggleClass("selected");
        elegir();
        $("#tijera").toggleClass("selected");
    });
}

function elegir(){
    // Obtengo la elección del jugador
    let seleccionados = $(".selected");
    $("#eleccionJugador").html(seleccionados.html());

    // Genero jugada aleatoria del oponente
    let arrayValores = ["✂", "📜", "🪨"];
    let numero = 0;
    do {
        numero = Math.round(Math.random() * 10);
    } while (numero > 3 || numero < 0);
    let oponente = arrayValores[numero];
    $("#eleccionMaquina").html(oponente);

    // Comparo elecciones y actualizo marcador
    if ($("#eleccionJugador").html() == $("#eleccionMaquina").html()){
        alert("Empate");
    } else if($("#eleccionJugador").html() == "📜"){
        if ($("#eleccionMaquina").html() == "🪨"){
            actualizarMarcadorJugador();
        } else {
            actualizarMarcadorOponente();
        }
    } else if($("#eleccionJugador").html() == "🪨"){
        if ($("#eleccionMaquina").html() == "📜"){
            actualizarMarcadorOponente();
        } else {
            actualizarMarcadorJugador();
        }
    } else if($("#eleccionJugador").html() == "✂"){
        if ($("#eleccionMaquina").html() == "📜"){
            actualizarMarcadorJugador();
        } else {
            actualizarMarcadorOponente();
        }
    }

    // Compruebo si hay ganador
    let marcador = $("#marcador").html();
    if (marcador[0] == 2){
        Swal.fire({ text: "Ha ganado el jugador", icon: "success" });
        $("#imgJugador2").fadeOut(3000);
        deshabilitarBotones();
        meterInfoCombate("jugador");
    } else if (marcador[4] == 2){
        Swal.fire({ text: "Ha ganado el oponente", icon: "error" });
        $("#imgJugador1").fadeOut(3000);
        deshabilitarBotones();
        meterInfoCombate("oponente");
    }
}

function actualizarMarcadorJugador(){
    let marcador = $("#marcador").html();
    if (marcador[0] == 0){
        $("#marcador").html("1 - " + marcador[4]);
    } else {
        $("#marcador").html("2 - " + marcador[4]);
    }
}

function actualizarMarcadorOponente(){
    let marcador = $("#marcador").html();
    if (marcador[4] == 0){
        $("#marcador").html(marcador[0] + " - 1");
    } else {
        $("#marcador").html(marcador[0] + " - 2");
    }
}

function deshabilitarBotones(){
    $("#piedra").prop("disabled", true);
    $("#papel").prop("disabled", true);
    $("#tijera").prop("disabled", true);
}

function meterInfoCombate(ganador){
    // Obtengo nombres de los personajes
    let personaje1 = $("#jugador1").text();
    let personaje2 = $("#jugador2").text();
    // Determino quién ha ganado
    if(ganador == "oponente"){
        ganador = personaje2;
    } else {
        ganador = personaje1;
    }
    // Envío los datos del combate a la base de datos con axios
    axios.post("php/guardar_combate.php", new URLSearchParams({
        personaje1: personaje1,
        personaje2: personaje2,
        resultado: ganador
    }))
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.error(error);
    });
}