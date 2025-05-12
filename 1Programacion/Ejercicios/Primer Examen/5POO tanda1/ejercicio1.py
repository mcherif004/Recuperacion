# Crea una clase "Dado" que simule el funcionamiento de un dado con caras del 1 al 6 que tienen la misma probabilidad de salir y un programa de prueba.

import random

class Dado:
    def __init__(self, caras=6):
        self.caras = caras

    def lanzar(self):
        return random.randint(1, self.caras)

dado = Dado()
resultado = dado.lanzar()

print(f"Tirando el dado...\nTe ha salido un {resultado}")