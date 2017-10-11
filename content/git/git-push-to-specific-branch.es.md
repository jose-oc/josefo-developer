---
title: Subir los commits a un servidor remoto
date: 2015-06-05T14:08:59+00:00
tags:
  - git

---
Para hacer push de tus commits a un servidor remoto,

debes estar en la rama cuyos commits quieres subir:

<pre class="lang:sh decode:true ">git checkout &lt;branch-name&gt;</pre>

Entonces haces el push indicando el nombre del servidor y el de la rama remota:

<pre class="lang:sh decode:true ">git push origin &lt;branch-name&gt;</pre>

&nbsp;