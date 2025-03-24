from examen1_lib import menu, ordenar_palabras, jugar

listado = ["sol", "luna", "astro", "plano", "satelite", "cometa", "asteroide", "meteorito", "galaxia", "nebulosa"]
palabras = ordenar_palabras(listado)

while True:
    opcion = menu()
    
    if opcion == 4:
        print("Gracias por jugar. ¡Hasta pronto!")
        break

    jugar(palabras, opcion - 1)