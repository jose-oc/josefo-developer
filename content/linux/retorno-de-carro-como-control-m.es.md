---
title: Retorno de carro como Control+M
date: 2016-08-24T19:02:07+00:00
categories:
  - Coding
  - Linux
  - Terminal
tags:
  - console
  - linux
  - terminal
  - vim

---
<p style="text-align: justify">
  Si te encuentras un fichero de texto que al abrirlo con vim está todo el texto en una línea y donde debía haber un retorno de carro hay un <span class="lang:default highlight:0 decode:true  crayon-inline ">^M</span>  como vemos en la captura de pantalla:
</p>

{{< figure src="/linux/CtrlM_for_newLine-300x49.png" title="" >}}


Podemos cambiar estos retorno de carro por el new line por defecto de Unix. Para ello abrimos el fichero con vim y luego introducimos el comando: `:%s/^M/\r/g`


<p style="text-align: justify">
  Ojo, para escribir ése <span class="lang:default highlight:0 decode:true  crayon-inline ">^M</span>  hay que pulsar: <span class="lang:default highlight:0 decode:true  crayon-inline ">Ctrl</span> +<span class="lang:default highlight:0 decode:true  crayon-inline ">V</span>  <span class="lang:default highlight:0 decode:true  crayon-inline ">Ctrl</span> +<span class="lang:default highlight:0 decode:true  crayon-inline ">M</span>
</p>


<p style="text-align: justify">
  Fuente: http://unix.stackexchange.com/questions/32001/what-is-m-and-how-do-i-get-rid-of-it
</p>