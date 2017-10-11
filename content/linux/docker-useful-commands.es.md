---
title: 'Docker: comandos útiles'
author: Jose OC
type: post
date: 2016-05-30T09:39:55+00:00
url: /blog/docker-comandos-utiles/
categories:
  - Linux
  - Terminal
tags:
  - bash
  - comandos
  - docker

---
Borrar **imáges** <none>:<none>

<pre class="lang:sh decode:true ">docker rmi $(docker images -f "dangling=true" -q)</pre>

Borrar volúmenes huérfanos

<pre class="lang:default decode:true ">docker volume rm $(docker volume ls -qf dangling=true)</pre>