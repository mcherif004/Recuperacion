"""
8. Mejora el programa anterior (en otro diferente) de tal forma que al intentar agregar un elemento al carrito, se compruebe si ya existe el producto y, en tal caso, se incremente el número de unidades sin añadir un nuevo elemento. Observa que en el programa anterior, se repetía el producto “Tarjeta SD 64Gb” dos veces en el carrito. En esta nueva versión ya no sucede esto, sino que se incrementa el número de unidades del producto que se agrega. El contenido del programa principal es idéntico al ejercicio anterior.

Salida:

Contenido del carrito
=====================
Tarjeta SD 64Gb PVP: 19,95 Unidades: 2 Subtotal: 39,90
Canon EOS 2000D PVP: 449,00 Unidades: 1 Subtotal: 449,00
Hay 2 productos en la cesta.
El total asciende a 488,90 euros
Continúa la compra...
Contenido del carrito
=====================
Tarjeta SD 64Gb PVP: 19,95 Unidades: 3 Subtotal: 59,85
Canon EOS 2000D PVP: 449,00 Unidades: 1 Subtotal: 449,00
Samsung Galaxy Tab PVP: 199,00 Unidades: 3 Subtotal: 597,00
Ahora hay 3 productos en la cesta.
El total asciende a 1105,85 euros
"""

class Element:
    def __init__(self, nombre, precio, cantidad):
        self.nombre = nombre
        self.precio = precio
        self.cantidad = cantidad

    def subtotal(self):
        return self.precio * self.cantidad

    def __str__(self):
        return f"{self.nombre} PVP: {self.precio:.2f} Unidades: {self.cantidad} Subtotal: {self.subtotal():.2f}"

class ShoppingCart:
    def __init__(self):
        self.elementos = {}

    def add(self, elemento):
        if elemento.nombre in self.elementos:
            self.elementos[elemento.nombre].cantidad += elemento.cantidad
        else:
            self.elementos[elemento.nombre] = elemento

    @property
    def size(self):
        return len(self.elementos)

    def total_prize(self):
        return sum(e.subtotal() for e in self.elementos.values())

    def __str__(self):
        resultado = "Contenido del carrito\n=====================\n"
        for e in self.elementos.values():
            resultado += str(e) + "\n"
        return resultado.strip()


# Programa principal
mi_carrito = ShoppingCart()
mi_carrito.add(Element("Tarjeta SD 64Gb", 19.95, 2))
mi_carrito.add(Element("Canon EOS 2000D", 449, 1))
print(mi_carrito)
print(f"Hay {mi_carrito.size} productos en la cesta.")
print(f"El total asciende a {mi_carrito.total_prize():.2f} euros")

print("\nContinúa la compra...\n")

mi_carrito.add(Element("Samsung Galaxy Tab", 199, 3))
mi_carrito.add(Element("Tarjeta SD 64Gb", 19.95, 1))
print(mi_carrito)
print(f"Ahora hay {mi_carrito.size} productos en la cesta.")
print(f"El total asciende a {mi_carrito.total_prize():.2f} euros")