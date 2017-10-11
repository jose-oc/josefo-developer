---
title: Liberando espacio en linux con systemd
author: Jose OC
type: post
date: 2016-04-06T14:35:32+00:00
url: /blog/liberando-espacio-en-linux-con-systemd/
categories:
  - Linux
  - Terminal
tags:
  - free-space

---
En mi caso tenía openSUSE Leap 42.1 y en / tenía un 94% usado quedándome libre tan sólo 2.4G

Para liberar espacio limité el espacio a systemctl editando el archivo <span class="lang:default decode:true  crayon-inline ">/etc/systemd/journald.conf</span>

<pre class="lang:sh decode:true ">[Journal]
SystemMaxUse=500M
RuntimeMaxUse=100M

</pre>

Después hacía falta reiniciar el servicio con <span class="lang:default decode:true  crayon-inline ">systemctl restart systemd-journald.service</span> y tras esto verifiqué el espacio ocupado <span class="lang:default decode:true  crayon-inline ">journalctl &#8211;disk-usage</span> .