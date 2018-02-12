---
title: "Resolv.conf"
date: 2018-02-12T15:53:05+01:00
description: "Solve DNS issues in Ubuntu due to a bad resolv.conf"
draft: false
---

The OS I use is Ubuntu, more precisely XUbuntu (I use XFCE desktop) and I usually have trouble with my internal network after using the VPN when I work from home. This is because Pulse Secure modifies the content of the file `/etc/resolv.conf` and to solve that what I have to do is:


```
sudo rm /etc/resolv.conf
sudo ln -s /run/resolvconf/resolv.conf /etc/resolv.conf
```