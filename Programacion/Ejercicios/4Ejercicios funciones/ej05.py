"""Crea una función que reciba un número, lo convierta al sistema de palotes y lo devuelva en una cadena de caracteres. 

Por ejemplo, el 470213 en decimal es el | | | | - | | | | | | | - - | | - | - | | | en el sistema de palotes. 

Utiliza esta función en un programa para comprobar que funciona bien. Desde la función no se debe mostrar nada por pantalla, solo se debe usar print desde el programa principal."""

import random
from ej03 import maximum, minimum, mean, variance, median, mode

def es_primo(n):
    if n < 2:
        return False
    for i in range(2, int(n ** 0.5) + 1):
        if n % i == 0:
            return False
    return True

def voltea(n):
    rev = 0
    temp = n
    while temp > 0:
        rev = rev * 10 + temp % 10
        temp //= 10
    return rev

def es_capicua(n):
    return n == voltea(n)

def convertir_a_palotes(n):
    return ' - '.join('|' * int(digito) for digito in str(n))

def mostrar_menu():
    print("\nMenú de opciones:")
    print("1. Mostrar números primos entre 1 y 1000")
    print("2. Mostrar números capicúa entre 1 y 99999")
    print("3. Mostrar moda de 50 números aleatorios entre 1 y 10")
    print("4. Mostrar mediana de 10 números aleatorios entre 1 y 50")
    print("5. Mostrar máximo y mínimo de 1000 números aleatorios entre 1 y 50000")
    print("6. Mostrar varianza de 10 números aleatorios entre 1 y 5")
    print("7. Convertir número al sistema de palotes")
    print("8. Salir")

def ejecutar_opcion(opcion):
    if opcion == 1:
        primos = [n for n in range(1, 1001) if es_primo(n)]
        print("Números primos entre 1 y 1000:", primos)
    elif opcion == 2:
        capicuas = [n for n in range(1, 100000) if es_capicua(n)]
        print("Números capicúa entre 1 y 99999:", capicuas)
    elif opcion == 3:
        datos = [random.randint(1, 10) for _ in range(50)]
        print("Moda de los números:", mode(datos))
    elif opcion == 4:
        datos = [random.randint(1, 50) for _ in range(10)]
        print("Mediana de los números:", median(datos))
    elif opcion == 5:
        datos = [random.randint(1, 50000) for _ in range(1000)]
        print("Máximo:", maximum(datos))
        print("Mínimo:", minimum(datos))
    elif opcion == 6:
        datos = [random.randint(1, 5) for _ in range(10)]
        print("Varianza de los números:", variance(datos))
    elif opcion == 7:
        numero = int(input("Introduce un número para convertir al sistema de palotes: "))
        print("Sistema de palotes:", convertir_a_palotes(numero))
    elif opcion == 8:
        print("Saliendo...")
        exit()
    else:
        print("Opción no válida, intenta de nuevo.")

if __name__ == "__main__":
    while True:
        mostrar_menu()
        opcion = int(input("Elige una opción: "))
        ejecutar_opcion(opcion)