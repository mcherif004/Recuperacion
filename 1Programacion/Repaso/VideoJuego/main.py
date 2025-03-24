from personaje import Personaje
from guerrero import Guerrero
from mago import Mago

goku = Personaje("Goku", 20, 15, 10, 100)
guts = Guerrero("Guts", 20, 15, 10, 100, 5)
melchor = Mago("Melchor", 20, 15, 10, 100, 5)

goku.atacar(guts)
guts.atacar(melchor)
melchor.atacar(goku)

goku.atributos()
guts.atributos()
melchor.atributos()