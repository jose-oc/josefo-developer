---
title: 'MySQL: Crear backup y restaurarlo'
author: Jose OC
type: post
date: 2014-10-01T23:47:04+00:00
url: /blog/mysql-crear-backup-y-restaurarlo/
categories:
  - Bases de datos
  - MySQL
tags:
  - bash
  - mysql
  - mysqldump

---
<p style="text-align: justify">
  Cuando trabajo en un proyecto con mysql suelo crearme un par de scripts, uno para hacer un backup de la base de datos y otro para restaurar un backup en la base de datos. El primero lo suelo tener en el servidor de producción y el segundo en el de desarrollo ya que es habitual tener que coger la base de datos que hay en producción y cargarla en la base de datos de desarrollo.
</p>

Script para crear un backup de la base de datos:

<pre class="lang:sh decode:true" title="Script to create a mysql backup">#!/bin/bash

FILE=/home/jose/backups/bd_name-`date +%Y%m%d_%H%M%S`.sql.gz

mysqldump --password=xxxxx --user=db_user --ignore-table=squema.table1 --ignore-table=squema.table2 db_name | sed -r 's/DEFINER=`[^`]+`@`[^`]+`/DEFINER=CURRENT_USER/g' | gzip &gt; $FILE

echo "Backup finished: $FILE"</pre>

&nbsp;

Script para restaurar la base de datos:

<pre class="lang:sh decode:true" title="Script to restore mysql database">#!/bin/bash

function helptext {
    echo "Debes indicar el nombre del archivo backup de la Bd que quieres restaurar (archivo comprimido gzip)"
}

if [ -z "$1" ]
then
 helptext
 exit 1
fi

archivo=$1

cp ${archivo} /tmp/bd.sql.gz && gunzip /tmp/bd.sql.gz && mysql -u usuario -pxxxxx bd_name &lt; /tmp/bd.sql && rm /tmp/bd.sql</pre>

&nbsp;