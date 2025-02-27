# 5. Escribir un programa que convierta un valor dado en grados Fahrenheit a grados Celsius.

f = float(input("Ingrese la temperatura en grados Fahrenheit: "))

c = (f - 32) * 5/9

print(f"{f} grados Fahrenheit son {c} grados Celsius.")