---
title: Corregir el último commit en Git
author: Jose OC
type: post
date: 2015-06-12T17:08:24+00:00
url: /blog/corregir-el-ultimo-commit-en-git/
categories:
  - Terminal
tags:
  - git

---
Puedes corregir tu último commit local (si no has hecho push aún):

  * corregir el comentario
  * añadir o modificar los ficheros del commit

<pre class="lang:sh decode:true ">git commit --amend</pre>

Tras haber hecho el último commit (el que quieres corregir) añade o modifica los ficheros necesarios, luego ejecuta el comando de arriba y te saldrá el comentario que tenía el commit anterior para que lo puedas modificar.