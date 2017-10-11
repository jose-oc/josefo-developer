---
title: Establecer atajo de teclados para controlar el volúmen en Xubuntu
author: Jose OC
type: post
date: 2015-05-07T19:21:59+00:00
url: /blog/establecer-atajo-de-teclados-para-controlar-el-volumen-en-xubuntu/
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

Abriendo la ventana de atajos de teclado: [<img class="aligncenter size-medium wp-image-292" src="http://www.joseoc.es/wp-content/uploads/2015/05/keyboard_config_to_set_shortcut.png" alt="keyboard_config_to_set_shortcut" width="256" height="222" />][1]

<div id="attachment_291" style="width: 310px" class="wp-caption aligncenter">
  <a href="http://www.joseoc.es/wp-content/uploads/2015/05/add_new_keyboard_shortcut.png"><img class="wp-image-291 size-medium" src="http://www.joseoc.es/wp-content/uploads/2015/05/add_new_keyboard_shortcut-300x59.png" alt="add_new_keyboard_shortcut" width="300" height="59" srcset="https://www.joseoc.es/wp-content/uploads/2015/05/add_new_keyboard_shortcut-300x59.png 300w, https://www.joseoc.es/wp-content/uploads/2015/05/add_new_keyboard_shortcut.png 581w" sizes="(max-width: 300px) 100vw, 300px" /></a>
  
  <p class="wp-caption-text">
    Pulsar el botón Add para añadir un nuevo atajo
  </p>
</div>

Estableciendo los atajos:

[<img class="aligncenter size-medium wp-image-293" src="http://www.joseoc.es/wp-content/uploads/2015/05/xfce_shortcut_turn_volume_up-300x163.png" alt="xfce_shortcut_turn_volume_up" width="300" height="163" srcset="https://www.joseoc.es/wp-content/uploads/2015/05/xfce_shortcut_turn_volume_up-300x163.png 300w, https://www.joseoc.es/wp-content/uploads/2015/05/xfce_shortcut_turn_volume_up.png 612w" sizes="(max-width: 300px) 100vw, 300px" />][2] [<img class="aligncenter size-medium wp-image-294" src="http://www.joseoc.es/wp-content/uploads/2015/05/xfce_shortcut_turn_volume_down-300x122.png" alt="xfce_shortcut_turn_volume_down" width="300" height="122" srcset="https://www.joseoc.es/wp-content/uploads/2015/05/xfce_shortcut_turn_volume_down-300x122.png 300w, https://www.joseoc.es/wp-content/uploads/2015/05/xfce_shortcut_turn_volume_down.png 654w" sizes="(max-width: 300px) 100vw, 300px" />][3] [<img class="aligncenter size-medium wp-image-295" src="http://www.joseoc.es/wp-content/uploads/2015/05/xfce_shortcut_turn_volume_mute-300x159.png" alt="xfce_shortcut_turn_volume_mute" width="300" height="159" srcset="https://www.joseoc.es/wp-content/uploads/2015/05/xfce_shortcut_turn_volume_mute-300x159.png 300w, https://www.joseoc.es/wp-content/uploads/2015/05/xfce_shortcut_turn_volume_mute.png 502w" sizes="(max-width: 300px) 100vw, 300px" />][4]Quedando así:

[<img class="aligncenter size-medium wp-image-296" src="http://www.joseoc.es/wp-content/uploads/2015/05/xfce_shortcuts_volume-300x45.png" alt="xfce_shortcuts_volume" width="300" height="45" srcset="https://www.joseoc.es/wp-content/uploads/2015/05/xfce_shortcuts_volume-300x45.png 300w, https://www.joseoc.es/wp-content/uploads/2015/05/xfce_shortcuts_volume.png 548w" sizes="(max-width: 300px) 100vw, 300px" />][5]

 [1]: http://www.joseoc.es/wp-content/uploads/2015/05/keyboard_config_to_set_shortcut.png
 [2]: http://www.joseoc.es/wp-content/uploads/2015/05/xfce_shortcut_turn_volume_up.png
 [3]: http://www.joseoc.es/wp-content/uploads/2015/05/xfce_shortcut_turn_volume_down.png
 [4]: http://www.joseoc.es/wp-content/uploads/2015/05/xfce_shortcut_turn_volume_mute.png
 [5]: http://www.joseoc.es/wp-content/uploads/2015/05/xfce_shortcuts_volume.png