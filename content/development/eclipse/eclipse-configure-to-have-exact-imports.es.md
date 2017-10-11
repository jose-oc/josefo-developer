---
title: Configurar eclipse para tener imports exactos
date: 2014-10-12T22:52:50+00:00
categories:
  - Coding
  - java
tags:
  - eclipse
  - settings

---
<p style="text-align: justify">
  Si quieres configurar eclipse para que tus clases Java tengan los import con las clases justas que necesita y no el import de todo el paquete tan sólo tienes que ir a la configuración de eclipse y navegar hasta la opción &#8216;organize imports' dentro de la sección Java. En esta ventana tendrás que cambiar el 1 que aparece en la opción <span class="lang:default highlight:0 decode:true  crayon-inline">number of imports needed for .*</span> por el número 99.
</p>

{{< figure src="/development/eclipse/eclipse-organize_imports.png"  >}}


De esta forma en lugar de tener algo así:

```java
import org.primefaces.model.chart.*;</pre>
```

tendrás algo así:

```java
import org.primefaces.model.chart.Axis;
import org.primefaces.model.chart.AxisType;
import org.primefaces.model.chart.BarChartModel;
import org.primefaces.model.chart.ChartSeries;
```

<p style="text-align: justify">
   Recuerda que eclipse tiene una opción para organizar los imports, te borra los que no necesita y añade automáticamente (si no hay confusiones de nombres) los que necesita.
</p>
