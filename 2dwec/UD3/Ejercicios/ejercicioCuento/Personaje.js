export class Personaje {
    #nombre;
    #tipo;
    #edad;

    constructor(nombre, tipo, edad) {
        this.nombre = nombre;
        this.tipo = tipo;
        this.edad = edad;
    }

    get nombre() {
        return this.#nombre;
    }
    set nombre(value) {
        this.#nombre = value.length > 10 ? value.slice(0, 10) + "..." : value;
    }

    get tipo() {
        return this.#tipo;
    }
    set tipo(value) {
        if (value && typeof value === "string") {
            this.#tipo = value;
        } else {
            throw new Error("El tipo no puede estar vacío y debe ser una cadena de texto.");
        }
    }

    get edad() {
        return this.#edad;
    }
    set edad(value) {
        this.#edad = typeof value === "number" && value >= 5 ? value : 5;
    }

    toString() {
        return `Nombre: ${this.#nombre}, Tipo: ${this.#tipo}, Edad: ${this.#edad}`;
    }
}