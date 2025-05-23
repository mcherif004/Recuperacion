// Clase Jugador
class Jugador {
    #nombre;
    #fechaNacimiento;
    color;
    puntuacion;
    intentos;
    toposAtrapados;

    // Constructor
    constructor (nombre, fechaNacimiento, color) {
        this.nombre = nombre;
        this.fechaNacimiento = fechaNacimiento;
        this.color = color;
        this.puntuacion = 0;
        this.intentos = 5;
        this.toposAtrapados = 0;
    }

    // Getter nombre
    get nombre () {
        return this.#nombre
    }

    // Setter nombre
    set nombre (valorN) {
        const patronNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

        if (valorN.length === 0) {
            throw new Error("El nombre no puede estar vacio");
        }

        if (!patronNombre.test(valorN)) {
            throw new Error("Solo se pueden usar letras y espacios");
        }

        this.#nombre = valorN;
    }

        // Getter fechaNacimiento
    get fechaNacimiento () {
        return this.#fechaNacimiento
    }

    // Setter fechaNacimiento
    set fechaNacimiento (valorF) {
        const patronFecha = /^\d{4}-\d{2}-\d{2}$/;

        if (!patronFecha.test(valorF)) {
            throw new Error("El formato de fecha no es el correcto");
        }

        this.#nombre = valorF;
    }

    // Guardar datos en localStorage
    guardarEnLocalStorage() {
        const datos = {
            nombre: this.#nombre,
            fechaNacimiento: this.#fechaNacimiento,
            color: this.color,
            puntuacion: this.puntuacion,
            intentos: this.intentos,
            toposAtrapados: this.toposAtrapados
        };

        localStorage.setItem("jugador", JSON.stringify(datos));
    }

    // Obtener jugador desde localStorage
    static obtenerDesdeLocalStorage () {
        const datos = JSON.parse(localStorage.getItem("jugador"));
        
        if (datos) {
            const jugador = new Jugador (datos.nombre, datos.fechaNacimiento, datos.color);

            jugador.puntuacion = datos.puntuacion;
            jugador.intentos = datos.intentos;
            jugador.toposAtrapados = datos.toposAtrapados;
            return jugador;
        }
        return null;
    }
}
