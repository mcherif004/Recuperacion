# Modifica el programa anterior para que la introducción de las variables sea una opción del menú (la primera). Las variables se inicializan a cero.

a = 0
b = 0

def opciones():
    
    while True:
        print("1. Sumar\n2. Restar\n3. Multiplicar\n4. Dividir\n5. Terminar")
        opcion = int(input("Intruduce el numero para elegir una de la opciones anteriores: "))
        
        if (opcion != 5 and (opcion >= 1 and opcion < 6)):
            
            def variables():
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
                variables()
            elif opcion == 2:
                suma()
            elif opcion == 3:
                resta()
            elif opcion == 4:
                multiplicacion()
            elif opcion == 5:
                division()
        else:
            break

opciones()