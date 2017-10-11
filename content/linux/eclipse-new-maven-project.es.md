---
title: Nuevo proyecto web maven en eclipse
author: Jose OC
type: post
date: 2014-10-11T20:12:42+00:00
url: /blog/nuevo-proyecto-web-maven-en-eclipse/
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

Lo primero es crear el proyecto. Haz clic en nuevo proyecto maven:[<img class="aligncenter size-medium wp-image-114" src="http://www.joseoc.es/wp-content/uploads/2014/10/eclipse_new_maven_project-300x277.png" alt="eclipse_new_maven_project" width="300" height="277" srcset="https://www.joseoc.es/wp-content/uploads/2014/10/eclipse_new_maven_project-300x277.png 300w, https://www.joseoc.es/wp-content/uploads/2014/10/eclipse_new_maven_project.png 620w" sizes="(max-width: 300px) 100vw, 300px" />][1]

<p style="text-align: justify">
  Selecciona maven-achetype-webapp, para encontrarlo más fácilmente puedes filtrar por webapp.
</p>

[<img class="aligncenter size-medium wp-image-115" src="http://www.joseoc.es/wp-content/uploads/2014/10/eclipse_webapp_maven_project-300x265.png" alt="eclipse_webapp_maven_project" width="300" height="265" srcset="https://www.joseoc.es/wp-content/uploads/2014/10/eclipse_webapp_maven_project-300x265.png 300w, https://www.joseoc.es/wp-content/uploads/2014/10/eclipse_webapp_maven_project.png 682w" sizes="(max-width: 300px) 100vw, 300px" />][2][<img class="aligncenter size-medium wp-image-116" src="http://www.joseoc.es/wp-content/uploads/2014/10/eclipse-new-maven-project-300x251.png" alt="eclipse-new-maven-project" width="300" height="251" srcset="https://www.joseoc.es/wp-content/uploads/2014/10/eclipse-new-maven-project-300x251.png 300w, https://www.joseoc.es/wp-content/uploads/2014/10/eclipse-new-maven-project.png 693w" sizes="(max-width: 300px) 100vw, 300px" />][3]

<p style="text-align: justify">
  Es así de sencillo, pero cuando tengo el proyecto creado aparece el siguiente error:
</p>

<pre class="lang:java decode:true">Description    Resource    Path    Location    Type
The superclass "javax.servlet.http.HttpServlet" was not found on the Java Build Path    index.jsp    /jsf-primefaces-demo/src/main/webapp    line 1    JSP Problem</pre>

<p style="text-align: justify">
  <a href="http://www.joseoc.es/wp-content/uploads/2014/10/javax.servlet.http_.HttpServlet_problem.png"><img class="aligncenter size-medium wp-image-113" src="http://www.joseoc.es/wp-content/uploads/2014/10/javax.servlet.http_.HttpServlet_problem-300x53.png" alt="javax.servlet.http.HttpServlet_problem" width="300" height="53" srcset="https://www.joseoc.es/wp-content/uploads/2014/10/javax.servlet.http_.HttpServlet_problem-300x53.png 300w, https://www.joseoc.es/wp-content/uploads/2014/10/javax.servlet.http_.HttpServlet_problem-1024x180.png 1024w, https://www.joseoc.es/wp-content/uploads/2014/10/javax.servlet.http_.HttpServlet_problem-1038x188.png 1038w, https://www.joseoc.es/wp-content/uploads/2014/10/javax.servlet.http_.HttpServlet_problem.png 1064w" sizes="(max-width: 300px) 100vw, 300px" /></a>Parece ser que no encuentra dicha clase que se debe encontrar en el servlet-api.jar. La solución es sencilla, tan sólo tienes que acceder a las propiedades del proyecto, en esa ventana accede a la sección <span class="lang:default highlight:0 decode:true  crayon-inline">Targeted runtimes</span>  y selecciona runtime server. En esta ventana verás los servidores de aplicaciones que tienes instalados. En mi caso tenía instalado dos versiones de Apache Tomcat. Seleccioné una de ellas y el problema se solucionó.
</p>

<p style="text-align: justify">
  <a href="http://www.joseoc.es/wp-content/uploads/2014/10/eclipse_project_properties_targeted_runtime.png"><img class="aligncenter size-medium wp-image-112" src="http://www.joseoc.es/wp-content/uploads/2014/10/eclipse_project_properties_targeted_runtime-298x300.png" alt="eclipse_project_properties_targeted_runtime" width="298" height="300" srcset="https://www.joseoc.es/wp-content/uploads/2014/10/eclipse_project_properties_targeted_runtime-298x300.png 298w, https://www.joseoc.es/wp-content/uploads/2014/10/eclipse_project_properties_targeted_runtime-150x150.png 150w, https://www.joseoc.es/wp-content/uploads/2014/10/eclipse_project_properties_targeted_runtime.png 672w" sizes="(max-width: 298px) 100vw, 298px" /></a>
</p>

<p style="text-align: justify">
</p>

 [1]: http://www.joseoc.es/wp-content/uploads/2014/10/eclipse_new_maven_project.png
 [2]: http://www.joseoc.es/wp-content/uploads/2014/10/eclipse_webapp_maven_project.png
 [3]: http://www.joseoc.es/wp-content/uploads/2014/10/eclipse-new-maven-project.png