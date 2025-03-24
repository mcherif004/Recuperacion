from personaje import Personaje

class Mago(Personaje):
    def __init__(self, nombre, fuerza, inteligencia, defensa, vida, libro):
        super().__init__(nombre, fuerza, inteligencia, defensa, vida)
        self.libro = libro

    def atributos(self):
        super().atributos()
        print(".Libro:", self.libro)
    
    def dano(self, enemigo):
        return self.inteligencia*self.libro - enemigo.defensa