---
title: Borrar el último commit en Git
author: Jose OC
type: post
date: 2015-06-12T22:24:43+00:00
url: /blog/borrar-el-ultimo-commit-en-git/
categories:
  - Terminal
tags:
  - git

---
Para borrar el último commit local que has hecho en git:

<pre class="lang:sh decode:true ">git reset --soft HEAD~1</pre>

Esta pregunta en stackoverflow es útil: <http://stackoverflow.com/questions/927358/how-to-undo-the-last-commit>