---
title: Modificación masiva de datos en PostgreSQL
author: Jose OC
type: post
date: 2015-01-28T21:39:20+00:00
url: /blog/modificacion-masiva-de-datos-en-postgresql/
categories:
  - Bases de datos
  - PostgreSQL
tags:
  - Common Table Expressions
  - CTE
  - postgresql

---
Una de las tareas que de vez en cuando me toca hacer es una modificación masiva de datos sobre un PostgreSQL 9.1. El cliente me envía un excel con miles de datos a modificar para que de un día para otro se encuentre su aplicación con la nueva información. Explico aquí cómo realizo este proceso.

&nbsp;

En primer lugar transformo el excel que me envían a un CSV en UTF-8 separado por punto y coma.

Como soy bastante precavido no hago un backup de las tablas a modificar sino dos, uno en un archivo en disco en formato csv que puedo analizar con rapidez y otro en otra tabla en la misma base de datos por si en algún momento tengo que hacer consultas sobre ella o usarla para copiar datos a una de las tablas de producción. Las tablas que guardo como backup las meto en un esquema nuevo para tenerlas separadas:

<pre class="lang:pgsql decode:true" title="Backups de las tablas">DROP SCHEMA temporal;
CREATE SCHEMA temporal
  AUTHORIZATION prod_dbuser;
COMMENT ON SCHEMA temporal
  IS 'Tablas temporales que se pueden borrar en cualquier momento. Útil para backups.';

-- Table for store data from price
CREATE TABLE temporal.price_bak_20150129 AS TABLE Price;

-- Export data from table to CSV file
\COPY Price To '/tmp/Backup_PRICE_150129.csv' With CSV HEADER;

</pre>

Después copio el CSV al directorio /tmp y creo una tabla en el esquema temporal donde cargar la información que el cliente me ha enviado:

<pre class="lang:pgsql decode:true " title="Load data from CSV">DROP TABLE IF EXISTS temporal.tmp_price_csv;
CREATE TABLE temporal.tmp_price_csv (
cod_prod text, 
prod_id integer, 
cat_id integer, 
price numeric(12,2)
);

\COPY temporal.tmp_price_csv (cod_prod, price) FROM '/tmp/Client_20150129.csv' (DELIMITER ';', HEADER TRUE, FORMAT CSV);</pre>

Si hiciera falta, podríamos trabajar la tabla tmp\_price\_csv para tener la información que necesitamos. En mi caso, por ejemplo, necesito casar el código que el cliente conoce de cada producto con su clave primaria.

<pre class="lang:pgsql decode:true ">update temporal.tmp_price_csv t set prod_id = p.id from product p where p.code = t.cod_prod;</pre>

Ahora, antes de hacer ninguna modificación en la base de datos, comprobamos si todos los datos son correctos. En este caso me aseguro de que todas las filas tengan la clave primaria que la sentencia anterior ha actualizado. Además de esto se pueden realizar distintas comprobaciones en función de los datos que vayamos a cargar y las restricciones que éstos tengan.

<pre class="lang:pgsql decode:true">select t.* from temporal.tmp_price_csv t left outer join product p on p.id = t.prod_id where t.prod_id is null;</pre>

El siguiente es otro backup, sí en serio, ya he dicho que soy bastante precavido. En este caso quiero guardar en una tabla en el esquema temporal las filas que voy a eliminar antes de cargar la nueva información.

<pre class="lang:pgsql decode:true">CREATE TABLE temporal.deleted_prices AS select * from price limit 0;
ALTER TABLE temporal.deleted_prices ADD COLUMN created TIMESTAMP DEFAULT NOW();

WITH repe as (
    delete from price p using temporal.tmp_price_csv t where p.product_id = t.prod_id  
    RETURNING p.*
)
insert into temporal.deleted_prices (select * from repe);</pre>

He usado una funcionalidad que ofrece PostgreSQL que me encanta, las **<span style="text-decoration: underline">Common Table Expressions (CTE)</span>**. Se trata del bloque que comienza con WITH, fíjate que dentro del WITH elimino las filas de la tabla y las filas que se eliminan se devuelven en formato de tabla (que he llamado &#8216;repe') y que puedo usar después. Una maravilla cómo las CTE facilitan el trabajo.

Ya estamos terminando, ya hemos eliminado la información que estaba obsoleta para insertar la nueva, pero antes compruebo si el paso anterior se hizo correctamente chequeando si se han eliminado todas las filas que tenía en la tabla tmp.

<pre class="lang:pgsql decode:true">select count(*) from Price p inner join temporal.tmp_price_csv t on p.product_id = t.prod_id;

select (select count(*) from temporal.deleted_prices) n_deleted, (select count(*) from temporal.tmp_price_csv) n_csv;
</pre>

Por último inserto la información nueva:

<pre class="lang:pgsql decode:true">insert into price (id, price, prod_id) 
    select nextval('seq_id_price'), price, product_id from temporal.tmp_price_csv where prod_id is not null;
</pre>

Para terminar podríamos eliminar las tablas que hemos creado en el esquema temporal&#8230; o esperar unos días no vaya a ser que el cliente se haya equivocado o arrepentido de algún cambio, que más vale prevenir.