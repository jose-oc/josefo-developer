---
title: "Key Frames"
date: 2017-11-29T16:38:30+01:00
draft: false
---

Un archivo de vídeo digital está formado por frames, de hecho un parámetro típico es cuántos frames por segundo tiene un vídeo (fps). Pero no todos los frames son iguales, hay distintos tipos de frames y gracias a esto los vídeos pueden tener el tamaño que tienen, sino serían muchísimo más grandes. ¡Imagínate lo que pesaría un archivo en el que todos los frames fueran las típicas imágenes JPG!

Los frames llamados **key-frame** parecen que pertenecen a un modelo superior, por eso de _key_, y de hecho contienen más información que cualquier otro tipo de frame.
Los distintos tipos de frames son **I-Frame**, **P-Frame** o **B-Frame**.

<!-- more -->



# Vocabulary

## Frames

### I-Frame

**Intra-coded Frames**. Son los frames menos comprimidos del vídeo y, lo más importante, no necesitan de ningún otro frame del vídeo para tener sentido: Estos frames son algo así como una imagen estática del vídeo, como si sacaras un JPG.

### P-Frame

**Predicted Frames**. Son frames con mayor compresión que los I-frames porque hacen uso de información del frame anterior.

### B-Frame

**Bi-directional predicted Frames**. Son los frames con mayor compresión, más que los dos anteriores, ya que usan información tanto del frame anterior como del posterior. 

Piensa que en una película habrá muchos frames que son muy parecidos entre sí así que no tiene demasiado sentido repetir la misma información muchas veces ya que puede estar repetida en los frames anteriores y/o posteriores. 

## GOP (Group of Pictures)

Un GOP es una colección de frames independiente de cualquier otro GOP. Su tamaño es variable, que varía desde un solo frame hasta el número que se necesite, aunque lo más común es que no supere los 15 frames.
Empieza por un I-Frame y si sólo tiene un frame debe ser de este tipo.


# Usando ffmpeg

## Cómo establecer key-frames en posiciones fijas

Para indicarle a ffmpeg que codifique un vídeo estableciendo los I-frames en posiciones específicas se pueden usar dos opciones de parámetros: 

### `-g 60 -keyint_min 60`

Así se le indica a ffmpeg que establezca un I-Frame cada 2 minutos (60 segundos).
El parámetro `-g` dice la distancia **máxima** entre dos I-frames, se le conoce como el _intervalo de keyframe_ o _la distancia GOP_.
El parámetro `-keyint_min` indica la distancia **mímina** entre dos I-frames, se conoce como mínima distancia entre GOP.


### `-force_key_frames "expr:gte(t,n_forced*2)"`

Este parámetro indica que se debe establecer un I-frame cada vez que se cumpla la condición indicada. En este caso es establece uno cada 2 minutos de vídeo (el número dos es variable), 
`n_forced` es una palabra reservada: el número de frames forzados
`t` también es una palabra reservada: el tiempo del frame actual.


## Evitando extra keyframes

Con el comando anterior no se evita que ffmpeg añada I-frames si lo ve conveniente, lo que sí se puede evitar si en lugar de los parámetros anteriores se usan estos dos, indicando que (en este ejemplo) cada 48 frames como mínimo tiene que poner un i-frame y cada 48 frames como máximo tiene que poner un i-frame, con lo cual estamos definiendo exactamente dónde deben estar los i-frames.

`-g 48 -keyint_min 48` 

Ejemplo de llamada ffmpeg: 

```bash
ffmpeg -i input_video.mp4 -y -ss 0 -t 15 -aspect 16:9 -g 48 -keyint_min 48 -sc_threshold 0 output.mp4
```


## Comprobar dónde están los keyframes

Usando el comando ffprobe se puede analizar un fichero de vídeo para obtener mucha información, sino haza la prueba, ejecuta: 

```bash
ffprobe -select_streams v -show_frames -print_format json video.mp4 > video.show_frames.json
```

Verás que el json contiene mucha información de cada uno de los frames.

Usando un poco de bash se pueden filtrar cuáles son los i-frames (los números de frame que son i-frames):

```bash
ffprobe -select_streams v -show_frames \
-show_entries frame=pict_type \
-of csv ${VIDEO_FILENAME} \
| grep -n I | cut -d ':' -f 1 > keyframes_number.txt
```

O bien ver en qué **tiempos** están los i-frames:

```bash
ffprobe -select_streams v:0 -show_frames \
-print_format csv ${VIDEO_FILENAME} \
| awk -F ',' '{ if ($4 > 0) print $6; }' > keyframes_times.txt
```

Gracias a [slhck](https://superuser.com/questions/885452/extracting-the-index-of-key-frames-from-a-video-using-ffmpeg)


# Más información: 

* https://en.wikipedia.org/wiki/Video_compression_picture_types
* https://en.wikipedia.org/wiki/Group_of_pictures