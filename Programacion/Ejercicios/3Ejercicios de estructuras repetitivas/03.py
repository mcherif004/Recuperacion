# Algoritmo que pida caracteres e imprima ‘VOCAL’ si son vocales y ‘NO VOCAL’ en caso contrario, el programa termina cuando se introduce un espacio.

while True:
    caracter = input("Introduce un caracter: ")
    vocales = ["a","e","i","o","u"]
    if caracter == " ":
        print("Hasta la proxima!")
        break
    elif caracter in vocales:
        print("VOCAL")
    elif caracter.isalpha() and caracter not in vocales:
        print("NO VOCAL")
    else:
        print("Error inesperado")