export class Personaje {

    #nombre;

    constructor (nombre) {
        this.nombre = nombre;
    }

    get nombre () {
        return this.#nombre;
    }

    set nombre(nombre) {
        if (typeof nombre === "string" && nombre.trim() !== "") {
            this.#nombre = nombre;
        } else {
            throw new Error("El nombre no puede estar en blanco y debe ser una cadena.");
        }
    }

    toString () {
        return `Nombre: ${this.#nombre}`;
    }
}