---
title: Buscar consultas lentas
date: 2016-01-01T00:00:00+00:00
draft: true
categories:
  - Bases de datos
  - PostgreSQL
tags:
  - postgresql.conf

---
<p style="text-align: justify">
  Una de las partes de mejorar el rendimiento de una aplicación es mejorar el rendimiento de su base de datos. Posiblemente hayas diseñado una buena base de datos pero es posible que algunas consultas se puedan optimizar. Pero suele suceder que una aplicación tiene muchísimas consultas SQL o, como es mi caso, que es el propio usuario final el que es capaz de configurar las consultas SQL para obtener los datos que necesite.
</p>

<p style="text-align: justify">
  En mi caso estoy analizando una aplicación donde, mediante la misma aplicación y siendo transparente para el usuario final, puede generar consultas según su necesidad modificando los campos a mostrar, añadiendo o eliminando relaciones entre tablas, cambiando el orden, el número de elementos a mostrar o el where de la consulta SQL. Esto, que a priori es fantástico para el usuario final, puede ser un problema para el programador o el DBA ya que es completamente imposible saber qué consultas están o van a ejecutar los usuarios.
</p>

<p style="text-align: justify">
  Por este motivo es fundamental que sea la propia base de datos quien te indique qué consultas tardan más de la cuenta. Esto es lo que vamos a hacer, vamos a configurar nuestra base de datos PostgreSQL para que registre las consultas que tarden más del tiempo que le indique.
</p>

<p style="text-align: justify">
  Para esto editar el archivo <strong>postgresql.conf</strong>, que en mi caso se encuentra en la ruta /var/lib/pgsql/data
</p>

<pre class="lang:sh decode:true ">#log_min_duration_statement = -1        # -1 is disabled, 0 logs all statements
                                        # and their durations, &gt; 0 logs only
                                        # statements running at least this number
                                        # of milliseconds
log_min_duration_statement = 250

log_line_prefix = '%t %d %u %s %x %i '</pre>

Tras modificarlo hay que recargar la configuración de esta forma:

<pre class="lang:sh decode:true  ">service postgresql reload</pre>

Ahora dejemos un tiempo prudencial de ejecución de la aplicación y después analizaremos los resultados, que por cierto deben estar en la siguiente ruta <span class="lang:sh decode:true  crayon-inline ">/var/lib/pgsql/data/pg_log</span>  si no se ha especificado otra.