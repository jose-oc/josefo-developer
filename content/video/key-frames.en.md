---
title: "Key Frames"
date: 2017-11-29T16:38:27+01:00
draft: true
---

A digital video file can be broken down into frames but not all the frames are the same type, there are different type of frames. Some of them are generally known as key frame but according to the research I've done there isn't a correct definition of it and people call key frame to different things.

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


# In ffmpeg

## How to set a fixed GOP size

Para indicarle a ffmpeg que codifique un vídeo estableciendo los I-frames en posiciones específicas se pueden usar dos opciones de parámetros: 

### `-g 60 -keyint_min 60`

Así se le indica a ffmpeg que establezca un I-Frame cada 2 minutos (60 segundos).
The parameter `-g` set the **maximum** distance between two I-frames, it is known as _keyframe interval_ or _GOP length_.
The parameter `-keyint_min` set the **minimum** distance between two I-frames, it is known as _minimum GOP length_.


### `-force_key_frames "expr:gte(t,n_forced*2)"`

Este parámetro indica que se debe establecer un I-frame cada vez que se cumpla la condición indicada. En este caso es establece uno cada 2 minutos de vídeo (el número dos es variable), 
`n_forced` es una palabra reservada: el número de frames forzados
`t` también es una palabra reservada: el tiempo del frame actual.



## How to check where the key frames are

Usando el comando ffprobe se puede analizar un fichero de vídeo para obtener mucha información, sino haza la prueba, ejecuta: 

```bash
ffprobe -select_streams v -show_frames -print_format json video.mp4 > video.show_frames.json
```

Verás que el json contiene mucha información de cada uno de los frames.

Usando un poco de bash se pueden filtrar cuáles son los i-frames:

```bash
ffprobe -select_streams v -show_frames \
-show_entries frame=pict_type \
-of csv video.mp4 \
| grep -n I | cut -d ':' -f 1 > video.i-frames.txt
```

Thanks to [slhck](https://superuser.com/questions/885452/extracting-the-index-of-key-frames-from-a-video-using-ffmpeg)

# Más información: 

* https://en.wikipedia.org/wiki/Video_compression_picture_types
* https://en.wikipedia.org/wiki/Group_of_pictures