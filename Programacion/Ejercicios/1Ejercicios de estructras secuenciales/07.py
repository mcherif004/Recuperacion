# 7. Realiza un programa que reciba una cantidad de minutos y muestre por pantalla a cuantas horas y minutos corresponde.

import math

minutos = int(input("Introduce los minutos: "))

horas = math.floor(minutos / 60) # math.floor es un redondeo al entero mas proximo
minutos_restantes = minutos % 60

print(f"{minutos} minutos son {horas} horas y {minutos_restantes} minutos")