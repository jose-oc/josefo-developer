---
title: Nuevo proyecto web maven en eclipse
date: 2014-10-11T20:12:42+00:00
categories:
  - Coding
  - java
tags:
  - eclipse
  - java
  - maven
  - problema-resuelto

---
<p style="text-align: justify">
  Esta es la forma en la que creo mis proyectos de aplicaciones web usando maven en eclipse.
</p>

Lo primero es crear el proyecto. Haz clic en nuevo proyecto maven:

{{< figure src="/development/eclipse/eclipse_new_maven_project.png" title="eclipse_new_maven_project" >}}

<p style="text-align: justify">
  Selecciona maven-achetype-webapp, para encontrarlo más fácilmente puedes filtrar por webapp.
</p>

{{< figure src="/development/eclipse/eclipse-new-maven-project.png" title="eclipse-new-maven-project" >}}

<p style="text-align: justify">
  Es así de sencillo, pero cuando tengo el proyecto creado aparece el siguiente error:
</p>

<pre class="lang:java decode:true">Description    Resource    Path    Location    Type
The superclass "javax.servlet.http.HttpServlet" was not found on the Java Build Path    index.jsp    /jsf-primefaces-demo/src/main/webapp    line 1    JSP Problem</pre>

<p style="text-align: justify">
  {{< figure src="/development/eclipse/javax.servlet.http_.HttpServlet_problem.png" title="javax.servlet.http.HttpServlet_problem" >}}

  Parece ser que no encuentra dicha clase que se debe encontrar en el servlet-api.jar. La solución es sencilla, tan sólo tienes que acceder a las propiedades del proyecto, en esa ventana accede a la sección <span class="lang:default highlight:0 decode:true  crayon-inline">Targeted runtimes</span>  y selecciona runtime server. En esta ventana verás los servidores de aplicaciones que tienes instalados. En mi caso tenía instalado dos versiones de Apache Tomcat. Seleccioné una de ellas y el problema se solucionó.
</p>

<p style="text-align: justify">
  {{< figure src="/development/eclipse/eclipse_project_properties_targeted_runtime.png" title="eclipse_project_properties_targeted_runtime" >}}
</p>
