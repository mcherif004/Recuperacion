export class Festival {

    #nombre;
    #ciudad;
    #edicion;
    #descripcion;

    constructor(nombre, ciudad, edicion, descripcion) {
        this.nombre = nombre;
        this.ciudad = ciudad;
        this.edicion = edicion;
        this.descripcion = descripcion;
    }

    get nombre() {
        return this.#nombre;
    }

    set nombre(nombre) {
        if (nombre.length() < 3 || nombre == ("" || " ")) {
            throw new Error("El nombre no debe estaer vacio y debe de tener mas de 3 caracteres");
        } else {
            this.#nombre = nombre;
        }
    }
}