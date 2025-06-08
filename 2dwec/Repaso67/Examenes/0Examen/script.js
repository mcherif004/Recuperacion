$(function () {
    let victoriasJugador = 0;
    let victoriasMaquina = 0;
    let idPersonajeJugador = null;
    let idPersonajeMaquina = null;
    let personajesData = []; // Almacena todos los personajes
    //Cargamos la tabla de combates si hay
    cargarHistorial();
    //Cargar personajes de BBDD
    $.ajax({
        url: "php/get_personajes.php",
        method: "GET",
        dataType: "json",
        success: function (data){
            personajesData = data;

            //Me quedo solo con los planetas
            let planetas = [];
            personajesData.forEach(personaje =>{
                if(planetas.indexOf(personaje.planeta) == -1){//No lo encuetra en el array
                    planetas.push(personaje.planeta);
                }
            });
            // let plantas = new Set();//No permite duplicados
            // personajesData.forEach(personaje =>{
            //     planetas.add(personaje.planeta);
            // })

            //Añado planetas a select
            let selectPlaneta = $("#planeta");
            planetas.forEach(planeta => {
                selectPlaneta.append(`<option value="${planeta}">${planeta}</option>`);
            });
        }
    });
    $("#planeta").change(function(){
        let planetaSeleccionado = $(this).val();
        let selectPersonaje = $("#personaje");
        //Limpiar lo que ya tenía
        selectPersonaje.empty();
        //Primero la opción de selecciona uno
        selectPersonaje.append(`<option value="" disabled selected>Elige un personaje...</option>`);

        let personajesFiltrados;

        //Vamos a carar los personajes dependiendo del planeta 
        if(planetaSeleccionado == "todos"){
            personajesFiltrados  = personajesData.slice();//Hace una copia
        }else{
            personajesFiltrados = [];
            personajesData.forEach(function(personaje){
                if(personaje.planeta == planetaSeleccionado){
                    personajesFiltrados.push(personaje);
                }
            });
        }
        personajesFiltrados.forEach(personaje => {
            selectPersonaje.append(`<option value="${personaje.id}">${personaje.nombre}</option>`);
        });
        //Habilitamos el select
        selectPersonaje.prop("disabled",false);
    });
    $("#personaje").change(function(){
        $("#confirmarPersonaje").prop("disabled",false);
    });

    //Vamos a añadir evento al botón confirmar personaje
    $("#confirmarPersonaje").on("click", function (){
        idPersonajeJugador = $("#personaje").val();
        let personajeTexto = $("#personaje option:selected").text();

        //Filtrar personajes disponibles, todos menos el mío
        let personajesDisponibles = personajesData.filter(p => p.id != idPersonajeJugador);

        //Seleccionamos un personaje aleatorio
        let personajeAleatorio = personajesDisponibles[Math.floor(Math.random() * personajesDisponibles.length)];
        //Los datos del personaje de la máquina
        idPersonajeMaquina = personajeAleatorio.id;
        let personajeMaquinaTexto = personajeAleatorio.nombre;
        let imagenMaquina = "img/" + personajeAleatorio.imagen;

        //Los datos de mi personaje
        let personajeJugardor = personajesData.find(p => p.id == idPersonajeJugador);
        let imagenJugador = "img/" + personajeJugardor.imagen;

        //Mostramos los nombres e imágenes
        $("#jugador1").text(personajeTexto);
        $("#jugador2").text(personajeMaquinaTexto);
        $("#imgJugador1").attr("src",imagenJugador);
        $("#imgJugador2").attr("src",imagenMaquina);

        //Ocultamos y mostramos contenedores
        $("#seleccionPersonaje").hide();
        $("#arena").show();
        $("#seccionJuego").show();
    });

    //Vamos a añadireventos a los botones del juego
    $(".eleccion").on("click",function (){
        let eleccionJugador = $(this).data("eleccion");
        let opciones = ["piedra","papel","tijera"];
        let eleccionMaquina = opciones[Math.floor(Math.random() * opciones.length)];
        //Mostramos las jugadas
        $("#eleccionJugador").text(eleccionJugador);
        $("#eleccionMaquina").text(eleccionMaquina);

        let resultado = "";
        let ganador = null;

        if(eleccionJugador == eleccionMaquina){
            resultado = "Empate!";
        }else if((eleccionJugador == "piedra" && eleccionMaquina == "tijera") || (eleccionJugador == "papel" && eleccionMaquina == "piedra") || (eleccionJugador == "tijera" && eleccionMaquina == "papel")){
            resultado = "Has ganado la ronda!";
            victoriasJugador ++;
            ganador = $("#jugador1").text(); //Nombre del jugador
        }else{
            resultado = "La máquina ha ganado la ronda!";
            victoriasMaquina ++;
            ganador = $("#jugador2").text(); //Nombre del jugador
        }
        $("#resultado").text(resultado);
        $("#marcador").text(victoriasJugador + " - " + victoriasMaquina);

        //Controlamos el fin del juego, si alguien tiene 2 victorias
        if(victoriasJugador == 2 || victoriasMaquina == 2){
            let resultadoFinal;
            let perdedor;
            if(victoriasJugador == 2){
                resultadoFinal = $("#jugador1").text();
                perdedor = "#imgJugador2";
            }else{
                resultadoFinal = $("#jugador2").text();
                perdedor = "#imgJugador1";
            }
            guardarCombate(idPersonajeJugador,idPersonajeMaquina,resultadoFinal);
            //No dejar pedir mas jugadas
            $(".eleccion").prop("disabled",true);
            //efecto de desvanecer
            $(perdedor).fadeOut(2000);

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
    function guardarCombate(personaje1, personaje2,resultado){
        let nombreJugador = $("#jugador1").text();
        let nombreMaquina = $("#jugador2").text();
        $.ajax({
            url: "php/guardar_combate.php",
            method: "POST",
            data:{personaje1: nombreJugador,personaje2: nombreMaquina,resultado: resultado },
            dataType: "json",
            success: function (response){
                if(!response.success){
                    console.error("Error al guardar combate");
                }
                cargarHistorial();//Recargo la tabla otra vez
            }
        });

    }

    function cargarHistorial(){
        axios.get("php/get_historial.php")
        .then(response => {
            let tablaHistorial = $("#tablaHistorial");
            tablaHistorial.empty();//Limpio la tablaantes de añadir

            response.data.forEach((combate,index) => {
                tablaHistorial.append(`
                    <tr>
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
            //Revancha
            $(".revancha").click(function () {
                let fila = $(this).closest("tr"); // Obtener la fila de la tabla
                let jugador1 = fila.find(".col-jugador1").text();
                let jugador2 = fila.find(".col-jugador2").text();
                let fecha = fila.find(".col-fecha").text();
            
                // Eliminar el combate anterior en la base de datos
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
            
                            // Iniciar la revancha con los mismos personajes usando personajesData en lugar de hacer otra petición
                            let personajeJugadorData = personajesData.find(p => p.nombre === jugador1);
                            let personajeMaquinaData = personajesData.find(p => p.nombre === jugador2);
            
                            if (!personajeJugadorData || !personajeMaquinaData) {
                                console.error("Error: No se encontraron los datos de los personajes para la revancha.");
                                return;
                            }
            
                            let imagenJugador = "img/" + personajeJugadorData.imagen;
                            let imagenMaquina = "img/" + personajeMaquinaData.imagen;
            
                            idPersonajeJugador = personajeJugadorData.id;
                            idPersonajeMaquina = personajeMaquinaData.id;
            
                            $("#jugador1").text(jugador1);
                            $("#jugador2").text(jugador2);
                            $("#imgJugador1").attr("src", imagenJugador);
                            $("#imgJugador2").attr("src", imagenMaquina);
            
                            $("#seleccionPersonaje").hide();
                            $("#arena").show();
                            $("#seccionJuego").show(); // MOSTRAR SECCIÓN DE JUEGO
            
                            // Reiniciar las variables de la partida
                            victoriasJugador = 0;
                            victoriasMaquina = 0;
                            $("#marcador").text("0 - 0");
                            $("#resultado").text("");
                        } else {
                            alert("Error al eliminar la partida.");
                        }
                    }
                });
            });






        })
        .catch(error => {
            console.error("Error al cargar el historial de combates", error)
        });
    }
});