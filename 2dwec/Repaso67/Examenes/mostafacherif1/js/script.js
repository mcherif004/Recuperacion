document.addEventListener("DOMContentLoaded", function () {
    const selectPlaneta = document.getElementById("planeta");
    const selectPersonaje = document.getElementById("personaje");
    const confirmarPersonaje = document.getElementById("confirmarPersonaje");

    const arena = document.getElementById("arena");
    const jugador1Nombre = document.getElementById("jugador1");
    const imgJugador1 = document.getElementById("imgJugador1");
    const jugador2Nombre = document.getElementById("jugador2");
    const imgJugador2 = document.getElementById("imgJugador2");

    let personajes = [];

/*------Parte 1: Cargar personajes desde la base de datos (1 punto)-------*/

    // Hacer la petición AJAX con Axios
    axios.get("php/get_personajes.php")
        .then(response => {
            personajes = response.data;
            let planetasUnicos = new Set(personajes.map(p => p.planeta));

            // Llenar el select de planetas
            planetasUnicos.forEach(planeta => {
                let option = document.createElement("option");
                option.value = planeta;
                option.textContent = planeta;
                selectPlaneta.appendChild(option);
            });

            selectPlaneta.disabled = false;
        })
        .catch(error => {
            console.error("Error al obtener personajes:", error);
            Swal.fire("Error");
        });

    // Manejar cambio de planeta
    selectPlaneta.addEventListener("change", function () {
        const planetaSeleccionado = selectPlaneta.value;
        selectPersonaje.innerHTML = '<option value="" disabled selected>Elige un personaje...</option>';

        let personajesFiltrados = personajes.filter(p => planetaSeleccionado === "todos" || p.planeta === planetaSeleccionado);

        personajesFiltrados.forEach(personaje => {
            let option = document.createElement("option");
            option.value = personaje.id;
            option.textContent = personaje.nombre;
            selectPersonaje.appendChild(option);
        });

        selectPersonaje.disabled = personajesFiltrados.length === 0;
        confirmarPersonaje.disabled = true;
    });

/*------Parte 2: Filtrar personajes por planeta (1 punto)-------*/

    // Botón de selección cuando se elige un personaje
    selectPersonaje.addEventListener("change", function () {
        confirmarPersonaje.disabled = false;
    });

    // Confirmar selección y elegir oponente
    confirmarPersonaje.addEventListener("click", function () {
        const personajeSeleccionadoId = selectPersonaje.value;
        const personajeJugador = personajes.find(p => p.id == personajeSeleccionadoId);

        if (!personajeJugador) {
            Swal.fire("Error");
            return;
        }

/*------Parte 3: Asignar un oponente aleatorio (1 punto)------*/

        // Elegir un oponente aleatorio diferente al personaje seleccionado
        let personajesDisponibles = personajes.filter(p => p.id != personajeJugador.id);
        let personajeOponente = personajesDisponibles[Math.floor(Math.random() * personajesDisponibles.length)];

        if (!personajeOponente) {
            Swal.fire("Error");
            return;
        }

        // Mostrar los personajes en la arena
        jugador1Nombre.textContent = personajeJugador.nombre;
        imgJugador1.src = 'img/' + personajeJugador.imagen;
        imgJugador1.alt = personajeJugador.nombre;

        jugador2Nombre.textContent = personajeOponente.nombre;
        imgJugador2.src = 'img/' + personajeOponente.imagen;
        imgJugador2.alt = personajeOponente.nombre;

        // Mostrar la arena de combate
        arena.style.display = "block";
    });
    
/*------Parte 4: Implementar la lógica de Piedra, Papel o Tijera (2 puntos)------*/

});