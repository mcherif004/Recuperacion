# 3. Modifica el ejercicio de POO que gestiona una cuenta bancaria con movimientos, de forma que añadas a la clase un método para guardar todos los datos de la cuenta bancaria (número, saldo y movimientos) en un fichero elegido por el cliente, y un nuevo constructor que reciba como parámetro un fichero como el anterior y cree el objeto con esos datos. Pruébalo con un programa.

import json

class CuentaBancaria:
    def __init__(self, numero_cuenta, saldo_inicial=0):
        self.numero_cuenta = numero_cuenta
        self.saldo = saldo_inicial
        self.movimientos = []

    def depositar(self, cantidad):
        self.saldo += cantidad
        self.movimientos.append(f"Depósito: +{cantidad}")

    def retirar(self, cantidad):
        if cantidad <= self.saldo:
            self.saldo -= cantidad
            self.movimientos.append(f"Retiro: -{cantidad}")
        else:
            self.movimientos.append(f"Intento de retiro fallido: -{cantidad} (saldo insuficiente)")

    def mostrar_info(self):
        print(f"Número de cuenta: {self.numero_cuenta}")
        print(f"Saldo actual: {self.saldo}")
        print("Movimientos:")
        for mov in self.movimientos:
            print(" -", mov)

    def guardar_en_fichero(self, nombre_fichero):
        try:
            with open(nombre_fichero, "w") as f:
                datos = {
                    "numero_cuenta": self.numero_cuenta,
                    "saldo": self.saldo,
                    "movimientos": self.movimientos
                }
                json.dump(datos, f, indent=4)
            print(f"Datos guardados en '{nombre_fichero}' correctamente.")
        except IOError as e:
            print("Error al guardar los datos:", e)

    @classmethod
    def cargar_desde_fichero(cls, nombre_fichero):
        try:
            with open(nombre_fichero, "r") as f:
                datos = json.load(f)
                cuenta = cls(datos["numero_cuenta"], datos["saldo"])
                cuenta.movimientos = datos["movimientos"]
                print(f"Cuenta cargada correctamente desde '{nombre_fichero}'.")
                return cuenta
        except (IOError, json.JSONDecodeError, KeyError) as e:
            print("Error al cargar los datos:", e)
            return None


#! Prueba

# Crear una cuenta, hacer operaciones y guardar en archivo
cuenta = CuentaBancaria("123456789", 1000)
cuenta.depositar(500)
cuenta.retirar(200)
cuenta.retirar(2000)  # Esto debería fallar por saldo insuficiente
cuenta.guardar_en_fichero("cuenta_guardada.json")

print("\nCuenta original:")
cuenta.mostrar_info()

# Crear una nueva cuenta cargándola desde el archivo
cuenta_cargada = CuentaBancaria.cargar_desde_fichero("cuenta_guardada.json")

if cuenta_cargada:
    print("\nCuenta cargada desde fichero:")
    cuenta_cargada.mostrar_info()