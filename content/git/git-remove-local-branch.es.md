---
title: Borrar una rama local
date: 2015-06-05T14:33:37+00:00
tags:
  - git

---
Para borrar una rama local:

<pre class="lang:sh decode:true ">git branch -d &lt;branch-name&gt;</pre>

Si no tienes tu rama mergeada git no te lo permitirá pero tienes la opción de forzarlo:

<pre class="lang:sh decode:true">git branch -D &lt;branch-name&gt;</pre>
