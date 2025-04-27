export class Animal {

    #nombre;
    #especie;
    #patas;
    #nivelFuerza;

    constructor(nombre, especie, patas, nivelFuerza) {
        this.nombre = nombre;
        this.especie = especie;
        this.patas = patas;
        this.nivelFuerza = nivelFuerza;
    }

    get nombre () {
        return this.#nombre;
    }

    set nombre (nombre) {
        if (typeof nombre === "string" && nombre.length() >= 3) {
            this.#nombre = nombre;
        } else {
            throw new Error ("El nombre debe de ser un str y tiene que tener minimo 3 caracteres");
        }
    }

    get especie () {
        return this.#especie;
    }

    set especie (especie) {
        if (typeof especie === "string") {
            this.#especie = especie;
        } else {
            throw new Error ("La especie debe de ser un str");
        }
    }

    get patas () {
        return this.#patas;
    }

    set patas (patas) {
        if (typeof patas === Number && patas >= 2) {
            this.#patas = patas;
        } else {
            throw new Error ("Las patas deben de ser numericas y minimo 2");
        }
    }

    get nivelFuerza () {
        return this.#nivelFuerza;
    }

    set nivelFuerza (nivelFuerza) {
        if (typeof nivelFuerza === Number && nivelFuerza > 0 && nivelFuerza < 100) {
            this.#nivelFuerza = nivelFuerza;
        } else {
            throw new Error ("El nivel de fuerza debe de ser numerico y debe de estar entre 0 y 100");
        }
    }

    descripcion() {
        return (`Nombre: ${this.#nombre}\nEspecie: ${this.#especie}\nPatas: ${this.#patas}\nNivel de Fuerza: ${this.#nivelFuerza}`);
    }
}