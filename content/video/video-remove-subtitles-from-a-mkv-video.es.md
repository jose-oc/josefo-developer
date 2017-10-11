---
title: Cómo eliminar los subtítulos de un vídeo en formato mkv
date: 2016-02-03T17:42:06+00:00
categories:
  - Linux
  - Terminal
tags:
  - video
  - how to

---
Estoy trabajando en openSuse.

Instalar la herramienta 
```
zypper in MKVToolNix
```

Generar un nuevo archivo mkv sin los streams de subtítulos:

```
mkvmerge -o output.mkv --no-subtitles input.mkv
```

Se puede leer más sobre esta herramienta en: <https://mkvtoolnix.download/doc/mkvmerge.html#mkvmerge.subtitles>