"""
5. Escribe un programa que genere una secuencia de 5 cartas de la baraja española y que sume los puntos según el juego de la brisca.
El valor de las cartas se debe guardar en un diccionario que debe contener parejas (figura, valor), por ejemplo (“caballo”, 3). 
La secuencia de cartas debe ser una lista que contiene objetos de la clase Carta. 
El valor de las cartas es el siguiente: as → 11, tres → 10, sota → 2, caballo → 3, rey → 4; el resto de cartas no vale nada.
"""

import random

# Clase Carta
class Carta:
    def __init__(self, numero, palo):
        self.numero = numero
        self.palo = palo

    def __str__(self):
        nombres = {
            1: "As",
            3: "Tres",
            10: "Sota",
            11: "Caballo",
            12: "Rey"
        }
        nombre = nombres.get(self.numero, str(self.numero))
        return f"{nombre} de {self.palo}"

# Diccionario de valores según la Brisca
valores_brisca = {
    "As": 11,
    "Tres": 10,
    "Sota": 2,
    "Caballo": 3,
    "Rey": 4
}

# Palos y valores de la baraja española
palos = ["Oros", "Copas", "Espadas", "Bastos"]
numeros = [1, 2, 3, 4, 5, 6, 7, 10, 11, 12]

# Crear baraja
baraja = []
for palo in palos:
    for numero in numeros:
        baraja.append(Carta(numero, palo))

# Cartas al azar
mano = random.sample(baraja, 5)

puntos_totales = 0

print("Cartas obtenidas:")
for carta in mano:
    print(f" - {carta}")
    if carta.numero == 1:
        puntos_totales += valores_brisca["As"]
    elif carta.numero == 3:
        puntos_totales += valores_brisca["Tres"]
    elif carta.numero == 10:
        puntos_totales += valores_brisca["Sota"]
    elif carta.numero == 11:
        puntos_totales += valores_brisca["Caballo"]
    elif carta.numero == 12:
        puntos_totales += valores_brisca["Rey"]

# Resultado final
print(f"\nPuntos totales según la Brisca: {puntos_totales}")