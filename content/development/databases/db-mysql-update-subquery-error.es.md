---
title: Error al usar subconsulta en un update con MySQL
date: 2014-12-04T12:14:49+00:00
categories:
  - Bases de datos
  - MySQL

---
Funny error

```sql
UPDATE mytable SET mycolumn = 123456
WHERE mycolumn2 IN (
    SELECT i.mycolumn2
    FROM mytable i 
    WHERE i.mycolumn3 in (10, 20, 30, 40) 
    AND i.mycolumn = 886
);

ERROR 1093 (HY000): You can't specify target table 'mytable' for update in FROM clause
```

Se puede solventar metiendo la consulta que está en el where dentro de una subconsulta tonta:

```sql
UPDATE mytable SET mycolumn = 123456
WHERE mycolumn2 IN (
    select * from (
        SELECT i.mycolumn2
        FROM mytable i 
        WHERE i.mycolumn3 in (10, 20, 30, 40) 
        AND i.mycolumn = 886
    ) t
);
```
