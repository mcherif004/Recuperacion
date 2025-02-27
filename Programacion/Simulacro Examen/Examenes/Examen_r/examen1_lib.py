from random import randint


def pedir_nivel():  # Pido el nivel de dificultad al usuario
    while True:
        print("Niveles de dificultad")
        print("0. Nivel fácil")
        print("1. Nivel medio")
        print("2. Nivel dificil")
        level = int(input("Dime el nivel de dificultad que deseas (entre 0 y 2): "))
        if level == 2 or level == 0 or level == 1:  # Si el nivel es uno de estos termino el bucle
            return level  # Devuelvo el valor del nivel


def ordenar_palabras(lista):
    listado_ordenado =[["", "", ""], ["", "", ""], ["", "", ""]] # Inicializo una matriz
    facil = 0  # Uso estos contadores para saber la columna de la matriz
    mediano = 0
    dificil = 0
    for i in lista: # Bucle para recorrer la lista inicial e ir asignando las palabras a las distintas posiciones
                    # de la matriz
        if len(i) <= 4:
            listado_ordenado[0][facil] = i # La fila la se por el nivel de dificultad y el contador para la columna
            facil += 1
        elif len(i) >= 5 and (len(i) <= 7):
            listado_ordenado[1][mediano] = i
            mediano += 1
        else:
            listado_ordenado[2][dificil] = i
            dificil += 1
    return listado_ordenado # Devuelvo el valor de la lista ordenada


def pedir_letra(): # Pido la letra al usuario
    while True:
        letra = input("Dime una letra: ").lower()  # Uso el lower para grantizar que es minuscula
        if letra.isalpha() and len(letra) == 1:  # Si el valor introducido es una letra y de longitud 1 rompo el bucle,
                                                # sino sigo el bucle hasta tener una sola letra y no dos o más.
            break
    return letra


def eleccion_palabra(dificultad, lista_ordenada):
    palabra = lista_ordenada[dificultad][randint(0, 2)]
    return palabra


def jugar(word):
    palabra = word # Lo utilizo dependiendo de la longitud de la palabra para crear una lista
    if len(palabra) == 4:
        palabra_oculta = ["_", "_", "_", "_"]
    elif len(palabra) == 3:
        palabra_oculta = ["_", "_", "_"]
    elif len(palabra) == 5:
        palabra_oculta = ["_", "_", "_", "_", "_"]
    elif len(palabra) == 6:
        palabra_oculta = ["_", "_", "_", "_", "_", "_"]
    elif len(palabra) == 7:
        palabra_oculta = ["_", "_", "_", "_", "_", "_", "_"]
    elif len(palabra) == 8:
        palabra_oculta = ["_", "_", "_", "_", "_", "_", "_", "_"]
    elif len(palabra) == 9:
        palabra_oculta = ["_", "_", "_", "_", "_", "_", "_", "_", "_"]
    intentos = 5

    while intentos != 0:
        contador = 0
        print()
        letra = pedir_letra()
        for i in palabra:
            if i == letra:
                palabra_oculta.insert(contador, i)
                palabra_oculta.pop(contador + 1)
            contador += 1
        if letra in palabra:
            print("¡Bien! La Letra está presente")
        else:
            intentos -= 1
            print(f"Incorrecto, la letra no está presente. Te quedan {intentos} intentos")

        for i in palabra_oculta:
            print(i, end=" ")

        if "_" not in palabra_oculta:
            print()
            print("ENHORABUENA, HAS GANADO EL JUEGO")
            break

        if intentos == 0:
            print()
            print("Lo siento has perdido")


def menu(listado):
    list = ordenar_palabras(listado)
    while True:
        opcion = pedir_nivel()
        palabra = eleccion_palabra(opcion, list)
        match opcion:
            case 0:
                print(jugar(palabra))
            case 1:
                print(jugar(palabra))
            case 2:
                print(jugar(palabra))
            case _:
                print("Error vuelva a introducirlo")
