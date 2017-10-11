---
title: Buscar una columna en la base de datos
date: 2014-10-14T13:28:56+00:00
categories:
  - Bases de datos
  - MySQL

---

<p style="text-align: justify">
  Cuando tienes una base de datos con columnas que son referencias a otras tablas pero no están creadas como foreign keys debes ser cuidadoso con el nombre que le pones a la columna. Generalmente prefiero crear las relaciones entre tablas y estar seguro de que los datos guardan una coherencia, pero ciertamente es útil no establecerlas cuando priorizas la velocidad.
</p>

<p style="text-align: justify">
  Cuando tengo que hacer un script para modificar datos y no tienes foreign keys reales (y no conoces bien la base de datos) debes tener especial cuidado. Si estás seguro de los nombres de las columnas puedes realizar una búsqueda en los metadatos que guarda el gestor de base de datos para localizar todas las "foreign keys". Para ello puedes ejecutar una consulta como ésta:
</p>

```sql
SELECT DISTINCT TABLE_NAME 
FROM INFORMATION_SCHEMA.COLUMNS
WHERE COLUMN_NAME = 'columnName'
AND TABLE_SCHEMA='mySchema';
```
