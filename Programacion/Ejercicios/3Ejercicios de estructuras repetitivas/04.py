# Escribir un programa que imprima todos los números pares entre dos números que se le pidan al usuario.

num1 = int(input("Ingrese el primer número: "))
num2 = int(input("Ingrese el segundo número: "))

for num in range(num1+1,num2): #Range no incluye el segundo numero, y le añado +1 para que no añada el primero
    if num % 2 == 0:
        print(num)