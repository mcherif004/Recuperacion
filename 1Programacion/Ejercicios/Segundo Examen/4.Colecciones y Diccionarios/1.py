"""
1. Implementa el control de acceso al área restringida de un programa. 
Se debe pedir un nombre de usuario y una contraseña. 
Si el usuario introduce los datos correctamente, el programa dirá “Ha accedido al área restringida”. 
El usuario tendrá un máximo de 3 oportunidades. 
Si se agotan las oportunidades el programa dirá “Lo siento, no tiene acceso al área restringida”. 
Los nombres de usuario con sus correspondientes contraseñas deben estar almacenados en un diccionario.
"""

# Diccionario con los usuarios
diccionaro = {
    "usuario" : "usuario",
    "admin" : "admin",
    "root" : "root" 
}

def controldeAcceso():
    tries = 3
    
    while tries > 0:
        user = input("Introduce el usuario: ")
        pswd = input("Introduce la contraseña: ")  
        
        if user in diccionaro and diccionaro[user] == pswd:
            print("Ha accedido al área restringida")
            break
        else:
            tries -= 1
            if tries == 0:
                print("Lo siento, no tiene acceso al área restringida")
            else:
                print("Error, intentos restantes:", tries)

controldeAcceso()