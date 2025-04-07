document.getElementById("eventos").addEventListener("mouseover", (manejador, manejador2)); // La llamada a la funcion es sin parentasis
document.getElementById("eventos").addEventListener("mouseout", manejador);

function manejador (e) {
    console.log(e)
    if (e.type == "mouseover") {
        this.style.color = "purple"; // Cuando usamos addEventListener para registrar un evento en un elemento, JS asigna automaticamente el valor this al elemento que ha registrado el evento
    } else {
        this.style.color = "black";
    }
}

function manejador2 (e) {
    console.log("functiona");
}