# 20. Diseñar un algoritmo que nos diga el dinero que tenemos (en euros y céntimos) después de pedirnos cuantas monedas tenemos de 2e, 1e, 50 céntimos, 20 céntimos o 10 céntimos).

monedas_2e = int(input("Ingrese la cantidad de monedas de 2 euros: "))
monedas_1e = int(input("Ingrese la cantidad de monedas de 1 euro: "))
monedas_50c = int(input("Ingrese la cantidad de monedas de 50 centimos: "))
monedas_20c = int(input("Ingrese la cantidad de monedas de 20 centimos: "))
monedas_10c = int(input("Ingrese la cantidad de monedas de 10 centimos: "))

dinero = monedas_2e * 2 + monedas_1e + monedas_50c * 0.5 + monedas_20c * 0.2 + monedas_10c * 0.1
dineror = round(dinero, 2)
print(f"El dinero que tienes es: {dineror} euros")