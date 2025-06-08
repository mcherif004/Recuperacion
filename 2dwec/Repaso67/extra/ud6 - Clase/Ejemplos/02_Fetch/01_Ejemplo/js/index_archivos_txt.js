document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("cambiaContenido").addEventListener("click", cambiaContenido);

    function cambiaContenido() {
        fetch("holamundo.txt")
        .then(response =>{
            if(response.ok){
                return response.text();
            }
            throw new Error(`Error: ${response.status}`);
        })
        .then(data => {
            document.getElementById("texto").innerText = data;
        })
        .catch(error => {
            console.error("Error del servidor: ", error);
        });
    }
})