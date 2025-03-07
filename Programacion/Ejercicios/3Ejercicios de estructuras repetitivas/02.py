# Realizar un algoritmo que pida números (se pedirá por teclado la cantidad de números a introducir). El programa debe informar de cuantos números introducidos son mayores que 0, menores que 0 e iguales a 0.

cantidad = int(input("Introduce la cantidad de números a introducir: "))

mayores = 0
menores = 0
iguales = 0

while cantidad > 0:
    numeros = int(input("Introduce los numeros: "))
    cantidad -= 1
    if numeros > 0:
        mayores += 1
    elif numeros < 0:
        menores += 1
    elif numeros == 0:
        iguales += 1

print(f"Hay {mayores} numeros mayores que 0\nHay {menores} numeros menores que 0\nHay {iguales} numeros iguales a 0")
