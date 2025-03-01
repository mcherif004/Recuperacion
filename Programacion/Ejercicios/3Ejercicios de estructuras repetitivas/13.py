# Escribir un programa que que calcule el desglose mínimo en billetes y monedas de una cantidad exacta de euros. Hay billetes de 500, 200, 100, 50, 20, 10 y 5€ y monedas de 2 y 1€.

# Por ejemplo, si deseamos conocer el desglose de 434€, el programa mostrará por pantalla el siguiente resultado:

# 2 billetes de 200 euros.
# 1 billete de 20 euros.
# 1 billete de 10 euros.
# 2 monedas de 2 euros.

valor = int(input("Introduce el valor: "))

d500 = d200 = d100 = d50 = d20 = d10 = d5 = d2 = d1 = 0

if valor >= 500:
    d500 = valor // 500
    valor %= 500
if valor >= 200:
    d200 = valor // 200
    valor %= 200
if valor >= 100:
    d100 = valor // 100
    valor %= 100
if valor >= 50:
    d50 = valor // 50
    valor %= 50
if valor >= 20:
    d20 = valor // 20
    valor %= 20
if valor >= 10:
    d10 = valor // 10
    valor %= 10
if valor >= 5:
    d5 = valor // 5
    valor %= 5
if valor >= 2:
    d2 = valor // 2
    valor %= 2
if valor >= 1:
    d1 = valor // 1
    valor %= 1

print(f"El desglose es:")
if d500 > 0:
    print(f"{d500} billetes de 500€")
if d200 > 0:
    print(f"{d200} billetes de 200€")
if d100 > 0:
    print(f"{d100} billetes de 100€")
if d50 > 0:
    print(f"{d50} billetes de 50€")
if d20 > 0:
    print(f"{d20} billetes de 20€")
if d10 > 0:
    print(f"{d10} billetes de 10€")
if d5 > 0:
    print(f"{d5} billetes de 5€")
if d2 > 0:
    print(f"{d2} monedas de 2€")
if d1 > 0:
    print(f"{d1} monedas de 1€")