---
title: Traer rama remota a tu git local
author: Jose OC
type: post
date: 2015-06-05T14:13:40+00:00
url: /blog/traer-rama-remota-a-tu-git-local/
categories:
  - Terminal
tags:
  - git

---
Cuando hay una rama en el servidor remoto y la quieres tener en tu git local puedes ejecutar:

<pre class="lang:sh decode:true">git checkout -b &lt;branch-name&gt; origin/&lt;branch-name&gt;</pre>

o simplemente:

<pre class="lang:sh decode:true">git checkout &lt;remote-branch-name&gt;</pre>

&nbsp;