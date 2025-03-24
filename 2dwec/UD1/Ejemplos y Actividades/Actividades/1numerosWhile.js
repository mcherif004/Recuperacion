// Crea un script que muestre los números impares que no sean múltiplo de 3 ni de 7 que se encuentren entre el 100 al 1.

console.log("Con While")

let i = 1

while (i < 100) {
    if (i % 3 != 0 && i % 7 != 0 && i % 2 != 0) {
        console.log("El numero " + i + " no es multiplo de 3, ni 7 y es impar")
    }
    i++
}