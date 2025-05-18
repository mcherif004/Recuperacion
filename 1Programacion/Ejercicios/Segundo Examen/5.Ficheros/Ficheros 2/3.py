# 3. Realiza un programa que diga cuántas ocurrencias de una palabra hay en un fichero. Tanto el nombre del fichero como la palabra se deben pasar como argumentos en la línea de comandos.

import sys

def contar_ocurrencias(archivo, palabra_buscar):
    try:
        with open(archivo, 'r', encoding='utf-8') as f:
            contenido = f.read()
            # Contar ocurrencias (case-sensitive)
            ocurrencias = contenido.split().count(palabra_buscar)
            print(f"La palabra '{palabra_buscar}' aparece {ocurrencias} veces en el archivo.")
    
    except FileNotFoundError:
        print(f"Error: El archivo '{archivo}' no existe.")
    except Exception as e:
        print(f"Ocurrió un error: {e}")

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Uso: python contar_palabra.py <nombre_archivo> <palabra_a_buscar>")
        sys.exit(1)
    
    archivo = sys.argv[1]
    palabra = sys.argv[2]
    
    contar_ocurrencias(archivo, palabra)