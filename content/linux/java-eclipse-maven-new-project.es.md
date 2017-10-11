---
title: Crear proyecto eclipse con maven
author: Jose OC
type: post
date: 2016-08-25T08:49:16+00:00
url: /blog/crear-proyecto-eclipse-con-maven/
categories:
  - Coding
  - java
tags:
  - eclipse

---
Si tienes un proyecto maven que quieres tener en eclipse puedes ejecutar este comando:

 <span class="lang:default decode:true crayon-inline">mvn eclipse:clean eclipse:eclipse -DdownloadSources=true</span>

&nbsp;

Y luego en eclipse importar un &#8216;proyecto existente'.