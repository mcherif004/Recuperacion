window.addEventListener("DOMContentLoaded",inicio);

function inicio(){
    document.getElementById("consultar").addEventListener("click",consultar);
    document.getElementById("crear").addEventListener("click",crear);
    document.getElementById("actualizarPUT").addEventListener("click",actualizarPUT);
    document.getElementById("actualizarPATCH").addEventListener("click",actualizarPATCH);
    document.getElementById("eliminar").addEventListener("click",eliminar);
}
//FUNCIÓN OBTENER ALUMNO Y SU DIRECCIÓN (GET)
async function consultar(){
    let nombre = document.getElementById("nombreAlumno").value.trim();
    let resultadoDiv = document.getElementById("resultado");

    if(nombre === ""){
        resultadoDiv.innerHTML = "Introduce un nombre";
        return;
    }
    try {
        //Obtener el alumno por el nombre
        let responseAlumno = await axios.get("index.php",{
            params: { objeto: JSON.stringify({tabla: "alumnos", nombre: nombre})}
        });
        if (responseAlumno.data.length === 0){
            resultadoDiv.innerHTML ="Alumno no encontrado.";
            return;
        }
        let alumno = responseAlumno.data[0]; //Nos quedamos con el primer elemento de las respuesta del servidor

        //Obtener la dirección del alumno usando ese ID
        let responseDireccion = await axios.get("index.php",{
            params:{ objeto: JSON.stringify({tabla: "direccion", idAlumno: alumno.idAlumno})}
        });
        console.log(responseDireccion);
        //Suponemos que si está el alumno en la tabla Alumno, hay una dirección asociada
        let direccionInfo;
        if(responseDireccion.data.length > 0){
            direccionInfo = `${responseDireccion.data[0].calle},  ${responseDireccion.data[0].ciudad}, ${responseDireccion.data[0].codigo_postal},`
        }else{
            direccionInfo = "Dirección no disponible";
        }
        resultadoDiv.innerHTML = `Alumno: ${alumno.alumno} <br> ID: ${alumno.idAlumno} <br> Puntuación: ${alumno.puntuacion} <br> ${direccionInfo}`
        
    } catch (error) {
        resultadoDiv.innerHTML = "Error al obtener la información del alumno."
        console.error(error);
    }
}
//CREAR UN ALUMNO (POST)
async function crear(){
    let nombre = document.getElementById("nuevoNombre").value.trim();
    let puntuacion = parseInt(document.getElementById("nuevaPuntuacion").value);
    let mensajeDiv = document.getElementById("mensajePOST");

    if(nombre === "" || isNaN(puntuacion)){
        mensajeDiv.innerHTML =" Introduce datos válidos."
        return;
    }
    //JSON que le vamos a enviar
    let datos = {
        tabla: "alumnos",
        nombre: nombre,
        puntuacion: puntuacion
    };

    try {
        let response = await axios.post("index.php", datos, {
            headers: {"Content-Type": "application/json" }
        });
        console.log(response);
        if(response.data.success){
            mensajeDiv.innerHTML = `Alumno: ${nombre} creado con éxito.`;
        }else{
            throw new Error(response.data.error || "Error desconocido.");
        }
    } catch (error) {
        mensajeDiv.innerHTML = "Error: "+ error.message;
    }
}
//ACTUALIZAR UN ALUMNO
async function actualizarPUT(){
    let idAlumno = document.getElementById("idAlumnoPUT").value.trim();
    let nombre = document.getElementById("nombrePUT").value.trim();
    let puntuacion = parseInt(document.getElementById("puntuacionPUT").value);
    let mensajeDiv = document.getElementById("mensajePUT");

    if(idAlumno === "" || nombre === "" || isNaN(puntuacion)){
        mensajeDiv.innerHTML =" Introduce datos válidos."
        return;
    }

     //JSON que le vamos a enviar
     let datos = {
        tabla: "alumnos",
        idAlumno: idAlumno,
        nombre: nombre,
        puntuacion: puntuacion
    };
    try {
        let response = await axios.put("index.php", datos, {
            headers: {"Content-Type": "application/json" }
        });
        if(response.data.success){
            mensajeDiv.innerHTML = `Alumno: ${nombre} actualizado con éxito.`;
        }else{
            throw new Error(response.data.error || "Error desconocido.");
        }
    } catch (error) {
        mensajeDiv.innerHTML = "Error: "+ error.message;
    }

}
//ACTUALIZAR SOLO PUNTUACIÓN (PATCH)
async function actualizarPATCH(){
    let idAlumno = document.getElementById("idAlumnoPATCH").value.trim();
    let puntuacion = parseInt(document.getElementById("puntuacionPATCH").value);
    let mensajeDiv = document.getElementById("mensajePATCH");

    if(idAlumno === "" || isNaN(puntuacion)){
        mensajeDiv.innerHTML =" Introduce datos válidos."
        return;
    }

     //JSON que le vamos a enviar
     let datos = {
        tabla: "alumnos",
        idAlumno: idAlumno,
        puntuacion: puntuacion
    };
    try {
        let response = await axios.patch("index.php", datos, {
            headers: {"Content-Type": "application/json" }
        });
        if(response.data.success){
            mensajeDiv.innerHTML = `La puntuación ha sido actualizada correctamente.`;
        }else{
            throw new Error(response.data.error || "Error desconocido.");
        }
    } catch (error) {
        mensajeDiv.innerHTML = "Error: "+ error.message;
    }
}
//ELIMINAR ALUMNO (DELETE)
async function eliminar(){
    let idAlumno = document.getElementById("idAlumnoDELETE").value.trim();
    let mensajeDiv = document.getElementById("mensajeDELETE");

    if(idAlumno === ""){
        mensajeDiv.innerHTML =" Introduce un ID válidos."
        return;
    }

     //JSON que le vamos a enviar
     let datos = {
        tabla: "alumnos",
        idAlumno: idAlumno
    };
    try {
        let response = await axios.delete("index.php", { 
            data: datos,
            headers: {"Content-Type": "application/json" }
        });
        if(response.data.success){
            mensajeDiv.innerHTML = `El alumno ha sido eliminado correctamente.`;
        }else{
            throw new Error(response.data.error || "Error desconocido.");
        }
    } catch (error) {
        mensajeDiv.innerHTML = "Error: "+ error.message;
    }
}