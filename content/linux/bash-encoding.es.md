---
title: Establecer codificación en bash
date: 2015-01-01T15:45:24+00:00
categories:
  - Linux
  - Terminal

---
Podemos establecer la codificación a usar en consola a nivel de configuración de usuario.

Es tan fácil como añadir estas líneas al archivo <span class="lang:default highlight:0 decode:true  crayon-inline ">~/.bashrc</span>

```bash
export LC_ALL=es_ES.UTF-8
export LANG=es_ES.UTF-8
export LANGUAGE=es_ES.UTF-8
```

Para recargar esta configuración ejecuta

<pre class="lang:sh decode:true ">source ~/.bashrc</pre>