document.addEventListener("DOMContentLoaded",() =>{
    document.querySelector("#GET").addEventListener("click",mostrarMensajeGET);
    document.querySelector("#POST").addEventListener("click",mostrarMensajePOST);

});
function mostrarMensajeGET(){
    fetch("ejemplo.php?valor=GET&nombre=María")
    .then( response=>{
        if(!response.ok){
            throw ("Error de comunicación");
        }
        return response.text();
    })
    .then(data => {
        document.querySelector("#mensaje").textContent = data;
    })
    .catch(error => {
        console.error(error);
    });
}
function mostrarMensajePOST(){
    fetch("ejemplo.php",{method:'POST', headers:{'Content-Type': 'application/x-www-form-urlencoded'} ,body:`valor=POST&&nombre=Antonio`})
    .then( response=>{
        if(!response.ok){
            throw ("Error de comunicación");
        }
        return response.text();
    })
    .then(data => {
        document.querySelector("#mensaje").textContent = data;
    })
    .catch(error => {
        console.error(error);
    });
}
