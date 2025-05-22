class LibroDuplicado(Exception):
    def __init__(self, message="El libro ya esta en la biblioteca", *args):
        self._message = message
        super().__init__(*args)

    def __str__(self):
        return f"Error - {self._message}"


class LibroNotFound(Exception):
    def __init__(self, message="El libro no se encontro en la biblioteca", *args):
        self._message = message
        super().__init__(*args)

    def __str__(self):
        return f"Error - {self._message}"


class FullLibrary(Exception):
    def __init__(self, message="Biblioteca llena", *args):
        self._message = message
        super().__init__(*args)

    def __str__(self):
        return f"Error - {self._message}"


class DataError(Exception):
    def __init__(self, message="Error de datos invalidos", *args):
        self._message = message
        super().__init__(*args)

    def __str__(self):
        return f"Error - {self._message}"


class FileError(Exception):
    def __init__(self, message="Error con el archivo", *args):
        self._message = message
        super().__init__(*args)

    def __str__(self):
        return f"Error - {self._message}"