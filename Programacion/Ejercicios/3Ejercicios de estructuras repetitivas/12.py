# Pide una cadena y dos caracteres por teclado (valida que sea un carácter), sustituye la aparición del primer carácter en la cadena por el segundo carácter.

cadena = input("Introduce una cadena: ")
caracter1 = input("Introduce un carácter a reemplazar: ")
caracter2 = input("Introduce el carácter de reemplazo: ")

if len(caracter1) == 1 and len(caracter2) == 1:
    cadena = cadena.replace(caracter1, caracter2)
    print(f"Cadena modificada: {cadena}")
else:
    print("Error: Debes introducir solo un carácter en cada caso.")