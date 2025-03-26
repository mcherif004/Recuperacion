from SavingAccount import SavingAccount 
from CurrentAccount import CurrentAccount 

saving_account1 = SavingAccount(5, 5000) 
saving_account2 = SavingAccount(4, 6000, 1000) 
current_account1 = CurrentAccount(5, 5000) 
current_account2 = CurrentAccount(10, 1500) 

print("*****INITIAL DATA*****\n") 
print(saving_account1) 
print(saving_account2) 
print(current_account1) 
print(current_account2) 
print ("***********************\n") 


saving_account1.deposit(1000) 
print (saving_account1)

saving_account2.deposit(200) 
print(saving_account2) 

saving_account2.withdraw(140) 
print(saving_account2)

saving_account1.add_interest_amount_to_balance() 
print (saving_account1)

saving_account1.transfer(200, saving_account2) 
print (saving_account1) 
print (saving_account2)

current_account1.deposit(1000) 
current_account1.withdraw(140) 
print(current_account1) 
print(current_account2) 

current_account1.transfer(100,current_account2) 
print(current_account1) 
print(current_account2)

current_account1.add_interest_amount_to_balance() 
print(current_account1) 

try: 
    current_account1.transfer(1000000,saving_account1) 
except ValueError as e: 
    print(e) 

try: 
    saving_account1.withdraw(588800) 
except ValueError as e: 
    print(e) 

print(f"Total amount in current accounts: {current_account1 + current_account2} ") 
print(f"Total amount in saving accounts: {saving_account1 + saving_account2 }")