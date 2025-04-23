"use strict";
import Usuario from "./usuario.js";

// Cargar los datos guardados cuando la página se carga
document.addEventListener("DOMContentLoaded", () => {
    // Datos del usuario usando la clase `Usuario`
    let datosUsuario = Usuario.obtenerDesdeLocalStorage() || Usuario.obtenerDesdeCookies() || new Usuario("", "");

    // Función para guardar los datos del usuario en localStorage y cookies
    function guardarDatos() {
        datosUsuario.guardarEnLocalStorage();
        datosUsuario.guardarEnCookies();
    }

    // Verificamos si los datos del usuario ya existen
    if (datosUsuario.nombre) {
        document.body.style.backgroundImage = datosUsuario.fondo === "none" ? "" : `url('./${datosUsuario.fondo}.jpg')`;

        // Ocultar la sección de configuración y mostrar la lis ta de la compra y resumen
        document.getElementById("config-section").style.display = "none";
        document.getElementById("shopping-section").style.display = "block";
        document.getElementById("summary").style.display = "block";

        // Mostrar los datos del usuario en el resumen
        document.getElementById("user-data").textContent = `Usuario: ${datosUsuario.nombre}, Email: ${datosUsuario.correo}`;

        // Asegurar que la lis ta de la compra sea visible
        const itemsList = document.getElementById("items-list");
        itemsList.style.display = "block";

        // Cargar los elementos de la lis ta de la compra y marcar los seleccionados
        const checkboxes = document.querySelectorAll("#items-list input[type='checkbox']");
        checkboxes.forEach((checkbox) => {
            checkbox.checked = datosUsuario.compras.includes(checkbox.value);
        });

        // Actualizar la lista mostrada en el resumen
        actualizarResumenCompras();
    } else {
        document.getElementById("shopping-section").style.display = "none";
        document.getElementById("summary").style.display = "none";
    }

    // Función para actualizar el resumen de compras
    function actualizarResumenCompras() {
        const shoppingList = document.getElementById("shopping-list");
        shoppingList.textContent = `Lista de la compra: ${datosUsuario.compras.join(", ")}`;
    }

    //Manejo del formulario de configuración
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

    // Manejo de la lis ta de la compra
    document.getElementById("save-items").addEventListener("click", () => {
        const checkboxes = document.querySelectorAll("#items-list input[type='checkbox']");
        datosUsuario.compras = Array.from(checkboxes)
            .filter((checkbox) => checkbox.checked)
            .map((checkbox) => checkbox.value);
        guardarDatos();
        actualizarResumenCompras();
        alert("lis ta de la compra guardada.");
    });

    //Manejo del cambio de fondo
    document.getElementById("background1").addEventListener("click", () => {
        datosUsuario.fondo = "fondo1";
        document.body.style.backgroundImage = "url('./fondo1.jpg')";
        guardarDatos();
    });

    document.getElementById("background2").addEventListener("click", () => {
        datosUsuario.fondo = "fondo2";
        document.body.style.backgroundImage = "url('./fondo2.jpg')";
        guardarDatos();
    });

    document.getElementById("background-none").addEventListener("click", () => {
        datosUsuario.fondo = "none";
        document.body.style.backgroundImage = "";
        guardarDatos();
    });

    // Manejo del cierre de sesión
    document.getElementById("logout").addEventListener("click", () => {
        localStorage.removeItem("datosUsuario");
        document.cookie = "datosUsuario=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        alert("Has cerrado sesión.");
        //Recargamos la página
        location.reload();
    });
});
