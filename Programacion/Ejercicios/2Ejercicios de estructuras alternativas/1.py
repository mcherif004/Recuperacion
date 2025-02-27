# Programa que pida dos números e indique si el primero es mayor que el segundo o no.

n1 = float(input("Introduce el primer número"))
n2 = float(input("Introduce el segundo número"))

if (n1 > n2):
    print(f"El {n1} es mayor que {n2}")
elif(n1 < n2):
    print(f"El {n1} es menor que {n2}")
elif(n1 == n2):
    print(f"El {n1} es igual que {n2}")
else:
    print("Error")