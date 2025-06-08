// EJEMPLO CONTRA UNA API MUY SENCILLO DE FETCH
fetch("https://jsonplaceholder.typicode.com/users")
.then(response =>{
    // console.log(response);
    if (response.ok && response.status === 200){
        let json = response.json(); // PAsamos la promesa a formato json
        return json;
    }

    throw new Error("Error en la petición al servidor");
})
.then(json => {
    // Podemos acceder a lo que ha devuelto el servidor
    json.forEach(element => {
        console.log(element.username);
    });
})
.catch(error => {
    console.log(error);
});