# Muestra un menú con las siguientes opciones:

"""Introducir (por teclado) una fecha pidiendo por teclado año, mes y día en formato dd/mm/aaaa. Si no se introduce correctamente se devuelve un mensaje de error. Usa una función booleana para validar la fecha.
Añadir días a la fecha. Pide un número de días para sumar a la fecha introducida previamente y actualiza su valor. Si el número es negativo restará los días. Esta opción sólo podrá realizarse si hay una fecha introducida (se ha ejecutado la opción anterior), si no la hay mostrará un mensaje de error. 
Añadir meses a la fecha. El mismo procedimiento que la opción anterior.
Añadir años a la fecha. El mismo procedimiento que la opción 2.
Comparar la fecha introducida con otra. Pide una fecha al usuario en formato dd/mm/aaaa (válida, si no lo es da error) y la comparará con la que tenemos guardada, posteriormente mostrará si esta fecha es anterior, igual o posterior a la que tenemos almacenada y el número de días comprendido entre las dos fechas.
Mostrar la fecha en formato largo (ejemplo: "lunes, 1 de febrero de 2021").
Terminar.
Consideraciones a tener en cuenta:

El menú lo hacemos con una clase a la que llamaremos Menú, esa clase permitirá ir añadiendo opciones y escoger alguna opción.
Las fechas las manejaremos con la clase datetime.date."""

import datetime

class Menu:
    def __init__(self):
        self.options = {}

    def add_option(self, key, description, function):
        self.options[key] = (description, function)

    def show(self):
        while True:
            print("\nMenú:")
            for key, (desc, _) in self.options.items():
                print(f"{key}. {desc}")
            choice = input("Seleccione una opción: ")
            if choice in self.options:
                self.options[choice][1]()
            else:
                print("Opción no válida. Intente de nuevo.")

class FechaManager:
    def __init__(self):
        self.fecha = None

    def validar_fecha(self, fecha_str):
        try:
            day, month, year = map(int, fecha_str.split('/'))
            return datetime.date(year, month, day)
        except ValueError:
            return None

    def introducir_fecha(self):
        fecha_str = input("Ingrese una fecha (dd/mm/aaaa): ")
        fecha = self.validar_fecha(fecha_str)
        if fecha:
            self.fecha = fecha
            print("Fecha guardada correctamente.")
        else:
            print("Fecha inválida. Inténtelo de nuevo.")

    def añadir_dias(self):
        if not self.fecha:
            print("Debe ingresar una fecha primero.")
            return
        dias = int(input("Ingrese el número de días a añadir (puede ser negativo): "))
        self.fecha += datetime.timedelta(days=dias)
        print(f"Nueva fecha: {self.fecha.strftime('%d/%m/%Y')}")

    def añadir_meses(self):
        if not self.fecha:
            print("Debe ingresar una fecha primero.")
            return
        meses = int(input("Ingrese el número de meses a añadir (puede ser negativo): "))
        mes_nuevo = (self.fecha.month + meses - 1) % 12 + 1
        año_nuevo = self.fecha.year + (self.fecha.month + meses - 1) // 12
        dia_nuevo = min(self.fecha.day, 28)
        self.fecha = datetime.date(año_nuevo, mes_nuevo, dia_nuevo)
        print(f"Nueva fecha: {self.fecha.strftime('%d/%m/%Y')}")

    def añadir_años(self):
        if not self.fecha:
            print("Debe ingresar una fecha primero.")
            return
        años = int(input("Ingrese el número de años a añadir (puede ser negativo): "))
        try:
            self.fecha = self.fecha.replace(year=self.fecha.year + años)
            print(f"Nueva fecha: {self.fecha.strftime('%d/%m/%Y')}")
        except ValueError:
            print("Fecha inválida al añadir años.")

    def comparar_fechas(self):
        if not self.fecha:
            print("Debe ingresar una fecha primero.")
            return
        fecha_str = input("Ingrese una fecha para comparar (dd/mm/aaaa): ")
        otra_fecha = self.validar_fecha(fecha_str)
        if not otra_fecha:
            print("Fecha inválida.")
            return
        diferencia = abs((self.fecha - otra_fecha).days)
        if self.fecha > otra_fecha:
            print(f"La fecha ingresada es anterior por {diferencia} días.")
        elif self.fecha < otra_fecha:
            print(f"La fecha ingresada es posterior por {diferencia} días.")
        else:
            print("Las fechas son iguales.")

    def mostrar_fecha_larga(self):
        if not self.fecha:
            print("Debe ingresar una fecha primero.")
            return
        print(self.fecha.strftime("%A, %d de %B de %Y"))

fecha_manager = FechaManager()
menu = Menu()
menu.add_option("1", "Introducir fecha", fecha_manager.introducir_fecha)
menu.add_option("2", "Añadir días", fecha_manager.añadir_dias)
menu.add_option("3", "Añadir meses", fecha_manager.añadir_meses)
menu.add_option("4", "Añadir años", fecha_manager.añadir_años)
menu.add_option("5", "Comparar fecha", fecha_manager.comparar_fechas)
menu.add_option("6", "Mostrar fecha en formato largo", fecha_manager.mostrar_fecha_larga)
menu.add_option("7", "Salir", exit)

menu.show()