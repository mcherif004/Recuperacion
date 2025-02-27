# Escribe un programa que pida un número entero entre uno y doce e imprima el número de días que tiene el mes correspondiente.

num = int(input("Introduce un número del 1 al 12: "))

match num:
    case 1 | 3 | 5 | 7 | 8 | 10 | 12:
        print(f"El mes {num} tiene 31 días.")
    case 4 | 6 | 9 | 11:
        print(f"El mes {num} tiene 30 días.")
    case 2:
        print("El mes 2 tiene 28 días (29 en año bisiesto).")
    case _:
        print("ERROR: número incorrecto.")