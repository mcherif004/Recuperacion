//Con AXIOS nos ahorra un .then
axios.get("https://jsonplaceholder.typicode.com/user")
.then(reponsonse=>{
    //console.log(reponsonse);
    let json = reponsonse.data;
    json.forEach(element => {
        console.log(element.username);
    });
})
.catch((error)=>{
    console.log("Tenemos un error ",error.reponsonse.status);
})
.finally(()=>{
    console.log("---Me muestro seguro---");
    
})

axios.post("https://jsonplaceholder.typicode.com/users", {
    name: "María",
    username: "ProfeDWEC",
    email: "maria@iesgrancapitan.com"
})
.then(response => {
    console.log("Usuario creado:");
    console.log(response.data);
})
.catch(error => {
    console.log("Tenemos un error ", error.response?.status);
})
.finally(() => {
    console.log("---Me muestro seguro---");
});
