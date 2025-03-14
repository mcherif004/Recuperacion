# Escribe un programa que dados dos números, uno real (base) y un entero positivo (exponente), saque por pantalla el resultado de la potencia. No se puede utilizar el operador de potencia ni la función.

base = float(input("Introduce la base: "))
exponente = int(input("Introduce el exponente: "))

exp = exponente - 1
potencias = []

while exp > 0:
    potencia = base * base
    exp -= 1
    potencias.append(potencia)
else:
    print(potencias)
    suma_potencias = sum(potencias)
    print(f"La potencia de {base} elevado a {exponente} es {suma_potencias}")