from abc import ABC, abstractmethod

class Account(ABC):
    account_counter = 10001234
    # Constructor de la clase
    def __init__(self, anual_rate: float, balance: float = 0):
        self.__account_number = Account.account_counter
        Account.account_counter += 1
        self._balance = balance
        self._anual_rate = anual_rate

    # Getter de account_number
    @property
    def account_number(self):
        return self.__account_number

    # Getter de balance
    @property
    def balance(self):
        return self._balance

    # Getter de anual_rate
    @property
    def anual_rate(self):
        return self._anual_rate

    # Metodo deposit
    def deposit(self, amount: float):
        if amount <= 0:
            raise ValueError("Deposit amount cannot be negative or zero.")
        self._balance += amount


    # Metodo withdraw
    def withdraw(self, amount: float):
        if amount <= 0:
            raise ValueError("Withdraw amount cannot be negative or zero.")
        if amount > self._balance:
            raise ValueError("Withdraw amount cannot be more than balance.")
        self._balance -= amount

    # Metodo transfer
    def transfer(self, amount: float, target_account):
        if amount <= 0:
            raise ValueError("Transfer amount cannot be negative or zero.")
        if amount > self._balance:
            raise ValueError("Transfer amount cannot be more than balance.")
        self.withdraw(amount)
        target_account.deposit(amount)

    # Metodo estatico abstractmethod
    @abstractmethod
    def add_interest_amount_to_balance(self):
        pass

    # Metodo __add__ para sumar las cuentas
    def __add__(self, other):
        if not isinstance(other, Account):
            raise TypeError("Can only add two Accounts.")
        return self._balance + other._balance

    def __str__(self):
        return f"<Account> Account number: {self.__account_number} Balance: {self._balance} Anual Rate: {self._anual_rate}"
