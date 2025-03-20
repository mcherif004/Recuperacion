# Implementa la clase Rectangulo (determinado por dos objetos Point) que además de su constructor, tendrá dos métodos para calcular su área y su perímetro que tienes que transformar en propiedades. Implementa también un test que cree dos puntos y un rectángulo a partir de estos dos puntos y que muestre el área y perímetro de dicho rectángulo.

from ejercicio2 import Point

class Rectangulo:
    
    def __init__(self, p1:Point, p2:Point):
        self.p1 = p1
        self.p2 = p2

    def area(self):
        return abs(self.p2.x - self.p1.x) * abs(self.p2.y - self.p1.y)
    
    def perimetro(self):
        return 2 * (abs(self.p2.x - self.p1.x) + abs(self.p2.y - self.p1.y))
    
    def __str__(self):
        return f"Rectangulo definido por {self.p1} y {self.p2}"


punto1 = Point(1, 1)
punto2 = Point(10, 10)

rect = Rectangulo(punto1, punto2)

print(rect)
print(f"Area: {rect.area()}")
print(f"Perimetro: {rect.perimetro()}")