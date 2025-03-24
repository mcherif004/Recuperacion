# 11. Implementa la clase Terminal. Un terminal tiene asociado un número de teléfono. Los terminales se pueden llamar unos a otros y el tiempo de conversación corre para ambos. A continuación se proporciona el contenido del programa principal que usa esta clase y el resultado que debe aparecer por pantalla. Los números de teléfono tienen que validarse como tales al crear el objeto (solo dígitos, empiezan por 9, 6 ó 7, su longitud es de nueve dígitos) y no puede haber dos terminales con el mismo número.

"""Programa principal:

t1 = Terminal("678112233")
t2 = Terminal("644744469")
t3 = Terminal("622328909")
t4 = Terminal("664739818")
print(t1)
print(t2)
t1.call(t2, 320)
t1.call(t3, 200)
print(t1)
print(t2)
print(t3)
print(t4)
Salida:

No 678 11 22 33 - 0s de conversación
No 644 74 44 69 - 0s de conversación
No 678 11 22 33 - 520s de conversación
No 644 74 44 69 - 320s de conversación
No 622 32 89 09 - 200s de conversación
No 664 73 98 18 - 0s de conversación"""