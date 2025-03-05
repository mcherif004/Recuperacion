# Librería `os` en Python

La librería `os` en Python permite interactuar con el sistema operativo, facilitando la gestión de archivos, directorios y variables de entorno.

## Instalación
`os` es una librería estándar de Python, por lo que no es necesario instalarla.

```python
import os
```

## 1. Obtener Información del Sistema
```python
print(os.name)  # 'posix' en Linux/macOS, 'nt' en Windows
```

## 2. Manejo de Directorios
```python
print(os.getcwd())  # Obtener directorio actual
os.chdir('/ruta/nueva')  # Cambiar de directorio
os.mkdir('nuevo_directorio')  # Crear un directorio
os.rmdir('nuevo_directorio')  # Eliminar un directorio vacío
```

## 3. Trabajar con Archivos
```python
os.remove('archivo.txt')  # Eliminar un archivo
os.rename('viejo.txt', 'nuevo.txt')  # Renombrar un archivo
```

## 4. Listar Archivos y Carpetas
```python
print(os.listdir('.'))  # Lista los archivos en el directorio actual
```

## 5. Variables de Entorno
```python
print(os.environ['HOME'])  # Obtener variable de entorno (Linux/macOS)
os.environ['NUEVA_VAR'] = 'valor'  # Definir una nueva variable de entorno
```

## 6. Ejecutar Comandos del Sistema
```python
os.system('ls')  # En Linux/macOS
os.system('dir')  # En Windows
```

## 7. Otras Funciones Útiles
```python
print(os.path.exists('archivo.txt'))  # Verifica si un archivo existe
print(os.path.isfile('archivo.txt'))  # Verifica si es un archivo
print(os.path.isdir('directorio'))  # Verifica si es un directorio
```

Este README proporciona una introducción básica al módulo `os`. Para más detalles, consulta la [documentación oficial](https://docs.python.org/3/library/os.html).