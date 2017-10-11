---
title: Microsoft Smooth Streaming
author: Jose OC
type: post
date: 2016-06-10T10:17:19+00:00
url: /blog/microsoft-smooth-streaming/
tags:
  - adaptative video streaming
  - Microsoft
  - Smooth Streaming
  - streaming
  - video

---
<h1 style="text-align: justify">
  <strong>Smooth Streaming</strong>
</h1>

<p style="text-align: justify">
  Es la implementación de <em>Microsoft</em> para el adaptative streaming basado en HTTP.
</p>

<h2 style="text-align: justify">
  Basic
</h2>

<p style="text-align: justify">
  Son archivos con las extensiones: <strong>*.ismv,</strong> <strong>*.ism</strong> e <strong>*.ismc</strong> donde ismv son los archivos multimedia (basado en la especificación de formato mp4), lo que contienen el vídeo y audio, mientras que los otros dos son los manifest, es decir los índices con metadatos, en este caso en formato xml.
</p>

<p style="text-align: justify">
  Aunque la teoría del adaptative streaming diga que se tiene el vídeo dividido en muchos archivos muy pequeños para dar una mejor repuesta a la hora de prestar el servicio a través de la red, en el caso del smooth streaming <strong>cada archivo <em>ismv</em> o <em>isma</em> es el vídeo completo en un determinado bitrate</strong>. Así que el mínimo número de archivos que nos encontraremos para un vídeo en smooth streaming es 3: dos manifests (ism e ismc) y uno para el vídeo (ismv) con una calidad de bitrate. Si tuviéramos el vídeo en varios bitrates distintos tendríamos más archivos ismv. Cuando el servidor está sirviendo un vídeo smooth streaming este archivo multimedia es dividido virtualmente en numerosos archivos de pequeño tamaño para enviarlo al cliente y beneficiarse de los beneficios del adaptative streaming vía http.
</p>

<p style="text-align: justify">
  Podemos encontrarnos con los siguientes tipos de archivo:
</p>

<li style="text-align: justify">
  <strong>ism</strong>: server manifest
</li>
<li style="text-align: justify">
  <strong>ismc</strong>: client manifest
</li>
<li style="text-align: justify">
  <strong>ismv</strong>: video asset
</li>
<li style="text-align: justify">
  <strong>isma</strong>: audio asset
</li>
<li style="text-align: justify">
  <strong>ismt</strong>: text asset (para los subtítulos)
</li>
<li style="text-align: justify">
  <strong>cms</strong>: composite stream manifest for sub-clipping
</li>

<p style="text-align: justify">
</p>

<h2 style="text-align: justify">
  DRM
</h2>

<p style="text-align: justify">
  Esta tecnología permite usar de forma opcional <strong>Playready</strong> como <strong>DRM</strong>, tanto para reproducir vídeos online como offline.
</p>

<h2 style="text-align: justify">
  Player
</h2>

<p style="text-align: justify">
  Para <strong>reproducir</strong> archivos de este tipo Microsoft ha desarrollaldo el reproductor <em>Silverlight</em> con versiones para Windows y para OSX, si usas linux existe un reproductor llamado <em>Moonlight</em> pero no se mantienen por lo que probablemente ya esté obsoleto. Smooth Streaming hace uso de la especificación MP4 Movie Fragments (“moof” and “mdat” boxes) que no todo reproductor del formato MP4 implementa.
</p>

<p style="text-align: justify">
  Smooth Streaming soporta los <strong>codecs</strong> H.264 y VC-1 para vídeo así como AAC y WMA para audio.
</p>

<h3 style="text-align: justify">
  Fuentes:
</h3>

  * http://alexzambelli.com/blog/smooth-streaming-faq/
  * https://mithunme.wordpress.com/2009/11/04/fragmented-mp4-file-format/