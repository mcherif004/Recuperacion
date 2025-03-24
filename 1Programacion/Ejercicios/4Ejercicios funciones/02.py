"""
Crea una biblioteca de funciones numéricas que contenga las siguientes funciones. Recuerda que puedes usar unas dentro de otras si es necesario.

Observa bien lo que hace cada función ya que, si las implementas en el orden adecuado, te puedes ahorrar mucho trabajo. Por ejemplo, la función es_capicua() resulta trivial teniendo voltea() y la función siguiente_primo() también es muy fácil de implementar teniendo es_primo().

Prohibido usar funciones de conversión del número a una cadena.

es_capicua: devuelve verdadero si el número que se pasa como parámetro es capicúa y falso en caso contrario.
es_primo: devuelve verdadero si el número que se pasa como parámetro es primo y falso en caso contrario.
siguiente_primo: devuelve el menor primo que es mayor al número que se pasa como parámetro.
digitos: devuelve el número de dígitos de un número entero.
voltea: le da la vuelta a un número.
digito_n: devuelve el dígito que está en la posición n de un número entero. Se empieza contando por el 0 y de izquierda a derecha.
posicion_de_digito: da la posición de la primera ocurrencia de un dígito dentro de un número entero. Si no se encuentra, devuelve -1.
quita_por_detras: le quita a un número n dígitos por detrás (por la derecha).
quita_por_delante: le quita a un número n dígitos por delante (por la izquierda).
pega_por_detras: añade un dígito a un número por detrás.
pega_por_delante: añade un dígito a un número por delante.
trozoDeNumero: toma como parámetros las posiciones inicial y final dentro de un número y devuelve el trozo correspondiente.
juntaNumeros: pega dos números para formar uno.
Haz el programa de manera que al ejecutarse pruebe cada una de las funciones.
"""

def es_primo(n):
    if n < 2:
        return False
    for i in range(2, int(n ** 0.5) + 1):
        if n % i == 0:
            return False
    return True

def siguiente_primo(n):
    while True:
        n += 1
        if es_primo(n):
            return n

def voltea(n):
    rev = 0
    while n > 0:
        rev = rev * 10 + n % 10
        n //= 10
    return rev

def es_capicua(n):
    return n == voltea(n)

def digitos(n):
    count = 0
    while n > 0:
        count += 1
        n //= 10
    return count if count > 0 else 1

def digito_n(n, pos):
    return (n // (10 ** (digitos(n) - pos - 1))) % 10

def posicion_de_digito(n, d):
    pos = 0
    while n > 0:
        if n % 10 == d:
            return digitos(n) - pos - 1
        n //= 10
        pos += 1
    return -1

def quita_por_detras(n, d):
    return n // (10 ** d)

def quita_por_delante(n, d):
    return n % (10 ** (digitos(n) - d))

def pega_por_detras(n, d):
    return n * 10 + d

def pega_por_delante(n, d):
    return d * (10 ** digitos(n)) + n

def trozo_de_numero(n, inicio, fin):
    return quita_por_delante(quita_por_detras(n, digitos(n) - fin - 1), inicio)

def junta_numeros(n1, n2):
    return n1 * (10 ** digitos(n2)) + n2

# Pruebas de las funciones
print("Es primo 7:", es_primo(7))
print("Siguiente primo de 10:", siguiente_primo(10))
print("Voltear 1234:", voltea(1234))
print("Es capicúa 12321:", es_capicua(12321))
print("Dígitos de 12345:", digitos(12345))
print("Dígito en posición 2 de 54321:", digito_n(54321, 2))
print("Posición del dígito 3 en 123456:", posicion_de_digito(123456, 3))
print("Quitar por detrás 2 dígitos de 123456:", quita_por_detras(123456, 2))
print("Quitar por delante 2 dígitos de 123456:", quita_por_delante(123456, 2))
print("Pegar por detrás el dígito 7 a 1234:", pega_por_detras(1234, 7))
print("Pegar por delante el dígito 7 a 1234:", pega_por_delante(1234, 7))
print("Trozo de número 123456 desde 1 a 4:", trozo_de_numero(123456, 1, 4))
print("Juntar números 123 y 456:", junta_numeros(123, 456))