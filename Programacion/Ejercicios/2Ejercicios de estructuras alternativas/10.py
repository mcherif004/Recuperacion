# Algoritmo que pida los puntos centrales x1,y1,x2,y2 y los radios r1,r2 de dos circunferencias y las clasifique en uno de estos estados:

# exteriores
# tangentes exteriores
# secantes
# tangentes interiores
# interiores
# concéntricas

import math

x1 = float(input("Introuduce x1: "))
x2 = float(input("Introuduce x2: "))
y1 = float(input("Introuduce y1: "))
y2 = float(input("Introuduce y2: "))

r1 = float(input("Introuduce r1: "))
r2 = float(input("Introuduce r2: "))

d = math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)  # Distancia entre centros
    
if d > r1 + r2:
    print("Exteriores") 
elif d == r1 + r2:
    print("Tangentes exteriores") 
elif r1 - r2 < d < r1 + r2:
    print("Secantes") 
elif d == abs(r1 - r2):
    print("Tangentes interiores") 
elif 0 < d < abs(r1 - r2):
    print("Interiores") 
else:
    print("Concéntricas")