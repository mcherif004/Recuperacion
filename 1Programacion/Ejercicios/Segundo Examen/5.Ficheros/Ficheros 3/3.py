"""
3. Haz un programa que reciba como parámetro un fichero encriptado con el método César, lo desencripte y almacene el resultado en otro archivo, que también pasamos como parámetro, de manera que:

Si el programa no recibe el número de parámetros adecuado termina con un error 1.

Si el programa recibe un solo parámetro guardará la información encriptada en el mismo archivo del que lee, pero antes advertirá al usuario de que machacará el archivo origen, dando opción a que la operación no se haga.

Si el fichero origen no existe (da error al abrirlo como lectura) el programa termina con un mensaje de error y código 2.

Si en el fichero destino no se puede escribir (da error al abrirlo como escritura) el programa termina con un mensaje de error y código 3.
Para desencriptar necesitas una clave que debes pedir al usuario.

¿Se te ocurre alguna forma de desencriptar este archivo sin pedir clave? Coméntala, y si te atreves... ¡impleméntala!
"""

import sys
import os
from collections import Counter

def descifrado_cesar(texto, clave):
    """Aplica el descifrado César al texto con la clave proporcionada"""
    return cifrado_cesar(texto, -clave)  # Reutilizamos la función de cifrado con clave negativa

def cifrado_cesar(texto, clave):
    """Función de cifrado (también usada para descifrar con clave negativa)"""
    resultado = []
    for caracter in texto:
        if caracter.isalpha():
            mayuscula = caracter.isupper()
            caracter = caracter.lower()
            codigo = ord(caracter) - ord('a')
            codigo = (codigo + clave) % 26
            caracter = chr(codigo + ord('a'))
            if mayuscula:
                caracter = caracter.upper()
        resultado.append(caracter)
    return ''.join(resultado)

def analisis_frecuencia(texto):
    """Intenta descifrar el texto mediante análisis de frecuencia de letras"""
    # Frecuencia de letras en español (de más a menos común)
    frecuencias_es = 'EAOSRNIDLCTUMPBGYVQÓHFZJÑXKW'
    
    # Contamos las letras en el texto cifrado
    letras = [c for c in texto.lower() if c.isalpha()]
    if not letras:
        return 0  # No hay letras para analizar
    
    contador = Counter(letras)
    letra_mas_comun = contador.most_common(1)[0][0]
    
    # Calculamos la clave probable (diferencia entre la letra más común y 'E')
    clave_probable = (ord(letra_mas_comun) - ord('e')) % 26
    return clave_probable

def procesar_archivo(archivo_origen, archivo_destino, clave=None):
    """Procesa el archivo con o sin clave"""
    try:
        with open(archivo_origen, 'r', encoding='utf-8') as f_origen:
            contenido = f_origen.read()
        
        if clave is None:
            clave = analisis_frecuencia(contenido)
            print(f"Clave detectada automáticamente: {clave}")
        
        contenido_descifrado = descifrado_cesar(contenido, clave)
        
        with open(archivo_destino, 'w', encoding='utf-8') as f_destino:
            f_destino.write(contenido_descifrado)
            
        print(f"Archivo descifrado correctamente en {archivo_destino}")
        print(f"Clave utilizada: {clave}")
    
    except FileNotFoundError:
        print(f"Error: El archivo {archivo_origen} no existe", file=sys.stderr)
        sys.exit(2)
    except PermissionError:
        print(f"Error: No se puede escribir en {archivo_destino}", file=sys.stderr)
        sys.exit(3)
    except Exception as e:
        print(f"Error inesperado: {e}", file=sys.stderr)
        sys.exit(4)

def confirmar_sobrescritura(archivo):
    """Pide confirmación al usuario antes de sobrescribir un archivo"""
    respuesta = input(f"¿Está seguro de que desea sobrescribir {archivo}? (s/n): ")
    return respuesta.lower() == 's'

if __name__ == "__main__":
    # Verificar parámetros
    if len(sys.argv) < 2 or len(sys.argv) > 3:
        print("Uso: python desencriptar.py <archivo_origen> [archivo_destino]", file=sys.stderr)
        print("Si no se especifica archivo_destino, se sobrescribirá el archivo_origen", file=sys.stderr)
        sys.exit(1)
    
    archivo_origen = sys.argv[1]
    archivo_destino = sys.argv[2] if len(sys.argv) == 3 else archivo_origen
    
    # Preguntar si desea usar análisis de frecuencia
    usar_analisis = input("¿Desea intentar descifrado automático sin clave? (s/n): ").lower() == 's'
    
    if usar_analisis:
        procesar_archivo(archivo_origen, archivo_destino)
    else:
        # Pedir clave al usuario
        try:
            clave = int(input("Introduzca la clave de descifrado (número entero): "))
            procesar_archivo(archivo_origen, archivo_destino, clave)
        except ValueError:
            print("Error: La clave debe ser un número entero", file=sys.stderr)
            sys.exit(5)
    
    # Confirmar si se va a sobrescribir el archivo origen
    if archivo_destino == archivo_origen:
        if not confirmar_sobrescritura(archivo_origen):
            print("Operación cancelada por el usuario")
            sys.exit(0)