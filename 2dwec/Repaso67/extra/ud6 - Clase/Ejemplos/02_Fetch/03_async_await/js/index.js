async function miPeticion(){
    try{
        let response = await fetch("https://jsonplaceholder.typicode.com/users");
        
        if (!response.ok || response.status !== 200){
            throw new Error("Error en la petición");
        }
        
        let json = await response.json();

        json.forEach(element => {
            console.log(element.username);
        });
    } catch(error){
        console.log(error);
    }
}
miPeticion();