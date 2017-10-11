---
title: Buscar texto en archivos desde la consola
date: 2014-10-01T14:43:21+00:00
categories:
  - Linux
  - Terminal
tags:
  - bash
  - linux
  - terminal
format: aside

---
Tres comandos para buscar texto en archivos desde línea de comandos.

<pre class="lang:sh decode:true">find &lt;directory to search&gt; -type f | xargs grep -rl '&lt;text to search for&gt;'
</pre>

<pre class="lang:sh decode:true">find &lt;directory to search&gt; -type f -exec grep -l ‘&lt;text to search for&gt;’ {} +
</pre>

<pre class="lang:sh decode:true ">grep -rl ‘&lt;text to search for&gt;’ &lt;directory to search&gt;/*</pre>

Fuente: <a href="http://www.my-guides.net/en/guides/linux/how-to-search-for-text-in-files-using-linux-command-line" target="_blank"><a href="http://www.my-guides.net/en/guides/linux/how-to-search-for-text-in-files-using-linux-command-line">http://www.my-guides.net/en/guides/linux/how-to-search-for-text-in-files-using-linux-command-line</a></a>