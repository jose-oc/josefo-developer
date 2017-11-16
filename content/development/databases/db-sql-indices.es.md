---
title: Filtrar consulta con dos o más rangos
date: 2016-01-01T00:00:00+00:00
draft: true
categories:
  - Bases de datos
tags:
  - multi-índices
  - rangos

---
<p style="text-align: justify">
  Cuando en el where de una consulta usas más de un rango deben pensar bien en cómo crear los índices.
</p>

<p style="text-align: justify">
  Un sólo índice no te dará todos los resultados sin filtrarlos así que tendrás que tomar una decisión: usar más de un índice, uno para cada rango, o bien establecer la primera columna del índice la que dé un rango más estrecho de datos.
</p>

Veámoslo con un ejemplo:

```sql
select * from usuarios where provincia < ? and num_visitas < ?
```

ver páginas 50 y anteriores del libro&#8230;


------

##El operador like y los filtros

<p style="text-align: justify">Cuando usas un operador like en una expresión where provocas que la base de datos haga dos tipos de búsquedas para obtener el resultado:</p>
<p style="text-align: justify">La parte que hay antes del comodín % se usa como access predicate (es decir que el índice busca las ramas por las que acotar las hojas del B-Tree), mientras que la parte a la derecha del % se usa como filter predicate, es decir que se recorre el árbol por las hojas filtrando las que no cumplan dicha condición.</p>
<p style="text-align: justify">Ejemplo: <span class="lang:pgsql decode:true  crayon-inline ">WHERE UPPER(nombre) like 'ANT%O'</span></p>
<p style="text-align: justify">Esto usará 'ANT' para escoger las ramas del B-Tree y así acotar las hojas del árbol que tendrá que recorrer, y usará la letra 'O' para filtrar de todas esas hojas que está recorriendo, las que no cumplan la condición.</p>
<p style="text-align: justify">Como es lógico, cuanto mayor sea el texto que hay antes del % más rápida será la búsqueda ya que el índice acotará más.</p>
<p style="text-align: justify">Nota para PostgreSQL: comportamiento especial, leer las secciones "Operator Classes and Operator Families"</p>

<h3 style="text-align: justify">Caso Like '%...'</h3>
<p style="text-align: justify">Cuando el operador like se encuentra el comodín % al principio es completamente imposible utilizar índices, por tanto recorrerá la tabla en su totalidad para filtrar las filas que se piden.</p>
