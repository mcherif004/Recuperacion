#  Crea una aplicación que permita adivinar un número. La aplicación genera un número aleatorio del 1 al 100. A continuación va pidiendo números y va respondiendo si el número a adivinar es mayor o menor que el introducido, además de los intentos que te quedan (tienes 10 intentos para acertarlo). El programa termina cuando se acierta el número (además te dice en cuantos intentos lo has acertado), si se llega al limite de intentos te muestra el número que había generado.

#? Para usar números aleatorios en Python: http://www.mclibre.org/consultar/python/lecciones/python-biblioteca-random.html

import random

#rnum = random.randint(1,100)

rnum = 5
intentos = 10

while intentos > 0:
    intento = int(input("Adivina el numero: "))
    if intento == rnum:
        print(f"Has ganado!")
        break
    elif intento > rnum:
        intentos -= 1
        print(f"El numero que tienes que adivinar es menor al numero {intento}\nTe quedan {intentos} intentos")
    elif intento < rnum:
        intentos -= 1
        print(f"El numero que tienes que adivinar es mayor al numero {intento}\nTe quedan {intentos} intentos")

if intentos == 0:
    print(f"Has perdido el numero era: {rnum}")