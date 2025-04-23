export class Escenario {
    #nombre;
    #ubicacion;
    #clima;

    constructor(nombre, ubicacion, clima) {
        this.nombre = nombre;
        this.ubicacion = ubicacion;
        this.clima = clima;
    }

    get nombre() {
        return this.#nombre;
    }
    set nombre(value) {
        if (value.length >= 3) this.#nombre = value;
        else throw new Error("El nombre debe tener al menos 3 caracteres.");
    }

    get ubicacion() {
        return this.#ubicacion;
    }
    set ubicacion(value) {
        if (value.trim()) this.#ubicacion = value;
        else throw new Error("La ubicación no puede estar vacía.");
    }

    get clima() {
        return this.#clima;
    }
    set clima(value) {
        this.#clima = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    }

    toString() {
        return `Nombre: ${this.#nombre}, Ubicación: ${this.#ubicacion}, Clima: ${this.#clima}`;
    }
}