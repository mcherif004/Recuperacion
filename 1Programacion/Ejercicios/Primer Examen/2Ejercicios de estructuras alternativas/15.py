# El director de una escuela está organizando un viaje de estudios, y requiere determinar cuánto debe cobrar a cada alumno y cuánto debe pagar a la compañía de viajes por el servicio. La forma de cobrar es la siguiente: si son 100 alumnos o más, el costo por cada alumno es de 65 euros; de 50 a 99 alumnos, el costo es de 70 euros, de 30 a 49, de 95 euros, y si son menos de 30, el costo de la renta del autobús es de 4000 euros, sin importar el número de alumnos. Realiza un programa que permita determinar el pago a la compañía de autobuses y lo que debe pagar cada alumno por el viaje.

alumnos = int(input("Introduce el número de alumnos que asistirán al viaje: "))

if alumnos >= 100:
    costo_por_alumno = 65
    pago_total = alumnos * costo_por_alumno
elif 50 <= alumnos <= 99:
    costo_por_alumno = 70
    pago_total = alumnos * costo_por_alumno
elif 30 <= alumnos <= 49:
    costo_por_alumno = 95
    pago_total = alumnos * costo_por_alumno
else:
    pago_total = 4000
    costo_por_alumno = pago_total / alumnos

print(f"El pago total a la compañía de autobuses es de {pago_total}€")
print(f"Cada alumno debe pagar {costo_por_alumno:.2f}€")
