async function miPeticion(){
try {
    let response = await fetch("https://jsonplaceholder.typicode.com/users");
    let json = await response.json();

    if(!response.ok || response.status !=200) {
        throw ("Ha ocurrido un error con el servidor");
    }
    json.forEach(element => {
        console.log(element.username);
    }); 
} catch (error) {
    console.log(error);
}
}
miPeticion();