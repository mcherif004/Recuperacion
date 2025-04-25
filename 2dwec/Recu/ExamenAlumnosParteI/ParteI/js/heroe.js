import { Personaje } from "./personaje.js";

export class Heroe extends Personaje {

    #habilidadEspecial;

    constructor(nombre) {
        super(nombre);
        this.habilidadEspecial = nombre;  // Establecer la habilidad según el nombre del héroe
    }

    get habilidadEspecial() {
        return this.#habilidadEspecial;
    }

    set habilidadEspecial(nombreHeroe) {
        switch (nombreHeroe) {
            case "Mario":
                this.#habilidadEspecial = "Lanzar Fuego";
                break;
            case "Luigi":
                this.#habilidadEspecial = "Salto Alto";
                break;
            case "Peach":
                this.#habilidadEspecial = "Flotar";
                break;
            case "Toad":
                this.#habilidadEspecial = "Velocidad Extra";
                break;
            default:
                throw new Error("Nombre no válido para un héroe.");
        }
    }

    toString() {
        return `Nombre: ${this.nombre} - Habilidad: ${this.#habilidadEspecial}`;
    }
}