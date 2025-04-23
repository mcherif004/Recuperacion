export class Produccion {
    #titulo;
    #nacionalidad;
    #genero;
    #anio;

    constructor(titulo, nacionalidad, genero, anio) {
        this.titulo = titulo; // Se usa el setter para validar
        this.nacionalidad = nacionalidad; // Se usa el setter para validar
        this.genero = genero; // Se usa el setter para validar
        this.anio = anio; // Se usa el setter para validar
    }

    get titulo() {
        return this.#titulo;
    }

    set titulo(titulo) {
        if (typeof titulo !== "string" || titulo.trim() === "") {
            this.#titulo = "Desconocido"; // Si es inválido, se asigna un valor por defecto
        } else {
            this.#titulo = titulo.trim();
        }
    }

    get nacionalidad() {
        return this.#nacionalidad;
    }

    set nacionalidad(nacionalidad) {
        if (typeof nacionalidad !== "string" || nacionalidad.trim() === "") {
            this.#nacionalidad = "Desconocida"; // Valor por defecto si es inválido
        } else {
            this.#nacionalidad = nacionalidad.trim();
        }
    }

    get genero() {
        return this.#genero;
    }

    set genero(genero) {
        if (typeof genero !== "string" || genero.trim() === "") {
            this.#genero = "Indefinido"; // Valor por defecto si no se proporciona
        } else {
            this.#genero = genero.trim().charAt(0).toUpperCase() + genero.trim().slice(1).toLowerCase();
        }
    }

    get anio() {
        return this.#anio;
    }

    set anio(anio) {
        if (typeof anio !== "number" || isNaN(anio) || anio < 1999) {
            this.#anio = 1999; // Si no es un número válido o es menor a 1999, se asigna 1999
        } else {
            this.#anio = anio;
        }
    }

    toString() {
        return `Título: ${this.#titulo} \nNacionalidad: ${this.#nacionalidad} \nGénero: ${this.#genero} \nAño: ${this.#anio}`;
    }
}