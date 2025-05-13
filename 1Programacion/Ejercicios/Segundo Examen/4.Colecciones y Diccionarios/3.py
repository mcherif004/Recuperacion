"""
3. Crea un mini-diccionario español-inglés que contenga, al menos, 20 palabras (con su correspondiente traducción). 
Utiliza un diccionario para almacenar las parejas de palabras. 
El programa pedirá una palabra en español y dará la correspondiente traducción en inglés.
"""

# Diccionario español-inglés de términos de programación
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

# Pedir una palabra en español
palabra = input("Introduce una palabra en español (relacionada con programación): ").lower()

# Buscar y mostrar la traducción
if palabra in diccionario:
    print(f"La traducción de '{palabra}' es: {diccionario[palabra]}")
else:
    print("Lo siento, esa palabra no está en el diccionario.")