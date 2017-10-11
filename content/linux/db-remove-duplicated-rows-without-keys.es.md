---
title: Eliminar filas duplicadas sin keys
author: Jose OC
type: post
date: 2016-02-26T23:41:20+00:00
url: /blog/eliminar-filas-duplicadas-sin-keys/
categories:
  - Bases de datos
  - PostgreSQL
tags:
  - relational-database

---
<p style="text-align: justify">
  Supongamos que en una base de datos relacional (para este ejemplo uso Postgresql 9.3) tenemos una tabla sin ninguna clave primaria ni índice de modo que podemos tener filas duplicadas lo que nos molesta terriblemente.
</p>

<p style="text-align: justify">
  Queremos eliminar todas estas duplicidades y para ello podemos echar mano de las CTE (<a href="http://www.postgresql.org/docs/current/static/queries-with.html" target="_blank">Common Table Expressions</a>).
</p>

<p style="text-align: justify">
  En primer lugar eliminamos las filas duplicadas, <strong>todas</strong>, pero recogemos los datos eliminados y los volvemos a insertar en la tabla agrupándolos para evitar duplicidades. Aquí el ejemplo:
</p>

<pre class="lang:pgsql decode:true " title="Remove duplicate rows">-- Create a table without keys and duplicated rows

CREATE TABLE items (code text, name text);
INSERT INTO items (code, name) VALUES 
('A-001', 'Item 001'), 
('A-002', 'Item 002'), 
('A-002', 'Item 002'), 
('A-003', 'Item 003'), 
('A-003', 'Item 003'), 
('A-003', 'Item 003');

-- Remove duplicated rows by deleting them all and then inserting them without duplications

WITH duplicatedrows as (
  delete from items o where exists (select 1 from items i where o.code = i.code and o.name = i.name group by i.code, i.name)
  RETURNING o.*
)
insert into items (code, name) (select code, name from duplicatedrows group by code, name);

-- Result:

SELECT * FROM items;
 code  |   name   
-------+----------
 A-003 | Item 003
 A-001 | Item 001
 A-002 | Item 002
(3 rows)</pre>

&nbsp;