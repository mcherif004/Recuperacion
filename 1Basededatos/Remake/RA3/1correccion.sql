-- 1. Clientes con email de hotmail
SELECT NIF, APELLIDOS, NOMBRE, IBAN, EMAIL
FROM CLIENTE
WHERE EMAIL LIKE '%@hotmail.com';

-- 2. Proveedores que no son de España
SELECT NIF, RAZON_SOCIAL, CONTACTO
FROM PROVEEDOR
WHERE NOT PAIS = 'España';

-- 3. Formas de envío con coste entre 3 y 5 €
SELECT ID_FE, DESCRIPCION
FROM FORMA_ENVIO
WHERE COSTE BETWEEN 3 AND 5;

-- 4. Direcciones en Córdoba, Sevilla y Málaga
SELECT NIF, DIRECCION, CP, POBLACION
FROM DIRECCION_ENVIO
WHERE POBLACION IN ('Córdoba', 'Sevilla', 'Málaga');

-- 5. Categorías de primer nivel (sin categoría padre)
SELECT ID_CATEGORIA, DESCRIPCION
FROM CATEGORIA
WHERE CATEGORIA_PADRE IS NULL;

-- 6. Artículos con unidades entre 5 y 10
SELECT REFERENCIA, DESCRIPCION, UND_DISPONIBLES, UND_VENDIDAS, (UND_DISPONIBLES - UND_VENDIDAS) AS DIFERENCIA
FROM ARTICULO
WHERE UND_DISPONIBLES BETWEEN 5 AND 10;

-- 7. Artículos de proveedor entre disponibles y el doble
SELECT REFERENCIA, NIF, PRECIO_COSTE, DTO_COMPRA
FROM ARTICULO_PROVEEDOR
WHERE UND_COMPRADAS BETWEEN UND_DISPONIBLES AND UND_DISPONIBLES * 2;

-- 8. Pedidos mayores de 100€ del 4 de enero de 2025
/* Comentario del profesor: No se ajusta al anunciado. Dice que el 
total pedido tiene que ser mayor que 100. De todas formas la
comparación FECHA = DATE '2025-01-04' es errónea aunque la consulta se ejecute.
Hay que usar la función to_date() y pasarle la cadena con la fecha */

SELECT NPEDIDO, NIF, FECHA, TOTAL_PEDIDO
FROM PEDIDO
WHERE TOTAL_PEDIDO NOT BETWEEN 0 AND 100 AND FECHA = DATE '2025-01-04';

-- 9. Artículos con descuento, sin repetir
/* Comentario del profesor: La cláusula WHERE es:
WHERE dto is not null and dto > 0;
*/
SELECT DISTINCT REFERENCIA
FROM LPEDIDO
WHERE NOT DTO NOT IN 0;

-- 10. Envíos de enero de 2025
/* Comentario del profesor: La última condición 
es muy rebuscada. Con esto es suficiente:
AND EXTRACT(YEAR FROM FECHA) = 2025
*/

SELECT NENVIO, FECHA, ID_DIR_ENV
FROM ENVIO
WHERE EXTRACT(MONTH FROM FECHA) = 1 AND EXTRACT(YEAR FROM FECHA) = EXTRACT(YEAR FROM DATE '2025-01-01');

-- 11. Artículos disponibles entre el 10% y el 50% de lo comprado
SELECT REFERENCIA, UND_DISPONIBLES, PRECIO_COSTE
FROM ARTICULO_PROVEEDOR
WHERE UND_DISPONIBLES BETWEEN UND_COMPRADAS * 0.10 AND UND_COMPRADAS * 0.50;

-- 12. Devoluciones con observaciones
SELECT NDEVOLUCION, OBSERVACIONES
FROM DEVOLUCION
WHERE OBSERVACIONES IS NOT NULL;

-- 13. Facturas de devoluciones en febrero con IVA normal mayor de 100
/* Comentario del profesor: Si el IVA normal es mayor que 100
no puedes usar between. Es F.IVA_NORMAL > 100 */

SELECT F.NFACTURA, F.FECHA, F.IVA_NORMAL
FROM FACTURA F
JOIN DEVOLUCION D ON F.NFACTURA = D.NFACTURA
WHERE EXTRACT(MONTH FROM F.FECHA) = 2 AND F.IVA_NORMAL NOT BETWEEN 0 AND 100;

-- 14. Reseñas malas (<=2) con comentario
/* Comentario del profesor: Abusas y aplicas mal between.
Si es menor o igual que 2, entonces es clasificación <= 2
*/
SELECT ID_RESENA AS ID_RESEÑA, CLASIFICACION, COMENTARIO
FROM RESENA
WHERE CLASIFICACION BETWEEN 0 AND 2 AND COMENTARIO IS NOT NULL;

-- 15. Formas de envío que contienen "Trans"
SELECT ID_FE, DESCRIPCION
FROM FORMA_ENVIO
WHERE DESCRIPCION LIKE '%Trans%';

-- 16. Artículos de categorías CONS, PESC y LIMP
SELECT REFERENCIA, DESCRIPCION
FROM ARTICULO
WHERE CATEGORIA IN ('CONS','PESC','LIMP');

-- 17. Clientes de Sevilla con teléfono
SELECT C.*
FROM CLIENTE C
JOIN DIRECCION_ENVIO D ON C.NIF = D.NIF
WHERE D.PROVINCIA = 'Sevilla' AND C.TELEFONO IS NOT NULL;

-- 18. Pedidos de enero de 2025 ordenados por total desc
/* Comentario del profesor: Igual que antes. La 2ª condición es mejor así:
EXTRACT(YEAR FROM FECHA) = 2025
*/

SELECT NPEDIDO, NIF, FECHA, TOTAL_PEDIDO
FROM PEDIDO
WHERE EXTRACT(MONTH FROM FECHA) = 1 AND EXTRACT(YEAR FROM FECHA) = EXTRACT(YEAR FROM DATE '2025-01-01')
ORDER BY TOTAL_PEDIDO DESC;

-- 19. Artículos pedidos con dto entre 10–50%, ordenados
SELECT REFERENCIA, UNIDADES, PRECIO, DTO, (UNIDADES * PRECIO * (1 - DTO)) AS IMPORTE
FROM LPEDIDO
WHERE DTO BETWEEN 0.10 AND 0.50
ORDER BY REFERENCIA, IMPORTE DESC;

-- 20. Media de ventas de clientes con email de Gmail
SELECT AVG(VENTAS) AS MEDIA_VENTAS
FROM CLIENTE
WHERE EMAIL LIKE '%@gmail.com';

-- 21. Coste medio, máximo y mínimo de formas con contacto y teléfono
SELECT AVG(COSTE) AS MEDIA,
      MAX(COSTE) AS MAXIMO,
      MIN(COSTE) AS MINIMO
FROM FORMA_ENVIO
WHERE CONTACTO IS NOT NULL AND TELEFONO IS NOT NULL;

-- 22. Media de PVP por categoría (si vendidas superan disponibles y media > global)
/* Comentario del profesor:
De nuevo, usas between cuando hay que usar un operador relacional. Es 
where und_vendidas > und_disponibles 

Además, la cláusula having sobra. El enunciado no dice nada sobre
una condición que afecte a una función de grupo
*/

SELECT CATEGORIA, AVG(PVP) AS MEDIA_CATEGORIA
FROM ARTICULO
WHERE UND_VENDIDAS NOT BETWEEN 0 AND UND_DISPONIBLES
GROUP BY CATEGORIA
HAVING AVG(PVP) NOT BETWEEN (SELECT AVG(PVP) FROM ARTICULO) AND 999999999;

-- 23. Media de coste por artículo con dto entre 0–50% y media > 2€
/* Otra vez between cuando tienes que usar operador relacional. Es
HAVING AVG(PRECIO_COSTE) > 2;
*/

SELECT REFERENCIA, AVG(PRECIO_COSTE) AS MEDIA_COSTE
FROM ARTICULO_PROVEEDOR
WHERE DTO_COMPRA BETWEEN 0 AND 0.5
GROUP BY REFERENCIA
HAVING AVG(PRECIO_COSTE) NOT BETWEEN 0 AND 2;

-- 24. Promedio unidades y dto por artículo si precio > 5 y avg_und > máx global
/* Comentario del profesor:
Ooooootra vez, between NO, operador relacional SI. La cláusula where es:
WHERE PRECIO > 5

Además, no hay que hacer subconsulta en la cláusula HAVING. Puedes
incluir una función de grupo en having que no está en select. Sería:
having avg(unidades) > max(unidades) / 2

*/
SELECT REFERENCIA,
      AVG(UNIDADES) AS AVG_UND,
      AVG(DTO) AS AVG_DTO
FROM LPEDIDO
WHERE PRECIO NOT BETWEEN 0 AND 5
GROUP BY REFERENCIA
HAVING AVG(UNIDADES) NOT BETWEEN 0 AND (
  SELECT MAX(avg_und)
    FROM (
      SELECT AVG(UNIDADES) AS avg_und
        FROM LPEDIDO
        GROUP BY REFERENCIA
    )
);

-- 25. Media unidades por envío (pedidos 1–20)
SELECT NENVIO, AVG(UNIDADES) AS MEDIA_UNIDADES
FROM LENVIO
WHERE NPEDIDO BETWEEN 1 AND 20
GROUP BY NENVIO;

-- 26. Media de totales por cliente (si media > 200€)
/* Comentario del profesor:
Otra vez, NO USAR HAVING PARA REEMPLAZAR UN OPERADOR RELACIONAL. SI EL 
ENUNCIADO TE DICE MAYOR QUE, MENOR QUE, ... NO PUEDES USAR BETWEEN,
TIENES QUE USAR EL OPERADOR RELACIONAL CORRESPONDIENTE.

HAVING AVG(TOTAL_PEDIDO) > 200;
*/

SELECT NIF, AVG(TOTAL_PEDIDO) AS MEDIA_TOTAL
FROM PEDIDO
GROUP BY NIF
HAVING AVG(TOTAL_PEDIDO) NOT BETWEEN 0 AND 200;

-- 27. Nº de facturas en enero de 2025
/*
De nuevo, la segunda condición con el mismo error que en un ejercicio anterior.
Sería: AND EXTRACT(YEAR FROM FECHA) = 2025;
*/

SELECT COUNT(*) AS NUM_FACTURAS
FROM FACTURA
WHERE EXTRACT(MONTH FROM FECHA) = 1 AND EXTRACT(YEAR FROM FECHA) = EXTRACT(YEAR FROM DATE '2025-01-01');

-- 28. Nº pedido y número de líneas si hay más de 4
/* Comentario del profesor:
Dejavu. Si la condición es mayor que, no puedes usar between. Sería
HAVING COUNT(*) > 4;
*/

SELECT NPEDIDO, COUNT(*) AS NUM_LINEAS
FROM LPEDIDO
GROUP BY NPEDIDO
HAVING COUNT(*) NOT BETWEEN 0 AND 4;

-- 29. Nº de devolución y máx de unidades devueltas
SELECT NDEVOLUCION, MAX(UNIDADES) AS MAX_UNIDADES
FROM DEVOLUCION_LENVIO
GROUP BY NDEVOLUCION;

-- 30. Media del IVA normal en facturas de febrero
SELECT AVG(IVA_NORMAL) AS MEDIA_IVA_NORMAL
FROM FACTURA
WHERE EXTRACT(MONTH FROM FECHA) = 2;