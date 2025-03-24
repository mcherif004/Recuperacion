# Implementa la clase BankAccount. Cada cuenta corriente tiene un número de cuenta de 10 dígitos. El número de cuenta se genera de forma aleatoria cuando se crea una cuenta nueva y no puede haber dos objetos con el mismo número de cuenta. La cuenta se puede crear con un saldo inicial; en caso de no especificar saldo, se pondrá a cero inicialmente. En una cuenta se pueden hacer ingresos y gastos. También es posible hacer una transferencia entre una cuenta y otra. No se permite el saldo negativo. En el siguiente capítulo se propone un ejercicio como mejora de éste, en el que se pide llevar un registro de los movimientos realizados.

"""Programa principal:

cuenta1 = BankAccount()
cuenta2 = BankAccount(1500)
cuenta3 = BankAccount(6000)
print(cuenta1)
print(cuenta2)
print(cuenta3)
cuenta1.deposit(2000)
cuenta2.withdraw(600)
cuenta3.deposit(75)
cuenta1.withdraw(55)
cuenta2.transfer(cuenta3, 100)
print(cuenta1)
print(cuenta2)
print(cuenta3)
Salida

Número de cta: 6942541557 Saldo: 0,00 €
Número de cta: 9319536518 Saldo: 1500,00 €
Número de cta: 7396941518 Saldo: 6000,00 €
Número de cta: 6942541557 Saldo: 1945,00 €
Número de cta: 9319536518 Saldo: 800,00 €
Número de cta: 7396941518 Saldo: 6175,00 €"""

import random

class BankAccount:
    existing_accounts = set()

    def __init__(self, initial_balance=0):
        while True:
            self.account_number = random.randint(1000000000, 9999999999)
            if self.account_number not in BankAccount.existing_accounts:
                BankAccount.existing_accounts.add(self.account_number)
                break
        
        self.balance = initial_balance

    def deposit(self, amount):
        if amount > 0:
            self.balance += amount
        else:
            print("El monto a depositar debe ser mayor que cero.")

    def withdraw(self, amount):
        if amount > 0:
            if self.balance >= amount:
                self.balance -= amount
            else:
                print("Saldo insuficiente.")
        else:
            print("El monto a retirar debe ser mayor que cero.")

    def transfer(self, target_account, amount):
        if amount > 0:
            if self.balance >= amount:
                self.balance -= amount
                target_account.deposit(amount)
            else:
                print("Saldo insuficiente.")
        else:
            print("El monto a transferir debe ser mayor que cero.")

    def __str__(self):
        return f"Número de cta: {self.account_number} Saldo: {self.balance:.2f} €"

cuenta1 = BankAccount()
cuenta2 = BankAccount(1500)
cuenta3 = BankAccount(6000)

print(cuenta1)
print(cuenta2)
print(cuenta3)

cuenta1.deposit(2000)
cuenta2.withdraw(600)
cuenta3.deposit(75)
cuenta1.withdraw(55)
cuenta2.transfer(cuenta3, 100)

print(cuenta1)
print(cuenta2)
print(cuenta3)