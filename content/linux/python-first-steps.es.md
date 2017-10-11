---
title: 'Python: empezando!'
author: Jose OC
type: post
date: -001-11-30T00:00:00+00:00
draft: true
url: /?p=536
categories:
  - Coding

---
Para empezar con python lo más recomendable es acostumbrarse a usar **virtualenv** para que las dependencias de un proyecto no afecten a otros.

## Requisitos

Tener instalado pip. En ubuntu lo puedes instalar así: <span class="lang:default decode:true  crayon-inline ">sudo apt install python-pip</span>

## Instalarlo

<pre class="lang:python decode:true">pip install virtualenv</pre>

## Uso básico

### Crear nuevo entorno

Crear un entorno virtual para un poyecto:

<pre class="lang:python decode:true">cd my_project_folder
virtualenv env_name</pre>

Se crea una carpeta con el nombre del entorno virtual proporcionado y dentro de dicha carpeta se copia python y sus dependencias básicas.

También podemos especificar qué versión de python usar:

<span class="lang:default decode:true  crayon-inline">~/.local/bin/virtualenv &#8211;python=/usr/bin/python3 demo1env</span>

### Usar un entorno creado

<pre class=""><span class="nb">source</span> demo1env/bin/activate</pre>

### Salir del entorno virtual

<span class="lang:default decode:true  crayon-inline ">deactivate</span>

### Borrar el entorno virtual

Tan simple como borrar la carpeta creada:

<span class="lang:default decode:true  crayon-inline ">rm -rf demo1env</span>

### Pycharm

Si usas el IDE PyCharm puedes configurar tu proyecto para usar el virtualenv que quieras en las opciones del proyecto.