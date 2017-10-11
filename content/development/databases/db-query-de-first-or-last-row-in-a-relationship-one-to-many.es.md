---
title: Consultar la primera o última ocurrencia en una relación uno a muchos
author: Jose OC
type: post
date: 2016-02-03T18:45:20+00:00
url: /blog/consultar-la-primera-o-ultima-ocurrencia-en-una-relacion-uno-a-muchos/
categories:
  - Bases de datos
  - PostgreSQL
tags:
  - sql

---
<p style="text-align: justify">
  Pongamos un ejemplo.
</p>

<p style="text-align: justify">
  Tenemos autores de libros y los libros que han escrito y queremos saber cuál es el último libro escrito de cada uno de los autores. Casos similares sería: consultar la última compra de cada cliente, o la última venta de cada vendedor, o la última factura de cada cliente, etc.
</p>

<p style="text-align: justify">
  Crearemos nuestras tablas de base de datos: una para autores y otra para libros con una relación uno a muchos. Rellenaremos algunos datos de prueba, los libros tendrán la fecha en la que se publicaron.
</p>

<p style="text-align: justify">
  Querremos saber para cada autor qué libro se publicó más recientemente:
</p>

<pre class="lang:pgsql decode:true ">CREATE TABLE author (id serial, name varchar(255));
CREATE TABLE book (id serial, author_id int, title varchar(255), date timestamp);
CREATE INDEX latest_book_idx ON book (author_id, date, id);

insert into author (name) values ('Peter'), ('Sarah'), ('Paul');
insert into book (author_id, title, date) values 
(1, 'Book 11', '2000-01-01'), 
(1, 'Book 12', '2003-01-01'), 
(1, 'Book 13', '2005-01-01'), 
(2, 'Book 21', '2002-01-01'), 
(2, 'Book 22', '2012-01-01'), 
(3, 'Book 31', '2010-01-01'), 
(3, 'Book 32', '2011-01-01'), 
(3, 'Book 33', '2014-01-01'), 
(3, 'Book 34', '2016-01-01'),
(3, 'Book 35', '2016-01-01');

-- I want to know the latest book written by each author.
SELECT *
FROM author a
INNER JOIN book b1 ON (a.id = b1.author_id)
LEFT OUTER JOIN book b2 ON (a.id = b2.author_id AND 
    (b1.date &lt; b2.date OR b1.date = b2.date AND b1.id &lt; b2.id))
WHERE b2.id IS NULL;

 id | name  | id | author_id |  title  |        date         
----+-------+----+-----------+---------+---------------------
  1 | Peter |  3 |         1 | Book 13 | 2005-01-01 00:00:00
  2 | Sarah |  5 |         2 | Book 22 | 2012-01-01 00:00:00
  3 | Paul  | 10 |         3 | Book 35 | 2016-01-01 00:00:00
(3 rows)</pre>

Fíjate que el autor 3 publicó dos libros en la misma fecha pero se saca solamente el último, el de mayor id.

&nbsp;

Nota: este ejemplo lo he hecho en Postgresql pero puede extrapolarse a cualquier base de datos.