---
title: SSH tunner to browse through another server
author: Jose OC
type: post
date: 2016-02-25T20:21:06+00:00
url: /en/blog/ssh-tunner-to-browse-through-another-server/
tags:
  - ssh

---
<p style="text-align: justify">
  This comes in handy particularly when you have to browse a web app hosted which is not accessible over the internet but we can reach the server through ssh.
</p>

<p style="text-align: justify">
  First of all we have to <strong>access to the server by ssh</strong> adding the param -D <port>, typing the port we want to use for the ssh tunnel. For instance:
</p>

<pre class="h-align:2 toolbar:2 nums:false lang:sh decode:true">ssh -D 8080 user@myserver</pre>

Secondly we have to configure the browser to use **manual proxy**.

&nbsp;

<a href="http://www.joseoc.es/wp-content/uploads/2016/01/firefox_network_config_to_use_proxy.png" rel="attachment wp-att-426"><img class="aligncenter size-medium wp-image-426" src="http://www.joseoc.es/wp-content/uploads/2016/01/firefox_network_config_to_use_proxy-242x300.png" alt="firefox_network_config_to_use_proxy" width="242" height="300" srcset="https://www.joseoc.es/wp-content/uploads/2016/01/firefox_network_config_to_use_proxy-242x300.png 242w, https://www.joseoc.es/wp-content/uploads/2016/01/firefox_network_config_to_use_proxy.png 477w" sizes="(max-width: 242px) 100vw, 242px" /></a>

Notice that if we want to access to the web application using localhost address, because now it's like if we were browsing from the server, we have to remove the text _&#8216;localhost'_ from the field _&#8216;No proxy for:'._

Now we can check the public IP is different from the IP we were using before setting this configuration.

When we finish the ssh connection we should **reset the configuration** in our browser in order to browse the internet normally. <a href="http://www.joseoc.es/wp-content/uploads/2016/01/firefox_network_config_default.png" rel="attachment wp-att-427"><img class="aligncenter size-medium wp-image-427" src="http://www.joseoc.es/wp-content/uploads/2016/01/firefox_network_config_default-246x300.png" alt="firefox_network_config_default" width="246" height="300" srcset="https://www.joseoc.es/wp-content/uploads/2016/01/firefox_network_config_default-246x300.png 246w, https://www.joseoc.es/wp-content/uploads/2016/01/firefox_network_config_default.png 479w" sizes="(max-width: 246px) 100vw, 246px" /></a>

&nbsp;

More info:

  * http://askubuntu.com/questions/112177/how-do-i-tunnel-and-browse-the-server-webpage-on-my-laptop
  * https://calomel.org/firefox\_ssh\_proxy.html

&nbsp;