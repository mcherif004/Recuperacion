# 16. Dos vehículos viajan a diferentes velocidades (v1 y v2) y están distanciados por una distancia d. El que está detrás viaja a una velocidad mayor. Se pide hacer un algoritmo para ingresar la distancia entre los dos vehículos (km) y sus respectivas velocidades (km/h) y con esto determinar y mostrar en que tiempo (minutos) alcanzará el vehículo más rápido al otro.

d = float(input("Introduce la distancia entre los dos vehículos en km: "))
v1 = float(input("Introduce la velocidad del vehículo más lento en km/h: "))  
v2 = float(input("Introduce la velocidad del vehículo más rápido en km/h: "))

tiempo = (d / (v2 - v1)) * 60

print(f"El vehículo más rápido alcanzará al otro en {tiempo} minutos.")