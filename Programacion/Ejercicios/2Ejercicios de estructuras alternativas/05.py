# Crea un programa que lea la edad de dos personas y diga quién es más joven, la primera o la segunda. Ten en cuenta que ambas pueden tener la misma edad. En tal caso, hazlo saber con un mensaje adecuado.

edad1 = int(input("Introduce la edad1: "))
edad2 = int(input("Introduce la edad2: "))

if (edad1 > edad2):
    print(f"La edad1 es mayor a la edad2")
elif (edad1 < edad2):
    print(f"La edad1 es menor a la edad2")
elif (edad1 == edad2):
    print("Ambas edades son iguales")
else:
    print("Error")