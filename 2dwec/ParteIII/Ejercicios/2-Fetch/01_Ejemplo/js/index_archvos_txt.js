document.addEventListener("DOMContentLoaded",()=>{
    document.getElementById("cambiaContenido").addEventListener("click",cambiaContenido);
    function cambiaContenido(){
        fetch("holamundo.txt")
        .then(response=>{
            if(!response.ok){
                throw new Error(`Error: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById("texto").innerHTML = data;
        })
        .catch(error =>{
            console.error("Error del servidor", error);
        })
    }
});