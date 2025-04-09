// Crea un script que muestre los números impares que no sean múltiplo de 3 ni de 7 que se encuentren entre el 100 al 1.

// 1
console.log("\nCon While");

let n = 1;

while (n <= 100) {
    if (n % 3 != 0 && n % 7 != 0 && n % 2 != 0) {
        console.log("El numero " + n + " no es multiplo de 3, ni 7 y es impar");
    }
    n++;
}

// 2
console.log("\nCon do while");

let num = 1;

do {
    if (num % 3 != 0 && num % 7 != 0 && num % 2 != 0) {
        console.log("El numero " + num + " no es multiplo de 3, ni 7 y es impar");
    }
    num++;
} while (num <= 100);

// 3
console.log("Con for");

for (let number = 1; number < 100; number++) {
    if (number % 3 != 0 && number % 7 != 0 && number % 2 != 0) {
        console.log("El numero " + number + " no es multiplo de 3, ni 7 y es impar");
    }
}