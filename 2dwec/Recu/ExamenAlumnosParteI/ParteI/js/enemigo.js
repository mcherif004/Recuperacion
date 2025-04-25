import { Personaje } from "./personaje.js";

export class Enemigo extends Personaje {

    #debilidad;

    constructor(nombre) {
        super(nombre);
        this.setDebilidad(nombre);
    }

    getDebilidad() {
        return this.#debilidad;
    }

    setDebilidad(nombreEnemigo) {
        this.nombre = nombreEnemigo;

        switch (nombreEnemigo) {
        case "Bowser":
            this.#debilidad = "Fuego";
            break;
        case "Goomba":
            this.#debilidad = "Salto";
            break;
        default:
            throw new Error("Nombre no válido para un enemigo.");
        }
    }

    toString() {
        return `Nombre: ${this.nombre} - Debilidad: ${this.#debilidad}`;
    }
}
