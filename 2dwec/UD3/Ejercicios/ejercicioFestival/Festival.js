import { Produccion } from "./Produccion.js";

export class Festival {
    #nombre;
    #ciudad;
    #edicion;
    #descripcion;
    #aProducciones;
    #aParticipantes;

    constructor(nombre, ciudad, edicion, descripcion) {
        this.nombre = nombre; // Se usa el setter para validar
        this.ciudad = ciudad; // Se usa el setter para validar
        this.edicion = edicion; // Se usa el setter para validar
        this.descripcion = descripcion; // Se usa el setter para validar
        this.#aProducciones = []; // Inicialización del array de producciones
        this.#aParticipantes = [[], []]; // Array bidimensional: fila 0 = Participantes, fila 1 = Jurados
    }

    get nombre() {
        return this.#nombre;
    }

    set nombre(nombre) {
        if (typeof nombre !== "string" || nombre.trim().length < 3) {
            throw new Error("El nombre debe ser un string con al menos 3 caracteres.");
        }
        this.#nombre = nombre.trim();
    }

    get ciudad() {
        return this.#ciudad;
    }

    set ciudad(ciudad) {
        if (typeof ciudad !== "string" || ciudad.trim() === "") {
            throw new Error("La ciudad no puede estar en blanco.");
        }
        this.#ciudad = ciudad.trim();
    }

    get edicion() {
        return this.#edicion;
    }

    set edicion(edicion) {
        if (typeof edicion !== "number" || edicion < 0 || isNaN(edicion)) {
            throw new Error("La edición debe ser un número positivo.");
        }
        this.#edicion = edicion;
    }

    get descripcion() {
        return this.#descripcion;
    }

    set descripcion(descripcion) {
        if (typeof descripcion !== "string" || descripcion.length > 300) {
            throw new Error("La descripción no puede superar los 300 caracteres.");
        }
        this.#descripcion = descripcion;
    }

    get aProducciones() {
        return this.#aProducciones;
    }

    get aParticipantes() {
        return this.#aParticipantes;
    }

    introducirProduccion(produccion) {
        if (!(produccion instanceof Produccion)) {
            throw new Error("El objeto debe ser una instancia de Produccion.");
        }

        // Verificar si el título ya existe en aProducciones
        if (this.#aProducciones.some(p => p.titulo === produccion.titulo)) {
            return false;
        }

        this.#aProducciones.push(produccion);
        return true;
    }

    eliminarProduccion(titulo) {
        const index = this.#aProducciones.findIndex(p => p.titulo === titulo);
        if (index !== -1) {
            this.#aProducciones.splice(index, 1);
            return true;
        }
        return false;
    }

    anadirParticipante(persona) {
        if (!persona || typeof persona !== "object") {
            throw new Error("Debe proporcionarse un objeto válido.");
        }

        // Si es jurado, va a la fila 1; si es participante, a la fila 0
        const esJurado = persona.constructor.name === "Jurado";
        this.#aParticipantes[esJurado ? 1 : 0].push(persona);
    }

    toString() {
        return `Festival: ${this.#nombre} \nCiudad: ${this.#ciudad} \nEdición: ${this.#edicion} \nDescripción: ${this.#descripcion}`;
    }
} 