---
title: "Forward or not your locales via SSH"
date: 2018-01-12T21:44:17+01:00
draft: false
tags:
  - ssh
---

When you ssh into another machine you can send your locales to that machine to use it if you have that configured, but if that machine doesn't have those locales installed you might get an error similar to this one:

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

I call those environment variables _locales_.

In that case, I don't have the locales *es_ES.UTF-8* nor *en_GB.UTF-8* installed in the remote server.

To support them I could install them on the server with `sudo locale-gen es_ES`


## Configure to send environment variables

If nothing is specified, ssh by default does not send any environment variable.


### SSH Global configuration (Client)

On the client configuration you can say to forward locales if you have this line in `/etc/ssh/ssh_config`

```
SendEnv LANG LC_*
```

### SSH Per-User configuration (Client)

If you have configured ssh client to avoid sending locale environment variables, you can always customize that for a specific host or user by adding that line to your  personal `~/.ssh/config` file.



### SSH Accept locales (Server)

With the configuration file for the ssh daemon `/etc/ssh/sshd_config` you can accept the forwared locales if you have this line (if you don't want to accept them just comment out that line):

```
AcceptEnv LANG LC_*
```

### User's profile

Another solution is to define explicitly the profile for the remote user via `~/.profile` or `~/.bashrc` if it uses bash.


## Override configuration con command

If you use the parameter `-F {{some config file}}` with your ssh command to specify a custom config file for ssh you'd be saying to ssh not to use the global configuration, this is not to use `/etc/ssh/ssh_config`.


----

Sources: 

- https://askubuntu.com/questions/144235/locale-variables-have-no-effect-in-remote-shell-perl-warning-setting-locale-f
- https://superuser.com/questions/485569/how-to-disable-sendenv-variables-set-in-ssh-config-from-ssh-config
- https://bugs.debian.org/cgi-bin/bugreport.cgi?bug=573316