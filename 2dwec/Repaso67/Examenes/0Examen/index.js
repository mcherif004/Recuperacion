$(document).ready(function () {

    let cantidadHeroes = 0;     // Contador de héroes añadidos
    let cantidadEnemigos = 0;   // Contador de enemigos añadidos

    // 🔹 Actualizar select de personajes al cambiar el tipo
    $('#tipoPersonaje').on('change', function () {
        let tipo = $(this).val(); // "heroe" o "enemigo"

        if (!tipo) {
            // Si no se selecciona tipo, limpiar el select de personajes
            $('#seleccionarPersonaje').html('<option value="">Selecciona un personaje</option>');
            return;
        }

        // Llamada AJAX con jQuery para cargar personajes según tipo
        $.ajax({
            url: 'php/cargar_personajes.php',
            method: 'GET',
            data: { tipo: tipo },
            dataType: 'json',
            success: function (personajes) {
                $('#seleccionarPersonaje').empty(); // Limpiar el select
                $('#seleccionarPersonaje').append('<option value="">Selecciona un personaje</option>');
                
                // Añadir las opciones al select
                personajes.forEach(function (personaje) {
                    $('#seleccionarPersonaje').append(`
                        <option value="${personaje.nombre}" data-imagen="${personaje.imagen}">${personaje.nombre}</option>
                    `);
                });
            },
            error: function () {
                Swal.fire('Error', 'No se pudieron cargar los personajes', 'error');
            }
        });
    });

    // 🔹 Añadir personaje seleccionado al equipo
    $('#agregarPersonaje').on('click', function () {
        let tipo = $('#tipoPersonaje').val();
        let personaje = $('#seleccionarPersonaje').val();
        let imagen = $('#seleccionarPersonaje option:selected').data('imagen');

        if (!tipo || !personaje) {
            Swal.fire('Atención', 'Debes seleccionar tipo y personaje', 'warning');
            return;
        }

        // Validación: máximo 2 héroes y 1 enemigo
        if (tipo === 'heroe' && cantidadHeroes >= 2) {
            Swal.fire('Límite alcanzado', 'Solo puedes añadir 2 héroes', 'warning');
            return;
        }

        if (tipo === 'enemigo' && cantidadEnemigos >= 1) {
            Swal.fire('Límite alcanzado', 'Solo puedes añadir 1 enemigo', 'warning');
            return;
        }

        // Crear tarjeta visual del personaje
        let tarjeta = `
            <div class="card m-2" style="width: 8rem;">
                <img src="${imagen}" class="card-img-top">
                <div class="card-body p-2">
                    <p class="card-text text-center">${personaje}</p>
                </div>
            </div>
        `;
        $('#personajesSeleccionados').append(tarjeta); // Mostrar en el DOM

        // Incrementar contadores
        if (tipo === 'heroe') cantidadHeroes++;
        if (tipo === 'enemigo') cantidadEnemigos++;
    });

    // 🔹 Cargar aventuras desde el servidor usando Axios (obligatorio)
    function cargarAventuras() {
        axios.get('php/cargar_aventuras.php')
            .then(function (response) {
                let aventuras = response.data;
                $('#tablaAventuras').empty(); // Limpiar la tabla

                // Insertar cada aventura como fila
                aventuras.forEach(function (aventura) {
                    $('#tablaAventuras').append(`
                        <tr>
                            <td>${aventura.mundo}</td>
                            <td>${aventura.heroes}</td>
                            <td>${aventura.enemigo}</td>
                            <td>
                                <button class="btn btn-danger btn-sm eliminarAventura" data-id="${aventura.id}">❌</button>
                            </td>
                        </tr>
                    `);
                });
            })
            .catch(function () {
                Swal.fire('Error', 'No se pudieron cargar las aventuras', 'error');
            });
    }

    cargarAventuras(); // Se llama al cargar la página

    // 🔹 Enviar formulario de aventura (POST + validación)
    $('#aventuraForm').on('submit', function (e) {
        e.preventDefault(); // Evita el envío por defecto

        let nombreMundo = $('#nombreMundo').val().trim();

        // Validaciones básicas
        if (nombreMundo.length < 5) {
            Swal.fire('Error', 'El nombre del mundo debe tener al menos 5 caracteres', 'error');
            return;
        }

        if (cantidadHeroes !== 2 || cantidadEnemigos !== 1) {
            Swal.fire('Error', 'Debes seleccionar 2 héroes y 1 enemigo', 'error');
            return;
        }

        let heroes = [];
        let enemigo = '';

        // Recolectar nombres de personajes desde el DOM
        $('#personajesSeleccionados .card').each(function () {
            let nombre = $(this).find('.card-text').text();
            let img = $(this).find('img').attr('src');

            if (img.includes('heroe')) {
                heroes.push(nombre);
            } else {
                enemigo = nombre;
            }
        });

        // Guardar la aventura (jQuery AJAX POST)
        $.ajax({
            url: 'php/guardar_aventura.php',
            method: 'POST',
            data: {
                nombreMundo: nombreMundo,
                heroe1: heroes[0],
                heroe2: heroes[1],
                enemigo: enemigo
            },
            success: function () {
                Swal.fire('Éxito', 'Aventura guardada correctamente', 'success');

                // Limpiar formulario y variables
                $('#aventuraForm')[0].reset();
                $('#personajesSeleccionados').empty();
                cantidadHeroes = 0;
                cantidadEnemigos = 0;

                cargarAventuras(); // Recargar la tabla
            },
            error: function () {
                Swal.fire('Error', 'No se pudo guardar la aventura', 'error');
            }
        });
    });

    // 🔹 Eliminar aventura (POST con jQuery AJAX)
    $(document).on('click', '.eliminarAventura', function () {
        let id = $(this).data('id'); // ID de la aventura a eliminar

        $.ajax({
            url: 'php/eliminar_aventura.php',
            method: 'POST',
            data: { id: id },
            success: function () {
                Swal.fire('Eliminada', 'La aventura ha sido eliminada', 'success');
                cargarAventuras(); // Recargar tabla
            },
            error: function () {
                Swal.fire('Error', 'No se pudo eliminar la aventura', 'error');
            }
        });
    });

});