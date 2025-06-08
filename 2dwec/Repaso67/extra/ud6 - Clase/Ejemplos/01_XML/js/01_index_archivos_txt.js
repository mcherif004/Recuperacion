// Esperar a que el DOM se cargue
document.addEventListener('DOMContentLoaded',() => {
    document.getElementById("cambiaContenido").addEventListener("click", cambiaContenido);

    // Funcion que va a realizar la solicitud AJAX
    function cambiaContenido(){
        // 1. Creamos un nuevo objeto XMLHttpRequest
        let xhr = new XMLHttpRequest();

        // 2. Definimos la función que se ejecutará de forma asíncrona
        xhr.onreadystatechange = () =>{
            console.log("Estado cambiado: " + xhr.readyState);
            // 3. Verificar si la solicitud se ha completado correctamente
            if(xhr.readyState == 4 && xhr.status == 200){
                console.log("Respuesta recibida");
                // 4. Inserto la respuesta en el DOM
                document.getElementById("texto").innerHTML = xhr.responseText;
            }
        }

        // 5. Configuro la solicitud
        console.log("Congigurando la solicitud ...");

        /**
         * GET -> Tipo de solicitud
         * holamundo.txt -> URL del archivo que se va a solicitar
         * true -> Indica que la solicitud es asíncrona
         */
        xhr.open("GET", "holamundo.txt", true);

        // 6. Envio la solicitud
        console.log("Enviando la solicitud ...");
        xhr.send();
    }
});