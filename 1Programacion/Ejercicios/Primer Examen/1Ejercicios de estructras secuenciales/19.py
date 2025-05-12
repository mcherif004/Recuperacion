# 19. Escribir un programa para calcular la nota final de un examen, considerando que:

# cada respuesta correcta suma 5 puntos
# cada respuesta incorrecta suma -1 puntos
# cada respuesta en blanco suma 0 puntos.

# Imprime la puntuación total obtenida por el estudiante y su nota normalizada entre 0 y 10 (salvo que por las respuestas incorrectas obtenga una puntuación negativa).

# ¿Qué tendrías que hacer para facilitar que los puntos que suman los diferentes tipos de respuestas puedan cambiar en el futuro?

# Respuesta: Crear variables para cada tipo de respuesta y asignarles un valor, de esta forma si en el futuro cambian los valores de los puntos, solo se cambian en las variables y no en todo el programa.

correcta = 5
incorrecta = -1
blanco = 0

respuestas_correctas = int(input("Ingrese la cantidad de respuestas correctas: "))
respuestas_incorrectas = int(input("Ingrese la cantidad de respuestas incorrectas: "))
respuestas_en_blanco = int(input("Ingrese la cantidad de respuestas en blanco: "))
puntuacion = respuestas_correctas * correcta + respuestas_incorrectas * incorrecta + respuestas_en_blanco * blanco

print(f"Tu puntuacion es de: {puntuacion}")