---
title: ¿Quieres saber cuántas horas estás trabajando?
author: Jose OC
type: post
date: 2014-10-02T15:00:01+00:00
url: /blog/quieres-saber-cuantas-horas-estas-trabajando/
categories:
  - Linux
  - Terminal

---
<p style="text-align: justify">
  Yo tengo un horario de trabajo flexible y no todos los días empiezo y acabo a la misma hora así que para mí es importante saber cuántas horas estoy trabajando al día. Como trabajo constantemente con el ordenador decidí registrar la hora a la que lo arranco y la hora a la que lo apago. Para ello me hice este pequeño script en bash:
</p>

<pre class="lang:sh decode:true" title="Registrar hora de inicio de sesión">#!/bin/bash                                          

FICH="/home/jose/schedule"

echo -n $(date +"%d-%m-%Y") &gt;&gt; ${FICH}
echo -n ";" &gt;&gt; ${FICH}
echo -n $(date +"%T") &gt;&gt; ${FICH}
echo -n ";" &gt;&gt; ${FICH}</pre>

<p style="text-align: justify">
  Que se autoejecuta cuando arranco el PC. Y tengo este otro script que se ejecuta cuando apago el PC:
</p>

<pre class="lang:sh decode:true" title="Registra hora al finalizar sesión">#!/bin/bash

FICH="/home/jose/schedule"

echo $(date +"%T") &gt;&gt; ${FICH}</pre>

<p style="text-align: justify">
  El primero, que llamo entrada.sh, guarda en un fichero de texto la fecha y la hora, y el segundo la hora y acaba con un salto de línea, de esta forma tengo un fichero de texto con una línea por cada vez que arranqué y apagué el PC con la fecha, la hora de inicio y la de fin. Pero, ¿cómo consigo que se autoejecute este script? En el trabajo uso debian con Gnome así que he modificado el archivo <span class="lang:default highlight:0 decode:true  crayon-inline">/etc/gdm3/PostLogin/Default</span>  para que ejecute mi script cuando hago login en el PC:
</p>

<pre class="lang:sh decode:true" title="/etc/gdm3/PostLogin/Default">#!/bin/sh

/home/jose/entrada.sh

#exit 0</pre>

<p style="text-align: justify">
  Y he modificado este otro archivo <span class="lang:default decode:true  crayon-inline">/etc/gdm3/PostSession/Default</span>  de esta forma para que se ejecute cuando hago logout:
</p>

<pre class="lang:sh decode:true" title="/etc/gdm3/PostSession/Default">#!/bin/sh

/home/jose/salida.sh

exit 0</pre>

<p style="text-align: justify">
</p>

<p style="text-align: justify">
  Si usas KDM, como yo solía hacer cuando tenía KDE, puedes conseguirlo usando estos archivos, aunque no lo he probado.
</p>

<pre class="lang:default highlight:0 decode:true ">/etc/kde4/kdm/Xreset - script to run as root after session exits
/etc/kde4/kdm/Xsession - script to run as user after login of user
/etc/kde4/kdm/Xsetup - script to run as root before the login dialog appears
/etc/kde4/kdm/Xstartup -  script to run as root before session starts</pre>

&nbsp;

<p style="text-align: justify">
</p>