from dataclasses import dataclass
from typing import List, Tuple

# Clase inmutable para representar una pregunta
@dataclass(frozen=True)
class Question:
    nombre: str
    enunciado: str
    elecciones: List[Tuple[str, float]]
    puntuacion_base: float = 1.0

    def obtener_puntuacion(self, indice: int | None) -> float:
        if indice is None or indice < 0 or indice >= len(self.elecciones):
            return 0.0
        _, calificacion = self.elecciones[indice]
        return calificacion * self.puntuacion_base


# Función para leer las preguntas desde un archivo con el formato especificado
def cargar_preguntas_desde_archivo(ruta_archivo: str) -> List[Question]:
    preguntas = []
    with open(ruta_archivo, 'r', encoding='utf-8') as f:
        contenido = f.read().split('---\n')

    for bloque in contenido:
        if not bloque.strip():
            continue
        lineas = bloque.strip().splitlines()
        nombre = lineas[0]
        enunciado = []
        i = 1
        while lineas[i].strip() != ".":
            enunciado.append(lineas[i])
            i += 1
        i += 1  # saltar el punto
        elecciones = []
        while i < len(lineas):
            texto = lineas[i]
            i += 1
            calificacion = float(lineas[i])
            i += 1
            elecciones.append((texto, calificacion))
        pregunta = Question(
            nombre=nombre,
            enunciado="\n".join(enunciado),
            elecciones=elecciones,
            puntuacion_base=2.0  # cada pregunta vale 2 puntos
        )
        preguntas.append(pregunta)
    return preguntas


# Función que ejecuta el examen en consola
def hacer_examen(preguntas: List[Question]):
    puntuacion_total = 0
    for i, pregunta in enumerate(preguntas):
        print(f"\n{pregunta.nombre}")
        print(pregunta.enunciado)
        for idx, (texto, _) in enumerate(pregunta.elecciones):
            print(f"{idx + 1}. {texto}")
        entrada = input("Indique la opción correcta (Pulse Intro para dejarla en blanco): ")
        if entrada.strip() == "":
            respuesta = None
        else:
            try:
                respuesta = int(entrada.strip()) - 1
            except ValueError:
                respuesta = None
        puntuacion = pregunta.obtener_puntuacion(respuesta)
        puntuacion_total += puntuacion
        print(f"Puntuación obtenida en esta pregunta: {puntuacion:.2f}")
    print(f"\nPuntuación total: {puntuacion_total:.2f} puntos sobre 10.\n")


# Punto de entrada del programa
def main():
    archivo = "preguntas.txt"
    preguntas = cargar_preguntas_desde_archivo(archivo)
    hacer_examen(preguntas)

if __name__ == "__main__":
    main()