---
title: Tunel SSH para navegar a través de otro servidor
author: Jose OC
type: post
date: 2016-02-25T20:08:30+00:00
url: /blog/tunel-ssh-para-navegar-a-traves-de-otro-servidor/
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

<a href="http://www.joseoc.es/wp-content/uploads/2016/01/firefox_network_config_to_use_proxy.png" rel="attachment wp-att-426"><img class="aligncenter size-medium wp-image-426" src="http://www.joseoc.es/wp-content/uploads/2016/01/firefox_network_config_to_use_proxy-242x300.png" alt="firefox_network_config_to_use_proxy" width="242" height="300" srcset="https://www.joseoc.es/wp-content/uploads/2016/01/firefox_network_config_to_use_proxy-242x300.png 242w, https://www.joseoc.es/wp-content/uploads/2016/01/firefox_network_config_to_use_proxy.png 477w" sizes="(max-width: 242px) 100vw, 242px" /></a>

Nótese que para poder acceder a la web que corre en el servidor he eliminado de _&#8216;No proxy for:'_ el valor _&#8216;localhost'_.

Podemos comprobar que nuestra IP de salida ahora no es la anterior sino la IP del servidor al que nos hemos conectado.

Cuando cerremos la conexión ssh tendremos que **restablecer** **la configuración** de red como estaba por defecto: <a href="http://www.joseoc.es/wp-content/uploads/2016/01/firefox_network_config_default.png" rel="attachment wp-att-427"><img class="aligncenter size-medium wp-image-427" src="http://www.joseoc.es/wp-content/uploads/2016/01/firefox_network_config_default-246x300.png" alt="firefox_network_config_default" width="246" height="300" srcset="https://www.joseoc.es/wp-content/uploads/2016/01/firefox_network_config_default-246x300.png 246w, https://www.joseoc.es/wp-content/uploads/2016/01/firefox_network_config_default.png 479w" sizes="(max-width: 246px) 100vw, 246px" /></a>

&nbsp;

Más info:

  * http://askubuntu.com/questions/112177/how-do-i-tunnel-and-browse-the-server-webpage-on-my-laptop
  * https://calomel.org/firefox\_ssh\_proxy.html

&nbsp;