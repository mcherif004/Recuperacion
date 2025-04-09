/* Realiza un script con if y otro con switch que permita introducir la edad de
una persona, mediante la función prompt y muestre un mensaje de pendiendo la edad.

-Si la edad es menor de 18 años, se mostrar el mensaje, "Eres menor de edad".

-Si la edad es mayor de 18 y menor o igual de 30 de años, se mostrar el mensaje, "Eres muy joven".

-Si la edad es mayor de 30 y menor o igual de 60 de años, se mostrar el mensaje, "Eres una persona adulta".

-Si la edad es mayor de 60, se mostrar el mensaje, "Eres una persona adulta mayor".

-Si la edad es un dato incorrecto, mostrar un mensaje"Error, debe ser un número" */

console.log("Con if/else if/else");

let edad = prompt("Introduce tu edad: ");

if (edad < 18) {
    console.log("Eres menor de edad");
} 
else if (edad >= 18 && edad <= 30) {
    console.log("Eres muy joven");
}
else if (edad > 30 && edad <= 60) {
    console.log("Eres una persona adulta");
}
else if (edad > 60) {
    console.log("Eres una persona adulta mayor");
}
else {
    console.log("Error, debe ser un número")
}