# Nos hemos enterado que la clase datetime.date ha sido comprometida y tenemos que crear una clase nueva para almacenar fechas locales (Date), en este caso la clase será mutable (los objetos pueden cambiar el día, mes o año). Los objetos de la clase Fecha son fechas de tiempo y se crean de la forma:

"""f1 = Date(1, 10, 2020)  # almacena el 1 de Octubre de 2020
f2 = Date(f1)  # almacena una copia de la fecha almacenada en f1

Para simplificar consideraremos que las fechas son todas a partir del 1 de enero del año 1.

Si al constructor se le pasan valores incorrectos lanzaremos la excepción ValueError.

Crea métodos para:


Sumar y restar días a la fecha. 
Restar fechas. Devuelve el número de días comprendidos entre ambas.
Comparar la fecha almacenada con otra.
Saber si el año de la fecha almacenada es bisiesto.
Obtener el día de la semana de una fecha concreta.
El método __str__() devuelve una cadena con el formato "<día del mes> de <nombre del mes> de <año>"."""

class Date:
    DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    MONTH_NAMES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]
    
    def __init__(self, day, month, year):
        if not self.is_valid_date(day, month, year):
            raise ValueError("Fecha no válida")
        self.day = day
        self.month = month
        self.year = year
    
    @staticmethod
    def is_leap_year(year):
        return year % 4 == 0 and (year % 100 != 0 or year % 400 == 0)
    
    @classmethod
    def days_in_month(cls, month, year):
        if month == 2 and cls.is_leap_year(year):
            return 29
        return cls.DAYS_IN_MONTH[month - 1]
    
    @classmethod
    def is_valid_date(cls, day, month, year):
        if year < 1 or month < 1 or month > 12 or day < 1:
            return False
        return day <= cls.days_in_month(month, year)
    
    def add_days(self, days):
        while days != 0:
            if days > 0:
                if self.day + days > self.days_in_month(self.month, self.year):
                    days -= (self.days_in_month(self.month, self.year) - self.day + 1)
                    self.day = 1
                    self.increment_month()
                else:
                    self.day += days
                    break
            else:
                if self.day + days < 1:
                    days += self.day
                    self.decrement_month()
                    self.day = self.days_in_month(self.month, self.year)
                else:
                    self.day += days
                    break
    
    def increment_month(self):
        if self.month == 12:
            self.month = 1
            self.year += 1
        else:
            self.month += 1
    
    def decrement_month(self):
        if self.month == 1:
            self.month = 12
            self.year -= 1
        else:
            self.month -= 1
    
    def days_between(self, other):
        days = 0
        temp = Date(self.day, self.month, self.year)
        sign = 1 if temp.compare(other) < 0 else -1
        while temp.compare(other) != 0:
            temp.add_days(sign)
            days += sign
        return abs(days)
    
    def compare(self, other):
        if self.year != other.year:
            return self.year - other.year
        if self.month != other.month:
            return self.month - other.month
        return self.day - other.day
    
    def day_of_week(self):
        total_days = self.days_between(Date(1, 1, 1))
        return ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"][total_days % 7]
    
    def __str__(self):
        return f"{self.day} de {self.MONTH_NAMES[self.month - 1]} de {self.year}"