# Suponiendo que hemos introducido una cadena por teclado que representa una frase (palabras separadas por espacios), realiza un programa que cuente cuantas palabras tiene.

cadena = input("Introduce una cadena: ")

contador = 1

for i in cadena:
    if i == " ":
        contador += 1

print(f"La cadena tiene {contador} palabras.")