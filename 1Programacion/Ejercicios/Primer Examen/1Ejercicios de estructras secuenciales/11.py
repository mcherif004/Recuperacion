# 11. Pide al usuario dos números y muestra la "distancia" entre ellos (el valor absoluto de su diferencia, de modo que el resultado sea siempre positivo).

num1 = float(input("Introduce el primer número: "))
num2 = float(input("Introduce el segundo número: "))

distancia = abs(num1 - num2)

print(f"La distancia entre {num1} y {num2} es {distancia}")