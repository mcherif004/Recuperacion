-- 1. Listar el nif de cliente, nombre, apellidos, número de pedido, total pedido de los pedidos de la primera semana de enero.
SELECT
    c.nif,
    c.nombre,
    c.apellidos,
    p.npedido,
    p.total_pedido
FROM CLIENTE c
JOIN PEDIDO p
    ON c.nif = p.nif
WHERE
    p.fecha BETWEEN DATE '2025-01-01' AND DATE '2025-01-07';

-- 2. Listar el nif de cliente, email, dirección, código postal, población de los clientes de la provincia de Córdoba.
SELECT
    c.nif,
    c.email,
    d.direccion,
    d.cp,
    d.poblacion
FROM CLIENTE c
JOIN DIRECCION_ENVIO d
    ON c.nif = d.nif
WHERE
    d.provincia = 'Córdoba';

-- 3. Listar el nif de proveedor, razón social, contacto, referencia de artículo, precio de coste y descuento de compra de los artículos cuyas unidades disponibles son inferiores a las unidades compradas y se han comprado más de 100 unidades.
--! ?
SELECT
    pr.nif AS nif_proveedor,
    pr.razon_social,
    pr.contacto,
    ap.referencia,
    ap.precio_coste,
    ap.dto_compra
FROM PROVEEDOR pr
JOIN ARTICULO_PROVEEDOR ap
    ON pr.nif = ap.nif
WHERE
    ap.und_disponibles < ap.und_compradas
    AND ap.und_compradas > 100;

-- 4. Listar el número de envío, fecha, forma de envío, descripción de la forma de envío y coste de los envíos a clientes de la provincia de Málaga.
/* Comentario del profesor:
En el JOIN con dirección de envío te falta and e.nif = d.nif */
SELECT
    e.nenvio,
    e.fecha,
    fe.id_fe,
    fe.descripcion,
    fe.coste
FROM ENVIO e
JOIN FORMA_ENVIO fe
    ON e.forma_envio = fe.id_fe
JOIN DIRECCION_ENVIO d
    ON e.id_dir_env   = d.id_dir_env
WHERE
    d.provincia = 'Málaga';

-- 5. Listar el nif de cliente, nombre, apellidos, número de pedido, número de línea, referencia, descripción de artículo y unidades de las líneas de pedido que tienen descuento.
SELECT
    c.nif,
    c.nombre,
    c.apellidos,
    p.npedido,
    lp.nlinea,
    a.referencia,
    a.descripcion,
    lp.unidades
FROM CLIENTE c
JOIN PEDIDO p
    ON c.nif = p.nif
JOIN LPEDIDO lp
    ON p.npedido    = lp.npedido
JOIN ARTICULO a
    ON lp.referencia = a.referencia
WHERE
    lp.dto > 0;

-- 6. Listar el número de envío, fecha, dirección de envío, localidad, provincia, de los envíos del cliente con nombre completo Teófilo Torre Toledo.
--! No existe ?
/* Comentario del profesor: Igual que antes en el JOIN con dirección_envio */
SELECT
    e.nenvio,
    e.fecha,
    d.direccion,
    d.poblacion,
    d.provincia
FROM ENVIO e
JOIN DIRECCION_ENVIO d
    ON e.id_dir_env = d.id_dir_env
JOIN CLIENTE c
    ON e.nif = c.nif
WHERE
    c.nombre = 'Teófilo'
    AND c.apellidos = 'Torre Toledo';

-- 7. Listar el número de devolución, fecha, referencia de artículo, descripción de artículo de los artículos devueltos por completo.
--! ORA-00904: "LE"."REFERENCIA": invalid identifier https://docs.oracle.com/error-help/db/ora-00904/ The identifier or column name entered was invalid Error at Line: 13 Column: 18
/* Comentario del profesor: No existe lenvio.referencia, está en lpedido

SELECT
    dv.ndevolucion,
    dv.fecha,
    a.referencia,
    a.descripcion
FROM DEVOLUCION dv
JOIN DEVOLUCION_LENVIO dl
    ON dv.ndevolucion = dl.ndevolucion
JOIN LENVIO le
    ON dl.nenvio = le.nenvio
    AND dl.npedido = le.npedido
    AND dl.nlinea = le.nlinea
JOIN LPEDIDO lp
    ON le.lpedido = lp.lpedido
    AND le.nlinea = lp.nlinea
JOIN ARTICULO a
    ON lp.referencia = a.referencia
WHERE
    dl.unidades = le.unidades;

*/

SELECT
    dv.ndevolucion,
    dv.fecha,
    a.referencia,
    a.descripcion
FROM DEVOLUCION dv
JOIN DEVOLUCION_LENVIO dl
    ON dv.ndevolucion = dl.ndevolucion
JOIN LENVIO le
    ON dl.nenvio = le.nenvio
    AND dl.nlinea = le.nlinea
JOIN ARTICULO a
    ON le.referencia = a.referencia
WHERE
    dl.unidades = le.unidades;


-- 8. Listar la referencia de artículo, descripción, número de envio, número de pedido, número de línea, unidades, y descuento de los artículos vendidos cuyas unidades enviadas sean inferiores a las unidades pedidas. El listado incluirá aquellos artículos que se han pedido pero no se han enviado todavía.
SELECT
    a.referencia,
    a.descripcion,
    lv.nenvio,
    lp.npedido,
    lp.nlinea,
    lp.unidades,
    lp.dto
FROM ARTICULO a
JOIN LPEDIDO lp
    ON a.referencia = lp.referencia
LEFT JOIN LENVIO lv
    ON lp.npedido = lv.npedido
    AND lp.nlinea  = lv.nlinea
WHERE
    lv.unidades IS NULL
    OR lv.unidades < lp.unidades;

-- 9. Listar el número de devolución, fecha, nif de cliente, forma de envío de las devoluciones cuyos gastos de envío supera los 3€.
--! ORA-01722: invalid number https://docs.oracle.com/error-help/db/ora-01722/ The attempted conversion of a character string for column or expression to a number failed because the character string is not a valid numeric literal. Only numeric fields or character fields containing numeric data can be used in arithmetic functions or expressions. Only numeric fields can be added to or subtracted from dates. If "UNISTR" appears in the error message, the value is not compatible with the national character set and cannot be represented directly Error at Line: 14 Column: 
/* Comentario del profesor:

select ndevolucion, fecha, nif, id_fe
from devolucion inner join forma_envio on id_fe = forma_envio
where coste > 3;

Esta sentencia está mal, mal hecha por la IA. A mi también me dio la misma sentencia. 
*/

SELECT
    dv.ndevolucion,
    dv.fecha,
    c.nif,
    fe.descripcion AS forma_envio
FROM DEVOLUCION dv
JOIN FORMA_ENVIO fe
    ON dv.forma_envio = fe.id_fe
JOIN FACTURA f
    ON dv.nfactura = f.nfactura
JOIN CLIENTE c
    ON f.nfactura = c.nif
WHERE
    fe.coste > 3.0;

-- 10. Listar el nif de cliente, nombre, apellidos y suma de los totales de pedido por cliente cuando este supera los 100€.
SELECT
    c.nif,
    c.nombre,
    c.apellidos,
    SUM(p.total_pedido) AS total_gastado
FROM CLIENTE c
JOIN PEDIDO p
    ON c.nif = p.nif
GROUP BY
    c.nif,
    c.nombre,
    c.apellidos
HAVING
    SUM(p.total_pedido) > 100;

-- 11. Listar el número de factura, fecha de factura y número de envio de todas las facturas, incluso las que no son de envíos, cuya fecha sea del mes de enero del presente año.
SELECT
    f.nfactura,
    f.fecha,
    e.nenvio
FROM FACTURA f
LEFT JOIN ENVIO e
    ON f.nfactura = e.nfactura
WHERE
    EXTRACT(MONTH FROM f.fecha) = 1
    AND EXTRACT(YEAR  FROM f.fecha) = EXTRACT(YEAR FROM CURRENT_DATE);

-- 12. Listar la referencia de artículo, descripción, suma de unidades pedidas de los artículos cuyas unidades de línea de pedido son inferiores a todas las existencias de los artículos de la misma categoría.
SELECT
    a.referencia,
    a.descripcion,
    SUM(lp.unidades) AS total_pedido
FROM ARTICULO a
JOIN LPEDIDO lp
    ON a.referencia = lp.referencia
WHERE
    lp.unidades < ALL (
        SELECT ap.und_disponibles
        FROM ARTICULO_PROVEEDOR ap
        WHERE ap.referencia = a.categoria
    )
GROUP BY
    a.referencia,
    a.descripcion;

-- 13. Listar el nif de cliente, nombre, apellidos, referencia de artículo, fecha y clasificación de las reseñas que tienen comentario y su clasificación es superior a la media de todas las clasificaciones del mismo cliente.
SELECT
    c.nif,
    c.nombre,
    c.apellidos,
    r.referencia,
    r.fecha,
    r.clasificacion
FROM CLIENTE c
JOIN RESEÑA r
    ON c.nif = r.nif
WHERE
    r.comentario IS NOT NULL
    AND r.clasificacion > (
        SELECT AVG(r2.clasificacion)
        FROM RESEÑA r2
        WHERE r2.nif = c.nif
    );

-- 14. Listar el número de pedido, número de línea de pedido, número de envío, unidades de pedido, unidades de envío, diferencia entre unidades de pedido y de envío de todas las líneas de pedido que aún tienen unidades pendientes de enviar.
SELECT
    lp.npedido,
    lp.nlinea,
    lv.nenvio,
    lp.unidades       AS unidades_pedido,
    lv.unidades       AS unidades_envio,
    lp.unidades - lv.unidades AS pendientes
FROM LPEDIDO lp
LEFT JOIN LENVIO lv
    ON lp.npedido = lv.npedido
    AND lp.nlinea  = lv.nlinea
WHERE
    lv.unidades IS NULL OR lp.unidades > lv.unidades;


-- 15. Listar la referencia de artículo, descripción de artículo, categoría, descripción de categoria de los artículos cuyas existencias son inferiores a la suma de las unidades de línea de pedido del mismo artículo, incluso si el artículo no tiene categoría.
SELECT
    a.referencia,
    a.descripcion,
    a.categoria,
    c.descripcion AS desc_categoria
FROM ARTICULO a
LEFT JOIN CATEGORIA c
    ON a.categoria = c.id_categoria
WHERE
    a.und_disponibles < (
        SELECT SUM(lp.unidades)
        FROM LPEDIDO lp
        WHERE lp.referencia = a.referencia
    );

