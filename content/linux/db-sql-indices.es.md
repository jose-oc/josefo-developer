---
title: Filtrar consulta con dos o más rangos
author: Jose OC
type: post
date: 2016-01-01T00:00:00+00:00
draft: true
url: /?p=99
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

select * from usuarios where provincia < ? and num_visitas < ?

ver páginas 50 y anteriores del libro&#8230;