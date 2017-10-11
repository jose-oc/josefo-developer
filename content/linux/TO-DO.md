---
title: TODO
author: Jose OC
type: post
date: -001-11-30T00:00:00+00:00
draft: true
url: /?p=287
categories:
  - Coding

---
**Sobre String, cómo ha cambiado a lo largo de las versiones:** <http://java-performance.info/string-intern-in-java-6-7-8/>

**Conceptos memoria java:** sácalos de aquí: java heap, java stack, etc.

<http://www.vogella.com/tutorials/EclipseMemoryAnalyzer/article.html>

**Explicación de cómo usar los flags de la VM para ver cuándo actúa el garbage collector:**

<https://blog.codecentric.de/en/2014/01/useful-jvm-flags-part-8-gc-logging/> En este vídeo lo explican también, no lo he visto entero, pero creo que es como el artículo: <https://www.youtube.com/watch?v=7CJCMKNoICE>

**cómo obtener un dump de la memoria en java:** una de las formas, usando MAT en eclipse: <http://community.bonitasoft.com/blog/acquire-heap-dump-mat-memory-analyzer-tool>

**este artículo creo que profundiza en la heap y garbage collection:** <http://mechanical-sympathy.blogspot.ca/2013/07/java-garbage-collection-distilled.html>

&nbsp;

**Aquí explican el MAT, además usan un ejemplo de finalizer:**

<http://jagadesh4java.blogspot.com.es/2013/06/eclipse-memory-analyzer.html>

Estos conceptos creo que se incluyen en la web anterior: <http://help.eclipse.org/luna/index.jsp?topic=%2Forg.eclipse.mat.ui.help%2Fconcepts%2Fshallowretainedheap.html>

Aquí también: <http://eclipsesource.com/blogs/2013/01/21/10-tips-for-using-the-eclipse-memory-analyzer/>

**Para usar las consultas:** <http://www.eclipse.org/forums/index.php/t/970/> SELECT COUNT(classof(f.referent)), classof(f.referent) class from java.lang.ref.Finalizer f GROUP BY class

**Explicación de JVisualJV:**

<https://visualvm.java.net/gettingstarted.html?Java_VisualVM>

**Aquí explican éstos y más:** <http://www.cubrid.org/blog/dev-platform/how-to-monitor-java-garbage-collection/>