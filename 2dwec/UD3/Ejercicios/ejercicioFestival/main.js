import { Festival } from "./Festival.js";
import { Participante } from "./Participante.js";
import { Jurado } from "./Jurado.js";
import { Produccion } from "./Produccion.js";

try {
    const festival = new Festival("CineFest", "Madrid", 5, "Festival de cine anual.");

    const p1 = new Participante("Carlos", 25);
    const p2 = new Participante("Ana", 30);
    const p3 = new Participante("Juan", 22);

    const j1 = new Jurado("Laura", 40, "Crítica de cine", "m");
    const j2 = new Jurado("Pedro", 50, "Director", "h");
    const j3 = new Jurado("Sofía", 35, "Actriz", "m");

    const prod1 = new Produccion("Inception", "EEUU", "Ciencia ficción", 2010);
    const prod2 = new Produccion("Interstellar", "EEUU", "Aventura", 2014);

    festival.anadirParticipante(p1);
    festival.anadirParticipante(j1);
    festival.introducirProduccion(prod1);

    console.log(festival.toString());
} catch (error) {
    console.error("Error:", error.message);
}