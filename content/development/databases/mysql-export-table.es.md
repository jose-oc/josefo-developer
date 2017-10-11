---
title: 'Mysql: Exportar tabla'
date: 2014-10-01T15:19:37+00:00
categories:
  - Bases de datos
  - MySQL
tags:
  - mysql
  - mysqldump
format: aside

---
Diferentes formas de exportar una tabla de una base de datos MySQL.

Desde el cliente mysql:

```sql
select * from table INTO OUTFILE '/tmp/myfilename.txt'
```

Desde la consola linux:

```sql
mysql -u user -pxxxxx -h 192.168.168.100 dbname -e "select id, name, group, date INTO OUTFILE '/tmp/data_table.csv' FIELDS TERMINATED BY ',' ENCLOSED BY '\"' ESCAPED BY '\"' LINES TERMINATED BY '\n' from table" 
```

Desde la consola linux, usando mysqldump y pudiendo filtrar las filas a exportar:

```sql
mysqldump --lock-tables=false --password=xxxxx --user=usuairo --where="n_sales in (10, 20) limit 100" db_name table_name &gt; data_exported.sql
```
