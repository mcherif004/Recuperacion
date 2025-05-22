from Library import Library
from Book import Book
from excepciones import *

def menu():
    biblioteca = None
    while True:
        print("\n--- Menú Biblioteca ---")
        print("1. Crear biblioteca vacía")
        print("2. Cargar catálogo desde JSON")
        print("3. Añadir libro")
        print("4. Eliminar libro")
        print("5. Buscar libro")
        print("6. Listar libros")
        print("7. Exportar catálogo a JSON")
        print("0. Salir")
        try:
            opcion = int(input("Elige una opcion: "))
        except ValueError:
            print("Numero invalido")
            continue

        try:
            if opcion == 1:
                biblioteca = Library()
                print("Biblioteca creada")

            elif opcion == 2:
                biblioteca = Library.from_json()
                print("Biblioteca cargada")

            elif opcion == 3:
                if biblioteca is None:
                    print("Primero crea o carga una biblioteca")
                    continue
                titulo = input("Título: ")
                autor = input("Autor: ")
                isbn = input("ISBN (13 digitos): ")
                anio = int(input("Año: "))
                genero = input("Género (distopia, magia, fabula) (opcional): ") or None
                libro = Book(titulo, autor, isbn, anio, genero)
                biblioteca.add_book(libro)
                print("Libro añadido")

            elif opcion == 4:
                if biblioteca is None:
                    print("Primero crea o carga una biblioteca")
                    continue
                titulo = input("Titulo a eliminar: ")
                biblioteca.remove_book(titulo)
                print("Libro eliminado")

            elif opcion == 5:
                if biblioteca is None:
                    print("Primero crea o carga una biblioteca")
                    continue
                titulo = input("Titulo a buscar: ")
                libro = biblioteca.search_book(titulo)
                print(f"{libro.titulo}-{libro.autor}-{libro.isbn}-{libro.anio}-{libro.genero}")

            elif opcion == 6:
                if biblioteca is None:
                    print("Primero crea o carga una biblioteca")
                    continue
                for libro in biblioteca.list_books():
                    print(f"{libro.titulo}-{libro.autor}-{libro.isbn}-{libro.anio}-{libro.genero}")

            elif opcion == 7:
                if biblioteca is None:
                    print("Primero crea o carga una biblioteca")
                    continue
                path = input("Ruta de exportacion (enter para usar actual): ") or None
                biblioteca.export_to_json(path)
                print("Catalogo exportado")

            elif opcion == 0:
                print("Saliendo...")
                break

            else:
                print("Opción no valida")

        except (FullLibrary, LibroDuplicado, LibroNotFound, DataError, FileError) as e:
            print(e)
        except Exception as e:
            print(f"Error inesperado: {e}")

if __name__ == "__main__":
    menu()