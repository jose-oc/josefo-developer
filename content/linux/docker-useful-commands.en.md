---
title: 'Docker: useful commands'
author: Jose OC
type: post
date: 2016-05-30T09:40:41+00:00
url: /en/blog/docker-useful-commands/
tags:
  - docker
  - terminal

---
To delete **images** <none>:<none>

<pre class="lang:sh decode:true ">docker rmi $(docker images -f "dangling=true" -q)</pre>

&nbsp;