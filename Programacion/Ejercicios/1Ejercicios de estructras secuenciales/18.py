# 18. Pedir el nombre y los dos apellidos de una persona y mostrar las iniciales.

nombre = input("Ingrese su nombre: ")
apellido1 = input("Ingrese su primer apellido: ")
apellido2 = input("Ingrese su segundo apellido: ")

iniciales = nombre[0] + apellido1[0] + apellido2[0]
upiniciales = iniciales.upper()

print(f"Las iniciales de {nombre} {apellido1} {apellido2} son: {upiniciales}")