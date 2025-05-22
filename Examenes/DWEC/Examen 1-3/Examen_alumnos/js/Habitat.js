export class Habitat {

    #nombre;
    #ubicacion;
    #nivelPeligro;

    constructor(nombre, ubicacion, nivelPeligro) {
        this.nombre = nombre;
        this.ubicacion = ubicacion;
        this.nivelPeligro = nivelPeligro;
    }

    get nombre () {
        return this.#nombre;
    }

    set nombre (nombre) {
        if (typeof nombre === "string" && nombre.length() >= 4) {
            this.#nombre = nombre;
        } else if (typeof nombre === "string" && nombre.length() < 4) {
            this.#nombre = nombre + "ZZZ";
        } else {
            throw new Error ("El nombre debe de ser un str");
        }
    }

    get ubicacion () {
        return this.#ubicacion;
    }

    set ubicacion (ubicacion) {
        if (typeof ubicacion === "string") {
            this.#ubicacion = ubicacion;
        } else {
            throw new Error ("La ubicacion debe de ser un str");
        }
    }

    get nivelPeligro () {
        return this.#nivelPeligro;
    }

    set nivelPeligro (nivelPeligro) {
        if (typeof nivelPeligro === Number) {
            this.#nivelPeligro = nivelPeligro;
        } else {
            throw new Error ("La nivelPeligro debe de ser un numero");
        }
    }

    descripcion() {
        return (`Nombre: ${this.#nombre}\nUbicacion: ${this.#ubicacion}\nNivel de Peligro: ${this.#nivelPeligro}`);
    }
}