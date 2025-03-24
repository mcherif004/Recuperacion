# La asociación de vinicultores tiene como política fijar un precio inicial al kilo de uva, la cual se clasifica en tipos A y B, y además en tamaños 1 y 2. Cuando se realiza la venta del producto, ésta es de un solo tipo y tamaño, se requiere determinar cuánto recibirá un productor por la uva que entrega en un embarque, considerando lo siguiente: si es de tipo A, se le cargan 20 céntimos al precio inicial cuando es de tamaño 1; y 30 céntimos si es de tamaño 2. Si es de tipo B, se rebajan 30 céntimos cuando es de tamaño 1, y 50 céntimos cuando es de tamaño 2. Realice un algoritmo para determinar la ganancia obtenida.


Tipo_A_1 = 0.20
Tipo_A_2 = 0.30
Tipo_B_1 = -0.30
Tipo_B_2 = -0.50

precio_base = float(input("Introduce el precio base del kilo de uva: "))  
tipo = int(input("Elija el tipo de uva: \n 1) Tipo A \n 2) Tipo B \n --> "))

if tipo == 1 or tipo == 2:
    tamaño = int(input("Elija el tamaño de la uva: \n 1) Tamaño 1 \n 2) Tamaño 2 \n --> "))
    
    if tamaño == 1 or tamaño == 2:
        cantidad = int(input("Introduce la cantidad de kilos de uva: "))
        
        if tipo == 1 and tamaño == 1:
            ajuste = Tipo_A_1
        elif tipo == 1 and tamaño == 2:
            ajuste = Tipo_A_2
        elif tipo == 2 and tamaño == 1:
            ajuste = Tipo_B_1
        elif tipo == 2 and tamaño == 2:
            ajuste = Tipo_B_2
        
        precio_final_kilo = precio_base + ajuste
        ganancia_total = cantidad * precio_final_kilo
        
        print(f"El valor total por vender {cantidad} kg de uvas es de {ganancia_total:.2f}€")
    else:
        print("Error: Tamaño inválido.")
else:
    print("Error: Tipo inválido.")