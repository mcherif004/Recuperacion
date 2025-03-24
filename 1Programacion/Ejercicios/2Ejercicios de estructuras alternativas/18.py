# Realiza un programa que pida el día de la semana (del 1 al 7) y escriba el día correspondiente. Si introducimos otro número nos da un error.

num = int(input("Introduce un número del 1 al 7: "))

match num:
    case 1:
        print("El día correspondiente es Lunes.")
    case 2:
        print("El día correspondiente es Martes.")
    case 3:
        print("El día correspondiente es Miércoles.")
    case 4:
        print("El día correspondiente es Jueves.")
    case 5:
        print("El día correspondiente es Viernes.")
    case 6:
        print("El día correspondiente es Sábado.")
    case 7:
        print("El día correspondiente es Domingo.")
    case _:
        print("ERROR: número incorrecto.")