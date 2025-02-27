# 12. Pide al usuario dos pares de números x1,y1 y x2,y2, que representen dos puntos en el plano. Calcula y muestra la distancia entre ellos.

import math

x1 = float(input("Introduce la coordenada x del primer punto: "))
y1 = float(input("Introduce la coordenada y del primer punto: "))
x2 = float(input("Introduce la coordenada x del segundo punto: "))
y2 = float(input("Introduce la coordenada y del segundo punto: "))

distancia = math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)

print(f"La distancia entre los puntos ({x1},{y1}) y ({x2},{y2}) es {distancia}")