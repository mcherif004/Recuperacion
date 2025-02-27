from random import randint

def menu():
    print("------Menu------")
    print("1. Jugar al adivinar palabras – Nivel Facil")
    print("2. Jugar al adivinar palabras – Nivel Medio")
    print("3. Jugar al adivinar palabras – Nivel Dificil")
    print("4. Salir")

    opcion = int(input("Introduce una opcion: "))

    if opcion == 1:
        NivelFacil()
    elif opcion == 2:
        NivelMedio()
    elif opcion == 3:
        NivelDificil()
    elif opcion == 4:
        print("Adios")
    else:
        print("Opcion no valida")

def NivelFacil():
    pass

def NivelMedio():
    pass

def NivelDificil():
    pass

def ordenar_palabras(listado):
    listado.sort()
    return listado