"""
6. Realiza un programa que sepa decir la capital de un país (en caso de conocer la respuesta) y que, además, sea capaz de aprender nuevas capitales. En principio, el programa solo conoce las capitales de España, Portugal y Francia. 
Estos datos deberán estar almacenados en un diccionario. 
Los datos sobre capitales que vaya aprendiendo el programa se deben almacenar en el mismo diccionario. 
El usuario sale del programa escribiendo la palabra “salir”.
"""

# Diccionario con las capitales iniciales
capitales = {
    "España": "Madrid",
    "Portugal": "Lisboa",
    "Francia": "París"
}

# Función para obtener o aprender capitales
def obtener_capital():
    while True:
        pais = input("Introduce un país (o 'salir' para terminar): ").capitalize()

        if pais.lower() == "salir":
            print("¡Hasta luego!")
            break
        
        if pais in capitales:
            print(f"La capital de {pais} es {capitales[pais]}.")
        else:
            print(f"No sé la capital de {pais}.")
            aprender = input(f"¿Quieres enseñarme la capital de {pais}? (sí/no): ").lower()
            if aprender == "sí":
                nueva_capital = input(f"¿Cuál es la capital de {pais}? ").capitalize()
                capitales[pais] = nueva_capital
                print(f"Gracias, ahora sé que la capital de {pais} es {nueva_capital}.")
            else:
                print("Está bien, no aprenderé esa capital.")

# Ejecutar el programa
obtener_capital()
