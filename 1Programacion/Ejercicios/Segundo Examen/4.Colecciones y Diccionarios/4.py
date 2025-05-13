"""
4. Realiza un programa que escoja al azar 5 palabras en español del mini-diccionario del ejercicio anterior. 
El programa irá pidiendo que el usuario teclee la traducción al inglés de cada una de las palabras y comprobará si son correctas. 
Al final, el programa deberá mostrar cuántas respuestas son válidas y cuántas erróneas.
"""

import random

# Mini-diccionario español-inglés de términos de programación
diccionario = {
    "cadena": "string",
    "número": "number",
    "entero": "integer",
    "decimal": "float",
    "booleano": "boolean",
    "lista": "list",
    "diccionario": "dictionary",
    "tupla": "tuple",
    "conjunto": "set",
    "función": "function",
    "clase": "class",
    "objeto": "object",
    "variable": "variable",
    "constante": "constant",
    "condicional": "conditional",
    "bucle": "loop",
    "método": "method",
    "parámetro": "parameter",
    "argumento": "argument",
    "importar": "import",
    "módulo": "module",
    "error": "error",
    "depurar": "debug",
    "comentario": "comment"
}

# Elegir 5 palabras aleatorias del diccionario
palabras_aleatorias = random.sample(list(diccionario.keys()), 5)

# Contadores de aciertos y errores
aciertos = 0
errores = 0

# Preguntar al usuario la traducción
for palabra in diccionario:
    respuesta = input(f"¿Cómo se traduce '{palabra}' al inglés? ").strip().lower()
    if respuesta == diccionario[palabra]:
        print("¡Correcto!")
        aciertos += 1
    else:
        print(f"Incorrecto. La traducción correcta es: {diccionario[palabra]}")
        errores += 1

# Mostrar resultados finales
print("\n Resultados:")
print(f"Respuestas correctas: {aciertos}")
print(f"Respuestas incorrectas: {errores}")