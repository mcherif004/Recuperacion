//////////////////////////////// USANDO XMLHttpRequest ////////////////////////////////////////////

// PASO 1
console.log("-----------------------------------------------");
console.log("----------- USANDO XMLHttpRequest -------------");
console.log("-----------------------------------------------");
const xhr = new XMLHttpRequest();

// // PASO 2
xhr.addEventListener("readystatechange", () => {
  if (xhr.readyState != 4) return;
  // console.log(xhr);

  if (xhr.status >= 200 && xhr.status < 300) {
    let json = JSON.parse(xhr.responseText);
    json.forEach(element => {
      console.log("Nombre: ", element.name, "Correo: ", element.email, "Teléfono: ", element.phone);
    });
  } else {
    console.log("Hubo un error");
  }
});

// // PASO 3

xhr.open("GET", "https://jsonplaceholder.typicode.com/users");

// // PASO 4
xhr.send();


//////////////////////////////// USANDO fetch CON THEN ////////////////////////////////////////////
fetch("https://jsonplaceholder.typicode.com/users")
.then((response) => {
  if (response.ok === true && response.status === 200){
    let json = response.json();
    console.log("----------------------------------------------------");
    console.log("------------- USANDO fetch CON THEN ----------------")
    console.log("----------------------------------------------------");
    return json;
  } else {
    throw ("Hubo un error en la petición");
  }
})
.then((json) => {
  json.forEach(element => {
    console.log("Nombre: ", element.name, "Correo: ", element.email, "Teléfono: ", element.phone)
  });
})
.catch(e => {console.log(e)})



//////////////////////////////// USANDO fetch CON FUNCIONES ASYNC AWAIT ////////////////////////////////////////////
async function miPeticion1() {
  try {
    let response = await fetch("https://jsonplaceholder.typicode.com/users"),
    json = await response.json();
    console.log("-------------------------------------------------------------");
    console.log("---------- USANDO fetch CON FUNCIONES ASYNC AWAIT -----------")
    console.log("-------------------------------------------------------------");
    if (!response.ok && response.status != 200) {
      throw ("Hubo un error en la petición");
    }
    json.forEach(element => {
          console.log("Nombre: ", element.name, "Correo: ", element.email, "Teléfono: ", element.phone)
        });
  } catch (error) {
    console.log(error);
  } finally {
    console.log("Hola soy un finally si o si me voy a mostrar");
  }
}

miPeticion1();



//////////////////////////////// USANDO Axios ////////////////////////////////////////////
axios.get("https://jsonplaceholder.typicode.com/users")
.then((response)=>{
  let json = response.data;
  console.log("-----------------------------------");
  console.log("---------- USANDO Axios -----------")
  console.log("-----------------------------------");
  json.forEach(element => {
    console.log("Nombre: ", element.name, "Correo: ", element.email, "Teléfono: ", element.phone)
  });
})
.catch((error)=> {
console.log("Tenemos un error: ", error.response.status)
})
.finally(() => {
  console.log("Hola soy un finally si o si me voy a mostrar")
})




//////////////////////////////// USANDO Axios Async Await////////////////////////////////////////////
async function miPeticion2() {
  try {
    let response = await axios.get("https://jsonplaceholder.typicode.com/users"),
    json = await response.data;
    console.log("---------------------------------------------------");
    console.log("------------ USANDO Axios Async Await -------------")
    console.log("---------------------------------------------------");
    json.forEach(element => {
      console.log("Nombre: ", element.name, "Correo: ", element.email, "Teléfono: ", element.phone)
    });

  } catch (error) {
    console.log("Tenemos un error: ", error.response.status)
  } finally {
    console.log("Hola soy un finally si o si me voy a mostrar")
  }
} 

miPeticion2();