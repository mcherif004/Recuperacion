"""
Crea una biblioteca de funciones (statistics) dentro de un paquete (util) que contenga las siguientes funciones:

maximum
recibiendo como parámetro un array de enteros
recibiendo un conjunto de parámetros enteros
minimum
recibiendo como parámetro un array de enteros 
recibiendo un conjunto de parámetros enteros
mean
recibiendo como parámetro un array de enteros 
recibiendo un conjunto de parámetros enteros
variance
recibiendo como parámetro un array de enteros y haciendo uso de la función anterior
recibiendo un conjunto de parámetros enteros y haciendo uso de la función anterior
median
recibiendo como parámetro un array de enteros 
recibiendo un conjunto de parámetros enteros
mode
recibiendo como parámetro un array de enteros 
recibiendo un conjunto de parámetros enteros
devuelve un array de enteros (puede haber varias modas)
"""

def maximum(*args):
    numbers = args[0] if len(args) == 1 and isinstance(args[0], list) else args
    return max(numbers)

def minimum(*args):
    numbers = args[0] if len(args) == 1 and isinstance(args[0], list) else args
    return min(numbers)

def mean(*args):
    numbers = args[0] if len(args) == 1 and isinstance(args[0], list) else args
    return sum(numbers) / len(numbers)

def variance(*args):
    numbers = args[0] if len(args) == 1 and isinstance(args[0], list) else args
    m = mean(numbers)
    return sum((x - m) ** 2 for x in numbers) / len(numbers)

def median(*args):
    numbers = args[0] if len(args) == 1 and isinstance(args[0], list) else args
    numbers = sorted(numbers)
    n = len(numbers)
    mid = n // 2
    return (numbers[mid] if n % 2 == 1 else (numbers[mid - 1] + numbers[mid]) / 2)

def mode(*args):
    from collections import Counter
    numbers = args[0] if len(args) == 1 and isinstance(args[0], list) else args
    count = Counter(numbers)
    max_freq = max(count.values())
    return [k for k, v in count.items() if v == max_freq]

# --- Pruebas de las funciones ---
if __name__ == "__main__":
    data = [4, 2, 2, 8, 3, 3, 3, 7]
    print("Maximum:", maximum(data))
    print("Minimum:", minimum(data))
    print("Mean:", mean(data))
    print("Variance:", variance(data))
    print("Median:", median(data))
    print("Mode:", mode(data))