---
title: Configure eclipse to have exact imports
author: Jose OC
type: post
date: 2014-10-12T22:45:27+00:00
url: /en/blog/configure-eclipse-to-have-exact-imports/

---
If you want to configure your eclipse IDE to have exact imports in your Java classes you should go to your eclipse settings, browse to _&#8216;organize imports&#8217;_ in the Java section and then type 99 instead of 1 in <span class="lang:default highlight:0 decode:true  crayon-inline ">number of imports needed for .*</span>

This way you will chage this:

<div id="crayon-543b03ef36e81088202394-11" class="crayon-line">
  <pre class="lang:java decode:true">import org.primefaces.model.chart.*;</pre>
</div>

for this:

<pre class="lang:java decode:true ">import org.primefaces.model.chart.Axis;
import org.primefaces.model.chart.AxisType;
import org.primefaces.model.chart.BarChartModel;
import org.primefaces.model.chart.ChartSeries;</pre>

[<img class="aligncenter size-medium wp-image-131" src="http://www.joseoc.es/wp-content/uploads/2014/10/eclipse-organize_imports-300x242.png" alt="eclipse-organize_imports" width="300" height="242" srcset="https://www.joseoc.es/wp-content/uploads/2014/10/eclipse-organize_imports-300x242.png 300w, https://www.joseoc.es/wp-content/uploads/2014/10/eclipse-organize_imports.png 765w" sizes="(max-width: 300px) 100vw, 300px" />][1]

&nbsp;

 [1]: http://www.joseoc.es/wp-content/uploads/2014/10/eclipse-organize_imports.png