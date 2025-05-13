"""
7. Una empresa de venta por internet de productos electrónicos nos ha encargado implementar un carrito de la compra. Crea la clase ShoppingCart. Al carrito se le pueden ir agregando elementos que se guardarán en una lista, por tanto, deberás crear la clase Element. Cada elemento del carrito deberá contener el nombre del producto, su precio y la cantidad (número de unidades de dicho producto). A continuación se muestra tanto el contenido del programa principal como la salida que debe mostrar el programa. Los métodos a implementar se pueden deducir del programa principal.

Contenido del programa principal:

mi_carrito = ShoppingCart()
mi_carrito.add(Element("Tarjeta SD 64Gb", 19.95, 2))
mi_carrito.add(Element("Canon EOS 2000D", 449, 1))
print(mi_carrito)
print(f"Hay {mi_carrito.size} productos en la cesta.")
print(f"El total asciende a {mi_carrito.total_prize():.2f}  euros")

print("\nContinúa la compra...\n")
mi_carrito.add(Elemento("Samsung Galaxy Tab", 199, 3))
mi_carrito.add(Elemento("Tarjeta SD 64Gb", 19.95, 1))
print(mi_carrito);
print(f"Ahora hay {mi_carrito.size} productos en la cesta.")
print(f"El total asciende a {mi_carrito.total_prize():.2f}  euros")
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
Tarjeta SD 64Gb PVP: 19,95 Unidades: 2 Subtotal: 39,90
Canon EOS 2000D PVP: 449,00 Unidades: 1 Subtotal: 449,00
Samsung Galaxy Tab PVP: 199,00 Unidades: 3 Subtotal: 597,00
Tarjeta SD 64Gb PVP: 19,95 Unidades: 1 Subtotal: 19,95
Ahora hay 4 productos en la cesta.
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
        self.elementos = []

    def add(self, elemento):
        self.elementos.append(elemento)

    @property
    def size(self):
        return len(self.elementos)

    def total_prize(self):
        return sum(e.subtotal() for e in self.elementos)

    def __str__(self):
        resultado = "Contenido del carrito\n=====================\n"
        for e in self.elementos:
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