import { Personaje } from './1/Personaje.js';

export class Protagonista extends Personaje {
    #cualidad;

    constructor(nombre, tipo, edad, cualidad) {
        super(nombre, tipo, edad);
        this.cualidad = cualidad;
    }

    get cualidad() {
        return this.#cualidad;
    }

    set cualidad(value) {
        if (typeof value === "string" && value.length >= 5) {
            this.#cualidad = value;
        } else {
            throw new Error("La cualidad debe tener al menos 5 caracteres.");
        }
    }

    toString() {
        return `${super.toString()}, Cualidad: ${this.#cualidad}`;
    }
}