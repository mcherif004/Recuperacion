# Pide una cadena y un carácter por teclado y muestra cuantas veces aparece el carácter en la cadena.

cadena = input("Introduce una cadena: ")
caracter = input("Introduce un carácter: ")

contador = 0

for i in cadena:
    if i == caracter:
        contador += 1

print(f"El carácter '{caracter}' aparece {contador} veces en la cadena.")