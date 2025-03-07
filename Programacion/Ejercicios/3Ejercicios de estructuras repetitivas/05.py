"""
Escribe un programa que pida el limite inferior y superior de un intervalo. Si el límite inferior es mayor que el superior lo tiene que volver a pedir. 

A continuación se van introduciendo números hasta que introduzcamos el 0. Cuando termine el programa dará las siguientes informaciones:

La suma de los números que están dentro del intervalo (intervalo abierto).
Cuantos números están fuera del intervalo.
Informa si hemos introducido algún número igual a los límites del intervalo.
"""
lista_numeros = []
lista_numeros_fuera = []

while True:
    limite_i = int(input("Introduce el limite inferior: "))
    limite_s = int(input("Introduce el limite superior: "))
    
    if limite_i > limite_s:
        print("El limite inferior debe ser menor al limite superior\n")
        continue
    else:
        while True:
            numeros = int(input("Introduce numeros: "))
            if numeros != 0:
                if numeros > limite_i and numeros < limite_s:
                    lista_numeros.append(numeros)
            else:
                if len(lista_numeros) > 0:
                    suma = sum(lista_numeros)
                    print(f"La suma de todos los numeros dento del limite es {suma}")
                    for i in lista_numeros:
                        if i > limite_i and i < limite_s:
                            lista_numeros_fuera.append(i)
                    print(len(lista_numeros_fuera))
                    print(f"Los numeros que estan fuera de los limites son {lista_numeros_fuera}")
                    break