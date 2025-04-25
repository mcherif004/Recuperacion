/*
Ejercicio 1: 
    Implementa la clase Participante para representar a los distintos asistentes al festival
        Constructor (nombre, edad)
        Nombre. String. No menos de 3 caracteres. Si tiene menos debe añadirse “…”
        Edad. Number. No menos de 18 años. Si tiene menos de 18 se le pone 18.
    toString() Devuelve toda la información del constructor.
    Sus setters y getters correspondientes.
*/

export class Participante {
    #nombre;
    #edad;

    constructor(nombre, edad) {
        this.nombre = nombre; // usa el setter con validación
        this.edad = edad;     // usa el setter con validación
    }

    get nombre() {
        return this.#nombre;
    }

    set nombre(value) {
        if (typeof value !== "string") {
            throw new TypeError("El nombre debe ser un string");
        }
        this.#nombre = value.length < 3 ? value + "..." : value;
    }

    get edad() {
        return this.#edad;
    }

    set edad(value) {
        if (typeof value !== "number" || isNaN(value)) {
            throw new TypeError("La edad debe ser un número válido");
        }
        this.#edad = value < 18 ? 18 : value;
    }

    toString() {
        return `Nombre: ${this.#nombre}, Edad: ${this.#edad}`;
    }
}