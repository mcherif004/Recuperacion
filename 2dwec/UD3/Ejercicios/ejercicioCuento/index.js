import { Personaje } from "./Personaje.js";
import { Protagonista } from "./Protagonista.js";
import { Escenario } from "./Escenario.js";
import { Cuento } from "./Cuento.js";

try {
    // Crear escenario
    const escenario1 = new Escenario("Bosque Encantado", "En el valle", "nublado");
    const escenario2 = new Escenario("Torre del Dragón", "Cima de la montaña", "ventoso");

    // Crear personajes
    const personaje1 = new Personaje("Gimli", "Enano", 50);
    const personaje2 = new Personaje("Legolas", "Elfo", 120);
    
    // Crear protagonistas
    const protagonista1 = new Protagonista("Aragorn", "Humano", 87, "Liderazgo");
    const protagonista2 = new Protagonista("Gandalf", "Mago", 300, "Sabiduría");

    // Crear cuento y añadir escenarios/personajes
    const cuento = new Cuento("La Princesa Valiente", "Ana López", "El valor vence el miedo.", "Una historia épica de coraje.");
    cuento.introducirEscenario(escenario1);
    cuento.introducirEscenario(escenario2);

    cuento.anadirPersonaje(personaje1);
    cuento.anadirPersonaje(personaje2);
    cuento.anadirPersonaje(protagonista1);
    cuento.anadirPersonaje(protagonista2);

    // Mostrar información del cuento
    console.log(cuento.toString());
    console.log("Escenarios:", cuento.aEscenarios.map(e => e.toString()));
    console.log("Personajes:", cuento.aPersonajes[0].map(p => p.toString()));
    console.log("Protagonistas:", cuento.aPersonajes[1].map(p => p.toString()));

} catch (error) {
    console.error("Error:", error.message);
}