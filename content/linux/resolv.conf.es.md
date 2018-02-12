---
title: "Resolv.conf"
date: 2018-02-12T15:53:01+01:00
description: "Solucionar problemas de DNS en Ubuntu por una mala configuración en resolv.conf"
draft: false
---

El Sistema Operativo que uso es Ubuntu, siendo más precisos, XUbuntu (uso el entorno XFCE) y es frecuente que tras haber usado la VPN para trabajar desde casa no pueda acceder a ciertas IPs de la red interna de mi empresa. Esto es porque Pulse Secure modifica el contenido del archivo _/etc/resolv.conf_. 
Lo soluciono de esta forma:


```
sudo rm /etc/resolv.conf
sudo ln -s /run/resolvconf/resolv.conf /etc/resolv.conf
```