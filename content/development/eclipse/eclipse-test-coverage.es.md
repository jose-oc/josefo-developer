---
title: Test Coverage
date: 2015-04-29T14:09:12+00:00
categories:
  - Coding
  - java
tags:
  - eclipse
  - eclipse plugin
  - Unit Test

---
<p style="text-align: justify">
  Hay un plugin para eclipse que estoy usando para analizar el nivel de cobertura de tests en mis clases: <a href="http://www.eclemma.org/" target="_blank"><strong>EclEmma</strong> Java Code Coverage for Eclipse</a>.
</p>

<p style="text-align: justify">
  Es fantástico tener el código dividido en dos ventanas: en una tu clase y en otra el test y lanzar los tests JUnit usando este plugin y que automático todas las líneas se te pinten:
</p>

<li style="text-align: justify">
  de verde si están cubiertas por los tests
</li>
<li style="text-align: justify">
  de rojo si no lo están
</li>
<li style="text-align: justify">
  y de amarillo si el código tiene alguna bifurcación y los tests no las cubren todas, por ejemplo los if, bucles, etc.
</li>