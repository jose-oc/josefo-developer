---
title: 'MySQL: backups de bases de datos con vistas'
author: Jose OC
type: post
date: 2014-10-03T02:31:27+00:00
url: /blog/mysql-backups-de-bases-de-datos-con-vistas/
categories:
  - Bases de datos
  - MySQL
tags:
  - mysqldump

---
<p style="text-align: justify">
  Cuando tu base de datos mysql tiene vistas y la exportas verás un bonito error cuando la importas, algo como:
</p>

<pre class="lang:sh decode:true">ERROR 1227 (42000) at line 7562: Access denied; you need (at least one of) the SUPER privilege(s) for this operation</pre>

<p style="text-align: justify">
   Esto ocurre cuando el propietario de la base de datos de la que se ha hecho el backup es distinto al propietario de la base de datos donde se importa dicho backup, o mejor dicho, el propietario de la vista. Por tanto si usas el mismo usuario no te encontrarás con este problema.
</p>

<p style="text-align: justify">
  De esto te puedes dar cuenta si revisas el script sql que ha generado el comando mysqldump, si buscas la vista verás que cuando la crea se especifica el propietario de la misma:
</p>

<pre class="lang:mysql decode:true " title="Ejemplo de definición de vista con el usuario que la define">/*!50013 DEFINER=`user_db`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `mi_vista` AS 
select `r`.`ID` AS `ID`,
17 AS `valor`,
NULL AS `exporter` from 
...</pre>

&nbsp;

<p style="text-align: justify">
  Por lo que he visto no se puede evitar esto con el comando mysqldump así que una solución es, tras crear el sql del dump, parsearlo y usando una expresión regular modificarlo.
</p>

<pre class="lang:sh decode:true" title="Script to create a mysql backup">#!/bin/bash

FILE=/home/jose/backups/bd_name-`date +%Y%m%d_%H%M%S`.sql.gz

mysqldump --password=xxxxx --user=db_user --ignore-table=squema.table1 --ignore-table=squema.table2 db_name | sed -r 's/DEFINER=`[^`]+`@`[^`]+`/DEFINER=CURRENT_USER/g' | gzip &gt; $FILE

echo "Backup finished: $FILE"</pre>

<p style="text-align: justify">
  El comando sed busca el usuario que define la vista y lo modifica por CURRENT_USER.
</p>