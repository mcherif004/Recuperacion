# Diseña un programa que, dados cinco números enteros, determine cuál de los cuatro últimos números es más cercano al primero. Por ejemplo, si el usuario introduce los números 2, 6, 4, 1 y 10, el programa responderá que el número más cercano al 2 es el 1.

numeros = [2, 6, 4, 1, 10]

pnumero = numeros[0]

if abs(pnumero - numeros[1] == 1):
    print(f"El número más cercano al 2 es el {numeros[1]}")
elif abs(pnumero - numeros[2] == 1):
    print(f"El número más cercano al 2 es el {numeros[2]}")
elif abs(pnumero - numeros[3] == 1):
    print(f"El número más cercano al 2 es el {numeros[3]}")
elif abs(pnumero - numeros[4] == 1):
    print(f"El número más cercano al 2 es el {numeros[4]}")
    
print(f"El número más cercano al 2 es el {numeros[1]}")
print(f"El número más cercano al 2 es el {numeros[2]}")
print(f"El número más cercano al 2 es el {numeros[3]}")
print(f"El número más cercano al 2 es el {numeros[4]}")