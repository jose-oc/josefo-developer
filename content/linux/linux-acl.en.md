---
title: ACL en linux
author: Jose OC
type: post
date: 2016-01-01T00:00:00+00:00
draft: true
url: /?p=422
categories:
  - Linux
  - Terminal

---
Tengo un directorio que pertenece al usuario tomcat y grupo users con permisos rwxrwxr-x para los directorios y rwxrwxr&#8211; para los ficheros.

Quiero que el usuario &#8216;jose' sea capaz de crear subdirectorios y ficheros.

Ejecutando :

setfacl -Rm g:users:rwX,d:g:users:rwX directory/

permito que cualquier usuario del grupo &#8216;users' pueda crear directorios y ficheros.

Con getfacl directory/ podemos ver los permisos ACL

&nbsp;

Ver <http://superuser.com/questions/151911/how-to-make-new-file-permission-inherit-from-the-parent-directory>