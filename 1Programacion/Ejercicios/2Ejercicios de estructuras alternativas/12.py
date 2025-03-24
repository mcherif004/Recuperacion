# Escribir un programa que lea un año indicar si es bisiesto.
# Nota: un año es bisiesto si es un número divisible por 4, pero no si es divisible por 100, excepto que también sea divisible por 400.

anio = int(input("Introduce el año para saber si es bisiesto: "))

paso1 = anio // 4
paso2 = anio // 100
paso3 = anio // 400

if paso1 != 0 :
    print("El año no es un año bisiesto (tiene 365 días).")
elif paso2 != 0:
    print("El año no es un año bisiesto (tiene 365 días).")
elif paso3 != 0:
    print("El año no es un año bisiesto (tiene 365 días).")
elif paso1 != 0 and paso2 != 0 and paso3 != 0:
    print("El año es un año bisiesto (tiene 366 días).")
else:
    print("Error")