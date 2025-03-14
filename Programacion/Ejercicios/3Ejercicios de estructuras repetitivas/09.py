# Mostrar en pantalla los N primero número primos. Se pide por teclado la cantidad de números primos que queremos mostrar.

cantidad_numeros_primos = int(input("Introduce la cantidad de números primos que quieres mostrar: "))

contador = 0
numero = 2

while contador < cantidad_numeros_primos:
    es_primo = True

    for i in range(2, int(numero ** 0.5) + 1):
        if numero % i == 0:
            es_primo = False
            break

    if es_primo:
        print(numero)
        contador += 1

    numero += 1