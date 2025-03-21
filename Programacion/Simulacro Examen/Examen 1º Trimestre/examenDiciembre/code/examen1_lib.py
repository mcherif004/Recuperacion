from random import choice

def menu():
    print("\n------ Menú ------")
    print("1. Jugar al adivinar palabras – Nivel Fácil")
    print("2. Jugar al adivinar palabras – Nivel Medio")
    print("3. Jugar al adivinar palabras – Nivel Difícil")
    print("4. Salir")

    while True:
        try:
            opcion = int(input("Introduce una opción: "))
            if opcion >= 1 and opcion <= 4:
                return opcion
            else:
                print("Opción no válida. Intenta de nuevo.")
        except ValueError:
            print("Error: Ingresa un número válido.")

def ordenar_palabras(listado):
    palabras = [[], [], []]

    for palabra in listado:
        longitud = len(palabra)
        if longitud <= 4:
            palabras[0].append(palabra)
        elif 5 <= longitud <= 7:
            palabras[1].append(palabra)
        else:
            palabras[2].append(palabra)

    return palabras

def jugar(palabras, nivel):
    if nivel < 0 or nivel > 2 or not palabras[nivel]:  
        print("Nivel no válido o sin palabras disponibles.")
        return

    palabra_secreta = choice(palabras[nivel])
    palabra_oculta = ["_"] * len(palabra_secreta)
    intentos = 5
    letras_intentadas = set()

    print(f"\nAdivina la palabra ({len(palabra_secreta)} letras). Tienes {intentos} intentos.")
    print(" ".join(palabra_oculta))

    while intentos > 0 and "_" in palabra_oculta:
        intento = input("\nIntroduce una letra: ").strip().lower()

        if len(intento) != 1 or not intento.isalpha():
            print("Error: Introduce solo una letra válida.")
            continue
        if intento in letras_intentadas:
            print("Ya intentaste esa letra.")
            continue

        letras_intentadas.add(intento)

        if intento in palabra_secreta:
            print("¡Bien! La letra está presente.")
            for i, letra in enumerate(palabra_secreta):
                if letra == intento:
                    palabra_oculta[i] = intento
        else:
            intentos -= 1
            print(f"Incorrecto, la letra no está presente. Intentos restantes: {intentos}")

        print(" ".join(palabra_oculta))

    if "_" not in palabra_oculta:
        print("\nENHORABUENA, HAS GANADO EL JUEGO")
    else:
        print(f"\nHas perdido. La palabra era: {palabra_secreta}")