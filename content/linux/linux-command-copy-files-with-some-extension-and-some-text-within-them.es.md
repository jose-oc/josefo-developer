---
title: Copiar archivos que contengan cierto texto a otro directorio
date: 2016-05-26T14:03:38+00:00
categories:
  - Linux
  - Terminal
tags:
  - bash
  - console
  - linux
  - terminal

---
Para poder copiar algunos archivos a un directorio con ciertas restricciones, como que tengan tal extensión y que contengan cierto texto podemos combinar los comandos **find** y **xargs**.

```bash
xargs -r0 --arg-file &lt;(find . -type f -name "*.json" -exec grep -lZi some_text_within_files {} +) cp -i --target-directory /tmp/dest/dir/
