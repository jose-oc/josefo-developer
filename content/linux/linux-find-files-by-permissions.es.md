---
title: Buscar archivos por permisos de usuario
author: Jose OC
type: post
date: 2014-10-02T08:04:13+00:00
url: /blog/buscar-archivos-por-permisos-de-usuario/
categories:
  - Linux
  - Terminal
tags:
  - bash
  - linux
  - terminal

---
Con este comando busco archivos cuyo propietario sea jose y que tengan permisos de escritura para el usuario y **no** tengan permisos de escritura para el grupo.

<pre class="lang:sh decode:true">find . -user jose -type f -perm /u+w ! -perm /g+w
</pre>

Podemos usar el mismo comando modificado para cambiar los permisos:

<pre class="lang:sh decode:true ">find . -user jose -type f -perm /u+w ! -perm /g+w -exec chmod g+w {} \;
</pre>