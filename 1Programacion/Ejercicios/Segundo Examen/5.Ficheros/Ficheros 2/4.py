"""
4. Escribe un programa capaz de quitar los comentarios de un programa de Java.

Se utilizaría de la siguiente manera:

python quita-comentarios.py <PROGRAMA_ORIGINAL> <PROGRAMA_LIMPIO>

Por ejemplo:

python quita-comentarios.py Holav1.java Holav2.java

crea un fichero con nombre Holav2.java que contiene el código de Holav1.java pero sin los comentarios.
"""

import sys
import re

def eliminar_comentarios(archivo_entrada, archivo_salida):
    try:
        with open(archivo_entrada, 'r', encoding='utf-8') as f_in:
            codigo = f_in.read()
        
        # Expresión regular para eliminar comentarios
        patron = re.compile(
            r'//.*?$|/\*.*?\*/|\'(?:\\.|[^\\\'])*\'|"(?:\\.|[^\\"])*"',
            re.DOTALL | re.MULTILINE
        )
        
        def remplazar(match):
            # Preservar strings literales (entre comillas)
            if match.group(0).startswith(('"', "'")):
                return match.group(0)
            # Eliminar comentarios
            return ''
        
        codigo_limpio = patron.sub(remplazar, codigo)
        
        # Eliminar líneas vacías resultantes
        lineas = [linea for linea in codigo_limpio.split('\n') if linea.strip()]
        codigo_limpio = '\n'.join(lineas)
        
        with open(archivo_salida, 'w', encoding='utf-8') as f_out:
            f_out.write(codigo_limpio)
        
        print(f"Comentarios eliminados correctamente. Resultado en {archivo_salida}")
    
    except FileNotFoundError:
        print(f"Error: El archivo {archivo_entrada} no existe.")
    except Exception as e:
        print(f"Ocurrió un error: {e}")

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Uso: python quita-comentarios.py <PROGRAMA_ORIGINAL> <PROGRAMA_LIMPIO>")
        sys.exit(1)
    
    archivo_entrada = sys.argv[1]
    archivo_salida = sys.argv[2]
    
    eliminar_comentarios(archivo_entrada, archivo_salida)