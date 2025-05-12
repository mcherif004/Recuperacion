# 2. Calcular el perí­metro y área de un rectángulo dada su base y su altura.

base = float(input("Introduce la base del rectángulo: "))
altura = float(input("Introduce la altura del rectángulo: "))

perimetro = 2 * base + 2 * altura
area = base * altura

print("El perímetro del rectángulo es", perimetro)
print("El área del rectángulo es", area)