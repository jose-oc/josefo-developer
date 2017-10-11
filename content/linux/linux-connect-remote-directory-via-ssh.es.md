---
title: Conectar un directorio remoto vía ssh
date: 2014-10-01T15:03:15+00:00
categories:
  - Linux
  - Terminal
tags:
  - bash
  - linux
  - ssh
  - terminal

---
Conectar un directorio remoto vía ssh.

Si tienes un directorio en una máquina remota a la que te conectas vía ssh y quieres tener los archivos en tu sistema de ficheros puedes enlazar ambos directorios con este comando:

<pre class="lang:sh decode:true">sshfs usuario@maquina:/ruta/remota /ruta/local</pre>

Si al hacerlo da problemas puede ser porque tu usuario no pertenece al grupo fuse. Añádelo así y luego haz logout y login:

<pre class="lang:sh decode:true ">usermod -aG fuse jortiz</pre>