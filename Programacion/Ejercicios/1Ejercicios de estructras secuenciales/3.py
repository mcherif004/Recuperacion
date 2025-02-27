# 3. Dados los catetos de un triángulo rectángulo, calcular su hipotenusa.

cateto1 = float(input("Introduce el primer cateto: "))
cateto2 = float(input("Introduce el segundo cateto: "))

hipotenusa = (cateto1**2 + cateto2**2)**0.5

print("La hipotenusa del triángulo es", hipotenusa)