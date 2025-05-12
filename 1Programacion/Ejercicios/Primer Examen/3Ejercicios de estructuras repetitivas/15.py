# Introducir una cadena de caracteres e indicar si es un palíndromo. Una palabra palíndroma es aquella que se lee igual adelante que atrás.

cadena = input("Introduce una cadena: ")
cadena = cadena.lower()
cadena = cadena.replace(" ", "")
cadena_invertida = cadena[::-1]

if cadena == cadena_invertida:
    print("La cadena es un palíndromo.")
else:
    print("La cadena no es un palíndromo.")