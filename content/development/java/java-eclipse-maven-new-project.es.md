---
title: Crear proyecto eclipse con maven
date: 2016-08-25T08:49:16+00:00
categories:
  - Coding
  - java
tags:
  - eclipse

---
Si tienes un proyecto maven que quieres tener en eclipse puedes ejecutar este comando:

`mvn eclipse:clean eclipse:eclipse -DdownloadSources=true`

Y luego en eclipse importar un &#8216;proyecto existente'.