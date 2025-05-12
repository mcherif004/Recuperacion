# La política de cobro de una compañía telefónica es: cuando se realiza una llamada, el cobro es por el tiempo que ésta dura, de tal forma que los primeros cinco minutos cuestan 1 euro por minuto, los siguientes tres, 80 céntimos por minuto, los siguientes dos minutos, 70 céntimos por minuto, y a partir del décimo minuto, 50 céntimos por minuto.

# Además, se carga un impuesto de 3% cuando es domingo, y si es otro día, en turno de mañana, 15%, y en turno de tarde, 10%. Realice un algoritmo para determinar cuánto debe pagar por cada concepto una persona que realiza una llamada.

duracion = int(input("Introduce la duración de la llamada en minutos: "))

if duracion <= 5:
    costo_base = duracion * 1.00
elif duracion <= 8:
    costo_base = (5 * 1.00) + ((duracion - 5) * 0.80)
elif duracion <= 10:
    costo_base = (5 * 1.00) + (3 * 0.80) + ((duracion - 8) * 0.70)
else:
    costo_base = (5 * 1.00) + (3 * 0.80) + (2 * 0.70) + ((duracion - 10) * 0.50)

dia = input("Introduce el día de la semana (lunes, martes, ..., domingo): ").strip().lower()

if dia == "domingo":
    impuesto = 0.03
else:
    turno = input("Introduce el turno (mañana/tarde): ").strip().lower()
    if turno == "mañana":
        impuesto = 0.15
    else:
        impuesto = 0.10

impuesto_total = costo_base * impuesto
costo_total = costo_base + impuesto_total

print(f"\nCosto base: {costo_base:.2f}€")
print(f"Impuesto aplicado ({impuesto * 100}%): {impuesto_total:.2f}€")
print(f"Total a pagar: {costo_total:.2f}€")