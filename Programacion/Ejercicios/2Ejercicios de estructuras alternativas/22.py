# Realiza un programa que pida cinco números enteros y diga cuál es el mayor.

n1 = int(input("Introduzca el n1: "))
n2 = int(input("Introduzca el n2: "))
n3 = int(input("Introduzca el n3: "))
n4 = int(input("Introduzca el n4: "))
n5 = int(input("Introduzca el n5: "))

mayor = max(n1, n2, n3, n4, n5)

print(f"El número mayor es: {mayor}")