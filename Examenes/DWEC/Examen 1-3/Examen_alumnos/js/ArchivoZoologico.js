import { Animal } from "./Animal";

export class ArchivoZoologico {

    #animales;
    #habitats;

    constructor() {
        this.#animales = [];
        this.#habitats = [];
    }

    annadirHabitat = (habitat) => {
        if (!this.#habitats.some(e => e.habitat === habitat.nombre)) {
            this.#habitats.push(habitat);
            return true;
        }
        return false;
    }

    annadirAnimal = (animal) => {
        const fila = animal instanceof Animal ? 1 : 0;
        this.#animales.push(animal);
    }

    mostarAnimales () {
        return `Animales: ${this.#animales}`;
    }

    mostarHabitats () {
        return `Habitats: ${this.#habitats}`;
    }

    resumen () {
        return`El total de habitats ${this.#habitats.length()}\n El total de animales ${this.#animales.length()}`;
    }
}