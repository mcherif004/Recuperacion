/*
Ejercicio 2:
    Implementa la clase Jurado para representar al jurado del festival. Hereda de Participante sus atributos y añade.
        Constructor (nombre, edad, profesión, genero)
        profesion. String. No menos de 5 caracteres.
        genero. Sólo acepta estos posibles valores “h”, “m”, “l”, “g”, “t”, “b”,”i”, “q”, “a”,”+”
    toString() Devuelve toda la información del constructor.
    Sus setters y getters correspondientes.
*/
import { Participante } from "./Participante.js";

class Jurado extends Participante {
    #profesion;
    #genero;

    constructor(nombre, edad, profesion, genero) {
        super(nombre, edad); // Llama al constructor de la clase padre
        this.profesion = profesion; // usa el setter con validación
        this.genero = genero;       // usa el setter con validación
    }

    get profesion() {
        return this.#profesion;
    }

    set profesion(value) {
        if (typeof value !== "string") {
            throw new TypeError("La profesión debe ser un string");
        }
        this.#profesion = value.length < 5 ? value + "..." : value;
    }

    get genero() {
        return this.#genero;
    }

    set genero(value) {
        const generosValidos = ["h", "m", "l", "g", "t", "b", "i", "q", "a", "+"];
        if (typeof value !== "string" || !generosValidos.includes(value)) {
            throw new TypeError("El género no es válido");
        }
        this.#genero = value;
    }

    toString() {
        return `Nombre: ${this.nombre}, Edad: ${this.edad}, Profesión: ${this.#profesion}, Género: ${this.#genero}`;
    }

}