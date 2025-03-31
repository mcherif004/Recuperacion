import { Participante } from "./Participante.js";

export class Jurado extends Participante {
    #profesion;
    #genero;

    constructor(nombre, edad, profesion, genero) {
        super(nombre, edad);  // Llamamos al constructor de Participante
        this.profesion = profesion; // Usamos el setter para validar
        this.genero = genero; // Usamos el setter para validar
    }

    get profesion() {
        return this.#profesion;
    }

    set profesion(profesion) {
        if (typeof profesion !== "string" || profesion.trim().length < 5) {
            this.#profesion = "..."; // Si no tiene al menos 5 caracteres, asignamos "..."
        } else {
            this.#profesion = profesion.trim();
        }
    }

    get genero() {
        return this.#genero;
    }

    set genero(genero) {
        const valoresPermitidos = ["h", "m", "l", "g", "t", "b", "i", "q", "a", "+"];
        if (!valoresPermitidos.includes(genero)) {
            this.#genero = "..."; // Si el género no está permitido, asignamos "..."
        } else {
            this.#genero = genero;
        }
    }

    toString() {
        return `${super.toString()} \nProfesión: ${this.#profesion} \nGénero: ${this.#genero}`;
    }
}