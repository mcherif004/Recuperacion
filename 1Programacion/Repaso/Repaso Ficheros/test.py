class ExceptionPersonal(Exception):
    def __init__(self, message="VOY A APROBAR!"):
        self.message = message
        super().__init__(f"Error: {message}")

    @property
    def message(self):
        return self.message

try:
    with open ("test.txt", "r", encoding="utf-8") as f:
        lines = f.readlines()
        for line in lines:
            l = line.strip()
            print(l.strip("\n"))
except FileExistsError as e:
    print(f"Error: {e}")
except ExceptionPersonal as e:
    print(f"Error: {e}")