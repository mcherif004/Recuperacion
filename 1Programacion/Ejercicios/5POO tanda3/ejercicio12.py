# Implementa la clase Mobile como subclase de Terminal (la clase del ejercicio anterior que ya no hace falta modificar). Cada móvil lleva asociada una tarifa que puede ser “rata”, “mono” o “bisonte” (debes controlar esto). El coste por minuto es de 6, 12 y 30 céntimos respectivamente. Se tarifican los segundos exactos. La tarifa se puede cambiar. Obviamente, cuando un móvil llama a otro, se le cobra al que llama, no al que recibe la llamada. A continuación se proporciona el contenido del programa principal que usa esta clase y el resultado que debe aparecer por pantalla. El total tarificado debe aparecer con dos decimales.

"""Programa principal:

m1 = Mobile("678112233", "rata")
m2 = Mobile("644744469", "mono")
m3 = Mobile("622328909", "bisonte")
print(m1)
print(m2)
m1.call(m2, 320)
m1.call(m3, 200)
m2.call(m3, 550)
print(m1)
print(m2)
print(m3)
Salida:

Nº 678 11 22 33 - 0s de conversación - tarificados 0,00 euros
Nº 644 74 44 69 - 0s de conversación - tarificados 0,00 euros
Nº 678 11 22 33 - 520s de conversación - tarificados 0,52 euros
Nº 644 74 44 69 - 870s de conversación - tarificados 1,10 euros
Nº 622 32 89 09 - 750s de conversación - tarificados 0,00 euros"""

class Terminal:
    _registered_numbers = set()

    def __init__(self, number):
        if not self._is_valid_number(number):
            raise ValueError("Número de teléfono no válido.")
        if number in Terminal._registered_numbers:
            raise ValueError("Número ya registrado.")
        self.number = number
        self.call_time = 0
        Terminal._registered_numbers.add(number)

    @staticmethod
    def _is_valid_number(number):
        return number.isdigit() and len(number) == 9 and number[0] in "679"

    def call(self, other, duration):
        if not isinstance(other, Terminal):
            raise ValueError("Debe llamar a otro terminal.")
        self.call_time += duration
        other.call_time += duration

    def __str__(self):
        formatted_number = f"{self.number[:3]} {self.number[3:5]} {self.number[5:7]} {self.number[7:]}"
        return f"Nº {formatted_number} - {self.call_time}s de conversación"


class Mobile(Terminal):
    TARIFAS = {"rata": 0.06, "mono": 0.12, "bisonte": 0.30}

    def __init__(self, number, tarifa):
        super().__init__(number)
        if tarifa not in Mobile.TARIFAS:
            raise ValueError("Tarifa no válida.")
        self.tarifa = tarifa
        self.tarificado = 0.0

    def call(self, other, duration):
        super().call(other, duration)
        self.tarificado += (duration / 60) * Mobile.TARIFAS[self.tarifa]

    def __str__(self):
        formatted_number = f"{self.number[:3]} {self.number[3:5]} {self.number[5:7]} {self.number[7:]}"
        return f"Nº {formatted_number} - {self.call_time}s de conversación - tarificados {self.tarificado:.2f} euros"


m1 = Mobile("678112233", "rata")
m2 = Mobile("644744469", "mono")
m3 = Mobile("622328909", "bisonte")

print(m1)
print(m2)

m1.call(m2, 320)
m1.call(m3, 200)
m2.call(m3, 550)

print(m1)
print(m2)
print(m3)