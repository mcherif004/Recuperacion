from Account import Account

class CurrentAccount(Account):
    def add_interest_amount_to_balance(self):
        interest = (self.balance * self.anual_rate) / 100
        self.deposit(interest)

    def __str__(self):
        return f"<CurrentAccount> Account number: {self.account_number} Balance: {self.balance} Anual Rate: {self.anual_rate}"