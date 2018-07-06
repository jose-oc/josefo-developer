---
title: "Cut Up Video"
date: 2017-11-29T16:25:09+01:00
description: "How to cut up a video using ffmpeg"
draft: false
tags:
  - ffmpeg
---

In order to cut up and extract part of a video you can do it with this command: 

```bash
ffmpeg -ss 00:00:30.0 -i input.mp4 -c copy -t 00:00:10.0 output.mp4
```

Params: 

* `-ss` specify a start timestamp
* `-i` specify the input file
* `-c` copy codecs, this is, not to transcode.
* `-t` duration of the result
