from excepciones import DataError

class Book:
    def __init__(self, titulo, autor, isbn, anio, genero=None):
        self.titulo = titulo
        self.autor = autor
        self.isbn = isbn
        self.anio = anio
        self.genero = genero

    @property
    def titulo(self):
        return self._titulo

    @titulo.setter
    def titulo(self, valor):
        if not valor or valor.strip() == "":
            raise DataError()
        self._titulo = valor.strip()

    @property
    def autor(self):
        return self._autor

    @autor.setter
    def autor(self, valor):
        if not valor or valor.strip() == "":
            raise DataError()
        self._autor = valor.strip()

    @property
    def isbn(self):
        return self._isbn

    @isbn.setter
    def isbn(self, valor):
        if not isinstance(valor, str) or len(valor) != 13 or not valor.isdigit():
            raise DataError("ISBN debe ser una cadena de 13 digitos")
        self._isbn = valor

    @property
    def anio(self):
        return self._anio

    @anio.setter
    def anio(self, valor):
        if not (1450 <= valor <= 2025):
            raise DataError()
        self._anio = valor

    @property
    def genero(self):
        return self._genero

    @genero.setter
    def genero(self, valor):
        generos_validos = ["distopia", "magia", "fabula", None]
        if valor not in generos_validos:
            raise DataError("Genero invalido")
        self._genero = valor

    def to_dict(self):
        return {
            "titulo": self.titulo,
            "autor": self.autor,
            "isbn": self.isbn,
            "anio": self.anio,
            "genero": self.genero
        }