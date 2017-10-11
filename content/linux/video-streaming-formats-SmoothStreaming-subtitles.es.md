---
title: 'Microsoft Smooth Streaming: subtítulos'
author: Jose OC
type: post
date: -001-11-30T00:00:00+00:00
draft: true
url: /?p=516
categories:
  - Coding

---
<p style="text-align: justify">
  Los subtítulos en Smooth Streaming son archivos con extensión <em>.ismt</em> que realmente son mp4 fragmentados así que son archivos <span style="text-decoration: underline">binarios y no archivos de texto</span> como otros formatos de subtítulos para vídeo. No son exactamente archivos mp4 sino una variación conocida como &#8220;<a href="http://www.iis.net/learn/media/smooth-streaming/protected-interoperable-file-format" target="_blank">Protected Interoperable File Format</a>&#8221; (<strong>PIFF</strong>)
</p>

<h2 style="text-align: justify">
  Convertir srt a ismt
</h2>

<p style="text-align: justify">
  En primer lugar hay que convertir los archivos srt a un formato de archivo en xml con extensión .dfxp para lo que puedes usar la herramienta online: <a href="http://subflicks.com" target="_blank">http://subflicks.com</a>
</p>

<p style="text-align: justify">
  Para convertir de dfxp a ismt se puede usar el programa <a href="http://docs.unified-streaming.com/documentation/package/subtitles.html#creating-the-media-files-ismt" target="_blank"><em>mp4split</em></a>. <span class="lang:default decode:true crayon-inline ">mp4split -o video.ismt video.dfxp</span>
</p>

<p style="text-align: justify">
  También se puede usar el programa <a href="https://www.microsoft.com/es-es/download/details.aspx?id=18974" target="_blank">Microsoft Expression Encoder</a>.
</p>

<p style="text-align: justify">
</p>

<p style="text-align: justify">
</p>

<p style="text-align: justify">
  Ejemplos: http://demo.unified-streaming.com/features.html
</p>