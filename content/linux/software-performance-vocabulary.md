---
title: 'Vocabulario: Performance'
author: Jose OC
type: post
date: 2015-05-07T05:46:38+00:00
url: /blog/vocabulario-performance/
categories:
  - Coding
tags:
  - performance
  - vocabulary

---
# Vocabulario referido al rendimiento

## Performance monitoring

Monitorización del rendimiento. Consiste en **observar** el rendimiento de una aplicación y **recopilar datos** acerca del mismo para poder analizarlos más adelante de una forma **NO intrusiva**. Es una tarea que se puede hacer en cualquier entorno, incluyendo Producción. Habitualmente se hace como una de las últimas fases de desarrollo con el objetivo de descubrir fallos de rendimiento y poder solucionarlos antes de la puesta en Producción aunque además de una tarea proactiva se puede llevar a cabo de una forma reactiva ante la petición de un análisis por detectar un problema de este tipo.

## Performance profiling

Es una tarea que también **recolecta información** para analizar el rendimiento pero esta vez de una forma **intrusiva**, por ello no se suele hacer en Producción. Normalmente está más centrada en un aspecto concreto de la aplicación, usualmente porque se ha descubierto un problema de rendimiento.

## Performance tuning

Esta tarea no consiste en hacer análisis como las anteriores sino modificaciones para mejorar el rendimiento. Se puede modificar bien el código fuente de la aplicación o bien la configuración.

&nbsp;