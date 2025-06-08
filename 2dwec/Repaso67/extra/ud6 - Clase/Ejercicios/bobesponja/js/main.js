document.addEventListener("DOMContentLoaded", () => {

    cargarPersonajes();
    document.getElementById("consultar").addEventListener("click", consultarPersonaje);
    document.getElementById("crear").addEventListener("click", crearPersonaje);
    document.getElementById("actualizarPUT").addEventListener("click", actualizarPUT);
    document.getElementById("actualizarPATCH").addEventListener("click", actualizarPATCH);
    document.getElementById("eliminar").addEventListener("click", eliminarPersonaje);
});

async function cargarPersonajes(){
    let select = document.getElementById("nombrePersonaje");
    let resultado = document.getElementById("resultado");
    try {
        let response = await axios.get("index.php",{
            params: { action: "listarPersonajes"}
        });
        select.innerHTML = "";
        response.data.forEach(personaje => {
            let option = document.createElement("option");
            option.value = personaje.nombre;
            option.textContent = personaje.nombre;
            select.appendChild(option);
        })
    } catch (error) {
        resultado.innerHTML = "Error al cargar el pj";
    }
}

async function consultarPersonaje() {
    let nombre = document.getElementById("nombrePersonaje").value;
    let resultado = document.getElementById("resultado");

    try {
        let response = await axios.get("index.php", {
            params: { nombre: nombre }
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
        resultado.innerHTML = "Error al consultar el personaje.";
        console.error(error);
    }
}

// CREAR UN PERSONAJE (POST)
async function crearPersonaje() {
    let nombre = document.getElementById("nuevoNombre").value.trim();
    let ocupacion = document.getElementById("nuevaOcupacion").value.trim();
    let tipo = document.getElementById("nuevoTipo").value.trim();
    let puntuacion = parseInt(document.getElementById("nuevaPuntuacion").value);
    let habilidad = document.getElementById("nuevaHabilidad").value.trim();
    let residencia = parseInt(document.getElementById("nuevaResidencia").value);
    let mensajeDiv = document.getElementById("mensajePOST");

    if (nombre === "" || ocupacion === "" || tipo === "" || isNaN(puntuacion) || habilidad === "" || isNaN(residencia)) {
        mensajeDiv.innerHTML = "Introduce datos válidos";
        return;
    }

    // JSON que le vamos a enviar
    let datos = {
        nombre: nombre,
        ocupacion: ocupacion,
        tipo: tipo,
        puntuacion_popularidad: puntuacion,
        habilidad_especial: habilidad,
        id_residencia: residencia
    };

    try {
        let response = await axios.post("index.php", datos, {
            headers: {"Content-Type": "application/json"}
        });
        if(response.data.success){
            mensajeDiv.innerHTML = `Personaje: ${nombre} creado con éxito.`;
        } else {
            throw new Error(response.data.error || "Error desconocido.");
        }
    } catch (error){
        mensajeDiv.innerHTML = "Error: "+ error.message;
    }
}

// ACTUALIZAR UN PERSONAJE (PUT)
async function actualizarPUT() {
    let id = parseInt(document.getElementById("idPersonajePUT").value);
    let nombre = document.getElementById("nombrePUT").value.trim();
    let ocupacion = document.getElementById("ocupacionPUT").value.trim();
    let tipo = document.getElementById("tipoPUT").value.trim();
    let puntuacion = parseInt(document.getElementById("puntuacionPUT").value);
    let habilidad = document.getElementById("habilidadPUT").value.trim();
    let residencia = parseInt(document.getElementById("residenciaPUT").value);
    let mensajeDiv = document.getElementById("mensajePUT");

    if (isNaN(id) || nombre === "" || ocupacion === "" || tipo === "" || isNaN(puntuacion) || habilidad === "" || isNaN(residencia)) {
        mensajeDiv.innerHTML = "Introduce datos válidos";
        return;
    }

    // JSON que le vamos a enviar
    let datos = {
        id: id,
        nombre: nombre,
        ocupacion: ocupacion,
        tipo: tipo,
        puntuacion_popularidad: puntuacion,
        habilidad_especial: habilidad,
        id_residencia: residencia
    };

    try {
        let response = await axios.put("index.php", datos, {
            headers: {"Content-Type": "application/json"}
        });
        if(response.data.success){
            mensajeDiv.innerHTML = `Personaje: ${nombre} actualizado con éxito.`;
        } else {
            throw new Error(response.data.error || "Error desconocido.");
        }
    } catch (error){
        mensajeDiv.innerHTML = "Error: "+ error.message;
    }
}

// ACTUALIZAR SOLO LA PUNTUACIÓN DE UN PERSONAJE (PATCH)
async function actualizarPATCH() {
    let id = parseInt(document.getElementById("idPersonajePATCH").value);
    let puntuacion = parseInt(document.getElementById("puntuacionPATCH").value);
    let mensajeDiv = document.getElementById("mensajePATCH");

    if (isNaN(id) || isNaN(puntuacion)) {
        mensajeDiv.innerHTML = "Introduce datos válidos";
        return;
    }

    // JSON que le vamos a enviar
    let datos = {
        id: id,
        puntuacion_popularidad: puntuacion
    };

    try {
        let response = await axios.patch("index.php", datos, {
            headers: {"Content-Type": "application/json"}
        });
        if(response.data.success){
            mensajeDiv.innerHTML = `Puntuación del personaje con ID: ${id} actualizada con éxito.`;
        } else {
            throw new Error(response.data.error || "Error desconocido.");
        }
    } catch (error){
        mensajeDiv.innerHTML = "Error: "+ error.message;
    }
}

// ELIMINAR UN PERSONAJE (DELETE)
async function eliminarPersonaje() {
    let id = parseInt(document.getElementById("idPersonajeDELETE").value);
    let mensajeDiv = document.getElementById("mensajeDELETE");

    if (isNaN(id)) {
        mensajeDiv.innerHTML = "Introduce un ID válido";
        return;
    }

    // JSON que le vamos a enviar
    let datos = {
        id: id
    };

    try {
        let response = await axios.delete("index.php", {
            headers: {"Content-Type": "application/json"},
            data: datos
        });
        if(response.data.success){
            mensajeDiv.innerHTML = `Personaje con ID: ${id} eliminado con éxito.`;
        } else {
            throw new Error(response.data.error || "Error desconocido.");
        }
    } catch (error){
        mensajeDiv.innerHTML = "Error: "+ error.message;
    }
}