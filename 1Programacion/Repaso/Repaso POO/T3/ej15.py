from abc import ABC, abstractmethod

""" Una empresa de alquiler de vehículos quiere gestionar mediante programa informático sus recursos, para ello sabemos lo siguiente de la empresa.

De cada vehículo se almacenan los siguientes datos: id (un numero entero único que identifica al vehículo de cara a la empresa), marca, modelo, bastidor (letras y números), color, matrícula y cliente que lo tiene alquilado (del cliente se contemplarán los datos: nombre, apellido1 , apellido2, dni).

En la empresa existen coches, furgonetas y camiones, de los primeros se debe almacenar el número de plazas y el grupo al que pertenece (básico, berlina, lujo). De las furgonetas se almacenará el número de plazas y la capacidad de carga, de los camiones solo la capacidad de carga (no las plazas)

Todos los vehículos tienen un precio de alquiler diario, que se calcula de manera distinta para coches, furgonetas o camiones. En los primeros el precio depende del número de plazas y el grupo al que pertenecen, según la expresión:

Precio alquiler coche (por día) = 50+NumeroPlazas*5+ (15% si es berlina y 30% de lujo)

En las segundas el precio depende del número de plazas y la capacidad de carga:

Precio alquiler furgoneta (por día) = 60+NumeroPlazas*3+ (20 euros hasta 500 kilos, 50 euros hasta 1000 kilos y 60 euros para más de 1000 kilos)

En los camiones el precio solo depende de la capacidad de carga:

Precio alquiler camión (por día) = 60+ (60 euros hasta 1000 kilos, 70 euros hasta 2500 kilos y 80 euros para más de 2500 kilos)

La empresa puede comprar vehículos pero no podrá alquilarlos hasta que los haya matriculado. El cliente debe presentar el Dni y dar datos personales para poder realizar el alquiler. También podrá darlos de baja pero no podrá hacerlo mientras los tenga alquilados.

El programa debe permitir: comprar vehículos (que pasarán a estar en la “lista” de vehículos de la empresa), matricular vehículos (se identificarán por su id), alquilar vehículos a un cliente, se preguntará en nº de días que se quiere alquilar y se informará del coste que va a suponer el alquiler

Por último la empresa quiere obtener los siguientes listados: de todos los vehículos (incluyendo su precio de alquiler por día), solo de aquellos que tiene en alquiler, de clientes con los vehículos que tiene cada uno alquilado y el coste total el alquiler.
"""

# Empresa de alquiler de vehiculos

class 