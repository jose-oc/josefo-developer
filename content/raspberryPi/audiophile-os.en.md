---
title: "Audiophile Os"
date: 2018-01-13T22:58:56+01:00
draft: true
---

## Elegir la distribución

### Distribuciones

Audio OS for RaspberryPI are:
- Volumio, 
- Max2Play, 
- Moode Audio
- Pi MusicBox
- RuneAudio

### Características buscadas

Características buscadas:
- Búsquedas rápidas
- Tener listas de canciones
- Poder añadir canciones a listas
- Poder puntuar canciones
- Spotify u otros servicios de música online
- Podcasts subscription
- Youtube?



## Volumio

### Instalar Volumio con BerryBoot

You can download a prepared image from berryboot.alexgoldcheidt.com or generate yours following this steps: 
https://volumio.org/forum/multiboot-volumio2-with-kodi-under-berryboot-t6818.html

### SSH access

It's disabled by default except the first time you start-up Volumio
`volumio/volumio` or `root/volumio`.

### Configure WIFI

Volumio creates a network called *Volumio*, connect to that network with your laptop or mobile. The password is `volumio2`.
Then get to http://volumio.local and there configure your WIFI.

Restart and then access to http://volumio.local/



## Pi Music Box

### Install

There's an image prepared to be used with BerryBoot.

### Configure WIFI

Before you first start up the distro take the SDCard and mount it on your laptop. Look for a file called `settings.ini` and edit it to set up the WIFI SSID and password.

### PROS

The distro tells you on the screen or TV that you have connected to the Raspberry Pi the IP to access to the WebUI application to control Pi Music Box.

That web UI shows all the music in your library and you can 

### CONS

* I couldn't access the web UI application through the name http://musicbox.local/ I had to use the IP instead.
* I have a USB hard drive with all my music, this is using ext4 as filesystem and I assume the filesystem is using UTF-8. Even so, the web UI application was unable to show and playback my music when there were some non-English character on the path of the file.

## RuneAudio



