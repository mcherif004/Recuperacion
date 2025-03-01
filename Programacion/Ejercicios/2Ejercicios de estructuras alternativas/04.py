# Crea un programa que pida al usuario dos números y muestre su división si el segundo no es cero, o un mensaje de aviso en caso contrario.

divisor = float(input("Introduce el divisor: "))
dividiendo = float(input("Introduce el dividiendo: "))

if (dividiendo > 0):
    division = divisor / dividiendo
    print(f"La division de {divisor} entre {dividiendo} es de {division}")
else:
    print("No se puede dividir entre 0")