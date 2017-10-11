---
title: New maven webapp project with eclipse
author: Jose OC
type: post
date: 2014-10-11T19:51:12+00:00
url: /en/blog/new-maven-webapp-project-with-eclipse/

---
<p style="text-align: justify">
  This is the process that I follow to create a new webapp project with maven using eclipse.
</p>

First create new maven project.[<img class="aligncenter size-medium wp-image-114" src="http://www.joseoc.es/wp-content/uploads/2014/10/eclipse_new_maven_project-300x277.png" alt="eclipse_new_maven_project" width="300" height="277" srcset="https://www.joseoc.es/wp-content/uploads/2014/10/eclipse_new_maven_project-300x277.png 300w, https://www.joseoc.es/wp-content/uploads/2014/10/eclipse_new_maven_project.png 620w" sizes="(max-width: 300px) 100vw, 300px" />][1]

Select webapp project

[<img class="aligncenter size-medium wp-image-115" src="http://www.joseoc.es/wp-content/uploads/2014/10/eclipse_webapp_maven_project-300x265.png" alt="eclipse_webapp_maven_project" width="300" height="265" srcset="https://www.joseoc.es/wp-content/uploads/2014/10/eclipse_webapp_maven_project-300x265.png 300w, https://www.joseoc.es/wp-content/uploads/2014/10/eclipse_webapp_maven_project.png 682w" sizes="(max-width: 300px) 100vw, 300px" />][2][<img class="aligncenter size-medium wp-image-116" src="http://www.joseoc.es/wp-content/uploads/2014/10/eclipse-new-maven-project-300x251.png" alt="eclipse-new-maven-project" width="300" height="251" srcset="https://www.joseoc.es/wp-content/uploads/2014/10/eclipse-new-maven-project-300x251.png 300w, https://www.joseoc.es/wp-content/uploads/2014/10/eclipse-new-maven-project.png 693w" sizes="(max-width: 300px) 100vw, 300px" />][3]

When it has been created I can see this error:

<pre class="lang:java decode:true">Description    Resource    Path    Location    Type
The superclass "javax.servlet.http.HttpServlet" was not found on the Java Build Path    index.jsp    /jsf-primefaces-demo/src/main/webapp    line 1    JSP Problem</pre>

<p style="text-align: justify">
  <a href="http://www.joseoc.es/wp-content/uploads/2014/10/javax.servlet.http_.HttpServlet_problem.png"><img class="aligncenter size-medium wp-image-113" src="http://www.joseoc.es/wp-content/uploads/2014/10/javax.servlet.http_.HttpServlet_problem-300x53.png" alt="javax.servlet.http.HttpServlet_problem" width="300" height="53" srcset="https://www.joseoc.es/wp-content/uploads/2014/10/javax.servlet.http_.HttpServlet_problem-300x53.png 300w, https://www.joseoc.es/wp-content/uploads/2014/10/javax.servlet.http_.HttpServlet_problem-1024x180.png 1024w, https://www.joseoc.es/wp-content/uploads/2014/10/javax.servlet.http_.HttpServlet_problem-1038x188.png 1038w, https://www.joseoc.es/wp-content/uploads/2014/10/javax.servlet.http_.HttpServlet_problem.png 1064w" sizes="(max-width: 300px) 100vw, 300px" /></a>
</p>

<p style="text-align: justify">
  The solution is easy, you just need to access to the project properties, then to the <span class="lang:default highlight:0 decode:true  crayon-inline ">Targeted runtimes</span>  section and select a runtime server. In my case I had two versions of Apache Tomcat configurated. I seleted one of them and the problem was fixed.
</p>

<p style="text-align: justify">
  <a href="http://www.joseoc.es/wp-content/uploads/2014/10/eclipse_project_properties_targeted_runtime.png"><img class="aligncenter size-medium wp-image-112" src="http://www.joseoc.es/wp-content/uploads/2014/10/eclipse_project_properties_targeted_runtime-298x300.png" alt="eclipse_project_properties_targeted_runtime" width="298" height="300" srcset="https://www.joseoc.es/wp-content/uploads/2014/10/eclipse_project_properties_targeted_runtime-298x300.png 298w, https://www.joseoc.es/wp-content/uploads/2014/10/eclipse_project_properties_targeted_runtime-150x150.png 150w, https://www.joseoc.es/wp-content/uploads/2014/10/eclipse_project_properties_targeted_runtime.png 672w" sizes="(max-width: 298px) 100vw, 298px" /></a>
</p>

<p style="text-align: justify">
</p>

 [1]: http://www.joseoc.es/wp-content/uploads/2014/10/eclipse_new_maven_project.png
 [2]: http://www.joseoc.es/wp-content/uploads/2014/10/eclipse_webapp_maven_project.png
 [3]: http://www.joseoc.es/wp-content/uploads/2014/10/eclipse-new-maven-project.png