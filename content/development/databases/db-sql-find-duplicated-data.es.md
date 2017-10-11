---
title: Consulta para encontrar datos repetidos en una tabla
author: Jose OC
type: post
date: 2014-10-24T15:04:22+00:00
url: /blog/consulta-para-encontrar-datos-repetidos-en-una-tabla/
categories:
  - Bases de datos
  - MySQL

---
<p style="text-align: justify">
  Hace poco tuve que hacer un poco de limpieza entre los datos de una tabla en una base de datos MySQL.
</p>

<p style="text-align: justify">
  La estructura de la tabla era la siguiente:
</p>

<pre class="lang:mysql decode:true">CREATE TABLE `categorias` (
  `ID` int(10) NOT NULL AUTO_INCREMENT,
  `IDProducto` int(10) NOT NULL,
  `categoria1` char(50) DEFAULT NULL,
  `categoria2` char(10) DEFAULT NULL,
  `nombre` char(150) DEFAULT NULL,
  `orden` int(11) DEFAULT NULL,
  `activo` tinyint(1) DEFAULT '1',
  `descripcion` text,
  `fecha` date DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `indiceCategorias1` (`IDProducto`),
  KEY `idx_cat_producto_activo_fecha` (`IDProducto`,`activo`,`fecha`)
) ENGINE=MyISAM AUTO_INCREMENT=94419 DEFAULT CHARSET=latin1</pre>

&nbsp;

<p style="text-align: justify">
  Para localizar las filas repetidas ejecuté una consulta como ésta:
</p>

<pre class="lang:mysql decode:true">select count(*) numRepeticiones, IDProducto, categoria1, categoria2, fecha, activo, 
MIN(ID) IDMantener, 
SUBSTRING( GROUP_CONCAT( ID order by ID ), LOCATE(',', GROUP_CONCAT( ID order by ID ))+1 ) IDsEliminar 
from categorias 
where IDProducto &gt;= 3000000 and IDProducto &lt; 4000000 
group by IDProducto, categoria1, categoria2, fecha, activo, nombre, descripcion 
having count(*) &gt; 1 
order by IDProducto, ID, fecha desc;</pre>

<p style="text-align: justify">
  La clave de esta consulta SQL para conseguir los datos que están repetidos es saber qué campos son los que indican que la información está repetida y agrupar por dichos campos, indicando además que debe haber más de una fila en cada uno de estos grupos. Esto se hace con estas instrucciones:
</p>

<pre class="lang:mysql decode:true ">group by IDProducto, categoria1, categoria2, fecha, activo, nombre, descripcion 
having count(*) &gt; 1</pre>

<p style="text-align: justify">
  Además, me interesaba sacar <strong>en una columna el id que iba a conservar</strong> y en otra los <strong>id de las filas repetidas</strong> que tenía que <strong>eliminar</strong>.
</p>

<p style="text-align: justify">
  Decidí <strong>mantener</strong> la fila más antigua siguiendo la lógica de que posiblemente fuera la más usada, para ello usé la función <span class="lang:default decode:true  crayon-inline ">MIN()</span>  ya que este campo es autoincremental.
</p>

<p style="text-align: justify">
  <strong>Para sacar los id de las filas repetidas</strong> hize lo siguiente. Ya que usé un group by necesitaba una función que me devolviera todos los id de las filas que formaban parte de cada grupo, para ello nada mejor que la función GROUP_CONCAT() que concatena los valores del campo que le indiques y te devuelve un string con todos los valores separados por comas (por defecto).
</p>

<pre class="lang:mysql decode:true">GROUP_CONCAT( ID )</pre>

<p style="text-align: justify">
  Pero claro, aquí está incluido el MIN(ID) que tengo en la columna anterior y no me interesa tenerlo porque mi intención es eliminar las filas de estos ID así que tengo que sacarlo de aquí. Como el resultado de esta columna es un string con valores separados por comas y como mínimo voy a tener dos valores separados por una coma, puedo parsear dicho string y quedarme con un substring del mismo quitando, por ejemplo, el primer elemento. Eso lo puedo hacer con la función SUBSTRING():
</p>

<pre class="lang:mysql decode:true ">SUBSTRING( GROUP_CONCAT( ID ), posicion_de_la_coma + 1 )</pre>

<p style="text-align: justify">
  Y necesito saber la posición de la coma para indicárselo a la función SUBSTRING, concretamente le tengo que indicar la siguiente posición a la coma, ya que la primera coma no me interesa. Puedo usar la función LOCATE() que nos dice la primera posición donde aparece el caracter que le indique.
</p>

<pre class="lang:mysql decode:true">LOCATE(',', GROUP_CONCAT( ID )) + 1</pre>

<p style="text-align: justify">
  Pero ojo, vamos a quitar el primer elemento y me tengo que asegurar de que el que quito es el que tengo en la columna IDMantener, que es el más pequeño, así que tendremos que ordenar los elementos dentro del GROUP_CONCAT.
</p>

<p style="text-align: justify">
  Finalmente tenemos la definición de la columna:
</p>

<pre class="lang:mysql decode:true">SUBSTRING( GROUP_CONCAT( ID order by ID ), LOCATE(',', GROUP_CONCAT( ID order by ID ))+1 ) IDsEliminar</pre>

El orden dado a la consulta es simplemente para ver de una forma más clara los datos.

<p style="text-align: justify">
  De estar forma al ejecutar la consulta obtengo algo así:
</p>

<pre class="lang:mysql highlight:0 decode:true ">+-----------------+------------+------------------+------------+------------+--------+------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| numRepeticiones | IDProducto | categoria1       | categoria2 | fecha      | activo | IDMantener | IDsEliminar                                                                                                                                                                                                                                                                                                |
+-----------------+------------+------------------+------------+------------+--------+------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|              39 |   10000298 | YEL              |            | 2010-01-01 |      0 |        343 | 379,427,448,453,454,576,595,601,658,659,683,757,782,889,908,909,1045,1046,1047,1048,1074,1109,1110,1179,1275,1307,1329,1432,1487,1545,1546,1579,1629,1646,1650,1657,1745,1802                                                                                                                              |
|              23 |   10000306 | SET              |            | 2010-01-01 |      0 |        311 | 432,455,854,892,935,969,1027,1049,1164,1240,1294,1346,1373,1399,1446,1465,1557,1566,1664,1689,1718,1766                                                                                                                                                                                                    |
|              23 |   10000306 | Gra              |            | 2010-01-01 |      0 |        312 | 433,456,855,893,936,970,1028,1050,1165,1241,1295,1347,1374,1400,1447,1466,1558,1567,1665,1690,1719,1767                                                                                                                                                                                                    |
|              23 |   10000306 | YEL              |            | 2010-01-01 |      0 |        313 | 434,457,856,894,937,971,1029,1051,1166,1242,1296,1348,1375,1401,1448,1467,1559,1568,1666,1691,1720,1768                                                                                                                                                                                                    |
|              51 |   10000306 | ter              |            | 2010-01-01 |      0 |        314 | 316,435,437,458,481,483,616,618,636,638,857,859,895,897,938,940,972,974,1030,1032,1052,1054,1167,1169,1243,1245,1297,1299,1349,1351,1376,1378,1402,1404,1449,1451,1468,1470,1547,1549,1569,1571,1667,1669,1692,1694,1721,1723,1769,1771                                                                    |
|              26 |   10000306 | Vis              |            | 2010-01-01 |      0 |        315 | 436,459,482,617,637,858,896,939,973,1031,1053,1168,1244,1298,1350,1377,1403,1450,1469,1548,1570,1668,1693,1722,1770                                                                                                                                                                                        |
|              26 |   10000306 | CAR              |            | 2010-01-01 |      0 |        317 | 438,460,484,619,639,860,898,941,975,1033,1055,1170,1246,1300,1352,1379,1405,1452,1471,1550,1572,1670,1695,1724,1772                                                                                                                                                                                        |
|              26 |   10000306 | Mid              |            | 2010-01-01 |      0 |        318 | 439,461,485,620,640,861,899,942,976,1034,1056,1171,1247,1301,1353,1380,1406,1453,1472,1551,1573,1671,1696,1725,1773                                                                                                                                                                                        |
|              23 |   10000306 | MED              |            | 2010-01-01 |      0 |        319 | 440,486,862,900,943,977,1035,1057,1172,1248,1302,1354,1381,1407,1454,1473,1552,1574,1672,1697,1726,1774                                                                                                                                                                                                    |
|              23 |   10000306 | GET              |            | 2010-01-01 |      0 |        320 | 441,487,863,901,944,978,1036,1058,1173,1249,1303,1355,1382,1408,1455,1474,1553,1575,1673,1698,1727,1775                                                                                                                                                                                                    |
|              23 |   10000306 | SET              |            | 2010-01-01 |      0 |        321 | 442,488,864,902,945,979,1037,1059,1174,1250,1304,1356,1383,1409,1456,1475,1554,1576,1674,1699,1728,1776                                                                                                                                                                                                    |
|              23 |   10000306 | Gra              |            | 2010-01-01 |      0 |        322 | 443,489,865,903,946,980,1038,1060,1175,1251,1305,1357,1384,1410,1457,1476,1555,1577,1675,1700,1729,1777                                                                                                                                                                                                    |
|              23 |   10000306 | YEL              |            | 2010-01-01 |      0 |        323 | 444,490,866,904,947,981,1039,1061,1176,1252,1306,1358,1385,1411,1458,1477,1556,1578,1676,1701,1730,1778                                                                                                                                                                                                    |
|               3 |   10000306 | MED              | Y          | 2010-01-01 |      0 |        462 | 621,641                                                                                                                                                                                                                                                                                                    |
|               3 |   10000306 | GET              | Y          | 2010-01-01 |      0 |        463 | 622,642                                                                                                                                                                                                                                                                                                    |
|               3 |   10000306 | SET              | Y          | 2010-01-01 |      0 |        464 | 623,643                                                                                                                                                                                                                                                                                                    |
|               3 |   10000306 | Gra              | Y          | 2010-01-01 |      0 |        465 | 624,644                                                                                                                                                                                                                                                                                                    |
|               3 |   10000306 | YEL              | X          | 2010-01-01 |      0 |        466 | 625,645                                                                                                                                                                                                                                                                                                    |
|               3 |   10000306 | SET              | X          | 2010-01-01 |      0 |        478 | 613,633                                                                                                                                                                                                                                                                                                    |
|               3 |   10000306 | Gra              | X          | 2010-01-01 |      0 |        479 | 614,634                                                                                                                                                                                                                                                                                                    |
|               3 |   10000306 | YEL              | X          | 2010-01-01 |      0 |        480 | 615,635                                                                                                                                                                                                                                                                                                    |
|              27 |   10000356 | CLI              |            | 2010-01-01 |      1 |        248 | 385,416,451,577,668,712,763,775,818,819,888,921,1026,1079,1119,1142,1157,1328,1412,1459,1484,1539,1560,1660,1686,1785                                                                                                                                                                                      |
|              58 |   10000361 | YCD              |            | 2010-01-01 |      0 |        417 | 418,419,429,430,431,491,492,493,652,653,654,882,883,884,918,919,920,1020,1021,1022,1023,1024,1025,1116,1117,1118,1236,1237,1238,1239,1319,1320,1321,1460,1461,1462,1540,1541,1542,1563,1564,1565,1610,1611,1612,1643,1644,1645,1683,1684,1685,1782,1783,1784,1804,1805,1806                                |
|              68 |   10000362 | YCD              |            | 2010-01-01 |      0 |        372 | 373,374,423,424,425,494,495,496,538,539,540,541,578,579,580,626,627,628,665,666,667,849,850,851,885,886,887,915,916,917,950,951,952,953,954,955,1040,1041,1042,1158,1159,1160,1216,1217,1218,1219,1233,1234,1235,1322,1323,1324,1613,1614,1615,1677,1678,1679,1680,1681,1682,1779,1780,1781,1807,1808,1809 |
|               3 |   10000527 | Adv              |            | 2010-01-01 |      0 |        796 | 807,1749                                                                                                                                                                                                                                                                                                   |
|               3 |   10000527 | REM              |            | 2010-01-01 |      0 |        797 | 808,1750                                                                                                                                                                                                                                                                                                   |
|               3 |   10000527 | IDE              |            | 2010-01-01 |      0 |        798 | 809,1751                                                                                                                                                                                                                                                                                                   |
|               3 |   10000527 | Vis              |            | 2010-01-01 |      0 |        799 | 810,1752                                                                                                                                                                                                                                                                                                   |
|               3 |   10000527 | CAR              |            | 2010-01-01 |      0 |        800 | 811,1753                                                                                                                                                                                                                                                                                                   |
|               3 |   10000527 | REM              |            | 2010-01-01 |      0 |        801 | 812,1754                                                                                                                                                                                                                                                                                                   |
|               3 |   10000527 | MED              |            | 2010-01-01 |      0 |        802 | 813,1755                                                                                                                                                                                                                                                                                                   |
|               3 |   10000527 | Dis              |            | 2010-01-01 |      0 |        803 | 814,1756                                                                                                                                                                                                                                                                                                   |
|               3 |   10000527 | GET              |            | 2010-01-01 |      0 |        804 | 815,1757                                                                                                                                                                                                                                                                                                   |
|               3 |   10000527 | Gra              |            | 2010-01-01 |      0 |        805 | 816,1758                                                                                                                                                                                                                                                                                                   |
|               3 |   10000527 | YEL              |            | 2010-01-01 |      0 |        806 | 817,1759                                                                                                                                                                                                                                                                                                   |
|              24 |   10000527 | Category F-Class |            | 2010-01-01 |      0 |      70610 | 70647,70649,70651,70653,70663,70665,70667,70669,70671,70673,70675,70677,70679,70681,70683,70685,70969,70971,70984,70986,70988,70990,70992                                                                                                                                                                  |
|              24 |   10000527 | Category S-Class |            | 2010-01-01 |      0 |      70611 | 70648,70650,70652,70654,70664,70666,70668,70670,70672,70674,70676,70678,70680,70682,70684,70686,70970,70972,70985,70987,70989,70991,70993                                                                                                                                                                  |
|               2 |   13000016 | OSX              | X          | 2010-10-22 |      1 |      72881 | 74443                                                                                                                                                                                                                                                                                                      |
|               2 |   13000017 | WEW              | X          | 2010-10-22 |      1 |      74479 | 74487                                                                                                                                                                                                                                                                                                      |
|               2 |   23000015 | S32              | X          | 2012-12-18 |      0 |      74147 | 74153                                                                                                                                                                                                                                                                                                      |
+-----------------+------------+------------------+------------+------------+--------+------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
149 rows in set (0.20 sec)</pre>

Ya tengo un listado con todas las filas repetidas, el ID de la fila que quiero mantener y los ID de las filas que quiero eliminar.

<p style="text-align: justify">
  Pero antes de eliminarlas tengo que saber si estos ID que voy a eliminar aparecen en alguna otra tabla haciendo referencia. En este caso la tabla no tiene claves foráneas pero sé cómo se llaman las columnas en caso de existir en otras tablas, así que busco estas columnas:
</p>

<pre class="lang:mysql decode:true">SELECT DISTINCT TABLE_NAME  
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE COLUMN_NAME = 'IDCategoria' AND TABLE_SCHEMA='BDPruebas';</pre>

Ahora ya puedo realizar la tarea de actualizar los registros de las tablas que hacen referencia a estos valores estableciendo el valor IDMantener y una vez que estén todos cambiados, podré borrar los registros de la tabla categorias.

<p style="text-align: justify">
  Para realizar todo el trabajo de actualizar los id de las claves foráneas y eliminar las filas repetidas barajé las opciones de crear un procedimiento almacenado y con un cursor recorrer esta consulta e ir haciendo los update y delete oportunos o bien hacerlo mediante script en un lenguaje de programación. Opté por la segunda opción porque según leí en varias comparativas un procedimiento almacenado en mysql tiene peor rendimiento que ejecutar un script de programación. Además sería un procedimiento almacenado que se utilizaría en muy raras ocasiones ya que en este caso se usó porque por un fallo de un logaritmo se introdujo mucha &#8220;información basura&#8221; en la tabla.
</p>