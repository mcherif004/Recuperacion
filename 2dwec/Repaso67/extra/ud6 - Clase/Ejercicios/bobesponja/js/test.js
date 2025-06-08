// Evento que espera la carga del documento para ejeccutar las funciones
document.addEventListener("DOMContentLoaded", () => {
    
    cargarPersonajes();
    document.getElementById("consultar").addEventListener("click", consultarPersonaje)
})

// Funcion para la carga de los personajes
async function cargarPersonajes() {
    // Select donde van los personajes
    let select = document.getElementById("nombrePersonaje");
    // No se que es esto
    let resultado = document.getElementById("resultado");
    //uso de axios para la peticion
    try {
        // Promesa
        let response = await axios.get("index.php", {
            params: {action: "listarPersonajes"}
        });
        // Se vacia el select
        select.innerHTML = "";
        // Bucle con la creacion de cada opcion (DOM)
        response.data.forEach(personaje => {
            let option = document.createElement("option");
            option.value = personaje.nombre;
            option.textContent = personaje.nombre;
            select.appendChild(option);
        })
    } catch (error) {
        resultado.innerHTML = "Error al cargar el personaje";
    }
}

// Funcion para consultar perosnajes
async function consultarPersonaje() {
    let nombre = document.getElementById("nombrePersonaje").value;
    let resultado = document.getElementById("resultado");
    try {
        let response = await axios.get("index.php", {
            params: {nombre: nombre}
        });

        let personaje = response.data[0];

        resultado.innerHTML = `
        <h3>Información del Personaje</h3>
        <p><strong>Nombre:</strong> ${personaje.nombre}</p>
        <p><strong>Ocupación:</strong> ${personaje.ocupacion}</p>
        <p><strong>Tipo:</strong> ${personaje.tipo}</p>
        <p><strong>Puntuación:</strong> ${personaje.puntuacion_popularidad}</p>
        <p><strong>Habilidad Especial:</strong> ${personaje.habilidad_especial}</p>
        <p><strong>Residencia:</strong> ${personaje.residencia} (${personaje.direccion})</p>
        `;
    } catch (error) {
        resultado.innerHTML = "Error al consultar el personaje";
        console.error(error);
    }
}