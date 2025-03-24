# 8. Un vendedor recibe un sueldo base mas un 10% extra por comisión de sus ventas, el vendedor desea saber cuanto dinero obtendrá por concepto de comisiones por las tres ventas que realiza en el mes y el total que recibirá en el mes tomando en cuenta su sueldo base y comisiones.

#!error

sueldo_base = float(input("Introduce el sueldo base: "))

comision = sueldo_base * 0.1
comision_total = comision * 3
total = sueldo_base + comision_total

print(f"El vendedor recibirá {comision_total} euros por comisiones y un total de {total} euros en el mes")