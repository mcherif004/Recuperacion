# Crea una clase que represente una estructura de datos tipo pila (stack) y otra tipo cola (queue).

"""La pila y la cola permitirán estas operaciones:

Crear la pila o la cola con o sin valores iniciales o a partir de otra cola o pila.
Obtener el número de elementos almacenados (tamaño).
Saber si la pila o la cola está vacía.
Vaciar completamente la pila o la cola.
Para el caso de la pila:
Apilar (push): se añade un elemento a la pila. Se añade al principio de esta.
Desapilar (pop): se saca (debe devolverse) un elemento de la pila y se elimina. 
Leer el elemento superior de la pila sin retirarlo (top).
Para el caso de la cola:
Encolar (enqueue): se añade un elemento a la cola. Se añade al final de esta.
Desencolar (dequeue): se saca (debe devolverse) y se elimina el elemento frontal de la cola, es decir, el primer elemento que entró.
Leer el elemento frontal de la cola, es decir, el primer elemento que entró, sin retirarlo (front)."""

class Stack:
    def __init__(self, iterable=None):
        self.items = list(iterable) if iterable else []

    def size(self):
        return len(self.items)

    def is_empty(self):
        return len(self.items) == 0

    def clear(self):
        self.items = []

    def push(self, item):
        self.items.insert(0, item)

    def pop(self):
        if self.is_empty():
            return None
        return self.items.pop(0)

    def top(self):
        return None if self.is_empty() else self.items[0]

class Queue:
    def __init__(self, iterable=None):
        self.items = list(iterable) if iterable else []

    def size(self):
        return len(self.items)

    def is_empty(self):
        return len(self.items) == 0

    def clear(self):
        self.items = []

    def enqueue(self, item):
        self.items.append(item)

    def dequeue(self):
        if self.is_empty():
            return None
        return self.items.pop(0)

    def front(self):
        return None if self.is_empty() else self.items[0]