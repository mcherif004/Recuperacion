# Programa que lea una cadena por teclado y compruebe si es una letra mayúscula.|@#

string = input("Introduce una cadena: ")
string_len = len(string)

if string_len == 1 and string.isalpha and string.isupper():
    print("La palabra es mayuscula")
elif string.islower():
    print("La palabra es minuscula")
else:
    print("La cadena debe ser de 1 caracter (a-z|A-Z)")