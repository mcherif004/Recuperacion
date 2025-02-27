# Realiza un programa que pida por teclado el resultado (dato entero) obtenido al lanzar un dado de seis caras y muestre por pantalla el número en letras (dato cadena) de la cara opuesta al resultado obtenido.

# Nota 1: En las caras opuestas de un dado de seis caras están los números: 1-6, 2-5 y 3-4.
# Nota 2: Si el número del dado introducido es menor que 1 o mayor que 6, se mostrará el mensaje: “ERROR: número incorrecto.”.

num = int(input("Introduce el resultado del dado (1-6): "))

match num:
    case 1:
        print("La cara opuesta es seis.")
    case 2:
        print("La cara opuesta es cinco.")
    case 3:
        print("La cara opuesta es cuatro.")
    case 4:
        print("La cara opuesta es tres.")
    case 5:
        print("La cara opuesta es dos.")
    case 6:
        print("La cara opuesta es uno.")
    case _:
        print("ERROR: número incorrecto.")