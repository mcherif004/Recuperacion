# 17. Un ciclista parte de una ciudad A a las HH horas, MM minutos y SS segundos. El tiempo de viaje hasta llegar a otra ciudad B es de T segundos. Escribir un algoritmo que determine la hora de llegada a la ciudad B.

HH = int(input("Introduce la hora de salida: "))
MM = int(input("Introduce los minutos de salida: "))
SS = int(input("Introduce los segundos de salida: "))
T = int(input("Introduce el tiempo de viaje en segundos: "))

segundos_totales = HH * 3600 + MM * 60 + SS + T
HH_llegada = segundos_totales // 3600
segundos_restantes = segundos_totales % 3600
MM_llegada = segundos_restantes // 60
SS_llegada = segundos_restantes % 60

print(f"La hora de llegada a la ciudad B es {HH_llegada} horas, {MM_llegada} minutos y {SS_llegada} segundos.")