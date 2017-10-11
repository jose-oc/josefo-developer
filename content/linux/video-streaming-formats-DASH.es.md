---
title: DASH (Dynamic Adaptive Streaming over HTTP)
author: Jose OC
type: post
date: -001-11-30T00:00:00+00:00
draft: true
url: /?p=413
tags:
  - adaptative video streaming
  - streaming
  - video

---
<p style="text-align: justify">
  <strong>Dynamic Adaptive Streaming over HTTP (DASH)</strong> es la implementación stándar para el adaptative streaming basado en HTTP.
</p>

<p style="text-align: justify">
  DASH soporta cualquier tipo de codec para vídeo y audio.
</p>

<p style="text-align: justify">
  DASH usa archivos con extensión *.<strong>mp4</strong> para el contenido y el manifest tiene extensión *.<strong>mpd </strong>(media presentation description). El <strong>manifest</strong> es un xml con información (codecs, idiomas, metadata, etc) acerca de los diferentes streams que tenga con sus distintas calidades para suministrar al player en función del ancho de banda de la red. Además de los streams de vídeo guarda información sobre los streams de audio y texto para los subtítulos.
</p>

<p style="text-align: justify">
  El contenido (el vídeo/audio) es cortado en segmentos que generalmente pueden varían entre los 2 y los 10 segundos. Puede ser el servidor el encargado de cortar estos segmentos o bien que el vídeo haya sido procesado para que los segmentos estén ya cortados.
</p>

<p style="text-align: justify">
</p>

&nbsp;

<p style="text-align: justify">
  Fuentes:
</p>

<li style="text-align: justify">
  http://www.hbbtv-developer.com/site/blog/?p=746
</li>
<li style="text-align: justify">
</li>