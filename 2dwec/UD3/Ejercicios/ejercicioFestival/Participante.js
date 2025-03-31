export class Participante {
    
    #nombre;
    #edad;
    
    constructor(nombre, edad) {
        this.nombre = nombre;
        this.edad = edad;
    }

    get nombre() {
        return this.#nombre;
    }

    set nombre(nombre) {
        if (typeof nombre !== "string" || nombre.trim().length < 3) {
            this.#nombre = nombre + "...";
        } else {
            this.#nombre = nombre.trim();
        }
    }

    get edad() {
        return this.#edad;
    }

    set edad(edad) {
        if (typeof edad !== "number" || isNaN(edad)) {
            this.#edad = 18;
        } else {
            this.#edad = edad < 18 ? 18 : edad; 
        }
    }

    toString() {
        return `Nombre: ${this.#nombre} \nEdad: ${this.#edad}`;
    }    
}