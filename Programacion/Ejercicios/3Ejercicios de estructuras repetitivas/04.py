# Crea un programa que pida al usuario dos números y muestre su división si el segundo no es cero, o un mensaje de aviso en caso contrario.

num1 = int(input("Introduce un numero: "))
num2 = int(input("Introduce un numero: "))

if num2 != 0:
    division = num1 / num2
    print(f"La division de {num1} entre {num2} es {division}")
else:
    print("Error el divisor no puede ser 0")