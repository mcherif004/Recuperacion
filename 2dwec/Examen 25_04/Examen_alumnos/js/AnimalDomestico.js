import { Animal } from "./Animal.js";

export class AnimalDomestico extends Animal {

    #obediencia;
    #esCariñoso;

    constructor(nombre, especie, patas, nivelFuerza, obediencia, esCariñoso) {
        super(nombre, especie, patas, nivelFuerza);
        this.obediencia = obediencia;
        this.esCariñoso = esCariñoso;
    }

    get obediencia () {
        return this.#obediencia;
    }

    set obediencia (obediencia) {
        if (typeof obediencia === Number && obediencia < this.nivelFuerza) {
            this.#obediencia = obediencia;
        } else {
            throw new Error ("La obediencia debe de ser un numero y debe ser menor que el nivel de fuerza");
        }
    }

    get esCariñoso () {
        return this.#esCariñoso;
    }

    set esCariñoso (esCariñoso) {
        if (typeof esCariñoso === Boolean) {
            this.#esCariñoso = esCariñoso;
        } else {
            throw new Error ("Es cariñoso debe de ser un booleano");
        }
    }

    descripcion() {
        return`${super.descripcion()}\nObediencia: ${this.#obediencia}\nEs Cariñoso: ${this.#esCariñoso}`;
    }
}