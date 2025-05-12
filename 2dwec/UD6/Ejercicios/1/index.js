// Usando XMLHttpRequest

// Paso 1
const xhr = new XMLHttpRequest(); // creo la instancia

// Paso 2
xhr.addEventListener("readystatechange", () => {
    if (xhr.readyState != 4) {
        return;
    }
    if (xhr.status >= 200 && xhr.status < 300) {
        let json = JSON.parse(xhr.responseText); //!
        console.log("XMLHttpRequest\n");
        json.forEach(elemento => {
            console.log("Nombre: ", elemento.name, "Correo: ", elemento.email)
        });
    } else {
        console.log("Ha ocurrido un error");
    }
});

// Paso 3
xhr.open("GET", "https://jsonplaceholder.typicode.com/users");

// Paso 4
xhr.send();

// Usando Fetch con then

fetch("https://jsonplaceholder.typicode.com/users")
.then((response) => {
    console.log("fetch con then\n");
    if (response.ok === true && response.status === 200) {
        let json = response.json(); // tambien devuelve una promesa
        return json;
    } else {
        throw new Error ("Ha habido un error con la peticion");
    }
})
.then((json) => {
    json.forEach(elemento => {
        console.log("Nombre: ", elemento.name, "Correo: ", elemento.email)
    });
})
.catch( e => { // Captura de errores
    console.log(e);
})

// Usando fetch con async/await 
// defines la funcion asincrona que realiza la peticion
async function miPeticion() {
    try {
        let response = await fetch("https://jsonplaceholder.typicode.com/users");3
        let json = await response.json();

        console.log("fetch con async/await");
        
        if (!response.ok && response.status != 200) {
            throw("Ha habido algun error en la peticion")
        }

        json.forEach( elemento => {
            console.log("Nombre: ", elemento.name, "Correo: ", elemento.email)
        })
    } catch (error) {
        console.log("Error")
    }

    miPeticion();

    // Usando AXIOS con then 

    axios.get("https://jsonplaceholder.typicode.com/users")
    .then((response) => {
        let json = response.data;

        console.log("AXIOS con then");

        json.forEach(elemento => {
            console.log("Nombre: ", elemento.name, "Correo: ", elemento.email)
        })
    })
    .catch ((error) => {
        console.log(error.response.status);
    })
}

// Usando AXIOS con async/await 

async function miPeticion2() {
    try {
        let response    
    }
}