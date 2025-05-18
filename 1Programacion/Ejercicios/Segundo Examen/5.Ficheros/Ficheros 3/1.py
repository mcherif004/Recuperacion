# 1. Modifica el ejercicio de la cuenta corriente para que el método que almacena en un fichero el estado del objeto guarde el objeto entero y el que lo recupera lo restaure. En esta versión no le pasamos nombre de fichero al método a la hora de guardarlo, usará el número de cuenta corriente para ello.

import pickle

class CuentaCorriente:
    def __init__(self, numero_cuenta, titular, saldo=0):
        self.numero_cuenta = numero_cuenta
        self.titular = titular
        self.saldo = saldo

    def guardar_estado(self):
        """Guarda el objeto completo en un fichero usando el número de cuenta como nombre"""
        nombre_archivo = f"cuenta_{self.numero_cuenta}.dat"
        with open(nombre_archivo, 'wb') as f:
            pickle.dump(self, f)
        print(f"Estado de la cuenta guardado en {nombre_archivo}")

    @classmethod
    def cargar_estado(cls, numero_cuenta):
        """Carga y devuelve un objeto CuentaCorriente desde archivo"""
        nombre_archivo = f"cuenta_{numero_cuenta}.dat"
        try:
            with open(nombre_archivo, 'rb') as f:
                cuenta = pickle.load(f)
            print(f"Cuenta cargada desde {nombre_archivo}")
            return cuenta
        except FileNotFoundError:
            print(f"Error: No existe archivo para la cuenta {numero_cuenta}")
            return None
        except Exception as e:
            print(f"Error al cargar la cuenta: {e}")
            return None

    def mostrar_estado(self):
        print(f"Cuenta {self.numero_cuenta} - Titular: {self.titular} - Saldo: {self.saldo}€")

# Ejemplo de uso
if __name__ == "__main__":
    # Crear y guardar una cuenta
    cuenta1 = CuentaCorriente("ES12345678", "Juan Pérez", 1500)
    cuenta1.guardar_estado()

    # Modificar el objeto
    cuenta1.saldo += 500
    print("\nEstado modificado:")
    cuenta1.mostrar_estado()

    # Cargar el estado original desde archivo
    print("\nCargando estado guardado...")
    cuenta_cargada = CuentaCorriente.cargar_estado("ES12345678")
    if cuenta_cargada:
        cuenta_cargada.mostrar_estado()