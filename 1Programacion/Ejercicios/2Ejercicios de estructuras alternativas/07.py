# Realiza un programa que calcule la potencia, para ello pide por teclado la base y el exponente. Pueden ocurrir tres cosas:

# El exponente sea positivo, sólo tienes que imprimir la potencia.
# El exponente sea 0, el resultado es 1.
# El exponente sea negativo, el resultado es 1/potencia con el exponente positivo.

base = float(input("Introduce la base: "))
exponente = int(input("Introduce el exponente: "))

potencia = base ** exponente
potencianeg = base ** abs(exponente)

if exponente >= 1:
    print(f"La potencia de {base}^{exponente} es igual a {potencia}")
elif exponente == 0:
    print("La potencia es igual a 1")
elif exponente < 0:
    print(f"La potencia de {base}^{exponente} es igual a {1/potencianeg}")