# Hacer un programa que muestre un cronometro, indicando las horas, minutos y segundos. Para hacer una espera en Python podemos usar el método sleep del módulo time.

import time

horas = 0
minutos = 0
segundos = 0

while True:
    print(f"\r{horas:02}:{minutos:02}:{segundos:02}", end="")
    time.sleep(1)
    segundos += 1

    if segundos == 60:
        segundos = 0
        minutos += 1

    if minutos == 60:
        minutos = 0
        horas += 1