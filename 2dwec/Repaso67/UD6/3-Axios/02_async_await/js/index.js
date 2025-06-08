// async function miPeticion(){
// try {
//     let response = await axios.get("https://jsonplaceholder.typicode.com/users");
//     let json = await response.data;
//     json.forEach(element => {
//         console.log(element.name); // Mostramos el nombre de cada usuario
//     });
// } catch (error) {
//     console.log("Tenemos un error ",error.response.status);
// }finally{
//     console.log("--Me ves siempre--");
    
// }
// }
// miPeticion();
// async function miPeticion(id) {
//     try {
//         let response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
//         let usuario = response.data;
///////////////////////////
////        let response = await axios.get("https://jsonplaceholder.typicode.com/users", {
//              params: { id: id } // ✅ Pasamos el ID como parámetro en la URL
//                  });
//             let usuario = response.data;
///////////////////////////
        
//         console.log(`Nombre: ${usuario.name}`);
//         console.log(`Username: ${usuario.username}`);
//         console.log(`Email: ${usuario.email}`);
//     } catch (error) {
//         console.log("Tenemos un error ", error.response?.status || error.message);
//     } finally {
//         console.log("--Me ves siempre--");
//     }
// }

// // Llamada a la función con un ID específico
// miPeticion(3);
// Función asíncrona para hacer la petición con POST
async function miPeticion(id) {
    try {
        // Enviamos una solicitud POST con el ID del usuario en el cuerpo de la petición
        let response = await axios.post("https://jsonplaceholder.typicode.com/users", {
            id: id  // Enviamos el ID como parte del cuerpo de la petición
        });

        // Extraemos los datos de la respuesta
        let usuario = response.data;

        // Mostramos los datos del usuario devuelto por la API
        console.log(`Usuario obtenido mediante POST:`);
        console.log(`Nombre: ${usuario.name}`);
        console.log(`Username: ${usuario.username}`);
        console.log(`Email: ${usuario.email}`);

    } catch (error) {
        // Capturamos errores y mostramos el código de error o el mensaje
        console.log("Tenemos un error ", error.response?.status || error.message);
    } finally {
        // Este bloque se ejecuta siempre, haya error o no
        console.log("--Me ves siempre--");
    }
}

// Llamamos a la función pasando el ID del usuario que queremos obtener
miPeticion(1);
