---
title: Añadiendo GIT a un proyecto existente
date: 2016-01-01T00:00:00+00:00
draft: true
categories:
  - Coding
  - java
tags:
  - eclipse
  - git
  - java

---
Trabajar con un control de versiones merece la pena siempre, incluso cuando eres el único que trabaja en él. Es fácil trabajar con un control de versiones y te aseguras poder restaurar una copia del mismo que funcionaba bien.

Voy a añadir esta funcionalidad al proyecto que empezamos y aunque he venido usando subversion desde hace años en esta ocasión usaré GIT. Como ya tengo una cuenta en BitBucket.org lo haré en este famoso sitio. Partimos de que tenemos instalado GIT en nuestra máquina de trabajo.

Es todo muy sencillo, en bitbucket te dicen lo que tienes que hacer:

  1. Tras hacer login en él creo un repositorio nuevo.
  2. Luego desde una consola entro en el directorio donde tengo el proyecto y ejecuto:

<pre class="lang:sh decode:true ">git init
git remote add origin https://joseoc@bitbucket.org/joseoc/joc-ghost-java.git
echo "Jose OC" &gt;&gt; contributors.txt
git add contributors.txt
git commit -m 'Initial commit with contributors'
git push -u origin master</pre>

Por último, lo más fácil&#8230; eclipse se entera de que el proyecto está bajo el control de versiones de GIT!!!

Sólo tienes que refrescarlo o como mucho cerrarlo y volverlo a abrir.