# 13. Realiza un programa que lea un número y que muestre su raíz cuadrada y su raíz cúbica. Python no tiene ninguna función predefinida que permita calcular la raíz cúbica, ¿cómo se puede calcular?

import math

numero = float(input("Introduce un número: "))

raiz_cuadrada = math.sqrt(numero)
raiz_cubica = numero ** (1/3)

print(f"La raíz cuadrada de {numero} es {raiz_cuadrada}")
print(f"La raíz cúbica de {numero} es {raiz_cubica}")