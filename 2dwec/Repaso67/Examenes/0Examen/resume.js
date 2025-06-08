// index_template.js
// Plantilla completa para gestionar personajes según “planeta” (Examen 1) y según “tipo” (Examen 2).
// Incluye múltiples validaciones y bucles para facilitar su edición rápida.

// ------------------------------
// 1) VARIABLES CONFIGURABLES
// ------------------------------

// URL de los endpoints PHP
const URL_GET_PERSONAJES    = 'php/get_personajes.php';     // Devuelve todos los personajes (id, nombre, planeta, imagen)
const URL_CARGAR_PERSONAJES  = 'php/cargar_personajes.php'; // Devuelve personajes filtrados por tipo (id, nombre, imagen)

// Selectores de elementos del DOM (modificar si cambian los IDs en el HTML)
const SELECTOR_PLANETA          = '#planeta';               // Select que muestra planetas
const SELECTOR_PERSONAJE        = '#personaje';             // Select que muestra personajes filtrados por planeta
const SELECTOR_TIPO_PERSONAJE   = '#tipoPersonaje';         // Select que elige el tipo de personaje (heroe/enemigo)
const SELECTOR_SELECCION_PERSONAJE = '#seleccionarPersonaje'; // Select que muestra personajes filtrados por tipo

const BOTON_CONFIRMAR_PERSONAJE = '#confirmarPersonaje';    // Botón para confirmar personaje (Examen 1)
const BOTON_AGREGAR_PERSONAJE   = '#agregarPersonaje';      // Botón para agregar personaje a la lista (Examen 2)

// Contenedores donde se mostrarán los personajes/cards
const CONTENEDOR_PERSONAJES_SELECCIONADOS = '#personajesSeleccionados'; 
const CONTENEDOR_ARENA                  = '#arena';               // Contenedor de arena de juego (Examen 1)
const CONTENEDOR_SECCION_JUEGO          = '#seccionJuego';        // Sección donde ocurre el juego (Examen 1)

// Parámetros de validación (editar según necesidades)
const NOMBRE_MIN_LENGTH       = 3;                 // Longitud mínima de nombre
const NOMBRE_MAX_LENGTH       = 20;                // Longitud máxima de nombre
const PATRON_SOLO_LETRAS      = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/; // Solo letras y espacios
const PATRON_SIN_ESPACIOS_NUM  = /^\d+$/;         // Solo números (ejemplo: validar edad si fuera necesario)

// ------------------------------
// 2) VARIABLES GLOBALES
// ------------------------------

// Almacena todos los personajes obtenidos desde get_personajes.php
let personajesData = []; 

// Contadores de ejemplo para Examen 1 (victorias) y Examen 2 (cantidad de héroes/enemigos)
let victoriasJugador = 0;
let victoriasMaquina = 0;

let cantidadHeroes   = 0;
let cantidadEnemigos = 0;

// IDs de personaje seleccionados (Examen 1)
let idPersonajeJugador = null;
let idPersonajeMaquina = null;

// ------------------------------
// 3) INICIO: Ejecutar cuando el DOM está listo
// ------------------------------
$(document).ready(function() {
    // =======================================
    // BLOQUE A: Gestión de personajes por PLANETA (Examen 1)
    // =======================================
    
    // A)  Petición AJAX para obtener todos los personajes de la BD
    $.ajax({
        url: URL_GET_PERSONAJES,
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            // Guardar todos los personajes en la variable global
            personajesData = data; 

            // B) Extraer todos los planetas únicos
            let planetas = [];
            // Usamos forEach para iterar sobre personajesData
            personajesData.forEach(function(personaje) {
                if (planetas.indexOf(personaje.planeta) === -1) {
                    planetas.push(personaje.planeta);
                }
            });
            // Alternativa con for...of:
            // for (let pers of personajesData) {
            //     if (!planetas.includes(pers.planeta)) {
            //         planetas.push(pers.planeta);
            //     }
            // }

            // C) Poblar el <select id="planeta">
            let selectPlaneta = $(SELECTOR_PLANETA);
            // Opción inicial para elegir “todos”
            selectPlaneta.append('<option value="todos">Todos los planetas</option>');
            // Recorrer cada planeta y añadir una opción
            for (let i = 0; i < planetas.length; i++) {
                let p = planetas[i];
                selectPlaneta.append('<option value="' + p + '">' + p + '</option>');
            }

            // D) Agregar evento al cambio de select de planetas
            selectPlaneta.on('change', function() {
                let planetaSeleccionado = $(this).val();

                // LIMPIAR y deshabilitar select de personaje mientras se procesa
                let selectPersonaje = $(SELECTOR_PERSONAJE);
                selectPersonaje.empty();
                selectPersonaje.prop('disabled', true);

                // VALIDACIÓN: comprobar que se haya elegido algo
                if (!planetaSeleccionado) {
                    alert('Debes seleccionar un planeta.'); 
                    return;
                }

                // E) Filtrar personajes según planeta
                let personajesFiltrados = [];
                if (planetaSeleccionado === 'todos') {
                    // Copiar todos los personajes
                    personajesFiltrados = personajesData.slice();
                } else {
                    // Iterar y agregar los que coincidan
                    personajesFiltrados = personajesData.filter(function(personaje) {
                        return personaje.planeta === planetaSeleccionado;
                    });
                }

                // F) Poblar <select id="personaje"> con los personajes filtrados
                selectPersonaje.append('<option value="" disabled selected>Elige un personaje...</option>');
                personajesFiltrados.forEach(function(pers) {
                    selectPersonaje.append(
                        '<option value="' + pers.id + '">' + pers.nombre + '</option>'
                    );
                });

                // Habilitar el select de personaje después de rellenar
                selectPersonaje.prop('disabled', false);
            });

            // G) Evento: cuando se elige un personaje, habilitar el botón confirmar
            $(SELECTOR_PERSONAJE).on('change', function() {
                $(BOTON_CONFIRMAR_PERSONAJE).prop('disabled', false);
            });
        },
        error: function() {
            console.error('Error al cargar personajes desde ' + URL_GET_PERSONAJES);
        }
    });

    // H) Evento: click en botón “confirmarPersonaje” para iniciar el juego (Examen 1)
    $(BOTON_CONFIRMAR_PERSONAJE).on('click', function() {
        // Obtener ID y nombre del personaje seleccionado
        idPersonajeJugador = $(SELECTOR_PERSONAJE).val();
        let nombreJugador   = $(SELECTOR_PERSONAJE + ' option:selected').text();

        // VALIDACIÓN: asegurarse de que existe un valor seleccionado
        if (!idPersonajeJugador || !nombreJugador) {
            alert('Selecciona un personaje antes de confirmar.');
            return;
        }

        // I) Elegir personaje aleatorio para la “máquina”
        let personajesDisponibles = personajesData.filter(function(p) {
            return p.id != idPersonajeJugador;
        });
        // VALIDACIÓN: comprobar que haya al menos un personaje disponible
        if (personajesDisponibles.length === 0) {
            alert('No hay personajes disponibles para la máquina.');
            return;
        }
        let indiceAleatorio = Math.floor(Math.random() * personajesDisponibles.length);
        let personajeAleatorio = personajesDisponibles[indiceAleatorio];
        idPersonajeMaquina = personajeAleatorio.id;
        let nombreMaquina    = personajeAleatorio.nombre;
        let imagenMaquina    = 'img/' + personajeAleatorio.imagen;

        // J) Obtener imagen de tu personaje
        let personajeJugadorObj = personajesData.find(function(p) {
            return p.id == idPersonajeJugador;
        });
        let imagenJugador = 'img/' + personajeJugadorObj.imagen;

        // K) Mostrar nombres e imágenes en la UI
        $('#jugador1').text(nombreJugador);
        $('#jugador2').text(nombreMaquina);
        $('#imgJugador1').attr('src', imagenJugador);
        $('#imgJugador2').attr('src', imagenMaquina);

        // L) Ocultar selección de personaje y mostrar área de juego
        $('#seleccionPersonaje').hide();
        $(CONTENEDOR_ARENA).show();
        $(CONTENEDOR_SECCION_JUEGO).show();
    });

    // =======================================
    // BLOQUE B: Gestión de personajes por TIPO (Examen 2)
    // =======================================

    // A) Evento: cambio en select de tipo de personaje
    $(SELECTOR_TIPO_PERSONAJE).on('change', function() {
        let tipoSeleccionado = $(this).val().trim();

        // VALIDACIÓN: comprobar que no esté vacío
        if (!tipoSeleccionado) {
            alert('Debes seleccionar un tipo de personaje.');
            return;
        }

        // Limpiar y deshabilitar select de personajes por tipo
        let selectTipoPers = $(SELECTOR_SELECCION_PERSONAJE);
        selectTipoPers.empty();
        selectTipoPers.prop('disabled', true);

        // B) Petición AJAX para obtener personajes filtrados por tipo
        $.ajax({
            url: URL_CARGAR_PERSONAJES,
            method: 'GET',
            data: { tipo: tipoSeleccionado },
            dataType: 'json',
            success: function(personajes) {
                // VALIDACIÓN: comprobar que la respuesta sea un array
                if (!Array.isArray(personajes)) {
                    console.error('La respuesta no es un arreglo:', personajes);
                    return;
                }

                // C) Agregar opción inicial al select
                selectTipoPers.append('<option value="" disabled selected>Escoge personaje</option>');

                // D) Recorrer respuesta y poblar el select
                personajes.forEach(function(pers) {
                    selectTipoPers.append(
                        '<option value="' + pers.nombre + '" data-imagen="' + pers.imagen + '">' +
                        pers.nombre +
                        '</option>'
                    );
                });

                // E) Habilitar el select de personajes
                selectTipoPers.prop('disabled', false);
            },
            error: function() {
                console.error('Error al cargar personajes desde ' + URL_CARGAR_PERSONAJES);
                alert('No se pudieron cargar los personajes por tipo.'); 
            }
        });
    });

    // B) Evento: click en botón “AgregarPersonaje” para añadir tarjeta (Examen 2)
    $(BOTON_AGREGAR_PERSONAJE).on('click', function() {
        let tipoActual       = $(SELECTOR_TIPO_PERSONAJE).val().trim();
        let nombrePersonaje  = $(SELECTOR_SELECCION_PERSONAJE).val();
        let rutaImagen       = $(SELECTOR_SELECCION_PERSONAJE + ' option:selected').data('imagen');

        // VALIDACIÓN 1: comprobar que tipo y personaje estén seleccionados
        if (!tipoActual || !nombrePersonaje) {
            alert('Selecciona tipo y personaje antes de agregar.');
            return;
        }

        // VALIDACIÓN 2 (LONGITUD): comprobar longitud mínima y máxima
        if (nombrePersonaje.length < NOMBRE_MIN_LENGTH || nombrePersonaje.length > NOMBRE_MAX_LENGTH) {
            alert('El nombre debe tener entre ' + NOMBRE_MIN_LENGTH + ' y ' + NOMBRE_MAX_LENGTH + ' caracteres.');
            return;
        }

        // VALIDACIÓN 3 (PATRÓN): solo letras y espacios
        if (!PATRON_SOLO_LETRAS.test(nombrePersonaje)) {
            alert('El nombre solo puede contener letras y espacios.');
            return;
        }

        // C) Construir tarjeta HTML con los datos
        let tarjetaHTML = ''
            + '<div class="card m-2" style="width: 8rem;">'
            +   '<img src="' + rutaImagen + '" class="card-img-top" alt="Imagen de ' + nombrePersonaje + '">'
            +   '<div class="card-body p-2">'
            +     '<p class="card-text text-center">' + nombrePersonaje + '</p>'
            +   '</div>'
            + '</div>';

        // D) Agregar la tarjeta al contenedor
        $(CONTENEDOR_PERSONAJES_SELECCIONADOS).append(tarjetaHTML);

        // E) Actualizar contadores de héroes/enemigos según el tipo
        if (tipoActual.toLowerCase() === 'heroe') {
            cantidadHeroes++;
        } else if (tipoActual.toLowerCase() === 'enemigo') {
            cantidadEnemigos++;
        }
    });

    // =======================================
    // BLOQUE C: Lógica de juego y guardado (Ejemplo parcial Examen 1)
    // =======================================
    
    // A) Evento para las jugadas de Piedra, Papel o Tijera
    $('.eleccion').on('click', function() {
        let eleccionJugador = $(this).data('eleccion');
        let opciones = ['piedra', 'papel', 'tijera'];
        let eleccionMaquina = opciones[Math.floor(Math.random() * opciones.length)];

        // Mostrar las elecciones
        $('#eleccionJugador').text(eleccionJugador);
        $('#eleccionMaquina').text(eleccionMaquina);

        // B) Determinar resultado de la ronda
        let resultado = '';
        let ganador = null;

        if (eleccionJugador === eleccionMaquina) {
            resultado = 'Empate!';
        } else if (
            (eleccionJugador === 'piedra' && eleccionMaquina === 'tijera') ||
            (eleccionJugador === 'papel'  && eleccionMaquina === 'piedra') ||
            (eleccionJugador === 'tijera' && eleccionMaquina === 'papel')
        ) {
            resultado = 'Has ganado la ronda!';
            victoriasJugador++;
            ganador = $('#jugador1').text();
        } else {
            resultado = 'La máquina ha ganado la ronda!';
            victoriasMaquina++;
            ganador = $('#jugador2').text();
        }

        $('#resultado').text(resultado);
        $('#marcador').text(victoriasJugador + ' - ' + victoriasMaquina);

        // C) Comprobar si alguien llegó a 2 victorias
        if (victoriasJugador === 2 || victoriasMaquina === 2) {
            let resultadoFinal, selectorPerdedor;
            if (victoriasJugador === 2) {
                resultadoFinal = $('#jugador1').text();
                selectorPerdedor = '#imgJugador2';
            } else {
                resultadoFinal = $('#jugador2').text();
                selectorPerdedor = '#imgJugador1';
            }

            // Guardar resultado en BD
            guardarCombate(idPersonajeJugador, idPersonajeMaquina, resultadoFinal);

            // Deshabilitar botones de elección y animar desaparición
            $('.eleccion').prop('disabled', true);
            $(selectorPerdedor).fadeOut(2000);

            // Mostrar alerta final y recargar
            setTimeout(function() {
                Swal.fire({
                    title: victoriasJugador === 2 ? '¡Ganaste!' : 'La máquina ganó',
                    text: victoriasJugador === 2 ? '¡Eres el campeón!' : 'Intenta de nuevo',
                    icon: victoriasJugador === 2 ? 'success' : 'error',
                    confirmButtonText: 'OK',
                    allowOutsideClick: false
                }).then(function() {
                    location.reload();
                });
            }, 2500);
        }
    });

    // B) Función para guardar combate en BD (Examen 1)
    function guardarCombate(personaje1Id, personaje2Id, resultado) {
        // VALIDACIÓN: comprobar que los IDs existan y el resultado no esté vacío
        if (!personaje1Id || !personaje2Id || !resultado) {
            console.error('Datos insuficientes para guardar combate.');
            return;
        }

        $.ajax({
            url: 'php/guardar_combate.php',
            method: 'POST',
            data: {
                personaje1: personaje1Id,
                personaje2: personaje2Id,
                resultado: resultado
            },
            dataType: 'json',
            success: function(response) {
                if (!response.success) {
                    console.error('Error al guardar el combate:', response.message);
                }
                cargarHistorial(); // Recargar tabla de historial después de guardar
            },
            error: function() {
                console.error('Falló la petición para guardar_combate.php');
            }
        });
    }

    // C) Función para cargar historial de combates (Examen 1)
    function cargarHistorial() {
        axios.get('php/get_historial.php')
        .then(function(response) {
            let tablaHistorial = $('#tablaHistorial');
            tablaHistorial.empty();

            // Recorrer datos y agregar filas
            response.data.forEach(function(combate) {
                tablaHistorial.append(
                    '<tr>'
                    +   '<td class="col-jugador1">' + combate.personaje1 + '</td>'
                    +   '<td class="col-jugador2">' + combate.personaje2 + '</td>'
                    +   '<td>' + combate.resultado + '</td>'
                    +   '<td class="col-fecha">' + combate.fecha + '</td>'
                    +   '<td><button class="btn btn-warning btn-sm revancha">Revancha</button></td>'
                    + '</tr>'
                );
            });

            // Asignar evento de revancha a cada botón recién creado
            $('.revancha').on('click', function() {
                let fila = $(this).closest('tr');
                let jugador1 = fila.find('.col-jugador1').text();
                let jugador2 = fila.find('.col-jugador2').text();
                let fecha    = fila.find('.col-fecha').text();

                // Petición para eliminar combate anterior
                $.ajax({
                    url: 'php/eliminar_combate.php',
                    method: 'POST',
                    data: {
                        personaje1: jugador1,
                        personaje2: jugador2,
                        fecha: fecha
                    },
                    dataType: 'json',
                    success: function(resp) {
                        if (resp.success) {
                            fila.remove();
                            // Reiniciar arena con los mismos personajes para revancha
                            let pj1Data = personajesData.find(p => p.nombre === jugador1);
                            let pj2Data = personajesData.find(p => p.nombre === jugador2);
                            if (!pj1Data || !pj2Data) {
                                console.error('Error: datos de personajes para revancha no encontrados.');
                                return;
                            }
                            idPersonajeJugador = pj1Data.id;
                            idPersonajeMaquina = pj2Data.id;
                            $('#jugador1').text(jugador1);
                            $('#jugador2').text(jugador2);
                            $('#imgJugador1').attr('src', 'img/' + pj1Data.imagen);
                            $('#imgJugador2').attr('src', 'img/' + pj2Data.imagen);
                            $('#seleccionPersonaje').hide();
                            $(CONTENEDOR_ARENA).show();
                            $(CONTENEDOR_SECCION_JUEGO).show();
                            victoriasJugador = 0;
                            victoriasMaquina = 0;
                            $('#marcador').text('0 - 0');
                            $('#resultado').text('');
                        } else {
                            alert('No se pudo eliminar el combate.');
                        }
                    },
                    error: function() {
                        console.error('Error en petición para eliminar_combate.php');
                    }
                });
            });
        })
        .catch(function(error) {
            console.error('Error al cargar historial de combates:', error);
        });
    }

    // D) Llamar inicialmente a cargarHistorial para llenar la tabla al cargar la página
    cargarHistorial();
});