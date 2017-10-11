---
title: Dockerizando una aplicación Java
author: Jose OC
type: post
date: 2016-04-22T22:05:01+00:00
url: /blog/dockerizando-una-aplicacion-java/
categories:
  - Coding
  - java
tags:
  - docker

---
<p style="text-align: justify">
  Voy a explicar cómo dockerizar una aplicación Java, esto es generar una imagen docker que contenga y ejecute una aplicación Java.
</p>

<h1 style="text-align: justify">
  Introducción
</h1>

<p style="text-align: justify">
  Para ello he desarrollado una pequeña aplicación Java que recoge un input, un archivo de texto, le aplica algunas modificaciones y guarda la salida generada, otro archivo de texto. También generará un archivo de logs.
</p>

<p style="text-align: justify">
  La idea es tener una imagen docker con dicha aplicación en su interior y que cuando se ejecute el contenedor docker se ejecute la aplicación y genere tanto el resultado como el log pero que dichos archivos sean accesibles desde fuera del contenedor docker.
</p>

<h1 style="text-align: justify">
  Empaquetar la aplicación Java
</h1>

<p style="text-align: justify">
  Para ello empaquetamos nuestra aplicación en un jar indicándole a maven que escriba en el MANIFEST la información de los jar que necesita para añadirlos al classpath y poder ejecutar la aplicación correctamente: con un plugin de maven escribimos en el manifest la ruta a los archivos jar que son dependencias de nuestra aplicación, con otro se copian estas dependencias al directorio indicado.
</p>

<pre class="lang:xhtml decode:true ">&lt;!-- Make this jar executable --&gt;
                        &lt;plugin&gt;
                                &lt;groupId&gt;org.apache.maven.plugins&lt;/groupId&gt;
                                &lt;artifactId&gt;maven-jar-plugin&lt;/artifactId&gt;
                                &lt;version&gt;2.6&lt;/version&gt;
                                &lt;configuration&gt;
                                        &lt;!-- DO NOT include log4j config file in your Jar --&gt;
                                        &lt;excludes&gt;
                                                &lt;exclude&gt;**/log4j2.xml&lt;/exclude&gt;
                                        &lt;/excludes&gt;
                                        &lt;archive&gt;
                                                &lt;manifest&gt;
                                                        &lt;!-- Jar file entry point --&gt;
                                                        &lt;addClasspath&gt;true&lt;/addClasspath&gt;
                                                        &lt;mainClass&gt;es.joseoc.java.dockerized.App&lt;/mainClass&gt;
                                                        &lt;classpathPrefix&gt;dependency-jars/&lt;/classpathPrefix&gt;
                                                &lt;/manifest&gt;
                                        &lt;/archive&gt;
                                &lt;/configuration&gt;
                        &lt;/plugin&gt;

                        &lt;!-- Copy project dependency --&gt;
                        &lt;plugin&gt;
                                &lt;groupId&gt;org.apache.maven.plugins&lt;/groupId&gt;
                                &lt;artifactId&gt;maven-dependency-plugin&lt;/artifactId&gt;
                                &lt;version&gt;2.10&lt;/version&gt;
                                &lt;executions&gt;
                                        &lt;execution&gt;
                                                &lt;id&gt;copy-dependencies&lt;/id&gt;
                                                &lt;phase&gt;package&lt;/phase&gt;
                                                &lt;goals&gt;
                                                        &lt;goal&gt;copy-dependencies&lt;/goal&gt;
                                                &lt;/goals&gt;
                                                &lt;configuration&gt;
                                                        &lt;!-- exclude junit, we need runtime dependency only --&gt;
                                                        &lt;includeScope&gt;runtime&lt;/includeScope&gt;
                                                        &lt;outputDirectory&gt;${project.build.directory}/dependency-jars/&lt;/outputDirectory&gt;
                                                &lt;/configuration&gt;
                                        &lt;/execution&gt;
                                &lt;/executions&gt;
                        &lt;/plugin&gt;
</pre>

<h1 style="text-align: justify">
  Generar la imagen docker
</h1>

## Usando docker desde consola

<p style="text-align: justify">
  Una vez que tenemos la aplicación como un jar ejecutable queremos crear una imagen docker con ella dentro.
</p>

<p style="text-align: justify">
  Para ello escribimos un archivo Dockerfile en el que partimos de una imagen de java y a la que copiamos dentro de ella el jar de nuestra aplicación y todos los jar que son dependencias. Además copiamos un archivo para configurar log4j y otro que será el input de nuestra aplicación. Para poder acceder a estos archivos le indicamos a docker que queremos 3 volúmenes, esto es 3 rutas del sistema de ficheros que queremos sean accesibles desde fuera del contenedor. Como última línea del Dockerfile le decimos que ejecute el jar, le indicamos también cuál es el archivo de configuración para log4j.
</p>

<p style="text-align: justify">
  Esto lo hacemos con el siguiente Dockerfile:
</p>

<pre class="lang:default decode:true "># It generates the docker image to run the java project
# Before running this script you have to run the maven command: mvn clean package
# To generate the docker image run: docker build -t &lt;user&gt;/&lt;image_name&gt; &lt;path_to_this_file&gt;

FROM java:8

WORKDIR /app/java_project/

# Copy the jar
COPY target/dockerized-0.0.1-SNAPSHOT.jar ./
# Copy dependencies
COPY target/dependency-jars/* ./dependency-jars/
# Copy input data
COPY src/test/resources/file.txt /tmp/docker/input/
COPY src/main/resources/log4j2.xml ./log4j2.xml

# Volumes
VOLUME ["/tmp/docker/input", "/tmp/docker/output", "/tmp/docker/data/logs"]

# Run the jar (CMD)
CMD ["java", "-Dlog4j.configurationFile=/app/java_project/log4j2.xml", "-jar", "dockerized-0.0.1-SNAPSHOT.jar"]
</pre>

<p style="text-align: justify">
  Para generar la imagen docker tenemos que ejecutar estos dos comandos:
</p>

<pre class="lang:default decode:true ">mvn clean package
docker build -t &lt;user&gt;/&lt;image_name&gt; .</pre>

<h2 style="text-align: justify">
  Usando maven
</h2>

<p style="text-align: justify">
  Pero en lugar de dos pasos para generar la imagen docker podemos añadir un plugin para maven de forma que en un solo paso despleguemos la aplicación java y generemos la imagen docker. Al plugin le indicamos un directorio donde estará el Dockerfile además de los recursos que queremos copiar a la imagen docker, en este caso el log4j.xml y el input file.
</p>

<p style="text-align: justify">
  En el pom.xml añadimos:
</p>

<pre class="lang:default decode:true ">&lt;plugin&gt;
                                &lt;groupId&gt;com.spotify&lt;/groupId&gt;
                                &lt;artifactId&gt;docker-maven-plugin&lt;/artifactId&gt;
                                &lt;version&gt;0.4.5&lt;/version&gt;
                                &lt;configuration&gt;
                                        &lt;imageName&gt;joseoc/java-example-001&lt;/imageName&gt;
                                        &lt;dockerDirectory&gt;buildDockerUsingMaven&lt;/dockerDirectory&gt;
                                        &lt;resources&gt;
                                                &lt;resource&gt;
                                                        &lt;targetPath&gt;/app/java_project/&lt;/targetPath&gt;
                                                        &lt;directory&gt;${project.build.directory}&lt;/directory&gt;
                                                        &lt;include&gt;${project.build.finalName}.jar&lt;/include&gt;
                                                &lt;/resource&gt;

                                                &lt;resource&gt;
                                                        &lt;targetPath&gt;/app/java_project/dependency-jars/&lt;/targetPath&gt;
                                                        &lt;directory&gt;${project.build.directory}/dependency-jars&lt;/directory&gt;
                                                        &lt;include&gt;**/*.jar&lt;/include&gt;
                                                        &lt;exclude&gt;.git&lt;/exclude&gt;
                                                &lt;/resource&gt;
                                        &lt;/resources&gt;
                                &lt;/configuration&gt;
                        &lt;/plugin&gt;
</pre>

<p style="text-align: justify">
  Nos creamos un directorio llamado `buildDockerUsingMaven` y dentro añadir los archivos log4j2.xml y el input file con toda la ruta de carpetas que queremos tener dentro de la imagen docker. Además creamos un archivo Dockerfile casi idéntico al anterior, con la diferencia de los archivos que se copian a la imagen docker.
</p>

<pre class="lang:default decode:true ">FROM java:8

COPY app /app
COPY tmp /tmp

VOLUME ["/tmp/docker/input", "/tmp/docker/output", "/tmp/docker/data/logs"]

WORKDIR /app/java_project/

CMD ["java", "-Dlog4j.configurationFile=/app/java_project/log4j2.xml", "-jar", "dockerized-0.0.1-SNAPSHOT.jar"]
</pre>

<p style="text-align: justify">
  Entonces los dos comandos anteriores se reducen a uno:
</p>

<pre class="lang:default decode:true ">mvn clean package docker:build</pre>

<p style="text-align: justify">
  Aquí todo el código:
</p>

<https://github.com/jose-oc/java-dockerized>

&nbsp;