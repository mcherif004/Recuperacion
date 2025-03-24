# Librería `tkinter` en Python

La librería `tkinter` en Python permite crear interfaces gráficas de usuario (GUI) de manera sencilla y eficiente.

## Instalación
`tkinter` es una librería estándar de Python, por lo que no es necesario instalarla. Se importa de la siguiente manera:

```python
import tkinter as tk
```

## 1. Crear una Ventana Básica
```python
import tkinter as tk

ventana = tk.Tk()  # Crear la ventana principal
ventana.title("Mi Aplicación")  # Título de la ventana
ventana.geometry("400x300")  # Tamaño de la ventana
ventana.mainloop()  # Ejecutar la ventana
```

## 2. Añadir Widgets Básicos
```python
import tkinter as tk

ventana = tk.Tk()
ventana.title("Ejemplo de Widgets")

etiqueta = tk.Label(ventana, text="Hola, Tkinter!")  # Crear una etiqueta
etiqueta.pack()  # Mostrar la etiqueta

boton = tk.Button(ventana, text="Haz clic", command=lambda: print("Botón presionado"))
boton.pack()

ventana.mainloop()
```

## 3. Entrada de Texto y Captura de Datos
```python
import tkinter as tk

def mostrar_texto():
    texto = entrada.get()
    print("Texto ingresado:", texto)

ventana = tk.Tk()
entrada = tk.Entry(ventana)  # Campo de entrada
entrada.pack()

boton = tk.Button(ventana, text="Mostrar", command=mostrar_texto)
boton.pack()

ventana.mainloop()
```

## 4. Uso de Frames y Organización de Widgets
```python
import tkinter as tk

ventana = tk.Tk()
frame = tk.Frame(ventana)  # Crear un marco
frame.pack()

boton1 = tk.Button(frame, text="Botón 1")
boton2 = tk.Button(frame, text="Botón 2")

boton1.pack(side=tk.LEFT)
boton2.pack(side=tk.RIGHT)

ventana.mainloop()
```

## 5. Ventanas Emergentes (Messagebox)
```python
import tkinter as tk
from tkinter import messagebox

def mostrar_alerta():
    messagebox.showinfo("Información", "Esto es un mensaje emergente")

ventana = tk.Tk()
boton = tk.Button(ventana, text="Mostrar alerta", command=mostrar_alerta)
boton.pack()

ventana.mainloop()
```

Este README proporciona una introducción básica al módulo `tkinter`. Para más detalles, consulta la [documentación oficial](https://docs.python.org/3/library/tkinter.html).