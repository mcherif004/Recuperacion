import { Animal } from "./Animal.js";

export class AnimalSalvaje extends Animal {

    #tipoAtaque;
    #nivelAgresividad;

    constructor(nombre, especie, patas, nivelFuerza, tipoAtaque, nivelAgresividad) {
        super(nombre, especie, patas, nivelFuerza);
        this.tipoAtaque = tipoAtaque;
        this.nivelAgresividad = nivelAgresividad;
    }

    get tipoAtaque () {
        return this.#tipoAtaque;
    }

    set tipoAtaque (tipoAtaque) {
        if (typeof tipoAtaque === "string") {
            this.#tipoAtaque = tipoAtaque;
        } else {
            throw new Error ("EL tipo de ataque debe de ser un str");
        }
    }

    get nivelAgresividad () {
        return this.#nivelAgresividad;
    }

    set nivelAgresividad (nivelAgresividad) {
        if (typeof nivelAgresividad === Number && nivelAgresividad < this.nivelFuerza) { //!not sure ¿?super()
            this.#nivelAgresividad = nivelAgresividad;
        } else {
            throw new Error ("EL nivel de agresividad debe de ser un numero y debe ser menor que el nivel de fuerza");
        }
    }

    descripcion() {
        return`${super.descripcion()}\nTipo de Ataque: ${this.#tipoAtaque}\nNivel de Agresividad: ${this.#nivelAgresividad}`;
    }
}