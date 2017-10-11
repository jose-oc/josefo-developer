---
title: Acceder a un servidor ssh sin necesidad de password
author: Jose OC
type: post
date: 2014-12-10T11:41:24+00:00
url: /blog/acceder-a-un-servidor-ssh-sin-necesidad-de-password/
categories:
  - Linux
  - Terminal
tags:
  - ssh

---
<h1 style="text-align: justify">
  Generar claves
</h1>

<p style="text-align: justify">
  Cuando tienes que trabajar a diario con varios servidores y tienes que acceder a ellos por ssh y copiar archivos usando scp es muy incómodo tener que estar escribiendo las contraseñas todas las veces, sobretodo cuando las contraseñas no son fáciles. Pero para esto podemos usar la comodidad de hacer que los equipos confíen entre ellos usando certificados digitales.
</p>

<p style="text-align: justify">
  Si no tienes creadas tus claves pública y privada deberás ejecutar lo siguiente en la consola:
</p>

<pre class="lang:sh decode:true">ssh-keygen

Generating public/private rsa key pair.
Enter file in which to save the key (/home/jose/.ssh/id_rsa):[Enter key]
Enter passphrase (empty for no passphrase): [Press enter key]
Enter same passphrase again: [Pess enter key]
Your identification has been saved in /home/jose/.ssh/id_rsa.
Your public key has been saved in /home/jose/.ssh/id_rsa.pub.
The key fingerprint is:
33:33:33:33:33:33:33:33:33:33:33:33:33:33:33:33</pre>

<h2 style="text-align: justify">
  Configuración
</h2>

<p style="text-align: justify">
  Una vez tenemos el archivo .pub creado (por defecto se crea en tu home dentro de un directorio .ssh) lo copiamos al servidor, te pedirá la contraseña ssh:
</p>

<pre class="lang:sh decode:true">ssh-copy-id -i  ~/.ssh/id_rsa.pub jose@10.20.30.40</pre>

<p style="text-align: justify">
  Ya podrás conectar al servidor sin que te pida la contraseña:
</p>

<pre class="lang:sh decode:true ">ssh jose@10.20.30.40</pre>

<p style="text-align: justify">
</p>

<li value="3">
  Configure for easier connection. <span class="lang:sh decode:true crayon-inline ">vi ~/.ssh/config</span> <pre class="lang:sh decode:true">Host serverABC
  IdentityFile /home/jose/.ssh/id_rsa_serverABC
Host piserver
  IdentityFile ~/.ssh/id_rsa_pi
  User pi
  HostName 1.2.3.4
  Port 22</pre>  
</li>

Issues:

If you have more than one ssh key loaded by ssh-add command you may get an error trying to connect via ssh, something like this:

<pre class="lang:sh decode:true">ssh piserver
Received disconnect from 1.2.3.4: 2: Too many authentication failures for pi</pre>

This is because ssh by default try to use all the keys.

You can avoid this by adding another parameter:

<pre class="lang:sh decode:true ">ssh -o IdentitiesOnly=yes piserver</pre>

This is also useful to use the scp command.

<http://serverfault.com/questions/580753/ssh-aborts-with-too-many-authentication-failures>

For more information about the config file: <http://www.cyberciti.biz/faq/create-ssh-config-file-on-linux-unix/>

<p style="text-align: justify">
</p>

<h1 style="text-align: justify">
  <strong><span style="text-decoration: underline">Problemas conocidos</span></strong>
</h1>

<h2 style="text-align: justify">
  Permisos
</h2>

<p style="text-align: justify">
  Después de un tiempo usando esta técnica para autenticarme sin necesidad de contraseña me encontré con un servidor donde no podía hacerlo, copiaba mi clave pública al servidor con éxito pero cuando accedía a él vía ssh me seguía pidiendo la contraseña. Probé varias veces sin éxito. El problema lo resolví cambiando los permisos de mi home, que tenía permisos 777, a 766 para <strong>quitar el permiso de escritura al grupo y a otros</strong>. También modifiqué los permisos del directorio .ssh en el servidor a 700 y quité los permisos de escritura para el grupo y otros al archivo /home/jortiz/.ssh/authorized_keys
</p>

<h2 style="text-align: justify">
  Usar la clave correcta
</h2>

<p style="text-align: justify">
  Si tienes varias claves y
</p>