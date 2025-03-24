# 12. Implementa la clase Mobile como subclase de Terminal (la clase del ejercicio anterior que ya no hace falta modificar). Cada móvil lleva asociada una tarifa que puede ser “rata”, “mono” o “bisonte” (debes controlar esto). El coste por minuto es de 6, 12 y 30 céntimos respectivamente. Se tarifican los segundos exactos. La tarifa se puede cambiar. Obviamente, cuando un móvil llama a otro, se le cobra al que llama, no al que recibe la llamada. A continuación se proporciona el contenido del programa principal que usa esta clase y el resultado que debe aparecer por pantalla. El total tarificado debe aparecer con dos decimales.

"""Programa principal:

m1 = Mobile("678112233", "rata")
m2 = Mobile("644744469", "mono")
m3 = Mobile("622328909", "bisonte")
print(m1)
print(m2)
m1.call(m2, 320)
m1.call(m3, 200)
m2.call(m3, 550)
print(m1)
print(m2)
print(m3)
Salida:

Nº 678 11 22 33 - 0s de conversación - tarificados 0,00 euros
Nº 644 74 44 69 - 0s de conversación - tarificados 0,00 euros
Nº 678 11 22 33 - 520s de conversación - tarificados 0,52 euros
Nº 644 74 44 69 - 870s de conversación - tarificados 1,10 euros
Nº 622 32 89 09 - 750s de conversación - tarificados 0,00 euros"""