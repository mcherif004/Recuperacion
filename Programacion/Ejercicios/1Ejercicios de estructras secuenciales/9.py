# 9. Una tienda ofrece un descuento del 15% sobre el total de la compra y un cliente desea saber cuanto deberá pagar finalmente por su compra.

total_compra = float(input("Introduce el total de la compra: "))

descuento = total_compra * 0.15
total = total_compra - descuento

print(f"El cliente deberá pagar {total} euros por su compra")