window.addEventListener("DOMContentLoaded", inicio);
function inicio(){
    document.getElementById("consultar").addEventListener("click", consultar);
    document.getElementById("crear").addEventListener("click", crear);
    document.getElementById("actualizarPUT").addEventListener("click", actualizarPUT);
    document.getElementById("actualizarPATCH").addEventListener("click", actualizarPATCH);
    document.getElementById("eliminar").addEventListener("click", eliminar);
}

// Función obtener alumno y su direccion (GET)
async function consultar(){
    let nombre = document.getElementById("nombreAlumno").value.trim();
    let resultado = document.getElementById("resultado");

    if (nombre == ""){
        resultado.innerHTML = "Ingrese un nombre de alumno";
        return;
    }

    try{
        // Obtener el alumno por el nombre
        let responseAlumno = await axios.get("index.php", {
            params: {
                objeto: JSON.stringify({tabla: "alumno", nombre: nombre})
            }
        });

        console.log(responseAlumno.data);
        
        if (responseAlumno.data.length == 0){
            resultado.innerHTML = "No se encontró el alumno";
            return;
        }

        let alumno = responseAlumno.data[0]; // Nos quedamos con el primer elemento de la respuesta del servidor

        // Obtener la direccion del alumno usando ese ID
        let responseDireccion = await axios.get("index.php", {
            params: {
                objeto: JSON.stringify({tabla: "direccion", idAlumno: alumno.idAlumno})
            }
        });

        // Suponemos que si esta el alumno en la tabla alumno hay una adireccion asociada

        if (responseDireccion.data.length == 0){
            resultado.innerHTML = "No se encontró la dirección del alumno";
            return;
        }

        let direccionInfo = responseDireccion.data[0].calle + " / " +  responseDireccion.data[0].ciudad + " / " + responseDireccion.data[0].codigo_postal; // Nos quedamos con el primer elemento de la respuesta del servidor

        resultado.innerHTML = `Nombre: ${alumno.alumno}`;
        let direccion = document.getElementById("direccion");
        direccion.innerHTML = `Dirección: ${direccionInfo}`;

    } catch(error){
        resultado.innerHTML = "Error en la consulta" + error;
    }
}
// Crear un alumno (POST)
async function crear() {
    let nombre = document.getElementById('nuevoNombre').value.trim();
    let puntuacion = document.getElementById('nuevaPuntuacion').value.trim();
    let mensajeDiv = document.getElementById('mensajePOST');

    if (nombre === '' || puntuacion === '' || isNaN(puntuacion)) {
        mensajeDiv.innerHTML = 'Debe ingresar un nombre y una puntuación';
        return;
    }

    // Json que le vamos a enviar
    let datos = {
        tabla: 'alumnos',
        nombre: nombre,
        puntuacion: puntuacion
    };

    try{
        let response = await axios.post("index.php", datos,{
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(response.data.success);
        if (response.data.success === true){
            mensajeDiv.innerHTML = 'Alumno creado con exito';
        } else{
            throw new Error(response.data.error || "Error desconocido");
        }
    } catch(error){
        mensajeDiv.innerHTML = 'Error al crear el alumno: ' + error.message;
    }

}

// Actualizar alumno
async function actualizarPUT(){
    let idAlumno = document.getElementById("idAlumnoPUT").value.trim();
    let nombre = document.getElementById("nombrePUT").value.trim();
    let puntuacion = document.getElementById("puntuacionPUT").value.trim();
    let mensajeDiv = document.getElementById("mensajePUT");

    if (idAlumno == "" || nombre == "" || puntuacion == "" || isNaN(puntuacion)){
        mensajeDiv.innerHTML = "Debe ingresar un id, nombre y puntuación";
        return;
    }

    // Json que le vamos a enviar
    let datos = {
        tabla: 'alumnos',
        idAlumno: idAlumno,
        nombre: nombre,
        puntuacion: puntuacion
    };

    try{
        let response = await axios.put("index.php", datos,{
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.data.success){
            mensajeDiv.innerHTML = 'Alumno actualizado con exito';
        } else{
            throw new Error(response.data.error || "Error desconocido");
        }
    } catch(error){
        mensajeDiv.innerHTML = 'Error al actualizar el alumno: ' + error.message;
    }
}

// Actualizacion con PATCH
async function actualizarPATCH(){
    let idAlumno = document.getElementById("idAlumnoPATCH").value;
    let puntuacion = document.getElementById("puntuacionPATCH").value.trim();
    let mensajeDiv = document.getElementById("mensajePATCH");

    if (idAlumno == "" || puntuacion == "" || isNaN(puntuacion)){
        mensajeDiv.innerHTML = "Debe ingresar un id, nombre y puntuación";
        return;
    }
    console.log(idAlumno);

    // Json que le vamos a enviar
    let datos = {
        tabla: 'alumnos',
        idAlumno: idAlumno,
        puntuacion: puntuacion
    };

    try{
        let response = await axios.patch("index.php", datos,{
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(response);
        if (response.data.success){
            mensajeDiv.innerHTML = 'Alumno actualizado con exito';
        } else{
            throw new Error(response.data.error || "Error desconocido");
        }
    } catch(error){
        mensajeDiv.innerHTML = 'Error al actualizar el alumno: ' + error.message;
    }
}

// Eliminar con PATCH
async function eliminar(){
    let idAlumno = document.getElementById("idAlumnoDELETE").value;
    let mensajeDiv = document.getElementById("mensajeDELETE");

    if (idAlumno == "" ){
        mensajeDiv.innerHTML = "Debe ingresar un id, nombre y puntuación";
        return;
    }
    console.log(idAlumno);

    // Json que le vamos a enviar
    let datos = {
        tabla: 'alumnos',
        idAlumno: idAlumno
    };

    try{
        let response = await axios.delete("index.php",{
            data: datos,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(response.data.success);
        if (response.data.success){
            mensajeDiv.innerHTML = 'Alumno eliminado con exito';
        } else{
            throw new Error(response.data.error || "Error desconocido");
        }
    } catch(error){
        mensajeDiv.innerHTML = 'Error al actualizar el alumno: ' + error.message;
    }
}