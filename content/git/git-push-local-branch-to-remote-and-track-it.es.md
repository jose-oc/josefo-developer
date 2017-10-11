---
title: Subir una rama local al servidor y seguirla
date: 2015-06-05T14:01:23+00:00
tags:
  - git

---
Cuando tienes una rama en local que no está en el servidor y quieres subir la rama al servidor, generalmente para compartirla con otro usuario o para tener un backup de ella.

<pre class="lang:sh decode:true">git push -u origin &lt;branch-name&gt;</pre>

origin es el nombre del servidor remoto.