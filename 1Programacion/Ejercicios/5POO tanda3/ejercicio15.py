# Una empresa de alquiler de vehículos quiere gestionar mediante programa informático sus recursos, para ello sabemos lo siguiente de la empresa.

""" De cada vehículo se almacenan los siguientes datos: id (un numero entero único que identifica al vehículo de cara a la empresa), marca, modelo, bastidor (letras y números), color, matrícula y cliente que lo tiene alquilado (del cliente se contemplarán los datos: nombre, apellido1 , apellido2, dni).

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

class Cliente:
    def __init__(self, nombre, apellido1, apellido2, dni):
        self.nombre = nombre
        self.apellido1 = apellido1
        self.apellido2 = apellido2
        self.dni = dni

    def __str__(self):
        return f"{self.nombre} {self.apellido1} {self.apellido2} ({self.dni})"


class Vehiculo:
    def __init__(self, id, marca, modelo, bastidor, color, matricula):
        self.id = id
        self.marca = marca
        self.modelo = modelo
        self.bastidor = bastidor
        self.color = color
        self.matricula = matricula
        self.cliente = None
        self.alquilado = False

    def alquilar(self, cliente):
        if self.alquilado:
            print(f"El vehículo con id {self.id} ya está alquilado.")
        else:
            self.cliente = cliente
            self.alquilado = True
            print(f"El vehículo con id {self.id} ha sido alquilado a {cliente}.")

    def devolver(self):
        if not self.alquilado:
            print(f"El vehículo con id {self.id} no está alquilado.")
        else:
            print(f"El vehículo con id {self.id} ha sido devuelto por {self.cliente}.")
            self.cliente = None
            self.alquilado = False

    def precio_alquiler(self, dias):
        pass

    def __str__(self):
        return f"{self.marca} {self.modelo} ({self.id}) - {self.matricula}"


class Coche(Vehiculo):
    def __init__(self, id, marca, modelo, bastidor, color, matricula, num_plazas, grupo):
        super().__init__(id, marca, modelo, bastidor, color, matricula)
        self.num_plazas = num_plazas
        self.grupo = grupo

    def precio_alquiler(self, dias):
        base = 50 + self.num_plazas * 5
        if self.grupo == "berlina":
            return (base * 1.15) * dias
        elif self.grupo == "lujo":
            return (base * 1.30) * dias
        else:
            return base * dias

    def __str__(self):
        return f"{super().__str__()} - {self.num_plazas} plazas - Grupo: {self.grupo}"


class Furgoneta(Vehiculo):
    def __init__(self, id, marca, modelo, bastidor, color, matricula, num_plazas, capacidad_carga):
        super().__init__(id, marca, modelo, bastidor, color, matricula)
        self.num_plazas = num_plazas
        self.capacidad_carga = capacidad_carga

    def precio_alquiler(self, dias):
        base = 60 + self.num_plazas * 3
        if self.capacidad_carga <= 500:
            return (base + 20) * dias
        elif self.capacidad_carga <= 1000:
            return (base + 50) * dias
        else:
            return (base + 60) * dias

    def __str__(self):
        return f"{super().__str__()} - {self.num_plazas} plazas - Carga: {self.capacidad_carga}kg"


class Camion(Vehiculo):
    def __init__(self, id, marca, modelo, bastidor, color, matricula, capacidad_carga):
        super().__init__(id, marca, modelo, bastidor, color, matricula)
        self.capacidad_carga = capacidad_carga

    def precio_alquiler(self, dias):
        base = 60
        if self.capacidad_carga <= 1000:
            return (base + 60) * dias
        elif self.capacidad_carga <= 2500:
            return (base + 70) * dias
        else:
            return (base + 80) * dias

    def __str__(self):
        return f"{super().__str__()} - Carga: {self.capacidad_carga}kg"


class EmpresaAlquiler:
    def __init__(self):
        self.vehiculos = []
        self.clientes = []

    def comprar_vehiculo(self, vehiculo):
        self.vehiculos.append(vehiculo)
        print(f"Vehículo {vehiculo} añadido a la empresa.")

    def matricular_vehiculo(self, id):
        vehiculo = self.buscar_vehiculo(id)
        if vehiculo:
            print(f"Vehículo {vehiculo} matriculado.")
            return vehiculo
        else:
            print("Vehículo no encontrado.")
            return None

    def alquilar_vehiculo(self, id, cliente, dias):
        vehiculo = self.buscar_vehiculo(id)
        if vehiculo and not vehiculo.alquilado:
            vehiculo.alquilar(cliente)
            print(f"El alquiler costará {vehiculo.precio_alquiler(dias):.2f} € por {dias} días.")
        else:
            print("No se puede alquilar el vehículo.")

    def devolver_vehiculo(self, id):
        vehiculo = self.buscar_vehiculo(id)
        if vehiculo:
            vehiculo.devolver()

    def buscar_vehiculo(self, id):
        for vehiculo in self.vehiculos:
            if vehiculo.id == id:
                return vehiculo
        return None

    def obtener_vehiculos_alquilados(self):
        return [vehiculo for vehiculo in self.vehiculos if vehiculo.alquilado]

    def obtener_clientes_con_vehiculos(self):
        clientes = {}
        for vehiculo in self.vehiculos:
            if vehiculo.alquilado:
                if vehiculo.cliente.dni not in clientes:
                    clientes[vehiculo.cliente.dni] = []
                clientes[vehiculo.cliente.dni].append(vehiculo)
        return clientes

    def obtener_coste_total_alquiler(self):
        total = 0
        for vehiculo in self.vehiculos:
            if vehiculo.alquilado:
                total += vehiculo.precio_alquiler(1)
        return total

    def mostrar_vehiculos(self):
        for vehiculo in self.vehiculos:
            print(f"{vehiculo} - Precio por día: {vehiculo.precio_alquiler(1):.2f} €")


if __name__ == "__main__":
    empresa = EmpresaAlquiler()

    cliente1 = Cliente("Juan", "Pérez", "García", "12345678A")
    cliente2 = Cliente("Ana", "López", "Martín", "87654321B")

    coche1 = Coche(1, "Toyota", "Corolla", "AB123CD", "Rojo", "1234XYZ", 5, "berlina")
    furgoneta1 = Furgoneta(2, "Mercedes", "Sprinter", "EF456GH", "Blanco", "5678XYZ", 3, 1200)
    camion1 = Camion(3, "Volvo", "FM", "IJ789KL", "Azul", "9012XYZ", 3000)

    empresa.comprar_vehiculo(coche1)
    empresa.comprar_vehiculo(furgoneta1)
    empresa.comprar_vehiculo(camion1)

    empresa.matricular_vehiculo(1)
    empresa.matricular_vehiculo(2)

    empresa.alquilar_vehiculo(1, cliente1, 3)
    empresa.alquilar_vehiculo(2, cliente2, 5)

    empresa.mostrar_vehiculos()

    empresa.devolver_vehiculo(1)

    print("\nVehículos alquilados:")
    for vehiculo in empresa.obtener_vehiculos_alquilados():
        print(vehiculo)

    print("\nClientes con vehículos alquilados:")
    clientes_vehiculos = empresa.obtener_clientes_con_vehiculos()
    for dni, vehiculos in clientes_vehiculos.items():
        print(f"Cliente {dni}:")
        for vehiculo in vehiculos:
            print(f"  - {vehiculo}")

    print(f"\nCoste total del alquiler: {empresa.obtener_coste_total_alquiler():.2f} €")
