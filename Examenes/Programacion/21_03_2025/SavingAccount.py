from Account import Account

class SavingAccount(Account):
    def __init__(self, anual_rate: float, balance: float = 0, min_balance: float = 0):
        super().__init__(anual_rate, balance)
        self._min_balance = min_balance

    def withdraw(self, amount: float):
        if amount <= 0:
            raise ValueError("Withdraw amount cannot be negative or zero.")
        if self.balance - amount < self._min_balance:
            raise ValueError("Insufficient funds.")
        super().withdraw(amount)

    def add_interest_amount_to_balance(self):
        if self.balance < self._min_balance:
            interest = (0.5 * self.anual_rate * self.balance) / 100
        else:
            interest = (2 * self.anual_rate * self.balance) / 100
        self.deposit(interest)