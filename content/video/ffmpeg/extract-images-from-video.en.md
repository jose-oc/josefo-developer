---
title: "Extract Images From Video"
date: 2018-07-05T12:40:33+02:00
description: "How to extract images from a video using ffmpeg"
draft: true
tags:
  - ffmpeg
---

I'll show how you can extract images from a video using ffmpeg. 

Some people call these images _thumbnails_, however I think a thumbnails is a small image and the images you extract from a video have the same size as the video itself, which can be quite large these days. We'll see we can scale down these images using ffmpeg, though.

<!-- more -->

I'm going to prepare a 10-second length video to work on this. 
Download the [Big Buck Bunny video](http://download.blender.org/peach/bigbuckbunny_movies/) and cut it to have 10 seconds this way:

```
ffmpeg -ss 00:02:50.0 -i http://download.blender.org/peach/bigbuckbunny_movies/big_buck_bunny_720p_stereo.avi -t 00:00:10.0 video.mp4
```

## Extract images

### At specific time

This command extracts an image at the specific time given in seconds, in this case at the second 5. 
The parameter `-vframes 1` tells to extract only one image.

```
ffmpeg -ss 5 -i video.mp4 -vframes 1 out.jpg
```

![extract frame at second 5](/video/ffmpeg/extract-images-from-video/out.jpg?classes=border,shadow)

The following command extracts 10 frames as images staring from the second 5 of the input video:

```
ffmpeg -ss 5 -i video.mp4 -vframes 10 out_%02d.jpg
```

![extract 10 frames from the second 5](/video/ffmpeg/extract-images-from-video/10-frames-extracted.png?classes=border,shadow)


### By interval

This command extracts an image every half a second:

```
ffmpeg -i video.mp4 -f image2 -filter:v fps=1/0.5 -y out_%3d.png
```

So we'll get 20 images as the video has 10 seconds length.

![extract frames every 0.5 seconds](/video/ffmpeg/extract-images-from-video/frames-extracted-by-fps-interval.png?classes=border,shadow)


### Scaling down images

Using ffmpeg you can get the images at the size you need using the same aspect ratio, just adding a filter.

In this example you won't scale up images but you'll get a smaller version of them (notice the use of the `min` function).

- Specifying a value of 500 pixels for the width: `scale='min(500,iw)':'-1'`
- Specifying a value of 500 pixels for the height: `scale='-1':'min(500,ih)'`

So the command to extract 10 images and reduce its size to create the thumbnails is:

```
ffmpeg -ss 5 -i video.mp4 -vframes 10 -filter:v "scale='min(500,iw)':'-1'" out_scaled_%02d.jpg
```

And to get a thumbnail every 2 seconds:

```
ffmpeg -i video.mp4 -f image2 -filter:v "fps=1/2,scale='-1':'min(500,ih)'" -y out_scaled_%3d.png
```

![frames scaled down to 500px](/video/ffmpeg/extract-images-from-video/out_scaled_004.png?classes=border,shadow)



----


## Getting the timestamp for the images

The images extracted from the video don't have any information about what was its time in the original video, which might be specially useful if you extract a number of images by interval, let's say every X seconds. I want to have that information so let's try to figure it out.

Firstly, I'm going to print the timestamp of every frame in the image itself the same way we can see subtitles in the video.


### Print the timestamp in the images

#### All the frames

This command extracts all the frames from the input video and every one has its timestamp printed out.

```
ffmpeg -i video.mp4 \
-vf "drawtext=fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf: text='%{pts\:hms}': x=(w-tw)/2: y=h-(2*lh): fontcolor=white: box=1: boxcolor=0x00000000@1" \
out_with_timestamp_%03d.png
```

It generates 240 frames, as expected.



#### Frames by interval

That's fine if you want all the frames, but I only want either specific frames or extract frames by some interval. Let's extract an image every 5 seconds using the fps video filter as we've seen previously:

```
ffmpeg -i video.mp4 \
-vf "fps=fps=1/5,drawtext=fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf: text='%{pts\:hms}': x=(w-tw)/2: y=h-(2*lh): fontcolor=white: box=1: boxcolor=0x00000000@1" \
out_with_timestamp_%03d.png
```

Well, we've got 2 images, let's see them:

![first frame](/video/ffmpeg/extract-images-from-video/out_with_timestamp_001.png?classes=border,shadow)

![second frame](/video/ffmpeg/extract-images-from-video/out_with_timestamp_002.png?classes=border,shadow)

We can see the timestaps are: second 0 and second 5. Let's continue and we'll see this isn't right.



### Get timestamp with ffprobe

I don't really want to have the timestamp printed in the image, I want to have that data externally or as metadata.

The command ffprobe can help us know the timestamp of every frame in the video so we can use it to know the timestamp of the frames that we've extracted by simulating the same video filter we applied with ffmpeg, i.e. `fps`.

Let's say we extract a frame every 5 seconds with this command:

```
ffmpeg -i video.mp4 -f image2 -filter:v "fps=1/5" fps_1-5_%02d.jpg
```

Now we can simulate this with ffprobe extracting the timestamps.

```
ffprobe -hide_banner \
-i "movie=video.mp4,fps=fps=1/5[out0]" \
-f lavfi -show_frames -show_entries frame=pkt_pts_time -of csv=p=0
```

Result:

```
Input #0, lavfi, from 'movie=video.mp4,fps=fps=1/5[out0]':
  Duration: N/A, start: 0.000000, bitrate: N/A
    Stream #0:0: Video: rawvideo (I420 / 0x30323449), yuv420p, 1280x720 [SAR 1:1 DAR 16:9], 0.20 tbr, 0.20 tbn, 0.20 tbc
0.000000
5.000000
```

The same thing can be achieved with one command only:

```
ffmpeg -hide_banner -i video.mp4 \
-f image2 -filter:v "[in]fps=1/5[s1];[s1]showinfo[out]" fps_1-5_%02d.jpg
```

The result of that command, apart from the image files, is:

```
Input #0, mov,mp4,m4a,3gp,3g2,mj2, from 'video.mp4':
  Metadata:
    major_brand     : isom
    minor_version   : 512
    compatible_brands: isomiso2avc1mp41
    encoder         : Lavf58.12.100
  Duration: 00:00:10.02, start: 0.000000, bitrate: 1072 kb/s
    Stream #0:0(und): Video: h264 (High) (avc1 / 0x31637661), yuv420p, 1280x720, 939 kb/s, 24 fps, 24 tbr, 12288 tbn, 48 tbc (default)
    Metadata:
      handler_name    : VideoHandler
    Stream #0:1(und): Audio: aac (LC) (mp4a / 0x6134706D), 48000 Hz, stereo, fltp, 128 kb/s (default)
    Metadata:
      handler_name    : SoundHandler
Stream mapping:
  Stream #0:0 -> #0:0 (h264 (native) -> mjpeg (native))
Press [q] to stop, [?] for help
[Parsed_showinfo_1 @ 0xb2bfc0] config in time_base: 5/1, frame_rate: 1/5
[Parsed_showinfo_1 @ 0xb2bfc0] config out time_base: 0/0, frame_rate: 0/0
[swscaler @ 0xce0800] deprecated pixel format used, make sure you did set range correctly
Output #0, image2, to 'fps_1-5_%02d.jpg':
  Metadata:
    major_brand     : isom
    minor_version   : 512
    compatible_brands: isomiso2avc1mp41
    encoder         : Lavf58.12.100
    Stream #0:0(und): Video: mjpeg, yuvj420p(pc), 1280x720, q=2-31, 200 kb/s, 0.20 fps, 0.20 tbn, 0.20 tbc (default)
    Metadata:
      handler_name    : VideoHandler
      encoder         : Lavc58.18.100 mjpeg
    Side data:
      cpb: bitrate max/min/avg: 0/0/200000 buffer size: 0 vbv_delay: -1
[Parsed_showinfo_1 @ 0xb2bfc0] n:   0 pts:      0 pts_time:0       pos:   170090 fmt:yuv420p sar:0/1 s:1280x720 i:P iskey:0 type:B checksum:EE8A0C3A plane_checksum:[A90276D4 620C6744 F5012E13] mean:[188 114 134] stdev:[35.4 24.5 6.3]
[Parsed_showinfo_1 @ 0xb2bfc0] n:   1 pts:      1 pts_time:5       pos:   949733 fmt:yuv420p sar:0/1 s:1280x720 i:P iskey:0 type:B checksum:8E6F8EDC plane_checksum:[EE390653 87CF71B5 238A16D4] mean:[127 106 133] stdev:[36.2 14.0 11.1]
frame=    2 fps=0.0 q=2.2 Lsize=N/A time=00:00:10.00 bitrate=N/A speed=29.2x    
video:144kB audio:0kB subtitle:0kB other streams:0kB global headers:0kB muxing overhead: unknown
```

The timestamp of the extracted frames are given by the value of **pts_time**, and according to ffmpeg they're the second 0 and second 5 (_PTS: Presentation TimeStamp_). 
This is, the frames are extracted at these points of the video:

![frames at beginning](/video/ffmpeg/extract-images-from-video/extrac_images_start_period.svg?classes=border,shadow)

As we can see in the graphic, we're dividing the video in 2 periods of 5 seconds and it seems the images are extracted at the very beginning of these periods, as ffprobe says. However **this isn't accurate**. 

In fact, ffmpeg extracts the images in the middle of those periods so the first frame is the second 2.5 and the second one is in the second 7.5 roughly of the original video. I mean, what ffmpeg does is this:

![frames at the middle](/video/ffmpeg/extract-images-from-video/extrac_images_middle_period.svg?classes=border,shadow)


Let's confirm this, let's extract the frames for those seconds and check if these images are the same extracted when we use ffmpeg with the fps filter (extrating by interval):

```
ffmpeg -ss 2.458 -i video.mp4 -frames:v 1 ss_2-458.jpg
ffmpeg -ss 7.48 -i video.mp4 -frames:v 1 ss_7-48.jpg
```

If we compare these images with the ones shown [above]({{% relref "#frames-by-interval" %}}) we can see they're the same frame but the timestamp printed in them are wrong, they say 00:00:00.000 and 00:00:05.000 but in reallity their actual timestamps are 00:00:02.458 and 00:00:07.480.

![frame at second 2.5](/video/ffmpeg/extract-images-from-video/ss_2-458.jpg?classes=border,shadow)
![frame at second 7.48](/video/ffmpeg/extract-images-from-video/ss_7-48.jpg?classes=border,shadow)


----

### Note

I haven't configured anything especial in ffmpeg, I installed it using the snap package on my ubuntu and all these commands have been tested using the version:

```
ffmpeg version n4.0 Copyright (c) 2000-2018 the FFmpeg developers
built with gcc 5.4.0 (Ubuntu 5.4.0-6ubuntu1~16.04.9) 20160609
configuration: --prefix= --prefix=/usr --disable-debug --disable-doc --disable-static --enable-avisynth --enable-cuda --enable-cuvid --enable-libdrm --enable-gpl --enable-libass --enable-libfdk-aac --enable-libfontconfig --enable-libfreetype --enable-libmp3lame --enable-libopus --enable-libspeex --enable-libtheora --enable-libtwolame --enable-libv4l2 --enable-libvorbis --enable-libx264 --enable-libx265 --enable-libxcb --enable-nonfree --enable-nvenc --enable-omx --enable-runtime-cpudetect --enable-shared --enable-vaapi --enable-vdpau --enable-version3 --enable-xlib
libavutil      56. 14.100 / 56. 14.100
libavcodec     58. 18.100 / 58. 18.100
libavformat    58. 12.100 / 58. 12.100
libavdevice    58.  3.100 / 58.  3.100
libavfilter     7. 16.100 /  7. 16.100
libswscale      5.  1.100 /  5.  1.100
libswresample   3.  1.100 /  3.  1.100
libpostproc    55.  1.100 / 55.  1.100
```