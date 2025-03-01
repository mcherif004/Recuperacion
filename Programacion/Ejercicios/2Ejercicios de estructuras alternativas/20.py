# Una compañía de transporte internacional tiene servicio en algunos países de América del Norte, América Central, América del Sur, Europa y Asia. El costo por el servicio de transporte se basa en el peso del paquete y la zona a la que va dirigido. Lo anterior se muestra en la tabla:

"""
ZONA	UBICACIÓN	        COSTO/GRAMO
1	    América del Norte	24.00 euros
2	    América Central	    20.00 euros
3	    América del Sur	    21.00 euros
4	    Europa	            10.00 euros
5	    Asia	            18.00 euros
"""

print("ZONA\tUBICACIÓN\t\tCOSTO/GRAMO\n1\tAmérica del Norte\t24.00 euros\n2\tAmérica Central\t\t20.00 euros\n3\tAmérica del Sur\t\t21.00 euros\n4\tEuropa\t\t\t10.00 euros\n5\tAsia\t\t\t18.00 euros")

# Parte de su política implica que los paquetes con un peso superior a 5 kg no son transportados, esto por cuestiones de logística y de seguridad. 
# Realice un algoritmo para determinar el cobro por la entrega de un paquete o, en su caso, el rechazo de la entrega.

gramos = int(input("Introduce el peso del paquete en gramos: "))

if gramos > 0:
    if gramos >= 5000:
        print("Debido a la los paquetes con un peso superior a 5kg no son transportados, esto por cuestiones de logística y de seguridad.")
    else:
        zona = int(input("Introduce el numero de la zona para poder tramitar el envio de su paquete: "))
        if zona >= 1 or zona <= 5:
            precio = gramos * zona #! Posible error en la logica del precio
            print(f"Gracias por su compra.\n\nTICKET\nPeso:\t{gramos} gramos\nZona:\t{zona}\nPrecio:\t{precio} euros")
        else:
            print("Error, la zona debe ser una de las indicadas anteriormente")
else:
    print("El peso del paquete no puede ser negativo")