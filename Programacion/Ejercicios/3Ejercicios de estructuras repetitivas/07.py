# Una persona adquirió un producto para pagar en 20 meses. El primer mes pagó 10 €, el segundo 20 €, el tercero 40 € y así sucesivamente. Realizar un programa para determinar cuánto debe pagar mensualmente y el total de lo que pagará después de los 20 meses.

pago_mensual = 10
total_pagado = 0

for i in range(20):
    print(f"Mes {i+1}: {pago_mensual}€")
    total_pagado += pago_mensual
    pago_mensual *= 2

print(f"El total pagado después de 20 meses es de {total_pagado}€.")