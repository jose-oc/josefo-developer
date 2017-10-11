---
title: Configurar eclipse para tener imports exactos
author: Jose OC
type: post
date: 2014-10-12T22:52:50+00:00
url: /blog/configurar-eclipse-para-tener-imports-exactos/
categories:
  - Coding
  - java
tags:
  - eclipse
  - settings

---
<p style="text-align: justify">
  Si quieres configurar eclipse para que tus clases Java tengan los import con las clases justas que necesita y no el import de todo el paquete tan sólo tienes que ir a la configuración de eclipse y navegar hasta la opción &#8216;organize imports&#8217; dentro de la sección Java. En esta ventana tendrás que cambiar el 1 que aparece en la opción <span class="lang:default highlight:0 decode:true  crayon-inline">number of imports needed for .*</span> por el número 99.
</p>

[<img class="aligncenter size-medium wp-image-131" src="http://www.joseoc.es/wp-content/uploads/2014/10/eclipse-organize_imports-300x242.png" alt="eclipse-organize_imports" width="300" height="242" srcset="https://www.joseoc.es/wp-content/uploads/2014/10/eclipse-organize_imports-300x242.png 300w, https://www.joseoc.es/wp-content/uploads/2014/10/eclipse-organize_imports.png 765w" sizes="(max-width: 300px) 100vw, 300px" />][1]

&nbsp;

De esta forma en lugar de tener algo así:

<div id="crayon-543b03ef36e81088202394-11" class="crayon-line">
  <pre class="lang:java decode:true">import org.primefaces.model.chart.*;</pre>
</div>

tendrás algo así:

<pre class="lang:java decode:true ">import org.primefaces.model.chart.Axis;
import org.primefaces.model.chart.AxisType;
import org.primefaces.model.chart.BarChartModel;
import org.primefaces.model.chart.ChartSeries;</pre>

<p style="text-align: justify">
   Recuerda que eclipse tiene una opción para organizar los imports, te borra los que no necesita y añade automáticamente (si no hay confusiones de nombres) los que necesita.
</p>

&nbsp;

 [1]: http://www.joseoc.es/wp-content/uploads/2014/10/eclipse-organize_imports.png