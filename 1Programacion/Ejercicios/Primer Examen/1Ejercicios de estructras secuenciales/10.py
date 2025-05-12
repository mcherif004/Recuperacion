# 10. Un alumno desea saber cual será su calificación final en la materia de Algoritmos. Dicha calificación se compone de los siguientes porcentajes:
"""
* 55% del promedio de sus tres calificaciones parciales.

* 30% de la calificación del examen final.

* 15% de la calificación de un trabajo final.
"""

import math

calificacion1 = float(input("Introduce la calificación del primer parcial: "))
calificacion2 = float(input("Introduce la calificación del segundo parcial: "))
calificacion3 = float(input("Introduce la calificación del tercer parcial: "))

promedio_parciales = (calificacion1 + calificacion2 + calificacion3) / 3

examen_final = float(input("Introduce la calificación del examen final: "))
trabajo_final = float(input("Introduce la calificación del trabajo final: "))
calificacion_final = (promedio_parciales * 0.55) + (examen_final * 0.3) + (trabajo_final * 0.15)

print(f"La calificación final es {calificacion_final}")