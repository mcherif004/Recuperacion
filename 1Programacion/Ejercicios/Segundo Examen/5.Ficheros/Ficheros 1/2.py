# 2. Escribe un programa que sea capaz de leer el fichero anterior y lo muestre por la pantalla.

try:
    with open("primos.txt", "r") as fichero:
        contenido = fichero.read()
        print("Contenido del archivo 'primos.txt':\n")
        print(contenido)
except FileNotFoundError:
    print("Error: El archivo 'primos.txt' no existe.")
except IOError as e:
    print("Error al leer el archivo:", e)