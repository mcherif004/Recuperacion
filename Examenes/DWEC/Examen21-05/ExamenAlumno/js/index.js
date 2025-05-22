// Cargar la pagina
window.onload = function () {
    const jugadorGuardado = Jugador.obtenerDesdeLocalStorage();
    if (jugadorGuardado) {
        mostrarJuego(jugadorGuardado);
    } else {
        crearFormulario();

        document.addEventListener("click", function (e) {
            if (e.target) {
                if (e.target.id === "enviar") {
                    e.preventDefault();
                    procesarFormulario();
                }
            }
        });
    }
};

// Crear formulario
function crearFormulario() {
    const body = document.body;
    const form = document.createElement("form");
    form.id = "formulario";

    const labelNombre = document.createElement("label");
    labelNombre.textContent = "Nombre:";
    const inputNombre = document.createElement("input");
    inputNombre.type = "text";
    inputNombre.id = "nombre";
    form.appendChild(labelNombre);
    form.appendChild(inputNombre);
    form.appendChild(document.createElement("br"));

    const labelFecha = document.createElement("label");
    labelFecha.textContent = "Fecha de Nacimiento:";
    const inputFecha = document.createElement("input");
    inputFecha.type = "date";
    inputFecha.id = "fecha";
    form.appendChild(labelFecha);
    form.appendChild(inputFecha);
    form.appendChild(document.createElement("br"));

    form.appendChild(document.createTextNode("Color de fondo:"));
    form.appendChild(document.createElement("br"));

    const colores = ["Lightblue", "Lightgreen", "Lightyellow", "Lightpink"];
    for (let i = 0; i < colores.length; i++) {
        const inputColor = document.createElement("input");
        inputColor.type = "radio";
        inputColor.name = "color";
        inputColor.id = "color" + (i + 1);
        inputColor.value = colores[i];
        if (i === 0) {
            inputColor.checked = true;
        }
        form.appendChild(inputColor);
        form.appendChild(document.createTextNode(colores[i]));
        form.appendChild(document.createElement("br"));
    }

    const btnEnviar = document.createElement("button");
    btnEnviar.type = "submit";
    btnEnviar.id = "enviar";
    btnEnviar.textContent = "Enviar";
    form.appendChild(btnEnviar);

    body.appendChild(form);
}

// Procesar formulario
function procesarFormulario() {
    const nombre = document.getElementById("nombre").value;
    const fecha = document.getElementById("fecha").value;
    const color = document.querySelector('input[name="color"]:checked').value;

    try {
        const jugador = new Jugador(nombre, fecha, color);
        jugador.guardarEnLocalStorage();
        mostrarJuego(jugador);
    } catch (error) {
        alert(error.message);
    }
}

// Mostrar juego
function mostrarJuego(jugador) {
    document.body.style.backgroundColor = jugador.color;

    const formulario = document.getElementById("formulario");
    if (formulario) {
        formulario.remove();
    }

    const h2 = document.createElement("h2");
    h2.innerHTML = "Jugador: <span id='nombreJugador'>" + jugador.nombre + "</span> | Puntos: <span id='puntos'>0</span>";
    document.body.appendChild(h2);

    const btnCerrar = document.createElement("button");
    btnCerrar.id = "btnCerrar";
    btnCerrar.textContent = "Cerrar sesion";
    btnCerrar.onclick = function () {
        localStorage.removeItem("jugador");
        location.reload();
    };
    document.body.appendChild(btnCerrar);

    const tabla = document.createElement("table");
    tabla.id = "tablaJuego";

    for (let i = 0; i < 3; i++) {
        const fila = document.createElement("tr");
        for (let j = 0; j < 3; j++) {
            const celda = document.createElement("td");
            const img = document.createElement("img");
            img.src = "imagenes/agujero.png";
            img.width = 100;
            celda.appendChild(img);
            fila.appendChild(celda);
        }
        tabla.appendChild(fila);
    }
    document.body.appendChild(tabla);

    const btnComenzar = document.createElement("button");
    btnComenzar.id = "btnComenzar";
    btnComenzar.textContent = "Comenzar";
    btnComenzar.onclick = function () {
        iniciarJuego(jugador);
    };
    document.body.appendChild(btnComenzar);
}

// Juego
function iniciarJuego(jugador) {
    const celdas = document.querySelectorAll("#tablaJuego img");
    const posicionesTopos = [];

    while (posicionesTopos.length < 3) {
        const pos = Math.floor(Math.random() * 9);
        if (posicionesTopos.indexOf(pos) === -1) {
            posicionesTopos.push(pos);
        }
    }

    let puntos = 0;
    let intentos = 5;

    for (let i = 0; i < celdas.length; i++) {
        celdas[i].onclick = function () {
            if (intentos > 0) {
                if (posicionesTopos.indexOf(i) !== -1) {
                    this.src = "imagenes/topo.png";
                    puntos = puntos + 1;
                    // aqui deberia quitar la posicion para no poder sumar dos veces pero no lo hago
                } else {
                    this.style.opacity = "0.5";
                }
                intentos = intentos - 1;
                document.getElementById("puntos").textContent = puntos;
            }
        };
    }

    // aqui falta poner un temporizador para que el juego acabe en 20 segundos pero no se como hacerlo
    // tampoco muestro mensaje final, se queda asi sin cerrar
}