"""
Escribe un programa que pida el limite inferior y superior de un intervalo. Si el límite inferior es mayor que el superior lo tiene que volver a pedir. 

A continuación se van introduciendo números hasta que introduzcamos el 0. Cuando termine el programa dará las siguientes informaciones:

La suma de los números que están dentro del intervalo (intervalo abierto).
Cuantos números están fuera del intervalo.
Informa si hemos introducido algún número igual a los límites del intervalo.
"""

lista_numeros = []
lista_numeros_fuera = []
limite_inferior = limite_superior = None
numero_limite_ingresado = False

# Pedir límites correctamente
while True:
    limite_inferior = int(input("Introduce el límite inferior: "))
    limite_superior = int(input("Introduce el límite superior: "))
    
    if limite_inferior >= limite_superior:
        print("El límite inferior debe ser menor que el límite superior.\n")
    else:
        break

while True:
    numero = int(input("Introduce un número (0 para salir): "))

    if numero == 0:
        break

    if numero == limite_inferior or numero == limite_superior:
        numero_limite_ingresado = True

    if limite_inferior < numero < limite_superior:
        lista_numeros.append(numero)
    else:
        lista_numeros_fuera.append(numero)

suma_numeros_dentro = sum(lista_numeros)
print(f"La suma de los números dentro del intervalo es: {suma_numeros_dentro}")
print(f"La cantidad de números fuera del intervalo es: {len(lista_numeros_fuera)}")
print(f"Los números fuera del intervalo son: {lista_numeros_fuera}")

if numero_limite_ingresado:
    print("Se ingresó al menos un número igual a los límites del intervalo.")
else:
    print("No se ingresó ningún número igual a los límites.")
