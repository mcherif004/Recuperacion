# 1. Escribe un programa que guarde en un fichero con nombre primos.txt los números primos que hay entre 1 y 500.

def es_primo(n):
    if n < 2:
        return False
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            return False
    return True

try:
    with open("primos.txt", "w") as fichero:
        for numero in range(1, 501):
            if es_primo(numero):
                fichero.write(str(numero) + "\n")
    print("Archivo 'primos.txt' creado correctamente con los números primos del 1 al 500.")
except IOError as e:
    print("Error al trabajar con el fichero:", e)