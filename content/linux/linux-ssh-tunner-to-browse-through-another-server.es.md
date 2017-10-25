---
title: Tunel SSH para navegar a través de otro servidor
author: Jose OC
type: post
date: 2016-02-25T20:08:30+00:00
categories:
  - Coding
tags:
  - navegador
  - ssh
  - tunel

---
Esto es muy útil para poder navegar por una web que está alojada en un servidor al que tenemos acceso por SSH pero este servidor no tiene salida, es decir la web no se ve en internet.

<p style="text-align: justify">
  Para ello primero hay que <strong>acceder al servidor vía ssh</strong> añadiendo el parámetro -D <puerto>, siendo el puerto a utilizar para el tunel ssh.
</p>

<pre class="toolbar:2 nums:false lang:sh decode:true">ssh -D 8080 user@myserver</pre>

&nbsp;

Luego configurar el **navegador** para que use un **proxy manual**:

{{< figure src="/linux/firefox_network_config_to_use_proxy.png" title="" >}}


Nótese que para poder acceder a la web que corre en el servidor he eliminado de _&#8216;No proxy for:'_ el valor _&#8216;localhost'_.

Podemos comprobar que nuestra IP de salida ahora no es la anterior sino la IP del servidor al que nos hemos conectado.

Cuando cerremos la conexión ssh tendremos que **restablecer** **la configuración** de red como estaba por defecto: 

{{< figure src="/linux/firefox_network_config_default.png" title="" >}}


Más info:

  * http://askubuntu.com/questions/112177/how-do-i-tunnel-and-browse-the-server-webpage-on-my-laptop
  * https://calomel.org/firefox\_ssh\_proxy.html

&nbsp;