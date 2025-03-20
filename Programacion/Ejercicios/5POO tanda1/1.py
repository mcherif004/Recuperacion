# Crea una clase "Dado" que simule el funcionamiento de un dado con caras del 1 al 6 que tienen la misma probabilidad de salir y un programa de prueba.

import random

class Dado:
    @staticmethod
    def tirar_dado():
        cara = random.randint(1,6)
        
        return (f"Tirando ...\nTe ha salido el {cara}")

print(Dado.tirar_dado())