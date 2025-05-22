// Carga del DOM
window.onload = () => {
    crearFormulario();

    // Evento al boton enviar
    document.addEventListener("click", (e) => {
        if (e.target && e.target.id === "enviar") {
            procesarFormulario();
        }
    });
};

// Parte 2
function crearFormulario () {
    const body = document.body;

    const divFormulario = document.createElement("div");
    divFormulario.id = "formulario";

    // Titulo
    const titulo = document.createElement("h2");
    titulo.textContent = "Bienvenido a Hogwarts";
    divFormulario.appendChild(titulo);

    // Nombre
    const labelNombre = document.createElement("label");
    labelNombre.setAttribute("for", "nombre");
    labelNombre.textContent = "Nombre:";
    divFormulario.appendChild(labelNombre);

    const inputNombre = document.createElement("input");
    inputNombre.type = "text";
    inputNombre.id = "nombre";
    divFormulario.appendChild(inputNombre);

    // Fecha de nacimiento
    const labelFecha = document.createElement("label");
    labelFecha.setAttribute("for", "fecha");
    labelFecha.textContent = "Fecha de nacimiento:";
    divFormulario.appendChild(labelFecha);

    const inputFecha = document.createElement("input");
    inputFecha.type = "date";
    inputFecha.id = "fecha";
    divFormulario.appendChild(inputFecha);

    // DNI
    const labelDni = document.createElement("label");
    labelDni.setAttribute("for", "dni");
    labelDni.textContent = "DNI:"
    divFormulario.appendChild(labelDni);

    const inputDni = document.createElement("input");
    inputDni.type = "text";
    inputDni.id = "dni";
    divFormulario.appendChild(inputDni);

    // Boton Enviar
    const btnEnviar = document.createElement("button");
    btnEnviar.id = "enviar";
    btnEnviar.textContent = "Enviar";
    divFormulario.appendChild(btnEnviar);

    // Add to the body
    body.appendChild(divFormulario);
}

function procesarFormulario() {
    const nombre = document.getElementById("nombre").value;
    const fecha = document.getElementById("fecha").value;
    const dni = document.getElementById("dni").value;

    try {
        // Creamos un alumno con la clase
        const alumno = new Alumno(nombre, fecha, dni);
        alumno.asignarCasa();
        alumno.guardarEnLocalStorage(); //! alumno.guardarEnCookies();
        
        // Mostar sombrero
        mostrarSombrero (alumno);

    } catch (error) {
        alert(error.message);
    }
}

function mostrarSombrero(alumno) {
    // Ocultar formulario
    document.getElementById("formulario").style.display = "none";

    // Crear div de imagenes
    let divImagenes = document.getElementById("imagenes");
    if (!divImagenes) {
        divImagenes = document.createElement("div");
        divImagenes.id = "imagenes";
        document.body.appendChild(divImagenes);
    }

    // Imagen del sombrero
    divImagenes.innerHTML = `
        <h2>Mucha suerte!</h2>
        <div id="imagen">
            <img id="imagenSombrero" src="imagenes/sombrero.gif" alt="Sombrero seleccionador">
        </div>
    `;
    divImagenes.style.display = "block"

    // Tras 3 segundos, mostrar ficha
    setTimeout(() => {
        mostrarFicha(alumno);
    }, 3000);

    function mostrarFicha(alumno) {
        document.getElementById("imagenes").style.display = "none";

        const ficha = document.createElement("div");
        ficha.id = "ficha";
        ficha.innerHTML = `
            <h2>Ficha de ${alumno.nombre}</h2>
            <p>Fecha de Nacimiento: ${alumno.fechaNacimiento}</p>
            <p>DNI: ${alumno.dni}</p>
            <p>Casa Asignada: ${alumno.casa}</p>
        `;
        document.body.appendChild(ficha);
    }
}