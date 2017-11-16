---
title: "Spring Boot First Steps"
date: 2017-11-15T17:02:53+01:00
draft: true
---

<h1 style="text-align: justify;">Introducción</h1>
<p style="text-align: justify;">Voy a explicar cómo comenzar un <strong>proyecto web Java</strong> basado en Spring.
Crearemos el proyecto de una forma muy rápida ya que se basará el Spring Boot, haremos que tenga un controlador para servir una sencilla página HTML e implementaremos el mecanismo para que con una llamada Ajax se modifique dicha página usando un controlador REST.</p>
<p style="text-align: justify;">Las tecnologías que usaré son:</p>

<ul style="text-align: justify;">
    <li>Spring
<ul>
    <li>Spring Boot</li>
    <li>Spring MVC</li>
</ul>
</li>
    <li>Thymeleaf Template Engine</li>
</ul>
Como IDE usaré Eclipse Spring Tool Suite. Crear el proyecto Debemos tener instalado el IDE STS, si no lo tienes lo puedes descargar gratuitamente desde https://spring.io/tools/sts/all. Abrir el IDE y crear un proyecto nuevo de tipo "Spring Starter Project" 

<a href="http://localhost:9000/wp-content/uploads/2015/01/Captura-de-pantalla-2015-01-10-a-las-13.11.02.png">
    <img class="aligncenter size-medium wp-image-204" src="http://localhost:9000/wp-content/uploads/2015/01/Captura-de-pantalla-2015-01-10-a-las-13.11.02-300x83.png" alt="New Spring Starter Project" width="300" height="83" />
</a>

En la ventana que aparece tenemos que rellenar los datos iniciales:<strong>Name</strong>
<ul style="text-align: justify;">
<ul style="text-align: justify;">: el nombre del proyecto en eclipse</ul>
</ul>
<strong>Type</strong>
<ul style="text-align: justify;">
<ul style="text-align: justify;">: para elegir usar maven o gradle</ul>
</ul>
<strong>Packaging</strong>
<ul style="text-align: justify;">
<ul style="text-align: justify;">: la forma en la que queremos empaquetar nuestro proyecto</ul>
</ul>
<strong>Group</strong>
<ul style="text-align: justify;">
<ul style="text-align: justify;">: el grupo bajo el que tenemos todos nuestros proyectos para identificarlos de forma unívoca</ul>
</ul>
<strong>Artifact</strong>
<ul style="text-align: justify;">
<ul style="text-align: justify;">: el nombre que se le dará al archivo jar que se generará para distribuir el proyecto</ul>
</ul>
<strong>Version</strong>
<ul style="text-align: justify;">
<ul style="text-align: justify;">: versión del proyecto</ul>
</ul>
<strong>Description</strong>
<ul style="text-align: justify;">
<ul style="text-align: justify;">: una breve descripción para dar a conocer tu proyecto</ul>
</ul>
<strong>Dependencias</strong>
<ul style="text-align: justify;">
<ul style="text-align: justify;">: aquí puedes escoger entre las dependencias que Spring te ofrece de forma que te facilitará su descarga y configuración. Para nuestro caso escogeremos:
<ul></ul>
</ul>
</ul>
<strong>Web</strong>
<ul style="text-align: justify;">
<ul style="text-align: justify;">
<ul>: para disponer de Spring MVC además de tener un Tomcat embebido, lo que facilita el poder probar la aplicación y distribuirla sin preocuparnos de instalar un servidor de aplicaciones web.</ul>
</ul>
</ul>
<strong>Thymeleaf</strong>
<ul style="text-align: justify;">
<ul>: para disponer de este motor de template y su integración con Spring</ul>
</ul>
<p style="text-align: justify;">
    <a href="http://localhost:9000/wp-content/uploads/2015/01/New-Spring-Boot-Project-Thymeleaf.png" target="_blank">
        <img class="aligncenter wp-image-205 size-full" src="http://localhost:9000/wp-content/uploads/2015/01/New-Spring-Boot-Project-Thymeleaf.png" alt="Configure the new Spring Boot Project with Thymeleaf" width="587" height="667" />
</a></p>
<p style="text-align: justify;">Ojo al <strong>problema de las versiones</strong>. Si escoges la versión 1.2.1 de Spring Boot estarás usando por defecto Tomcat 8 y éste no soporta Java 6 por lo que si escoges esa configuración (como aparece en la captura de pantalla) tendrás tu código compilado con Java 6 pero se ejecutará en un Tomcat que no lo soporta, por tanto cuando arranques la aplicación dará una excepción de tipo UnsupportedClassVersionError como la siguiente:</p>
<p style="text-align: justify;"><span class="lang:java decode:true  crayon-inline ">java.lang.UnsupportedClassVersionError Unsupported major.minor version 51.0</span></p>
<p style="text-align: justify;">Si el proyecto no tuviera limitación en cuanto a versiones yo escogería las últimas estables, a ser posible usando Java 8. Si, como en este caso, se limita la versión de Java del proyecto a Java 6 es necesario escoger Java 1.6 (como se muestra en la imagen) y Spring Boot 1.1.10.RELEASE.</p>
<p style="text-align: justify;"></p>
<p style="text-align: justify;">Una vez completado esto el IDE se conecta al servidor de Spring para descargar todas las dependencias y código que necesita para crear el proyecto lo que puede tardar un ratito.
Cuando termina tenemos una estructura de proyecto como ésta:
<a href="http://localhost:9000/wp-content/uploads/2015/01/Spring-Project-Structure.png"><img class="aligncenter size-full wp-image-206" src="http://localhost:9000/wp-content/uploads/2015/01/Spring-Project-Structure.png" alt="Spring-Project-Structure" width="230" height="198" /></a></p>

<h1 style="text-align: justify;">Página de bienvenida</h1>
<p style="text-align: justify;">Vamos a crear una página de bienvenida muy sencilla pero haciendo uso de Thymeleaf y Bootstrap.</p>

<h2 style="text-align: justify;">Crear el controlador</h2>
<p style="text-align: justify;">Lo primero será crear el controlador, el código que recibe la petición y decide qué se de mostrar en el navegador. Será el controlador más sencillo que se puede crear.
Creamos una nueva clase llamada <span class="lang:default highlight:0 decode:true  crayon-inline ">WelcomeController</span>  que estará en el paquete <span class="lang:default highlight:0 decode:true  crayon-inline ">es.joseoc.controllers</span> .</p>
<p style="text-align: justify;"><a href="http://localhost:9000/wp-content/uploads/2015/01/SpringWeb-createWelcomeController.png"><img class="aligncenter size-medium wp-image-208" src="http://localhost:9000/wp-content/uploads/2015/01/SpringWeb-createWelcomeController-261x300.png" alt="SpringWeb-createWelcomeController" width="261" height="300" /></a></p>
&nbsp;
<p style="text-align: justify;">La clase debe estar anotada con <span class="lang:java highlight:0 decode:true  crayon-inline ">@org.springframework.stereotype.Controller</span> Creamos un método con el nombre que queramos que devuelva un String y lo anotamos con <span class="lang:java highlight:0 decode:true  crayon-inline ">org.springframework.web.bind.annotation.RequestMapping</span> . El String que devuelva el método será el nombre del archivo que usará Thymeleaf como template html. En este caso como devuelvo un "index" voy a crear un archivo index.html en el directorio <span class="lang:default highlight:0 decode:true  crayon-inline ">src/main/resources/templates</span> .</p>
<p style="text-align: justify;">Quedando la clase así:</p>

<pre class="lang:java decode:true" title="WelcomenController">@Controller
public class WelcomeController {

    @RequestMapping("/")
    public String index() {
        return "index";
    }
}</pre>
&nbsp;
<h2>Crear la vista</h2>
Y el template index.html:
<pre class="lang:default decode:true">&lt;!DOCTYPE HTML&gt;
&lt;html xmlns:th="http://www.thymeleaf.org"&gt;
&lt;head&gt; 
    &lt;title&gt;Ghost Game&lt;/title&gt; 
    &lt;meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;h1&gt;Welcome to Ghost Game&lt;/h1&gt;
&lt;/body&gt;
&lt;/html&gt;
</pre>
<h2> Ejecutando el proyecto</h2>
Teniendo esto ya podemos probarlo, ejecutamos el proyecto haciendo clic con el botón derecho sobre el proyecto y en el menú contextual buscamos: <span class="lang:default highlight:0 decode:true  crayon-inline ">Run As -&gt; Spring Boot App</span>

<a href="http://localhost:9000/wp-content/uploads/2015/01/SpringBoot-run.png"><img class="aligncenter size-medium wp-image-207" src="http://localhost:9000/wp-content/uploads/2015/01/SpringBoot-run-278x300.png" alt="SpringBoot-run" width="278" height="300" /></a>

&nbsp;

Ahora sólo tienes que acceder con tu navegador a http://localhost:8080/ y ver la página.

{{< figure src="/development/java/spring-boot/spring-boot-running.png"  >}}
