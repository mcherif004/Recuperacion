"""
2. Realiza un programa que escoja al azar 10 cartas de la baraja española (10 objetos de la clase Card).
Emplea una lista para almacenarlas y asegúrate de que no se repite ninguna. 
Las cartas se deben mostrar ordenadas. 
Primero se ordenarán por palo (bastos, copas, espadas, oros) y cuando coincida el palo, 
se ordenará por número: as, 2, 3, 4, 5, 6, 7, sota, caballo, rey.
"""

import random

class Card:
    def __init__(self, numero, palo):
        self.numero = numero
        self.palo = palo

    def __str__(self):
        nombres = {1: "As", 10: "Sota", 11: "Caballo", 12: "Rey"}
        nombre_carta = nombres.get(self.numero, str(self.numero))
        return f"{nombre_carta} de {self.palo}"

# Palos en el orden deseado
orden_palos = ["Bastos", "Copas", "Espadas", "Oros"]
# Números válidos en la baraja española
orden_numeros = [1, 2, 3, 4, 5, 6, 7, 10, 11, 12]

# Crear la baraja completa con for anidados
baraja = []
for palo in orden_palos:
    for numero in orden_numeros:
        carta = Card(numero, palo)
        baraja.append(carta) 

# Elegir 10 cartas únicas al azar
cartas_seleccionadas = random.sample(baraja, 10)

# Crear diccionarios para el orden personalizado
orden_palos_dict = {}
for i in range(len(orden_palos)):
    orden_palos_dict[orden_palos[i]] = i

orden_numeros_dict = {}
for i in range(len(orden_numeros)):
    orden_numeros_dict[orden_numeros[i]] = i

# Ordenar las cartas seleccionadas
def orden_personalizado(carta):
    return (orden_palos_dict[carta.palo], orden_numeros_dict[carta.numero])

cartas_seleccionadas.sort(key=orden_personalizado)

# Mostrar las cartas ordenadas
print("Cartas seleccionadas (ordenadas):")
for carta in cartas_seleccionadas:
    print(carta)