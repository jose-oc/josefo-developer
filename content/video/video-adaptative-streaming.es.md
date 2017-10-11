---
title: Adaptative Streaming
date: 2015-12-09T17:10:19+00:00
categories:
  - Coding
tags:
  - adaptative video streaming
  - video

---
El streaming de vídeo solía usar un protocolo llamado RTSP en el que se servía un archivo de vídeo grande de seguido con el bitrate en que haya sido codificado, pero afortunadamente el streaming ha evolucionado para usar el protocolo HTTP con todas las ventajas que esto supone: poder usar web cachés y proxies así como evitar problemas con cortafuegos.

<p style="text-align: justify">
  La estrategia es codificar el vídeo con <strong>varios bitrates distintos</strong> (cada uno de ellos se llaman <em>variants</em>) y <strong>dividir estos archivos</strong> en otros muchos muy pequeños de forma que se puedan servir a través de http muy rápidamente con la ventaja añadida de poder cambiar de bitrate (la calidad del vídeo) en función del ancho de banda de la red (velocidad para descargar datos) y la capacidad de la CPU del cliente. De esta forma el cliente siempre recibirá un vídeo con la máxima calidad posible para el momento en que se está reproduciendo.
</p>