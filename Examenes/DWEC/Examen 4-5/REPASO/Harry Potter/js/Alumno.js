// Parte 1: Implementacion de clases

class Alumno {
    
    #nombre;
    #fechaNacimiento;
    #dni;
    #casa;

    constructor (nombre, fechaNacimiento, dni, casa = null) {
        this.nombre = nombre;
        this.fechaNacimiento = fechaNacimiento;
        this.dni = dni;
        this.#casa = casa;
    }

    // Getter de nombre
    get nombre () {
        return this.#nombre;
    }

    // Setter de nombre
    set nombre (valorN) {
        
        const patronNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

        if (typeof valorN !== "string") {
            throw new Error ("El nombre debe ser un string");
        }

        if (valorN.length === 0) {
            throw new Error ("El nombre no puede estar vacio");
        }

        if (!patronNombre.test(valorN)) {
            throw new Error ("Solo se pueden usar letras y espacios");
        }

        this.#nombre = valorN;
    }

    // Getter de fechaNacimiento
    get fechaNacimiento () {
        return this.#fechaNacimiento;
    }

    // Setter de fechaNacimiento
    set fechaNacimiento (valorF) {

        const patronFecha =  /^\d{4}-\d{2}-\d{2}$/;

        if (!patronFecha.test(valorF)) {
            throw new Error ("El formato de fecha no es el correcto");
        }

        this.#fechaNacimiento = valorF;
    }

    // Getter de dni
    get dni () {
        return this.#dni;
    }

    // Setter de dni
    set dni (valorD) {

        const patronDni = /^\d{8}[A-Z]$/;

        if (!patronDni.test(valorD)) {
            throw new Error ("El formato del dni no es el correcto");
        }

        this.#dni = valorD;
    }

    // Getter de casa
    get casa () {
        return this.#casa;
    }

    // Setter de casa (asignarCasa)
    asignarCasa () {
        const casas = ["Gryffindor", "Slytherin", "Ravenclaw", "Hufflepuff"];
        const aleatoria = Math.floor(Math.random() * casas.length);
        this.#casa = casas[aleatoria]; // aleatoria devuelve un numero el cual se usa en casas
    }

    guardarEnLocalStorage () {
        // Objeto
        const datos = {
            nombre: this.#nombre,
            fechaNacimiento: this.#fechaNacimiento,
            dni: this.#dni,
            casa: this.#casa
        };

        localStorage.setItem(`alumno${this.#nombre}`, JSON.stringify(datos));
    }

    static obtenerDesdeLocalStorage () {
        const datos = JSON.parse(localStorage.getItem(`alumno${nombre}`));
        if (datos) {
            const alumno = new Alumno (
                datos.nombre,
                datos.fechaNacimiento,
                datos.dni,
                datos.casa
            );
            return alumno;
        } else {
            return null;
        }
    }

    //! Version con Cookies
    guardarEnCookies() {
        const datos = JSON.stringify({
            nombre: this.#nombre,
            fechaNacimiento: this.#fechaNacimiento,
            dni: this.#dni,
            casa: this.#casa
        });
        document.cookie = `alumno${this.#nombre}=${datos}; path=/`;
    }

    static obtenerDesdeCookies(nombre) {
        const cookies = document.cookie.split("; ");
        for (let c of cookies) {
            const [key, value] = c.split("=");
            if (key === `alumno${nombre}`) {
                const datos = JSON.parse(value);
                return new Alumno(
                    datos.nombre, 
                    datos.fechaNacimiento, 
                    datos.dni, 
                    datos.casa);
            }
        }
        return null;
    }

}