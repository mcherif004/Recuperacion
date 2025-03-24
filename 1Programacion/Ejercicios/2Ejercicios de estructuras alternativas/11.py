# Programa que lea 3 datos de entrada A, B y C. Estos corresponden a las dimensiones de los lados de un triángulo. El programa debe determinar que tipo de triangulo es, teniendo en cuenta los siguiente:
# Si se cumple Pitágoras entonces es triángulo rectángulo
# Si sólo dos lados del triángulo son iguales entonces es isósceles.
# Si los 3 lados son iguales entonces es equilátero.
# Si no se cumple ninguna de las condiciones anteriores, es escaleno.

A = float(input("Introduce el lado A del triangulo: "))
B = float(input("Introduce el lado B del triangulo: "))
C = float(input("Introduce el lado C del triangulo: "))

if A + B == C:
    print("Triángulo rectángulo")
elif A == B == C:
    print("Equilátero")
elif A == B or A == C or B == C:
    print("Isósceles")
else:
    print("Escaleno")