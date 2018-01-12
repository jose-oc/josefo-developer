---
title: "Enviar o no tus locales vía SSH"
date: 2018-01-12T21:44:17+01:00
draft: false
tags:
  - ssh
---

Cuando ejecutas ssh para acceder a una máquina remota puedes enviar tus locales ya que es algo configurable en ssh (cuando hablo de _locales_ me refiero a las variables de entorno que muestro más abajo). 
El problema viene cuando las locales que envías no están instaladas en la máquina remota, en ese caso puedes ver caracteres extraños en la consola o un error parecido a éste:


```
warning: Please check that your locale settings:
    LANGUAGE = (unset),
    LC_ALL = (unset),
    LC_TIME = "es_ES.UTF-8",
    LC_MONETARY = "es_ES.UTF-8",
    LC_CTYPE = "en_GB.UTF-8",
    LC_ADDRESS = "es_ES.UTF-8",
    LC_TELEPHONE = "es_ES.UTF-8",
    LC_NAME = "es_ES.UTF-8",
    LC_MEASUREMENT = "es_ES.UTF-8",
    LC_IDENTIFICATION = "es_ES.UTF-8",
    LC_NUMERIC = "es_ES.UTF-8",
    LC_PAPER = "es_ES.UTF-8",
    LANG = "es_ES.UTF-8"
    are supported and installed on your system.
```

Para solucionar lo anterior podría instalar las locales que tengo yo en mi máquina local en la remota, pero hay otras alternativas.



## Configurar el envío de variables de entorno

SSH *por defecto no envía* ninguna variable de entorno.

La forma de especificar si se quiere enviar alguna variable de entorno es usar los archivos de configuración, bien en el cliente o en el servidor para decidir si se aceptan.


### SSH Global configuración (Cliente)

En el cliente se puede especificar qué variables de entorno se quieren enviar, para ello añade una línea con las variables de entorno en el archivo `/etc/ssh/ssh_config`.

```
SendEnv LANG LC_*
```

En esa línea se dice que se envíen las variables de entorno LANG y cualquiera que empiece por LC_. 
Como ves se pueden usar patrones (el asterisco como comodín, la ? como comodín de un solo caracter, etc)

Si no se quiere enviar nada, se elimina dicha línea.

### SSH Per-User configuración (Cliente)

Si tienes el cliente ssh configurado para no enviar ninguna variable de entorno y quieres, para un host concreto o un usuario concreto, enviar variables de entorno, tan sólo tienes que modificar el archivo local de dicho usuario `~/.ssh/config`.


### SSH Accept locales (Server)

En el lado de la máquina remota, la que acepta el acceso ssh, se puede configurar que se acepten o no ciertas variables de entorno. Esto se especifica en el archivo `/etc/ssh/sshd_config` como se muestra en este ejemplo:

```
AcceptEnv LANG LC_*
```

Para no aceptarlas, simplemente no se deben indicar.

### User's profile

Otra solución es definir explícitamente el perfil del usuario en la máquina remota, por ejemplo en alguno de los archivos `~/.profile` o `~/.bashrc` si usas bash.


## Sobreescribir la configuración a nivel de comando

Cuando usas el comando ssh con el argumento `-F` para especificar un archivo de configuración concreto se deja de usar la configuración global del cliente ssh, es decir que se deja de usar la configuración indicada en `/etc/ssh/ssh_config`.


----

Fuentes: 
- https://askubuntu.com/questions/144235/locale-variables-have-no-effect-in-remote-shell-perl-warning-setting-locale-f
- https://superuser.com/questions/485569/how-to-disable-sendenv-variables-set-in-ssh-config-from-ssh-config
- https://bugs.debian.org/cgi-bin/bugreport.cgi?bug=573316