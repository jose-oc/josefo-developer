---
title: SSH tunner to browse through another server
date: 2016-02-25T20:21:06+00:00
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

{{< figure src="/linux/firefox_network_config_to_use_proxy.png" title="" >}}


Notice that if we want to access to the web application using localhost address, because now it's like if we were browsing from the server, we have to remove the text _&#8216;localhost'_ from the field _&#8216;No proxy for:'._

Now we can check the public IP is different from the IP we were using before setting this configuration.

When we finish the ssh connection we should **reset the configuration** in our browser in order to browse the internet normally. 

{{< figure src="/linux/firefox_network_config_default.png" title="" >}}


More info:

  * http://askubuntu.com/questions/112177/how-do-i-tunnel-and-browse-the-server-webpage-on-my-laptop
  * https://calomel.org/firefox\_ssh\_proxy.html

&nbsp;