---
title: Configure eclipse to have exact imports
date: 2014-10-12T22:45:27+00:00

---
If you want to configure your eclipse IDE to have exact imports in your Java classes you should go to your eclipse settings, browse to _&#8216;organize imports'_ in the Java section and then type 99 instead of 1 in <span class="lang:default highlight:0 decode:true  crayon-inline ">number of imports needed for .*</span>

This way you will chage this:

```java
import org.primefaces.model.chart.*;
```

for this:

```java
import org.primefaces.model.chart.Axis;
import org.primefaces.model.chart.AxisType;
import org.primefaces.model.chart.BarChartModel;
import org.primefaces.model.chart.ChartSeries;
```

{{< figure src="/development/eclipse/eclipse-organize_imports.png"  >}}
