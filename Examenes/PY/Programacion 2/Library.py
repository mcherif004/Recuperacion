import json
from excepciones import FullLibrary, LibroDuplicado, LibroNotFound, DataError
from Book import Book

class Library:
    def __init__(self, json_path="./catalogo.json"):
        self.json_path = json_path
        self.catalogo = []

    @classmethod
    def from_json(cls, json_path="./catalogo.json"):
        biblioteca = cls(json_path)
        try:
            with open(json_path, "r", encoding="utf-8") as f:
                data = json.load(f)
                for d in data:
                    libro = Book(
                        d["titulo"],
                        d["autor"],
                        d["isbn"],
                        d["anio"],
                        d.get("genero")
                    )
                    biblioteca.catalogo.append(libro)
        except FileNotFoundError:
            pass
        except json.JSONDecodeError:
            raise DataError("Error al leer el archivo JSON")
        return biblioteca

    def guardar_json(self):
        data = [libro.to_dict() for libro in self.catalogo]
        try:
            with open(self.json_path, "w", encoding="utf-8") as f:
                json.dump(data, f, indent=4, ensure_ascii=False)
        except Exception as e:
            raise DataError(f"Error al guardar en JSON: {e}")

    def add_book(self, libro):
        if len(self.catalogo) >= 100:
            raise FullLibrary()
        for b in self.catalogo:
            if b.titulo.lower() == libro.titulo.lower():
                raise LibroDuplicado()
        self.catalogo.append(libro)
        self.guardar_json()

    def remove_book(self, titulo):
        for libro in self.catalogo:
            if libro.titulo.lower() == titulo.lower():
                self.catalogo.remove(libro)
                self.guardar_json()
                return
        raise LibroNotFound()

    def search_book(self, titulo):
        for libro in self.catalogo:
            if libro.titulo.lower() == titulo.lower():
                return libro
        raise LibroNotFound()

    def list_books(self):
        return self.catalogo

    def export_to_json(self, path=None):
        if path is None:
            path = self.json_path
        data = [libro.to_dict() for libro in self.catalogo]
        try:
            with open(path, "w", encoding="utf-8") as f:
                json.dump(data, f, indent=4)
        except Exception as e:
            raise DataError(f"Error al exportar a JSON: {e}")