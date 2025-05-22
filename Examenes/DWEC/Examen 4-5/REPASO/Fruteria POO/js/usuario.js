export default class Usuario {
    constructor(nombre, correo, fondo = "none", compras = []) {
        this.nombre = nombre;
        this.correo = correo;
        this.fondo = fondo;
        this.compras = compras;
    }

    guardarEnLocalStorage() {
        localStorage.setItem("datosUsuario", JSON.stringify(this));// Convierte this (el objeto actual) a una cadena de texto en formato JSON.
    }

    guardarEnCookies(dias = 1) {//Expira en 1 día si no le pasamos otro dato
        const fecha = new Date();
        fecha.setTime(fecha.getTime() + dias * 24 * 60 * 60 * 1000);
        document.cookie = `datosUsuario=${JSON.stringify(this)};expires=${fecha.toUTCString()}`;
    }

    static obtenerDesdeLocalStorage() {
        const datosGuardados = JSON.parse(localStorage.getItem("datosUsuario"));
        if (datosGuardados) {
            return new Usuario(datosGuardados.nombre, datosGuardados.correo, datosGuardados.fondo, datosGuardados.compras);
        } else {
            return null;
        }
    }

    static obtenerDesdeCookies() {
        const cookies = document.cookie.split("; ");
        for (let cookie of cookies) {
            const [clave, valor] = cookie.split("=");
            if (clave === "datosUsuario") return JSON.parse(valor);
        }
        return null;
    }
}
