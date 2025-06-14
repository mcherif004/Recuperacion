-- 1. Clientes con al menos 2 pedidos
SELECT NIF, NOMBRE
FROM CLIENTE
WHERE NIF IN (
    SELECT NIF
    FROM PEDIDO
    GROUP BY NIF
    HAVING COUNT(*) >= 2
);

-- 2. Artículos con PVP mayor que la media de los pedidos con más de 5 unidades
SELECT REFERENCIA, DESCRIPCION, PVP
FROM ARTICULO
WHERE PVP > (
    SELECT AVG(PRECIO)
    FROM LPEDIDO
    WHERE UNIDADES > 5
);

-- 3. Proveedores que suministran artículos con reseñas >= 3

/* Comentario del profesor: No hay que usar joins, esta tanda es de subconsultas*/

SELECT DISTINCT P.NIF, P.RAZON_SOCIAL, P.EMAIL
FROM PROVEEDOR P
JOIN ARTICULO_PROVEEDOR AP ON P.NIF = AP.NIF
JOIN RESEÑA R ON AP.REFERENCIA = R.REFERENCIA
WHERE R.CLASIFICACION >= 3;

-- 4. Clientes con ventas >= media de totales de pedidos
SELECT NIF, NOMBRE, APELLIDOS
FROM CLIENTE
WHERE VENTAS >= (
    SELECT AVG(TOTAL_PEDIDO)
    FROM PEDIDO
);

-- 5. Formas de envío no utilizadas en febrero
SELECT ID_FE, DESCRIPCION, COSTE
FROM FORMA_ENVIO
WHERE ID_FE NOT IN (
    SELECT FORMA_ENVIO
    FROM ENVIO
    WHERE EXTRACT(MONTH FROM FECHA) = 2
);

-- 6. Artículos con reseñas en febrero
/* Comentario del profesor: No hay que usar joins, esta tanda es de subconsultas*/
SELECT A.REFERENCIA, A.DESCRIPCION, A.PVP, A.DTO_VENTA
FROM ARTICULO A
JOIN RESEÑA R ON A.REFERENCIA = R.REFERENCIA
WHERE EXTRACT(MONTH FROM R.FECHA) = 2;

-- 7. Artículos con al menos 2 reseñas
SELECT REFERENCIA, DESCRIPCION, PVP
FROM ARTICULO
WHERE REFERENCIA IN (
    SELECT REFERENCIA
    FROM RESEÑA
    GROUP BY REFERENCIA
    HAVING COUNT(*) >= 2
);

-- 8. Proveedores que no suministran artículos de la familia PORT
/* Comentario del profesor: No hay que usar joins, esta tanda es de subconsultas*/
SELECT NIF, RAZON_SOCIAL, CONTACTO
FROM PROVEEDOR
WHERE NIF NOT IN (
    SELECT AP.NIF
    FROM ARTICULO_PROVEEDOR AP
    JOIN ARTICULO A ON AP.REFERENCIA = A.REFERENCIA
    WHERE A.CATEGORIA = 'PORT'
);

-- 9. Artículos con dto de compra mayor que algún dto de venta de pedidos con más de 5 unidades
/* Comentario del profesor: Te dice el enunciado: MAYOR QUE ALGÚN DTO DE VENTA ...
Por lo tanto te falta el cuantificador ANY en la cláusula WHERE. Sería así:

WHERE DTO_COMPRA > ANY ( SELECT DTO FROM LPEDIDO WHERE UNIDADES > 5 )

Es curioso que a pesar de omitir el operador ANY has hecho bien la consulta, ya que
pones DTO_COMPRA > ( SELECT MIN(DTO) ... ). Es decir, si el dto_compra es mayor que
el mínimo dto de lpedido, entonces es que es mayor que algún dto de lpedido. Esta sutileza
no se le ha ocurrido a nadie ... repito, curioso. */

SELECT REFERENCIA, PRECIO_COSTE, DTO_COMPRA
FROM ARTICULO_PROVEEDOR
WHERE DTO_COMPRA > (
    SELECT MIN(DTO)
    FROM LPEDIDO
    WHERE UNIDADES > 5
);

-- 10. Envíos con al menos 2 líneas de envío
SELECT NENVIO, NIF, FECHA
FROM ENVIO
WHERE NENVIO IN (
    SELECT NENVIO
    FROM LENVIO
    GROUP BY NENVIO
    HAVING COUNT(*) >= 2
);

-- 11. Artículos con PVP mayor que todos los precios de coste del proveedor 01000000M
SELECT REFERENCIA, DESCRIPCION, PVP
FROM ARTICULO
WHERE PVP > ALL (
    SELECT PRECIO_COSTE
    FROM ARTICULO_PROVEEDOR
    WHERE NIF = '01000000M'
);

-- 12. Líneas de pedido con unidades mayores que alguna disponible de artículos con precio de compra > 1
SELECT NPEDIDO, NLINEA, REFERENCIA
FROM LPEDIDO
WHERE UNIDADES > ANY (
    SELECT UND_DISPONIBLES
    FROM ARTICULO_PROVEEDOR
    WHERE PRECIO_COSTE > 1
);

-- 13. Clientes con facturas en febrero
/* Comentario del profesor: No hay que usar joins, esta tanda es de subconsultas*/
SELECT DISTINCT C.NIF, C.NOMBRE, C.APELLIDOS
FROM CLIENTE C
JOIN ENVIO E ON C.NIF = E.NIF
JOIN FACTURA F ON E.NFACTURA = F.NFACTURA
WHERE EXTRACT(MONTH FROM F.FECHA) = 2;

-- 14. Artículos cuyo PVP es mayor que todos los precios de compra de artículos de familia CARN
/* Comentario del profesor: No hay que usar joins, esta tanda es de subconsultas*/
SELECT REFERENCIA, DESCRIPCION
FROM ARTICULO
WHERE PVP > ALL (
    SELECT PRECIO_COSTE
    FROM ARTICULO_PROVEEDOR AP
    JOIN ARTICULO A ON AP.REFERENCIA = A.REFERENCIA
    WHERE A.CATEGORIA = 'CARN'
);

-- 15. Pedidos cuya suma de importes netos supera la media de todas las líneas
/* Comentario del profesor: Podrías haber usado total_pedido de la tabla pedido 
y no hubieras necesitado hacer cálculos */
SELECT NPEDIDO, SUM(UNIDADES * PRECIO * (1 - DTO)) AS SUMA_IMPORTES
FROM LPEDIDO
GROUP BY NPEDIDO
HAVING SUM(UNIDADES * PRECIO * (1 - DTO)) > (
    SELECT AVG(UNIDADES * PRECIO * (1 - DTO))
    FROM LPEDIDO
);

-- 16. Artículos pedidos con el descuento más alto
SELECT REFERENCIA, DESCRIPCION
FROM ARTICULO
WHERE REFERENCIA IN (
    SELECT REFERENCIA
    FROM LPEDIDO
    WHERE DTO = (
        SELECT MAX(DTO)
        FROM LPEDIDO
    )
);

-- 17. Pedidos cuya media de unidades es igual o mayor a las unidades disponibles mínimas de artículos con dto de venta
SELECT NPEDIDO, AVG(UNIDADES) AS MEDIA_UND
FROM LPEDIDO
GROUP BY NPEDIDO
HAVING AVG(UNIDADES) >= (
    SELECT MIN(UND_DISPONIBLES)
    FROM ARTICULO
    WHERE DTO_VENTA IS NOT NULL
);

-- 18. Clientes sin devoluciones
/* Comentario del profesor: No hay que usar joins, esta tanda es de subconsultas.

Además, no se pueden enlazar una factura de un envío con otra de una devolución,
no tienen nada que ver. El JOIN sobra por que en la subconsulta con la tabla
devolución ya tienes los nif de los clientes que tienen devoluciones. */
SELECT NIF, NOMBRE, APELLIDOS
FROM CLIENTE
WHERE NIF NOT IN (
    SELECT DISTINCT E.NIF
    FROM DEVOLUCION D
    JOIN ENVIO E ON D.NFACTURA = E.NFACTURA
);

-- 19. Suma de importes de pedidos del 1 al 5 de enero de este año para Rafael González Gómez
/* Comentario del profesor: No hay que usar joins, esta tanda es de subconsultas*/
SELECT SUM(L.UNIDADES * L.PRECIO * (1 - L.DTO)) AS TOTAL
FROM PEDIDO P
JOIN CLIENTE C ON P.NIF = C.NIF
JOIN LPEDIDO L ON P.NPEDIDO = L.NPEDIDO
WHERE P.FECHA BETWEEN TO_DATE('01-01-2025','DD-MM-YYYY') AND TO_DATE('05-01-2025','DD-MM-YYYY')
    AND C.NOMBRE = 'Rafael'
    AND C.APELLIDOS = 'González Gómez';

-- 20. Clientes cuyo importe medio de pedido es superior al importe medio global
SELECT NIF, AVG(TOTAL_PEDIDO) AS MEDIA
FROM PEDIDO
GROUP BY NIF
HAVING AVG(TOTAL_PEDIDO) > (
    SELECT AVG(TOTAL_PEDIDO)
    FROM PEDIDO
);
