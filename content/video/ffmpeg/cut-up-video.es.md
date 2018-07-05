---
title: "Cut Up Video"
date: 2017-11-29T16:25:11+01:00
description: "Cómo cortar un trozo de un vídeo usando ffmpeg"
draft: false
tags:
  - ffmpeg
---

Para extraer un trozo de un vídeo usando ffmpeg puedes usar este comando:

```bash
ffmpeg -ss 00:00:30.0 -i input.mp4 -c copy -t 00:00:10.0 output.mp4
```

Parámetros: 

* `-ss` para indicar el tiempo en que el trozo extraído debe comenzar
* `-i` para especificar el vídeo de entrada
* `-c` copia los codecs de forma que no tenga que hacer el transcode
* `-t` duración del trozo extraído
