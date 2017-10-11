---
title: Query de first or last row in a relationship one to many
author: Jose OC
type: post
date: 2016-02-03T18:51:43+00:00
url: /en/blog/query-de-first-or-last-row-in-a-relationship-one-to-many/
tags:
  - sql

---
<p style="text-align: justify">
  Let's put an example.
</p>

<p style="text-align: justify">
  We have authors and their books and we want to know which is the latest book written for each author. Similar examples would be: find the latest purchase for each client, the last invoice for each client or the last sale for each seller.
</p>

<p style="text-align: justify">
  We'll create both tables: book and author with a relationship one-to-many. We'll write some data to test the sql.
</p>

<pre class="lang:pgsql decode:true">CREATE TABLE author (id serial, name varchar(255));
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

Notice that the author number 3 published two books in the same date but we get the latest one, the one with a greater id.

&nbsp;

For this example I've used postgresql but you can use this sql in any database.