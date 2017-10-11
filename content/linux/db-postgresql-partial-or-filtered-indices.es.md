---
title: Índices parciales o filtrados
author: Jose OC
type: post
date: 2014-10-06T10:09:04+00:00
url: /blog/indices-parciales-o-filtrados/
categories:
  - Bases de datos
  - PostgreSQL
tags:
  - partial index
  - postgresql

---
<p style="text-align: justify">
  Gran invento éste de los índices parciales o filtrados.
</p>

<p style="text-align: justify">
  Cuando creas un índice sobre una tabla estás indexando todos los registros que tiene la tabla, que pueden ser muchísimos, pero hay casos en los que no es necesario indexarlos todos. ¿Por qué? Imagina que quieres obtener algo tan simple como los mensajes sin leer de un usuario, o algo tan común en una aplicación de gestión como marcar si un producto ha sido procesado o tiene un estado determinado. Un producto puede haber sido procesado si se ha vendido, si se ha enviado, si se ha reparado, etc.
</p>

<p style="text-align: justify">
  Siendo así seguro que en la consulta SQL tienes algo parecido a esto:
</p>

<pre class="lang:pgsql mark:3 decode:true ">select id, nombre, estado  
from producto 
where estado = 1 
and ...</pre>

<p style="text-align: justify">
   Los productos se irán dando de alta con estado = 1 y conforme se trabaje con ellos irán cambiando su estado. Esto significa que la tabla puede crecer enormemente pero seguramente, por muy grande que se haga la tabla, el porcentaje o el total de registros que tengan estado 1 no crecerá de la misma forma.
</p>

<p style="text-align: justify">
  Un índice sobre una tabla crece conforme crece la tabla, pero en casos como éste no necesitaríamos que el índice fuera tan grande ya que los registros que no tengan estado 1 no queremos tenerlos en cuenta ya que no los necesitamos (al menos en esta parte de la aplicación).
</p>

<p style="text-align: justify">
  Pues bien, existe la opción de crear un índice que no trabaje sobre toda la tabla, es decir, le podemos poner un where al índice. Esto es fabuloso porque tendremos los registros que nos interesan indexados, el índice no crecerá y por tanto su uso rápido.
</p>

<p style="text-align: justify">
  Este tipo de índice se llama partial index en Postgresql y filtered index en SQL Server. Mysql no tiene esta característica.
</p>

<p style="text-align: justify">
  La sintaxis para crearlos es muy sencilla:
</p>

<pre class="lang:pgsql mark:3 decode:true ">CREATE INDEX productos_nuevos 
ON productos (... los campos que necesite ...) 
WHERE estado = 1;</pre>

&nbsp;