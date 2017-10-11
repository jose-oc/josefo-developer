---
title: How to use ssh and scp without passwords
author: Jose OC
type: post
date: 2015-09-27T01:08:34+00:00
url: /en/blog/how-to-use-ssh-and-scp-without-passwords/
tags:
  - ssh

---
You just need to follow 3 simple steps: create keys, copy public key to remote server and configure an easy connection.

  1. Create keys. I want a special name like id\_rsa\_pi. When I was asked I chose not to write a passphrase. <pre class="lang:sh decode:true">cd ~/.ssh
ssh-keygen -t rsa  -f ~/.ssh/id_rsa_pi</pre>

  2. Copy public key to the remote server. On the remote server must exist the directory \`~/.ssh\`. Two ways of doing it: <pre class="lang:sh decode:true">cat ~/.ssh/id_rsa_pi.pub | ssh usuario@servidordestino 'cat &gt;&gt; .ssh/authorized_keys'</pre> Another way: 
    
    <pre class="lang:sh decode:true">ssh-copy-id -i ~/.ssh/id_rsa_pi.pub usuario@servidor.com</pre> Now you can run ssh without passwords this way: 
    
    <span class="lang:sh decode:true crayon-inline ">ssh -i id_rsa_pi pi@server</span> 
  3. Configure for easier connection. <span class="lang:sh decode:true crayon-inline ">vi ~/.ssh/config</span> <pre class="lang:sh decode:true">Host serverABC
  IdentityFile /home/jose/.ssh/id_rsa_serverABC
Host piserver
  IdentityFile ~/.ssh/id_rsa_pi
  User pi
  HostName 1.2.3.4
  Port 22</pre>  

&nbsp;

Issues:

If you have more than one ssh key loaded by ssh-add command you may get an error trying to connect via ssh, something like this:

<pre class="lang:sh decode:true">ssh piserver
Received disconnect from 1.2.3.4: 2: Too many authentication failures for pi</pre>

This is because ssh by default try to use all the keys.

You can avoid this by adding another parameter:

<pre class="lang:sh decode:true ">ssh -o IdentitiesOnly=yes piserver</pre>

This is also useful to use the scp command.

<http://serverfault.com/questions/580753/ssh-aborts-with-too-many-authentication-failures>

&nbsp;

For more information about the config file: <http://www.cyberciti.biz/faq/create-ssh-config-file-on-linux-unix/>