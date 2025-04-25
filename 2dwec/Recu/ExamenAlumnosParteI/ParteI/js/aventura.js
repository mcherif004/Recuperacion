import { Enemigo } from "./enemigo.js";

export class Aventura {

    #nombreMundo
    #heroes
    #enemigo

    constructor(nombreMundo, heroes, enemigo) {
        this.nombreMundo = nombreMundo;
        this.heroes = heroes;
        this.enemigo = enemigo;
    }

    get nombreMundo() {
        return this.#nombreMundo;
    }

    set nombreMundo(nombreMundo) {
        if (typeof nombreMundo === "string" && nombreMundo.trim() !== "" && nombreMundo.length >= 5) {
            this.#nombreMundo = nombreMundo;
        } else {
            throw new Error("El nombre del mundo debe ser una cadena de al menos 5 caracteres.");
        }
    }

    get heroes() {
        return this.#heroes;
    }

    set heroes(heroes) {
        if (Array.isArray(heroes) && heroes.length >= 2) {
            this.#heroes = heroes;
        } else {
            throw new Error("Debe haber al menos 2 héroes.");
        }
    }

    get enemigo() {
        return this.#enemigo;
    }

    set enemigo(enemigo) {
        if (enemigo instanceof Enemigo) {
            this.#enemigo = enemigo;
        } else {
            throw new Error("Debe ser un objeto de tipo Enemigo.");
        }
    }

    toString() {
        // Usamos los getters de nombre para obtener los nombres de los héroes y enemigo
        const heroesNames = this.#heroes.map(heroe => heroe.nombre).join(", ");
        return `Aventura en el mundo: ${this.#nombreMundo}\nHéroes: ${heroesNames}\nEnemigo: ${this.#enemigo.nombre}`;
    }
}