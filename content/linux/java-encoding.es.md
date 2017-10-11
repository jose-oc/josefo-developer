---
title: Java y encoding
author: Jose OC
type: post
date: 2016-09-13T11:16:01+00:00
url: /blog/java-y-encoding/
categories:
  - Coding
  - java
tags:
  - charset
  - encoding

---
<p style="text-align: justify">
  Muchas veces nos encontramos con problemas si tenemos que usar distintos idiomas en nuestra aplicación Java. Esto es por el charset con el que estemos trabajando. Tomemos algunas notas al respecto:
</p>

<h2 style="text-align: justify">
  Charset por defecto en Java
</h2>

<p style="text-align: justify">
  Java en sí mismo no tiene un charset definido por defecto sino que utiliza el que use el sistema.
</p>

Recuerda que mientras que Linux usa UTF-8, Windows usa CP-1252

## Saber el charset por defecto que está usando Java

Podemos saber qué charset está usando Java ejecutando:

<pre class="lang:java decode:true">System.getProperty("file.encoding");

java.nio.charset.Charset.defaultCharset();</pre>

## Establecer el charset por defecto para Java

#### System property

Usando una system property a la JVM: -Dfile.encoding=&#8221;UTF-8&#8243;

Ejecutando java desde consola: <span class="lang:java decode:true crayon-inline ">java -Dfile.encoding=&#8221;UTF-8&#8243; HelloWorld</span>

En eclipse puede configurar la ejecución <span class="lang:default decode:true crayon-inline ">Run configuration</span> añadiendo VM argument: [<img class="size-full wp-image-552 alignnone" src="http://www.joseoc.es/wp-content/uploads/2016/09/eclipse_runConfiguration_VMArguments.png" alt="eclipse_runconfiguration_vmarguments" width="247" height="179" />][1]

&nbsp;

#### Environment variable

<p style="text-align: justify">
  A veces no podemos establecer la propiedad de sistema así que para modificar el charset por defecto podemos establecer una variable de entorno llamada <span class="lang:default decode:true crayon-inline ">JAVA_TOOL_OPTIONS</span>  con el valor <span class="lang:default decode:true crayon-inline ">-Dfile.encoding=&#8221;UTF-16&#8243;</span>  (poner el charset que se necesite). Si Java usa dicha variable de entorno pintará en la consola un mensaje como éste:
</p>

<pre class="">Picked up JAVA_TOOL_OPTIONS: -Dfile.encoding=UTF16

</pre>

#### A tener en cuenta&#8230;

<p class="">
  Establecer el charset como una system property en medio de una ejecución, es decir usar <span class="lang:java decode:true crayon-inline ">System.setProperty(&#8220;file.encoding&#8221;, &#8220;UTF-16&#8221;);</span>  no nos servirá de nada porque Java tiene el charset cacheado.
</p>

<p class="">
  Por otro lado, imprimir texto en la consola usará el charset por defecto así que si tratas, por ejemplo, de pintar caracteres no soportados para el charset que tengas por defecto puedes asegurarte de pintarlos en UTF-8 de esta forma:
</p>

<pre class="lang:java decode:true ">PrintStream console = new PrintStream(System.out, true, "UTF-8");
console.println("1000 ăăă some non-ascii dàtä mótar spórt spørrelek");</pre>

&nbsp;

En cualquier caso, considero siempre preferible especificar el charset en el código para no depender de la configuración del sistema.

 [1]: http://www.joseoc.es/wp-content/uploads/2016/09/eclipse_runConfiguration_VMArguments.png