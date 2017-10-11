---
title: New maven webapp project with eclipse
date: 2014-10-11T19:51:12+00:00
categories:
  - Coding
  - java
tags:
  - eclipse
  - java
  - maven
  - solving problem

---
<p style="text-align: justify">
  This is the process that I follow to create a new webapp project with maven using eclipse.
</p>

First create new maven project.

{{< figure src="/development/eclipse/eclipse_new_maven_project.png" title="eclipse_new_maven_project" >}}

Select webapp project

{{< figure src="/development/eclipse/eclipse-new-maven-project.png" title="eclipse-new-maven-project" >}}

When it has been created I can see this error:

<pre class="lang:java decode:true">Description    Resource    Path    Location    Type
The superclass "javax.servlet.http.HttpServlet" was not found on the Java Build Path    index.jsp    /jsf-primefaces-demo/src/main/webapp    line 1    JSP Problem</pre>

<p style="text-align: justify">
    {{< figure src="/development/eclipse/javax.servlet.http_.HttpServlet_problem.png" title="javax.servlet.http.HttpServlet_problem" >}}
</p>

<p style="text-align: justify">
  The solution is easy, you just need to access to the project properties, then to the <span class="lang:default highlight:0 decode:true  crayon-inline ">Targeted runtimes</span>  section and select a runtime server. In my case I had two versions of Apache Tomcat configurated. I seleted one of them and the problem was fixed.
</p>

<p style="text-align: justify">
    {{< figure src="/development/eclipse/eclipse_project_properties_targeted_runtime.png" title="eclipse_project_properties_targeted_runtime" >}}
</p>
