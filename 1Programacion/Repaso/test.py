class Persona:
    def __init__(self, nombre: str, edad: int, curso: str = "2DAW"):
        self.nombre = nombre
        self.edad = edad
        self.curso = curso

    @property
    def nombre(self):
        return self._nombre

    @nombre.setter
    def nombre(self, nuevo_nombre):
        if not isinstance(nuevo_nombre, str) or len(nuevo_nombre) < 3:
            raise ValueError("El nombre debe tener al menos 3 caracteres")
        self._nombre = nuevo_nombre

    @property
    def edad(self):
        return self._edad

    @edad.setter
    def edad(self, nueva_edad):
        if not isinstance(nueva_edad, int):
            raise ValueError("La edad debe ser un número entero")
        if nueva_edad < 18:
            print("Eres menor de edad")
        else:
            print("Eres mayor de edad")
        self._edad = nueva_edad

    @property
    def curso(self):
        return self._curso

    @curso.setter
    def curso(self, nuevo_curso):
        if not isinstance(nuevo_curso, str) or not nuevo_curso.startswith("2"):
            raise ValueError("El curso debe comenzar con '2' (Ej: 2DAW)")
        self._curso = nuevo_curso

    def __str__(self):
        return f"Nombre: {self._nombre}, Edad: {self._edad}, Curso: {self._curso}"

persona1 = Persona("Mo", 20, "2ASIR")
print(persona1)  

persona1.nombre = "Ali"
persona1.edad = 17
persona1.curso = "2DAW"

print(persona1)