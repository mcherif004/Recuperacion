"""Define la función mezcla de forma que tome dos listas como parámetros y devuelve otra que es el resultado de mezclar los números de ambos de forma alterna, se coge un número de a, luego de b, luego de a, etc. Los arrays a y b pueden tener longitudes diferentes; por tanto, si se terminan los números de un array se terminan de coger todos los que quedan del otro."""

def mezcla(a, b):
    result = []
    # Usamos zip_longest para alternar los elementos de a y b incluso si tienen diferentes longitudes
    from itertools import zip_longest
    
    # Alternamos los elementos de las dos listas
    for x, y in zip_longest(a, b, fillvalue=None):
        if x is not None:
            result.append(x)
        if y is not None:
            result.append(y)
    
    return result