# Modifica el programa anterior para que la introducción de las variables sea una opción del menú (la primera). Las variables se inicializan a cero.


def opciones():
    
    print("1. Sumar\n2. Restar\n3. Multiplicar\n4. Dividir\n5. Terminar")
    opcion = int(input("Intruduce el numero para elegir una de la opciones anteriores: "))
    
    while (opcion != 5 and (opcion > 1 and opcion < 5)):
        a = float(input("Introduce el valor a: "))
        b = float(input("Introduce el valor b: "))
        
        def suma():
            suma = a + b
            print(f"La suma de {a} y {b} es {suma}")
        
        def resta():
            resta = a - b
            print(f"La resta de {a} y {b} es {resta}")

        def multiplicacion():
            multiplicacion = a + b
            print(f"La multiplicacion de {a} y {b} es {multiplicacion}")

        def division():
            division = a / b
            print(f"La division de {a} y {b} es {division}")

        if opcion == 1:
            suma()
        elif opcion == 2:
            resta()
        elif opcion == 3:
            multiplicacion()
        elif opcion == 4:
            division()

opciones()