---
title: Establecer atajo de teclados para controlar el volúmen en Xubuntu
date: 2015-05-07T19:21:59+00:00
categories:
  - Linux
tags:
  - shortcut
  - xfce
  - xubuntu

---
El teclado que uso no tiene teclas especiales para controlar el sonido, por eso he configurado unos atajos de teclado para controlarlo con las siguientes teclas:

  * Ctrl + May + Inicio: para subir el volúmen
  * Ctrl + May + Fin: para bajarlo
  * Ctrl + May + Insert: para silenciarlo o quitar el silecio

El haber escogido estas teclas ha sido por comodidad.

&nbsp;

Para establecerlos tan solo tienes que ir a la configuración del teclado, en la pestaña de atajos de teclado y añadir los tres atajos:

  * Para subir el volúmen <span class="lang:sh decode:true  crayon-inline ">sh -c &#8220;pactl set-sink-mute 1 false ; pactl &#8212; set-sink-volume 1 +5%&#8221;</span> 
  * Para bajar el volúmen <span class="lang:sh decode:true  crayon-inline ">sh -c &#8220;pactl set-sink-mute 1 false ; pactl &#8212; set-sink-volume 1 -5%&#8221;</span> 
  * Para conmutar el silencio <span class="lang:sh decode:true  crayon-inline">sh -c &#8220;pactl set-sink-mute 1 toggle&#8221;</span> 

Tras añadir cada instrucción la ventana te pide que pulses la combinación de teclado que deseas asociar, si dicho atajo ya está siendo usado te preguntará si quieres sobreescribirlo, sino directamente lo guarda.

&nbsp;

Algunas capturas de pantalla para mostrarlo gráficamente:

{{< figure src="/linux/keyboard_config_to_set_shortcut.png" title="" >}}

{{< figure src="/linux/add_new_keyboard_shortcut.png" title="" >}}

Pulsar el botón Add para añadir un nuevo atajo

Estableciendo los atajos:

{{< figure src="/linux/add_new_keyboard_shortcut.png" title="" >}}

{{< figure src="/linux/xfce_shortcut_turn_volume_up.png" title="" >}}

{{< figure src="/linux/xfce_shortcut_turn_volume_down.png" title="" >}}

Quedando así:

{{< figure src="/linux/xfce_shortcut_turn_volume_mute.png" title="" >}}

{{< figure src="/linux/xfce_shortcuts_volume.png" title="" >}}