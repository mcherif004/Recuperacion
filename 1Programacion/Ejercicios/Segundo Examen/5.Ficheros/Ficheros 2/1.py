# 1. Realiza un programa que sea capaz de ordenar alfabéticamente las palabras contenidas en un fichero de texto. El nombre del fichero que contiene las palabras se debe pasar como argumento en la línea de comandos. El nombre del fichero resultado debe ser el mismo que el original añadiendo la coletilla sort, por ejemplo palabras_sort.txt . Suponemos que cada palabra ocupa una línea.

import sys

def ordenar_palabras(archivo_entrada, archivo_salida):
    try:
        with open(archivo_entrada, "r") as f:
            palabras = [linea.strip() for linea in f if linea.strip()]
        
        palabras.sort()
        
        with open(archivo_salida, "w") as f:
            for palabra in palabras:
                f.write(palabra + '\n')
        
        print(f"Las palabras se han ordenado correctamente en {archivo_salida}")
        
    except FileNotFoundError:
        print(f"Error: El fichero {archivo_entrada} no existe")
    except Exception as e:
        print(f"Ocurrio un error: {e}")

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Uso: python 1.py <nombre_archivo>")
    
    archivo_entrada = sys.argv[1]
    
    nombre_base, extension = archivo_entrada.rsplit('.', 1)
    archivo_salida = f"{nombre_base}_sort.{extension}"
    
    ordenar_palabras(archivo_entrada, archivo_salida)

# Funciona bien
#! Ordena mal las tildes