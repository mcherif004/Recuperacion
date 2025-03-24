# Crea una clase para almacenar duraciones de tiempo (Duration). Los objetos de esta clase son intervalos de tiempo y se crean de la forma:

"""t1 = Duration(1, 20, 30)  # almacenará 1 hora, 20 minutos y 30 segundos.

t2 = Duration(2, 75, -10)  # almacenará 3 horas, 14 minutos y 50 segundos.

t3 = Duration(t2)  # almacenará las horas, minutos y segundos del objeto t2

Crea los getters y setters mediante propiedades y métodos para:

Sumar y restar objetos de la clase sobrecargando operadores (el resultado es otro objeto).
Sumar y restar segundos, minutos o horas (se cambia el objeto actual).
Devolver una cadena con el tiempo almacenado, de forma que si lo que hay es (10 35 5) la cadena sea 10h 35m 5s."""

class Duration:
    def __init__(self, hours=0, minutes=0, seconds=0):
        if isinstance(hours, Duration):
            self.hours, self.minutes, self.seconds = hours.hours, hours.minutes, hours.seconds
        else:
            self.hours, self.minutes, self.seconds = 0, 0, 0
            self.add_time(hours, minutes, seconds)

    def add_time(self, hours=0, minutes=0, seconds=0):
        total_seconds = self.to_seconds() + hours * 3600 + minutes * 60 + seconds
        self.hours, remainder = divmod(total_seconds, 3600)
        self.minutes, self.seconds = divmod(remainder, 60)

    def to_seconds(self):
        return self.hours * 3600 + self.minutes * 60 + self.seconds

    def __add__(self, other):
        if isinstance(other, Duration):
            return Duration(self.hours + other.hours, self.minutes + other.minutes, self.seconds + other.seconds)
        return NotImplemented

    def __sub__(self, other):
        if isinstance(other, Duration):
            total_seconds = self.to_seconds() - other.to_seconds()
            return Duration(0, 0, max(0, total_seconds))
        return NotImplemented

    def add_seconds(self, seconds):
        self.add_time(seconds=seconds)

    def add_minutes(self, minutes):
        self.add_time(minutes=minutes)

    def add_hours(self, hours):
        self.add_time(hours=hours)

    @property
    def formatted(self):
        return f"{self.hours}h {self.minutes}m {self.seconds}s"

    def __str__(self):
        return self.formatted