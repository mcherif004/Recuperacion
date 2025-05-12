Tenemos un sistema de base de datos (gestor de base de datos opcional) para gestionar las cuentas corrientes de un banco con las siguientes tablas:

CLIENTES (dni, nombre, teléfono, dirección).

CUENTAS (número cuenta [entero, autoincrementable], dni cliente, activa ó baja)

MOVIMIENTOS (nº cuenta, importe [+], fecha y hora, tipo [ingreso, salida, transferencia enviada, transferencia recibida], nº cuenta transferencia, concepto).

Necesitamos una serie de programas para gestionar nuestro sistema bancario:

Gestión de Clientes: alta, baja (solo si no tiene cuentas corrientes), modificación (todo salvo dni). 
Gestión de cuentas corrientes (alta de cuenta, baja de cuenta [no la elimina de la base de datos para no perder los datos], ingreso en cuenta, salida de cuenta, transferencia [tiene una cuenta emisora y una receptora, generará dos movimientos].
Gestión de cuenta corriente de un cliente (en capa de presentación): recibe el número de cuenta corriente a gestionar y permite: listar los movimientos entre fechas, ver saldo, ingresar y retirar dinero, hacer transferencias.
Intentar diseñar un sistema de clases que tenga su capa de presentación, negocio y datos.