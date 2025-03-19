# Haz un programa que pida dos valores (a y b) y a continuación muestre un menú con cinco opciones: sumar, restar, multiplicar, dividir y terminar. Cada opción llama a una función a la que se le pasan las dos variables y muestra el resultado de la operación. Si se introduce una opción incorrecta se muestra un mensaje de error. El menú se volverá a mostrar, a menos que no se de a la opción terminar.

def opciones():
    
    while True:
        print("1. Sumar\n2. Restar\n3. Multiplicar\n4. Dividir\n5. Terminar")
        opcion = int(input("Intruduce el numero para elegir una de la opciones anteriores: "))
        
        if (opcion >= 1 and opcion <= 5):
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
            elif opcion == 5:
                break

opciones()