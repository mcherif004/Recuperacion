export class Cuento {
    #titulo;
    #autor;
    #moraleja;
    #descripcion;
    #aEscenarios;
    #aPersonajes;

    constructor(titulo, autor, moraleja, descripcion) {
        this.titulo = titulo;
        this.autor = autor;
        this.moraleja = moraleja;
        this.descripcion = descripcion;
        this.#aEscenarios = [];
        this.#aPersonajes = [[], []];
    }

    get titulo() {
        return this.#titulo;
    }
    set titulo(value) {
        if (value.length >= 3) this.#titulo = value;
        else throw new Error("El título debe tener al menos 3 caracteres.");
    }

    get autor() {
        return this.#autor;
    }
    set autor(value) {
        if (value.trim()) this.#autor = value;
        else throw new Error("El autor no puede estar en blanco.");
    }

    get moraleja() {
        return this.#moraleja;
    }
    set moraleja(value) {
        if (value.length <= 100) this.#moraleja = value;
        else throw new Error("La moraleja debe tener máximo 100 caracteres.");
    }

    get descripcion() {
        return this.#descripcion;
    }
    set descripcion(value) {
        if (value.length <= 300) this.#descripcion = value;
        else throw new Error("La descripción debe tener máximo 300 caracteres.");
    }

    introducirEscenario = (escenario) => {
        if (!this.#aEscenarios.some(e => e.nombre === escenario.nombre)) {
            this.#aEscenarios.push(escenario);
            return true;
        }
        return false;
    }

    anadirPersonaje = (personaje) => {
        const fila = personaje instanceof Protagonista ? 1 : 0;
        this.#aPersonajes[fila].push(personaje);
    }

    toString() {
        return `Título: ${this.#titulo}, Autor: ${this.#autor}, Moraleja: ${this.#moraleja}, Descripción: ${this.#descripcion}`;
    }
}