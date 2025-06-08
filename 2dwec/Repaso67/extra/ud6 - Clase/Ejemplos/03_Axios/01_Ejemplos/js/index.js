// Con AXIOS nos ahorra un .then
axios.get("https://jsonplaceholder.typicode.com/users")
    .then((response) => {
        // console.log(response.data);
        let json = response.data;
        json.forEach(element => {
            console.log(element.username);
        });
    })
    .catch((error) => {
        console.log("Tenemos un error: " + error.response.status);
    });