# Implementar otra clase Dado. Por defecto el dado tendrá 6 caras. Tendremos tres formar de construir un dado (uno al que no se le pasa nada e inicializa el dado al azar, otro al que sólo se le pasa que número tiene el dado en la cara superior y otro con el número del dado en la cara superior y el número de caras del dado). Implementa los getters, el método roll() que tirará el dado al azar y el __str__(). Implementa un tester que tenga un vector de 4 dados y los lance una serie de veces.

import random

class Dado:
    def __init__(self, cara_superior=None, caras=6):
        if cara_superior is None:
            self.cara_superior = random.randint(1, caras)
        else:
            self.cara_superior = cara_superior
        self.caras = caras

    def roll(self):
        self.cara_superior = random.randint(1, self.caras)
        return self.cara_superior

    def __str__(self):
        return f"Dado con {self.caras} caras, cara superior: {self.cara_superior}"

dados = [Dado(),Dado(5),Dado(3, 10),Dado(2)]

for i, dado in enumerate(dados, 1):
    print(f"\nDado {i} inicial: {dado}")
    for _ in range(5):
        resultado = dado.roll()
        print(f"Tirando el dado {i}, ha salido: {resultado}")