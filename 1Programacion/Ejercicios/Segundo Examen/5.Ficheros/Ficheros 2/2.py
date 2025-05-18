"""2. Escribe un programa que guarde en un fichero el contenido de otros dos ficheros, de tal forma que en el fichero resultante aparezcan las líneas de los primeros dos ficheros mezcladas, es decir, la primera línea será del primer fichero, la segunda será del segundo fichero, la tercera será la siguiente del primer fichero, etc.

Los nombres de los dos ficheros origen y el nombre del fichero destino se deben pasar como argumentos en la línea de comandos.

Hay que tener en cuenta que los ficheros de donde se van cogiendo las líneas pueden tener tamaños diferentes."""

import sys

def mezclar_archivos(archivo1, archivo2, archivo_salida):
    try:
        with open(archivo1, 'r') as f1, open(archivo2, 'r') as f2:
            lineas1 = f1.readlines()
            lineas2 = f2.readlines()
        
        with open(archivo_salida, 'w') as f_out:
            max_lineas = max(len(lineas1), len(lineas2))
            
            for i in range(max_lineas):
                if i < len(lineas1):
                    f_out.write(lineas1[i])
                if i < len(lineas2):
                    f_out.write(lineas2[i])
                    
        print(f"Archivo {archivo_salida} creado correctamente mezclando {archivo1} y {archivo2}")
    
    except FileNotFoundError as e:
        print(f"Error: Archivo no encontrado - {e.filename}")
    except Exception as e:
        print(f"Ocurrió un error: {e}")

if __name__ == "__main__":
    if len(sys.argv) != 4:
        print("Uso: python mezclar_archivos.py <archivo1> <archivo2> <archivo_salida>")
        sys.exit(1)
    
    archivo1 = sys.argv[1]
    archivo2 = sys.argv[2]
    archivo_salida = sys.argv[3]
    
    mezclar_archivos(archivo1, archivo2, archivo_salida)