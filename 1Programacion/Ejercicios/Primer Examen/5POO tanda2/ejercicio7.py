# Crea una clase "Fraction" inmutable (no hay setters, solo getters para numerador y denominador) de forma que podamos hacer las siguientes operaciones:

"""Construir un objeto Fracción pasándole al constructor el numerador y el denominador. La fracción se construye simplificada, no se puede dividir por cero.
Obtener resultado de la fracción (número real).
Multiplicar la fracción por un número (el método devuelve otra fracción, simplificada).
Multiplicar, dividir, sumar y restar fracciones (los métodos devuelven otra fracción, simplificada).
Comparar fracciones entre sí o con enteros usando los operadores relacionales."""

from math import gcd

class Fraction:
    def __init__(self, numerator, denominator):
        if denominator == 0:
            raise ValueError("El denominador no puede ser cero")
        
        common = gcd(numerator, denominator)
        self._numerator = numerator // common
        self._denominator = denominator // common

    @property
    def numerator(self):
        return self._numerator

    @property
    def denominator(self):
        return self._denominator

    def value(self):
        return self._numerator / self._denominator

    def __mul__(self, other):
        if isinstance(other, Fraction):
            return Fraction(self.numerator * other.numerator, self.denominator * other.denominator)
        elif isinstance(other, int):
            return Fraction(self.numerator * other, self.denominator)
        return NotImplemented

    def __truediv__(self, other):
        if isinstance(other, Fraction):
            return Fraction(self.numerator * other.denominator, self.denominator * other.numerator)
        return NotImplemented

    def __add__(self, other):
        if isinstance(other, Fraction):
            num = self.numerator * other.denominator + other.numerator * self.denominator
            den = self.denominator * other.denominator
            return Fraction(num, den)
        return NotImplemented

    def __sub__(self, other):
        if isinstance(other, Fraction):
            num = self.numerator * other.denominator - other.numerator * self.denominator
            den = self.denominator * other.denominator
            return Fraction(num, den)
        return NotImplemented

    def __eq__(self, other):
        if isinstance(other, Fraction):
            return self.numerator == other.numerator and self.denominator == other.denominator
        elif isinstance(other, int):
            return self.numerator == other * self.denominator
        return False

    def __lt__(self, other):
        return self.value() < (other.value() if isinstance(other, Fraction) else other)

    def __le__(self, other):
        return self.value() <= (other.value() if isinstance(other, Fraction) else other)

    def __gt__(self, other):
        return self.value() > (other.value() if isinstance(other, Fraction) else other)

    def __ge__(self, other):
        return self.value() >= (other.value() if isinstance(other, Fraction) else other)

    def __str__(self):
        return f"{self.numerator}/{self.denominator}"