"use strict"

$(function (){
    let personajesArray = []; // ALMACENO TODOS LOS PERONSAJES

    // cargarHistorial();

    $.ajax({
        url: "php/cargar_personajes.php",
        method: "POST",
        dataType: "json",
        success: function (response) {
            
            personajesArray = response; 

            console.log(personajesArray);
        }
    });

    // CARGAMOS LOS PERSONAJES EN FUNCIÓN DEL PLANETA SELECCIONADO
    $("#planeta").change(function() {
        let planetaSel = $(this).val();
        let pj = $("#personaje");

        // LIMPIAMOS LA LISTA DE LOS PERSONAJES PARA QUE NO SE ACUMULEN
        pj.empty();

        // AÑADIMOS LA SELECCIÓN POR DEFECTO
        pj.append(`<option value="" disabled selected>Elige un personaje...</option>`);

        // HABILITAMOS EL BOTÓN
        pj.prop("disabled", false);

        // ARRAY QUE ALMACENARÁ LOS PERSONAJES FILTRADOS
        let seleccionados = [];

        // SI SELECCIONAMOS "TODOS", HARÁ UNA COPIA DEL ARRAY PARA MOSTRAR TODOS LOS PERSONAJES
        if(planetaSel == "todos"){
            seleccionados = personajesArray.slice();
        } else {
            // SI NO, MOSTRAMOS LOS PERSONAJES EN FUNCIÓN DEL PLANETA SELECCIOANDO
            // SI EL PLANETA DEL PERSONAJE SELECCIONADO ES EL MISMO QUE EL PLANETA SELECCIONADO ANTERIORMENTE, AÑADE AL ARRAY DE ANTES EL PERSONAJE
            personajesArray.forEach(function(personaje){
                if(personaje.planeta == planetaSel){
                    seleccionados.push(personaje);
                }
            });
        }
        seleccionados.forEach(personaje => {
            pj.append(`<option value="${personaje.id}">${personaje.nombre}</option>`);
        });

    });

    // CUANDO CAMBIA PERSONAJE, HABILITAR EL BOTÓN DE SELECCIONAR

    $("#personaje").change(function(){
        $("#confirmarPersonaje").prop("disabled", false);
    });

    // CON EL SIGUIENTE EVENTO, VAMOS A OBTENER LOS DATOS TANTO DEL USUARIO COMO DE LA MÁQUINA, LOS VAMOS A PROCESAR Y MOSTRAR EN EL TABLERO DE JUEGO

    $("#confirmarPersonaje").on("click", function(){
        // NECESITAREMOS EL ID DEL PERSONAJE SELECCIONADO Y SU VALOR (NOMBRE)

        idPersonajeJugador = $("#personaje").val();

        // CON LO SIGUIENTE, NOS QUEDAMOS CON EL NOMBRE DEL PERSONAJE SELECCIONADO
        let personajeTexto = $("#personaje option:selected").text();

        // FILTRAMOS LOS PERSONAJES DE NUEVO, ESTO ES PARA DARLE A LA MÁQUINA LOS PERSONAJES MENOS EL NUESTRO
        let personajesDisponibles = personajesArray.filter(p => p.id != idPersonajeJugador);

        // SELECCIONAMOS UN PERSONAJE ALEATORIO QUE USARÁ LA MÁQUINA
        let personajeAleatorio = personajesDisponibles[Math.floor(Math.random() * personajesDisponibles.length)];
        
        // SETEAMOS LOS DATOS DEL PERSONAJE DE LA MÁQUINA
        idPersonajeMaquina = personajeAleatorio.id;
        let personajeMaquinaTexto = personajeAleatorio.nombre;
        let imagenMaquina = "img/" + personajeAleatorio.imagen;


        // SETEAMOS LOS DATOS DE NUESTRO PERSONAJE
        let personajeJugador = personajesArray.find(p => p.id == idPersonajeJugador);
        let imagenJugador = "img/" + personajeJugador.imagen;

        // MOSTRAMOS LOS NOMBRES E IMAGENES
        $("#jugador1").text(personajeTexto);
        $("#jugador2").text(personajeMaquinaTexto);
        $("#imgJugador1").attr("src", imagenJugador);
        $("#imgJugador2").attr("src", imagenMaquina)

        // OCULTAMOS Y MOSTRAMOS CONTENEDORES
        $("#seleccionPersonaje").hide();
        $("#arena").show();
        $("#seccionJuego").show();

    });

    // INTERACTIVIDAD AL TABLERO DE JUEGO
    $(".eleccion").on("click", function(){
        let eleccionJugador = $(this).data("eleccion"); // PARA SABER CUÁL DE LOS TRES HEMOS PULSADO

        let opciones = ["piedra", "papel", "tijera"]; // CARGAMOS LAS OPCIONES PARA LA MAQUINA

        let eleccionMaquina = opciones[Math.floor(Math.random() * opciones.length)];

        let ganador;

        // MOSTRAMOS LA JUGADA
        $("#eleccionJugador").text(eleccionJugador);
        $("#eleccionMaquina").text(eleccionMaquina);

        let resultado = "";
        // COMPROBAMOS TODAS LAS VARIABLES POSIBLES

        if(eleccionJugador == eleccionMaquina){
            resultado = "Empate";
        } else if((eleccionJugador == "piedra" && eleccionMaquina == "tijera") || (eleccionJugador == "papel" && eleccionMaquina == "piedra") || (eleccionJugador == "tijera" && eleccionMaquina == "papel")){
            resultado = "Has ganado la ronda";
            victoriasJugador ++;
            ganador = $("#jugador1").text();
        } else {
            resultado = "La máquina ha ganado la ronda";
            victoriasMaquina ++;
            ganador = $("#jugador2").text();
        }
        $("#resultado").text(resultado);
        $("#marcador").text(victoriasJugador + " - " + victoriasMaquina);

        // COMPROBAMOS EL FIN DEL JUEGO, SI ALGUIEN TIENE 2 VICTORIAS
        if(victoriasJugador == 2 || victoriasMaquina == 2){
            let resultadoFinal;
            let perdedor;

            if(victoriasJugador == 2){
                resultadoFinal = $("#jugador1").text();
                perdedor = "#imgJugador2";
            } else {
                resultadoFinal = $("#jugador2").text();
                perdedor = "#imgJugador1";
            }

            console.log(resultadoFinal);
                    
            guardarCombate(idPersonajeJugador, idPersonajeMaquina, resultadoFinal);

            $(".eleccion").prop("disabled", true);

            $(perdedor).fadeOut(2000);

            // Esperamos 2 segundos y medio y lanzamos el sweet alert
            setTimeout(() => {
                Swal.fire({
                    title: victoriasJugador === 2 ? "¡Ganaste el Torneo Saiyan! " : " La máquina ganó...",
                    text: victoriasJugador === 2 ? "¡Eres el campeón del torneo!" : "¡Inténtalo de nuevo y vence a la máquina!",
                    icon: victoriasJugador === 2 ? "success" : "error",
                    confirmButtonText: "Aceptar",
                    allowOutsideClick: false
                }).then(() => {
                    location.reload(); // Recargar la página después de cerrar SweetAlert
                });
            }, 2500);
        }
    });

    function guardarCombate(personaje1, personaje2, resultado){
        let nombreJugador = $("#jugador1").text();
        let nombreMaquina = $("#jugador2").text();
        $.ajax({
            url: "php/guardar_combate.php",
            method: "POST",
            data: {personaje1: nombreJugador, personaje2: nombreMaquina, resultado: resultado},
            dataType: "json",
            success: function (response){
                if(!response.success){
                    console.error("Error al guardar comabte");
                }
                cargarHistorial(); // RECARGO LA TABLA
            }
        });
    }

    function cargarHistorial() {
        axios.get("php/get_historial.php")
            .then(response => {
                // Guardamos la tabla
                let tablaHistorial = $("#tablaHistorial");
                tablaHistorial.empty(); // Limpio la tabla antes de añadir
                // Recorremos la respuesta y cogemos cada combate
                response.data.forEach((combate, index) => {
                    tablaHistorial.append(`
                    <tr>
                        <td>${combate.id}</td>
                        <td class="col-jugador1">${combate.personaje1}</td>
                        <td class="col-jugador2">${combate.personaje2}</td>
                        <td>${combate.resultado}</td>
                        <td class="col-fecha">${combate.fecha}</td>
                        <td>
                            <button class="btn btn-warning btn-sm revancha">🔄 Revancha</button>
                        </td>
                    </tr>
                `);
                });
                // Añadimos evento al botón de la revancha
                $(".revancha").click(function () {
                    let fila = $(this).closest("tr"); // Obtener la fila de la tabla
                    // Obtenemos los jugadores
                    let jugador1 = fila.find(".col-jugador1").text();
                    let jugador2 = fila.find(".col-jugador2").text();
                    // Obtenemos la fecha de combate
                    let fecha = fila.find(".col-fecha").text();
                    // Elimino el combate anterior en la base de datos
                    $.ajax({
                        url: "php/eliminar_combate.php",
                        method: "POST",
                        data: { personaje1: jugador1, personaje2: jugador2, fecha: fecha },
                        dataType: "json",
                        success: function (response) {
                            console.log(response.message);
                            if (response.success) {
                                // Si la eliminación es exitosa, eliminar la fila de la tabla
                                fila.remove();
                                // Iniciamos la revancha con los mismos personaje usando Personaje data en lugar de hacer otra petición
                                let personajeJugadorData = personajesArray.find(p => p.nombre === jugador1);
                                let personajeMaquinaData = personajesArray.find(p => p.nombre === jugador2);
                               
                                // Si no se encuentran los datos, lanzamos un error
                                if (!personajeJugadorData || !personajeMaquinaData) {
                                    console.error("Error: No se encontraron los datos de los personajes para la revancha");
                                    return;
                                }

                                // Creamos de nuevo las variables para el combate;

                                let imagenJugador = "img/" + personajeJugadorData.imagen;
                                let imagenMaquina = "img/" + personajeMaquinaData.imagen;
                
                                idPersonajeJugador = personajeJugadorData.id;
                                idPersonajeMaquina = personajeMaquinaData.id;
                                // Mostramos los nombres e imagenes
                                $("#jugador1").text(jugador1);
                                $("#jugador2").text(jugador2);
                                $("#imgJugador1").prop("src", imagenJugador);
                                $("#imgJugador2").prop("src", imagenMaquina);

                                // OCULTAMOS LA SELECCION DE PERSONAJE Y MOSTRAMOS LA ARENA
                                $("#seleccionPersonaje").hide();
                                $("#arena").show();
                                $("#seccionJuego").show();

                                // Reiniciamos las variables de la partida
                                victoriasJugador = 0;
                                victoriasMaquina = 0;
                                $("#marcador").text("0-0");
                                $("#resultado").text("");
                            }else{// Si la respuesta no es correcta, lanzamos el error
                                alert("Error al eliminar la partida");
                            }
                        }
                    });
                });
            }) // Si no podemos guardar la tabla, lanzamos el error
            .catch(error =>{
                console.error("Error al cargar el historial de combates",error);
            });
    }
});