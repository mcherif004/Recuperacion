"use strict";

// Función para guardar cookies
function guardarCookie(nombre, valor, dias) {
    const fecha = new Date();
    fecha.setTime(fecha.getTime() + dias * 24 * 60 * 60 * 1000);
    document.cookie = `${nombre}=${JSON.stringify(valor)};expires=${fecha.toUTCString()}`;
}

// Función para obtener cookies
function obtenerCookie(nombre) {
    const cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
        const [clave, valor] = cookie.split("=");
        if (clave === nombre) return JSON.parse(valor);
    }
    return null;
}

let datosUsuario = {
    nombre: "",
    correo: "",
    fondo: "none",
    compras: []
};

function cargarDatos() {
    const datosGuardados = JSON.parse(localStorage.getItem("datosUsuario")) || obtenerCookie("datosUsuario");

    if (datosGuardados) {
        datosUsuario = datosGuardados;
        document.body.style.backgroundImage = datosUsuario.fondo === "none" ? "" : `url('./${datosUsuario.fondo}.jpg')`;

        document.getElementById("config-section").style.display = "none";
        document.getElementById("shopping-section").style.display = "block";
        document.getElementById("summary").style.display = "block";

        document.getElementById("user-data").textContent = `Usuario: ${datosUsuario.nombre}, Email: ${datosUsuario.correo}`;
        document.getElementById("items-list").style.display = "block";

        const casillas = document.querySelectorAll("#items-list input[type='checkbox']");
        casillas.forEach((casilla) => {
            casilla.checked = datosUsuario.compras.includes(casilla.value);
        });

        actualizarResumenCompras();
    } else {
        document.getElementById("shopping-section").style.display = "none";
        document.getElementById("summary").style.display = "none";
    }
}

function guardarDatos() {
    localStorage.setItem("datosUsuario", JSON.stringify(datosUsuario));
    guardarCookie("datosUsuario", datosUsuario, 1);
}

function actualizarResumenCompras() {
    document.getElementById("shopping-list").textContent = `Lista de compras: ${datosUsuario.compras.join(", ")}`;
}

function validarInput(entrada) {
    if (!entrada.checkValidity()) {
        entrada.style.backgroundColor = "#ffcccc";
    } else {
        entrada.style.backgroundColor = "";
    }
}

document.getElementById("config-form").addEventListener("submit", (event) => {
    event.preventDefault();
    datosUsuario.nombre = document.getElementById("name").value;
    datosUsuario.correo = document.getElementById("email").value;
    guardarDatos();

    document.getElementById("config-section").style.display = "none";
    document.getElementById("shopping-section").style.display = "block";
    document.getElementById("summary").style.display = "block";

    document.getElementById("user-data").textContent = `Usuario: ${datosUsuario.nombre}, Email: ${datosUsuario.correo}`;
    document.getElementById("items-list").style.display = "block";
});

document.querySelectorAll("#config-form input").forEach((entrada) => {
    entrada.addEventListener("blur", () => validarInput(entrada));
});

document.getElementById("save-items").addEventListener("click", () => {
    const casillas = document.querySelectorAll("#items-list input[type='checkbox']");
    datosUsuario.compras = Array.from(casillas)
        .filter((casilla) => casilla.checked)
        .map((casilla) => casilla.value);
    guardarDatos();
    actualizarResumenCompras();
    alert("Lista de compras guardada.");
});

document.getElementById("background1").addEventListener("click", () => {
    datosUsuario.fondo = "background1";
    document.body.style.backgroundImage = "url('./fondo1.jpg')";
    guardarDatos();
});

document.getElementById("background2").addEventListener("click", () => {
    datosUsuario.fondo = "background2";
    document.body.style.backgroundImage = "url('./fondo2.jpg')";
    guardarDatos();
});

document.getElementById("background-none").addEventListener("click", () => {
    datosUsuario.fondo = "none";
    document.body.style.backgroundImage = "";
    guardarDatos();
});

document.getElementById("logout").addEventListener("click", () => {
    localStorage.removeItem("datosUsuario");
    document.cookie = "datosUsuario=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    alert("Has cerrado sesión.");
    location.reload();
});

document.addEventListener("DOMContentLoaded", cargarDatos);
