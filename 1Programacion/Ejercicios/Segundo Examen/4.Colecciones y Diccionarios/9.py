"""
9. Amplía el ejercicio de la tanda anterior que implementaba cuentas corrientes de un banco de tal forma que cada cuenta lleve un registro de todos los movimientos realizados: ingresos, cargos y transferencias (tanto enviadas como recibidas).

Contenido del programa principal:

cuenta1 = CuentaCorriente()
cuenta2 = CuentaCorriente(1500)
cuenta3 = CuentaCorriente(6000)
cuenta1.ingreso(2000)
cuenta1.cargo(600)
cuenta3.ingreso(75)
cuenta1.cargo(55)
cuenta2.transferencia(cuenta1, 100)
cuenta1.transferencia(cuenta3, 250)
cuenta3.transferencia(cuenta1, 22)
print(cuenta1.movimientos())
Salida:

Movimientos de la cuenta 1654432813
-----------------------------------
Ingreso de 2000 € Saldo: 2000,00 €
Cargo de 600 € Saldo: 1400,00 €
Cargo de 55 € Saldo: 1345,00 €
Transferencia recibida de 100 € de la cuenta 1654432813 Saldo 1445,00 €
Transferencia emitida de 250 € a la cuenta 6546817008 Saldo 1195,00 €
Transferencia recibida de 22 € de la cuenta 1654432813 Saldo 1217,00 €
"""

import random

class CuentaCorriente:
    def __init__(self, saldo_inicial=0):
        self.saldo = saldo_inicial
        self.numero_cuenta = self.generar_numero_cuenta()
        self._movimientos = []

    def generar_numero_cuenta(self):
        return str(random.randint(1000000000, 9999999999))

    def ingreso(self, cantidad):
        self.saldo += cantidad
        self._movimientos.append(f"Ingreso de {cantidad} € Saldo: {self.saldo:.2f} €")

    def cargo(self, cantidad):
        self.saldo -= cantidad
        self._movimientos.append(f"Cargo de {cantidad} € Saldo: {self.saldo:.2f} €")

    def transferencia(self, destino, cantidad):
        self.saldo -= cantidad
        destino.saldo += cantidad

        self._movimientos.append(
            f"Transferencia emitida de {cantidad} € a la cuenta {destino.numero_cuenta} Saldo {self.saldo:.2f} €"
        )
        destino._movimientos.append(
            f"Transferencia recibida de {cantidad} € de la cuenta {self.numero_cuenta} Saldo {destino.saldo:.2f} €"
        )

    def movimientos(self):
        resultado = f"Movimientos de la cuenta {self.numero_cuenta}\n" + "-" * 35 + "\n"
        for mov in self._movimientos:
            resultado += mov + "\n"
        return resultado.strip()


cuenta1 = CuentaCorriente()
cuenta2 = CuentaCorriente(1500)
cuenta3 = CuentaCorriente(6000)

cuenta1.ingreso(2000)
cuenta1.cargo(600)
cuenta3.ingreso(75)
cuenta1.cargo(55)
cuenta2.transferencia(cuenta1, 100)
cuenta1.transferencia(cuenta3, 250)
cuenta3.transferencia(cuenta1, 22)

print(cuenta1.movimientos())