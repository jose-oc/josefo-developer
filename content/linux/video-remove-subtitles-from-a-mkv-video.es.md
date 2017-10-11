---
title: Eliminar los subtítulos de un vídeo en formato mkv
author: Jose OC
type: post
date: 2016-02-03T17:42:06+00:00
url: /blog/eliminar-los-subtitulos-de-un-video-en-formato-mkv/
categories:
  - Linux
  - Terminal
tags:
  - video

---
Estoy trabajando en openSuse.

Instalar la herramienta <span class="lang:sh decode:true  crayon-inline ">zypper in MKVToolNix</span>

Generar un nuevo archivo mkv sin los streams de subtítulos:

<span class="lang:sh decode:true  crayon-inline ">mkvmerge -o output.mkv &#8211;no-subtitles input.mkv</span>

Se puede leer más sobre esta herramienta en: <https://mkvtoolnix.download/doc/mkvmerge.html#mkvmerge.subtitles>