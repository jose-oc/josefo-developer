---
title: Remove duplicated rows without keys
date: 2016-02-26T23:49:56+00:00
tags:
  - relational-database

---
<p style="text-align: justify">
  Let's say we have a table in a relational database (for this example I use Postgresql 9.3) without any key and we have duplicated data and we want to get rid of all these redundant data. To do so I'm going to draw on <a href="http://www.postgresql.org/docs/current/static/queries-with.html" target="_blank">Common Table Expressions</a> (CTE).
</p>

<p style="text-align: justify">
  Firstly I'll remove the redundant rows, all of them, but I don't want to lose any data. Well, then I'll insert them again but using the clause group by to avoid duplication.
</p>

<p style="text-align: justify">
  Here is the example:
</p>

```sql
-- Create a table without keys and duplicated rows

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
(3 rows)
```
