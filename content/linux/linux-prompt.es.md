---
title: Linux prompt consola
date: 2015-09-22T20:55:07+00:00
categories:
  - Linux
  - Terminal
tags:
  - linux
  - terminal

---
En una pantalla de terminal grande, con muchas líneas y muchos resultados a veces pierdes dónde comenzó el resultado de un comando y dónde el de otro. Por ello prefiero usar un prompt fácil de identificar, usando colores e incluso un salto de línea para que esté en el path en el que esté, por largo que sea, todos mis comandos comiencen en el mismo sitio.

Para ello modifico la variable de entorno PS1 añadiendo esta línea al final del archivo ~/.bashrc

<pre class="lang:sh decode:true ">export PS1="\[$(ppwd)\]\e[1;33m\u\e[m@\e[1;35m\h\e[m:\e[1;32m\w\e[m\$ \n"</pre>


Otra opción es: 

```bash
# Setup a red prompt for root and a green one for users.
NORMAL="\[\e[0m\]"
RED="\[\e[1;31m\]"
GREEN="\[\e[1;32m\]"
if [ "$USER" = root ]; then
        PS1="$RED\h [$NORMAL\w$RED]# $NORMAL"
else
        PS1="$GREEN\h [$NORMAL\w$GREEN]\$ $NORMAL"
fi
export PS1
```