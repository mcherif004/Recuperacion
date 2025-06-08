-- 1. Listar el nif, apellidos, nombre, iban y email de los clientes cuyo email pertenece al dominio hotmail.com.

SELECT NIF, APELLIDOS, NOMBRE, IBAN, EMAIL 
FROM CLIENTE
WHERE EMAIL LIKE '%jotmail.com%'; --! No hay seria jotmail

-- 2. Listar el nif, razón social y persona de contacto de los proveedores que no son de España.

SELECT NIF, RAZON_SOCIAL, CONTACTO
FROM PROVEEDOR
WHERE NOT PAIS = 'España';

-- 3. Listar el identificador y descripción de las formas de envío cuyo coste está entre 3 y 5 €.

SELECT ID_FE, DESCRIPCION
FROM FORMA_ENVIO
WHERE COSTE BETWEEN 3 AND 5;

-- 4. Listar el nif, dirección, cp y población de las direcciones de envío de las provincias de Córdoba, Sevilla y Málaga. 

SELECT NIF, DIRECCION CP, POBLACION
FROM DIRECCION_ENVIO
WHERE PROVINCIA IN ('Córdoba', 'Sevilla', 'Málaga');

-- 5. Listar las categorias de primer nivel.

--! Falta entender

-- 6. Listar la referencia de artículo, descripción, unidades disponibles, unidades vendidas y la diferencia entre los dos últimos de los artículos con unidades disponibles entre 5 y 10.

SELECT REFERENCIA, DESCRIPCION, UND_DISPONIBLES, UND_VENDIDAS, (UND_DISPONIBLES - UND_VENDIDAS) AS DIFERENCIA
FROM ARTICULO
WHERE UND_DISPONIBLES BETWEEN 5 AND 10;

-- 7. Listar la referencia de articulo, nif de proveedor, precio de coste y descuento de los artículos de proveedor cuyas unidades compradas están entre las unidades disponibles y el doble de las unidades disponibles. 

SELECT REFERENCIA, DESCRIPCION, NIF_PROVVEEDOR, COSTE, DESCUENTO
FROM PROVEEDOR
WHERE UND_VENDIDAS BETWEEN UND_DISPONIBLES AND UND_DISPONIBLES * 2;

-- 8. Listar el cliente, fecha y total_pedido de los pedidos cuyo total supera los 100€ y se hizo el día 4 de enero del año actual.

SELECT NPEDIDO, NIF, FECHA, TOTAL_PEDIDO
FROM PEDIDO
WHERE TOTAL_PEDIDO NOT BETWEEN 0 AND 100 AND FECHA = DATE '2025-01-04';

-- 9. Listar la referencia de los artículos pedidos que tengan descuento eliminando las filas repetidas.

SELECT DISTINCT REFERENCIA --? valores no repetidos (DISTINCT))
FROM ARTICULO
WHERE DTO IS NOT NULL AND DTO > 0;

-- 10. Listar el número de envío, fecha, cliente y dirección de envío de los envíos del mes de enero del año actual.

SELECT NENVIO, FECHA, NIF, ID_DIR_ENV
FROM ENVIO
WHERE EXTRACT(MONTH FROM FECHA) = 1 AND EXTRACT(YEAR FROM FECHA) = 2025;

-- 11. Listar la referencia, unidades compradas y precio de coste de los artículos cuyas unidades disponibles están entre el 10% y el 50% de las unidades compradas.

SELECT REFERENCIA, UND_COMPRADAS, PRECIO_COSTE
FROM ARTICULO_PROVEEDOR
WHERE UND_DISPONIBLES BETWEEN UND_COMPRADAS * 0.1 AND UND_COMPRADAS *0.5;

-- 12. Listar las devoluciones que tienen observaciones.

SELECT NDEVOLUCION, OBSERVACIONES --! Porque se coje NDEVOLUCION(maybe key?)
FROM DEVOLUCION
WHERE OBSERVACIONES IS NOT NULL;

-- 13. Listar las facturas de devoluciones del mes de Febrero del año actual y cuyo iva normal supera los 100€.

SELECT F. NFACTURA, FECHA, IVA_NORMAL
FROM FACTURA F
JOIN DEVOLUCION D ON F.FACTURA = D.NFACTURA --! Entender
WHERE EXTRACT(MONTH FROM F.FECHA) = 2 AND F.IVA_NORMAL > 100;

-- 14. Listar las reseñas de los clientes cuya clasificación no supera las 2 estrellas y tienen un comentario.

SELECT ID_RESENA, CLASIFICACION, COMENTARIO
FROM RESENA
WHERE CLASIFICACION <= 2;

-- 15.Listar las formas de envío en cuya descripción aparece el término Trans.

SELECT ID_FE, DESCRIPCION
FROM FORMA_ENVIO
WHERE DESCRIPCION LIKE '%Trans%';

-- 16.Listar los artículos de las categorías CONS, PESC y LIMP.

SELECT REFERENCIA, DESCRIPCION
FROM ARTICULO
WHERE CATEGORIA IN ('CONS','PESC','LIMP');

-- 17.Listar los clientes de la provincia de Sevilla que tienen teléfono.
-- 18. Listar el número de pedido, cliente, fecha y total pedido de los pedidos del mes de Enero ordenados descendentemente por total de pedido.
-- 19. Listar la referencia, unidades, precio, descuento y el importe calculado de los artículos pedidos con descuento entre un 10 y un 50% ordenados por referencia ascendente y por importe descendente.
-- 20. Listar la media de las ventas de los clientes cuyo email pertenece al dominiogmail.com.
-- 21. Listar el coste medio, máximo y mínimo de las formas de envío que tienen teléfono y persona de contacto.
-- 22.Listar la categoria y media del precio de venta de los artículos por categoria cuyas unidades vendidas sean mayor que las unidades disponibles y cuya media del precio de venta supere la media del precio de venta de todos los artículos.
-- 23. Listar la referencia de artículo y media del precio de coste por artículo de los artículos cuyo descuento de compra está entre 0 y 50% y la media del precio de coste por artículo sea mayor de 2€.
-- 24. Listar la referencia de artículo, el promedio de las unidades pedidas por artículo y el promedio del descuento por artículo de las líneas de pedido que cuyo precio de venta sea mayor que 5 y el promedio de las unidades pedidas por artículo es superior a la del máximo de las unidades pedidas por artículo.
-- 25.Listar el número de envío, la media de las unidades enviadas por envío de los envíos correspondientes a los pedidos cuyo número está entre 1 y 20.
-- 26.Listar el cliente y el promedio de los totales de pedido por cliente que superen los 200€.
-- 27. Listar el número de facturas que hay en el mes de Enero del presente año.
-- 28. Listar el número de pedido y número de líneas por pedido de los pedidos que tengan más de 4 líneas.
-- 29. Listar el número de devolución y el máximo de las unidades devueltas por devolución 
-- 30. Listar la media de los ivas normales de las facturas del mes de Febrero.