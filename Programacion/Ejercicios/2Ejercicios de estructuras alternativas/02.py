# Realiza el ejercicio 56 (página 100) del libro "Introducción a la Programación con Python 3".

# 56.Indica qué líneas del último programa (y en qué orden) se ejecutarán para cada unode los siguientes casos:

print('Programa para la resolución de la ecuación a·x + b = 0.')

a = float(input('Valor de a: '))
b = float(input('Valor de b: '))

if a != 0:
    x = -b / a
    print('Solución:', x)
else:
    if b != 0:
        print('La ecuación no tiene solución.')
    if b == 0:
        print('La ecuación tiene infinitas soluciones.')

# 1) a = 2 y b = 6. Solucion: -3.0
# 2) a = 0 y b = 3. Solucion: La ecuacion no tiene solucion
# 3) a = 0 y b = −3. Solucion: La ecuacion no tiene solucion
# 4) a = 0 y b = 0. Solucion: La ecuación tiene infinitas soluciones.