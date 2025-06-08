document.addEventListener('DOMContentLoaded', () => {
    document.querySelector("#GET").addEventListener('click', mostraMensajeGET);
    document.querySelector("#POST").addEventListener('click', mostraMensajePOST);
})

function mostraMensajeGET() {
    fetch("ejemplo.php?valor=GET&nombre=Raúl")
    .then(response => {
        if (response.ok) {
            return response.text();
        }
        throw new Error("Error en la respuesta");
    })
    .then(data => {
        document.querySelector("#mensaje").textContent = data;
    })
    .catch(error => {
        console.error("Error: ", error);
    })
}

function mostraMensajePOST() {
    fetch("ejemplo.php", {method: "POST", headers:{"Content-type": "application/x-www-form-urlencoded"}, body: "valor=POST&&nombre=Jesús"})
    .then(response => {
        if (response.ok) {
            return response.text();
        }
        throw new Error("Error en la respuesta");
    })
    .then(data => {
        document.querySelector("#mensaje").textContent = data;
    })
    .catch(error => {
        console.error("Error: ", error);
    })
}