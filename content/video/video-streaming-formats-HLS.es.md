---
title: HLS (Http Live Streaming)
date: 2016-01-01T00:00:00+00:00
draft: true
tags:
  - adaptative video streaming
  - streaming
  - video

---
**HLS** es la implementación de _Apple_ para el adaptative streaming basado en HTTP.

<p style="text-align: justify">
  Son archivos con las extensiones: <strong>*.ts</strong> y <strong>*.m3u8</strong> donde los ts son los archivos multimedia, que contienen el vídeo y audio, mientras que los m3u8 son los manifest con la lista de archivos multimedia haciendo de índice.
</p>

<p style="text-align: justify">
  Los archivos ts están divididos en trozos del mismo tamaño.
</p>

<p style="text-align: justify">
  Los <strong>códecs</strong> usados para estos assets son: H.264 para el vídeo. Para el audio será uno de los siguientes: mp3, AAC o bien HE-AAC.
</p>

Esta tecnología permite usar de forma opcional **Playready** como **DRM**, tanto para reproducir vídeos online como offline.

&nbsp;

Fuentes:

  * https://en.wikipedia.org/wiki/HTTP\_Live\_Streaming
  * http://www.encoding.com/http-live-streaming-hls/
  * https://developer.apple.com/library/ios/technotes/tn2224/_index.html