---
title: "Multiboot - More than one OS on your Raspberry Pi"
date: 2018-01-13T20:27:35+01:00
draft: true
---

I want to have more than one OS on the SDCard I have on my Raspberry Pi with one of them to be started by default. 

<!-- more -->

## A tener en cuenta

As far as I've read, NOOBS doesn't allow to add and remove an OS once you have it installed, according to this [post](https://www.raspberrypi.org/forums/viewtopic.php?f=63&t=185932), so I've decided to use [BerryBoot](http://www.berryterminal.com/doku.php/berryboot).


## Go about

### Format SD Card

I formated the SD Card with GParted and I created a whole partition (16Gb) using FAT32.

{{< figure src="/raspberryPi/format-SDCard.png" >}}

### Copy BerryBoot to SDCard

This is just to copy the files from within the zip to the root of the SD Card. Supposing the card is mounted on _/media/jose/3A5E-4A9C/_:

```bash
cd /media/jose/3A5E-4A9C/
cp ~/Downloads/berryboot-20170527-pi2-pi3.zip .
unzip berryboot-20170527-pi2-pi3.zip
rm berryboot-20170527-pi2-pi3.zip
umount /media/jose/3A5E-4A9C
```

### Start up the Raspberry PI

Set up the Raspberry Pi, SDCard in it, connected to the TV or monitor, keyboard and mouse.
