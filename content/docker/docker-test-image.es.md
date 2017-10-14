---
title: Testeando una imagen docker
date: 2016-05-04T17:33:28+00:00
categories:
  - Coding
tags:
  - docker

---
Los tests nos aseguran que el trabajo hecho es el esperado y también nos aseguran que en modificaciones futuras seguimos teniendo el trabajo que necesitamos.

Las imágenes docker también pueden ser probadas para asegurar que cumplan con nuestros requisitos. Para probarlas podemos usar ruby.

Además de tener ruby instalado necesitamos tener instalado su bundle. En openSUSE lo podemos instalar así:

```bash
  sudo zypper install ruby-devel ruby2.1-rubygem-bundler
```

La idea es que ruby haga correr un contenedor de la imagen que queremos testear y ejecute sobre ella ciertos comandos verificando la salida. También se pueden verificar que existan ficheros o directorios, que contengan cierta información o que la configuración de docker sea la adecuada. Para ver toda la variedad de aserciones que podemos hacer podemos consultar la API de ruby para testear el contenedor docker aquí: http://serverspec.org/resource_types.html

Para poner esto en práctica he añadido algunos de estos tests al proyecto en el que [*dockericé*]({{< relref "docker/dockerizing-java-app.es.md" >}}) una aplicación java</a>, podéis consultarlo en mi github.


Allí encontrarás toda la información sobre cómo ejecutar los tests y cómo se han hecho.
