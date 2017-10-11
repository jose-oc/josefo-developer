---
title: Backups con rsync
date: 2014-10-04T21:03:15+00:00
categories:
  - Linux
  - Terminal
tags:
  - backup
  - rsync

---
<p style="text-align: justify">
  Hacer backups es recomendable y en muchos casos absolutamente necesario. Para una empresa sobretodo.
</p>

<p style="text-align: justify">
  Si además de hacer backups de los archivos que tienes pudieras además tener <strong>copias incrementales</strong>, mejor que mejor. De esta forma podrías, por ejemplo, recuperar un archivo que borraste hace varios días.
</p>

{{< figure src="/linux/13718407083_3b3c01ab7c_z.jpg" title="" >}}
[Backup (Tim Reckmann)](https://www.flickr.com/photos/foto_db/13718407083/in/photolist-mUfqu4-bWGgAk-89pH6q-6tgx7t-4yTsND-8YtnFS-5zKVPs-4A7WsA-aqYfK-23RUwa-8vEATQ-bJc39K-7BRek-bDtQ6e-4cyHom-i8ZrQj-d7maJd-8pd9Ec-6nexff-mTnD7-mUfk5t-naMTxi-5W67cY-5TYQGp-5pgPEV-amBVYp-amELm7-amELf1-amBVTg-62g2Hp-9cwGfb-fpptvD-fpDJpY-fpptv8-fpDJpL-fpDJoU-fpptti-fpDJm9-fpptu4-fpDJos-fppttP-fpptvg-CFP9u-7GFxYm-9qBBEa-4nw5rf-8DcMJU-p7GnJS-ena2yU-oRkaEn)

<p style="text-align: justify">
  Todo esto es posible usando <strong>rsync</strong>. Con este comando podemos tener esto con la ventaja de hacer los backups muy rápidamente y con un consumo de espacio de disco mínimo, sólo el justo y necesario.
</p>

<p style="text-align: justify">
  Este es un ejemplo de un script que hice para guardar los backups de un directorio de documentación:
</p>

```bash
#!/bin/bash

###################################
### Backup Archivos             ###
###################################
logfile="/var/log/copias/diario"
logerror="/var/log/copias/errores"

FECHA_HOY=`date +%Y-%m-%d`
FECHA_AYER=`date --date='1 days ago' +%Y-%m-%d`
FECHA_LIMPIEZA=`date --date='30 days ago' +%Y-%m-%d`
BACKUP_PATH=/var/data/backup

DOCUMENTOS="documentos"

###################################
# Copia de los archivos con rsync
###################################
echo
echo "BACKUP DE $DOCUMENTOS"
rsync -av --delete --link-dest=$BACKUP_PATH/$DOCUMENTOS/$fecha_ayer/ /datos/$DOCUMENTOS/ $BACKUP_PATH/$DOCUMENTOS/$fecha_hoy/ 2&gt;&gt; $logerror && date +"%d/%m/%Y %H:%M:%S Copia del directorio /datos/$DOCUMENTOS realizada en $BACKUP_PATH/$DOCUMENTOS/$fecha_hoy/." &gt;&gt; $logfile
tail -1 $logfile

###################################
# Eliminar archivos anteriores
# Para no llenar el disco duro con backups, se eliminan todos los backups diarios pasados la cantidad
# de días especificados en la variable BACKUP_LIVE_TIME.
###################################
echo
echo "LIMPIEZA DE BACKUPS ANTIGUOS"
find $BACKUP_PATH -type d -name "$FECHA_LIMPIEZA" -exec rm -rf {} \;
```

<p style="text-align: justify">
   Con este script se guardan los últimos 30 días del backup, realizando uno cada día (configurado en el cron).
</p>

<p style="text-align: justify">
  Lo bueno es que cada directorio que se crea tiene todos los archivos del backup pero el espacio ocupado es sólo el de los archivos que se hayan modificado y los nuevos respecto al backup anterior. Esto es gracias al uso de los hard links del sistema operativo, linux por supuesto. Comprobémoslo. Vayamos al directorio donde se hacen estos backups, donde encontraremos un directorio por día, y midamos cuánto especio ocupa cada uno de ellos:
</p>

```bash
# du -sch *
553M    2014-08-10
13M 2014-08-11
15M 2014-08-12
14M 2014-08-13
13M 2014-08-14
12M 2014-08-15
12M 2014-08-16
12M 2014-08-17
14M 2014-08-18
12M 2014-08-19
18M 2014-08-20
17M 2014-08-21
14M 2014-08-22
13M 2014-08-23
13M 2014-08-24
15M 2014-08-25
16M 2014-08-26
16M 2014-08-27
14M 2014-08-28
16M 2014-08-29
13M 2014-08-30
13M 2014-08-31
17M 2014-09-01
14M 2014-09-02
16M 2014-09-03
14M 2014-09-04
15M 2014-09-05
13M 2014-09-06
13M 2014-09-07
13M 2014-09-08
18M 2014-09-09
15M 2014-09-10
15M 2014-09-11
15M 2014-09-12
14M 2014-09-13
14M 2014-09-14
16M 2014-09-15
17M 2014-09-16
15M 2014-09-17
16M 2014-09-18
16M 2014-09-19
14M 2014-09-20
14M 2014-09-21
16M 2014-09-22
16M 2014-09-23
17M 2014-09-24
15M 2014-09-25
17M 2014-09-26
14M 2014-09-27
628M    2014-09-29
17M 2014-09-30
17M 2014-10-01
16M 2014-10-02
17M 2014-10-03
1,9G    total
```

<p style="text-align: justify">
  En este caso hay más de 30 copias,  sí, tenía configuradas algunas más y el script comenzó a ejecutarse el 10 de agosto. Bueno, lo importante aquí es fijarnos que el primer directorio, el del 10/08, ocupa 553Mb mientras que los de los días posteriores ocupan mucho menos, alrededor de los 15Mb. Pero si entras en uno de estos directorios verás que no faltan archivos, que no es que estén los últimos, están <strong>todos</strong>. El comando rsync lo que hace es establecer un enlace duro a los archivos que no se hayan modificado, y esto produce el efecto de tener el archivo disponible en dicho directorio pero que no ocupe más espacio. Pero, ¿seguro que esto es así? Seguro, y sino hagamos lo siguiente, entraremos en el siguiente directorio y midamos cuánto espacio ocupan sus archivos:
</p>

<pre class="lang:default decode:true "># cd 2014-08-11
# du -sch . 
554M    total</pre>

<p style="text-align: justify">
   Como verás, si se mide sólo este directorio ocupa tanto como el primero.
</p>

<p style="text-align: justify">
  Un detalle en el que posiblemente te hayas fijado es que en el listado anterior hay un directorio que ocupa mucho más que los anteriores, el del día 2014-09-29. Esto es porque no hay ningún directorio del día anterior y por tanto rsync ha copiado todos los archivos del directorio de origen.
</p>

<p style="text-align: justify">
  Espero haber mostrado las bondades del comando rsync y que te sea útil. Si lo usas de otra forma o sabes algún truco, no dudes en compartirlo.
</p>

<p style="text-align: justify">
  <span style="color: #333333">Photo: Backup (<a class="owner-name truncate" style="color: #333333" title="Ir a la galería de Tim Reckmann" href="https://www.flickr.com/photos/foto_db/">Tim Reckmann</a>) bajo licencia CC (Creative Commons)</span>
</p>