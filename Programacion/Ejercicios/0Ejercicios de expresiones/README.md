# Ejercicios de expresiones

26, 27 y 28 (página 57).
29 (página 58).

### 16 ¿Qué resultados se muestran al evaluar estas expresiones?

True == True != False   → True, True
1 < 2 < 3 < 4 < 5           → True, True, True, True
(1 < 2 < 3) and (4 < 5)  → True, True, True
1 < 2 < 4 < 3 < 5           → True, True, False, True
(1 < 2 < 4) and (3 < 5)  → True, True, True

### 17 Evalúa estas expresiones

https://ascii.cl/conversion.htm

a) 0xf + 0o17 + 0b1111 + 15 → 15 + 15 + 15 +15 = 60
b) 0xffff + 0b1 → 117 + 1 = 118

### 19 ¿Qué resulta de ejecutar estas tres líneas?

x = 10
x = x * 10
x → El resultado de x seria 100

### 20 Evalúa el polinomio x4 +x3 +2x2 − x en x = 1.1. Utiliza variables para evitar teclear
varias veces el valor de x. (El resultado es 4.1151).

x = 1.1
x ** 4 + x ** 3 + 2 * x ** 2 - x
1.4641 + 1.331 + 2.42 - 1.1 = 4.1151

### 21 Evalúa el polinomio x4 + x3 + 1/2x2 − x en x = 10. (El resultado es 11040.0).

x = 10
x ** 4 + x ** 3 + ½ *x ** 2 − x
10.000 + 1000 + 50 - 10 = 11040.0

### 22 ¿Qué valor tiene z tras evaluar estas sentencias?

z = 2       # 2
z += 2      # 4
z += 2 - 2  # 4
z *= 2      # 8
z *= 1 + 1  # 16
z //=2      # 8
z %= 3      # 2
z /= 3 - 1  # 1
z -= 2+1    # -2
z -= 2      # -4
z **= 3     # -64
z → -64

### 23. Evalúa estas expresiones y sentencias en el mismo orden en el que aparecen e indica lo que muestra el intérprete de Python como respuesta.

a = “b”             # ‘b’
a + “b”             # 'bb'
a + “a”             # 'ba'
a * 2 + “b” * 3     # 'bbbbb'
2 * (a + ”b”)       # 'bbbb'
2 * (“a” + “b”)     # 'abab'

### 24. ¿Qué resultados se obtendrán al evaluar las siguientes expresiones y asignaciones Python? Calcula primero a mano el valor resultante de cada expresión y comprueba, con la ayuda del ordenador, si tu resultado es correcto.

'a' * 3 + '/*' * 5 + 2 * 'abc' + '+'        # 'aaa/*/*/*/*/*abcabc+'
palindromo = 'abcba'                        # palindromo = 'abcba'
(4 * '<' + palindromo + '>' * 4) * 2        # '<<<<abcba>>>><<<<abcba>>>>'
subcadena = '=' + '-' * 3 + '='             # subcadena = '=- - -='
'10' * 5 + 4 * subcadena                    # '1010101010=- - -= =- - -= =- - -= =- - -='
2 * '12' + '.' + '3' * 3 + 'e-' + 4 * '76'  # '1212.333e-76767676'