# Implementa una clase Point con sus atributos x e y. La clase debe contener: su constructor, los getters y setters (propiedades), un invert_coordinates() que invierta las coordenadas x e y del punto. Además la clase debe tener un __str__() para poder imprimir los puntos en formato “(x,y)”. Implementa un test donde crees un punto, lo imprimas utilizando de manera implícita el método __str__(), imprimas su coordenada x, asignes 0 a su coordenada x, y vuelvas a imprimir el punto.

class Point:

    def __init__(self, x:float, y:float):
        self._x = x
        self._y = y

    # Getter de x
    @property
    def x(self):
        return self._x

    # Getter de y
    @property
    def y(self):
        return self._y

    # Setter de x
    @x.setter
    def x(self, x1):
        if isinstance(x1, float):
            self._x = x1
        else:
            raise ValueError("La cordenada x debe ser un numero")

    # Setter de y
    @y.setter
    def y(self, y1):
        if isinstance(y1, float):
            self._y = y1
        else:
            raise ValueError("La cordenada y debe ser un numero")

    def invert_coordinates(self):
        self._x, self._y = self._y, self._x
        return(f"Inverted points ({self._x}, {self._y})")

    def __str__(self):
        return(f"Point ({self._x}, {self._y})")

p = Point(10, 5)
print(p)

p_swap = p.invert_coordinates()
print(p_swap)