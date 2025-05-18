"""
2. Crea un programa que encripte un fichero que le pasamos como parámetro y almacene el resultado en otro, que también pasamos como parámetro, de manera que:

Si el programa no recibe el número de parámetros adecuado termina con un error 1.

Si el programa recibe un solo parámetro guardará la información encriptada en el mismo archivo del que lee, pero antes advertirá al usuario de que machacará el archivo origen, dando opción a que la operación no se haga.

Si el fichero origen no existe (da error al abrirlo como lectura) el programa termina con un mensaje de error y código 2.

Si en el fichero destino no se puede escribir (da error al abrirlo como escritura) el programa termina con un mensaje de error y código 3.
Para encriptar usa el método César, necesitarás una clave que debes pedir al usuario.
"""

import sys

def cifrado_cesar(texto, clave):
    """Aplica el cifrado César al texto con la clave proporcionada"""
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

def encriptar_archivo(archivo_origen, archivo_destino, clave):
    """Encripta el archivo origen y guarda el resultado en el archivo destino"""
    try:
        with open(archivo_origen, 'r', encoding='utf-8') as f_origen:
            contenido = f_origen.read()
        
        contenido_encriptado = cifrado_cesar(contenido, clave)
        
        with open(archivo_destino, 'w', encoding='utf-8') as f_destino:
            f_destino.write(contenido_encriptado)
            
        print(f"Archivo encriptado correctamente en {archivo_destino}")
    
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
        print("Uso: python encriptar.py <archivo_origen> [archivo_destino]", file=sys.stderr)
        print("Si no se especifica archivo_destino, se sobrescribirá el archivo_origen", file=sys.stderr)
        sys.exit(1)
    
    archivo_origen = sys.argv[1]
    archivo_destino = sys.argv[2] if len(sys.argv) == 3 else archivo_origen
    
    # Pedir clave al usuario
    try:
        clave = int(input("Introduzca la clave de encriptación (número entero): "))
    except ValueError:
        print("Error: La clave debe ser un número entero", file=sys.stderr)
        sys.exit(5)
    
    # Confirmar si se va a sobrescribir el archivo origen
    if archivo_destino == archivo_origen:
        if not confirmar_sobrescritura(archivo_origen):
            print("Operación cancelada por el usuario")
            sys.exit(0)
    
    # Realizar la encriptación
    encriptar_archivo(archivo_origen, archivo_destino, clave)