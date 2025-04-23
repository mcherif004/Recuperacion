/*
Ejercicio 1: Declaración y acceso a elementos de un array 

Crea un array de 5 elementos con los nombres de tus provincias favoritas. Después: 
    1. Añade una provincia nueva al final del array. 
    2. Muestra la longitud del array y todos sus elementos usando console.table. 
    3. Usa console.log para acceder al tercer elemento del array utilizando at() y la notación de corchetes.
*/
console.log("1");
array = ["Cordoba", "Sevilla", "Malaga", "Jaen", "Cadiz"];
console.log(array);
array.push("Granada");

console.log("2");
console.log(array);
console.log(array.length);
console.table(array);

console.log("3");
// Con at
console.log(array.at(2));
// Con []
console.log(array[2]);

