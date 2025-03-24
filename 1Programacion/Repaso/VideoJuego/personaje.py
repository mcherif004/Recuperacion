class Personaje:
    
    def __init__(self, nombre, fuerza, inteligencia, defensa, vida):
        self.nombre = nombre
        self.fuerza = fuerza
        self.inteligencia = inteligencia
        self.defensa = defensa
        self.vida = vida

    def atributos(self):
        print(self.nombre, ":")
        print(".Fuerza", self.fuerza)
        print(".Inteligencia", self.inteligencia)
        print(".Defensa", self.defensa)
        print(".Vida", self.vida)

    def subir_nivel(self, fuerza, inteligencia, defensa):
        self.fuerza = fuerza
        self.inteligencia = inteligencia
        self.defensa = self.defensa + defensa
    
    def esta_vivo(self):
        return self.vida > 0
    
    def morir(self):
        self.vida = 0
        print(self.nombre, "ha muerto")

    def dano(self, enemigo):
        return self.fuerza - enemigo.defensa
    
    def atacar(self, enemigo):
        dano = self.dano(enemigo)
        enemigo.vida = enemigo.vida - dano
        print(self.nombre, "ha realizado", dano, "puntos de dano a", enemigo.nombre)
        if enemigo.esta_vivo():
            print("La vida de", enemigo.nombre, "es", enemigo.vida)
        else:
            enemigo.morir()