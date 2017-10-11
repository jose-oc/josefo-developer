---
title: Buscar enlaces simbólicos
author: Jose OC
type: post
date: 2014-10-01T14:53:14+00:00
url: /blog/buscar-enlaces-simbolicos/
categories:
  - Linux
  - Terminal
format: aside

---
Comando para buscar enlaces simbólicos desde consola.

<pre class="lang:sh decode:true">find . -type l -exec ls -lad {} \;</pre>