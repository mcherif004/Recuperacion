import math

# Quiero crear un conversor de decimal, hexadecimal, octal y binario

# Binario
def decimal_a_binario(decimal):
    binario = ""
    while decimal > 0:
        binario = str(decimal % 2) + binario
        decimal = decimal // 2
    return binario

def binario_a_decimal(binario):
    decimal = 0
    for i in range(len(binario)):
        decimal += int(binario[i]) * 2 ** (len(binario) - i - 1)
    return decimal

# Octal
def decimal_a_octal(decimal):
    octal = ""
    while decimal > 0:
        octal = str(decimal % 8) + octal
        decimal = decimal // 8
    return octal

def octal_a_decimal(octal):
    decimal = 0
    for i in range(len(octal)):
        decimal += int(octal[i]) * 8 ** (len(octal) - i - 1)
    return decimal


# Hexadecimal
def decimal_a_hexadecimal(decimal):
    hexadecimal = ""
    while decimal > 0:
        resto = decimal % 16
        if resto < 10:
            hexadecimal = str(resto) + hexadecimal
        else:
            hexadecimal = chr(resto + 55) + hexadecimal
        decimal = decimal // 16
    return hexadecimal

def hexadecimal_a_decimal(hexadecimal):
    decimal = 0
    for i in range(len(hexadecimal)):
        if hexadecimal[i].isdigit():
            decimal += int(hexadecimal[i]) * 16 ** (len(hexadecimal) - i - 1)
        else:
            decimal += (ord(hexadecimal[i]) - 55) * 16 ** (len(hexadecimal) - i - 1)
    return decimal

a = "b"
a + "b"
a + "a"
a * 2 + "b" * 3
2 * (a + "b")
2 * ("a" + "b")
print(a)
print(b)