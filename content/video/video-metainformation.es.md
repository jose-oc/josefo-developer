---
title: Obtener información de un archivo de vídeo
date: 2015-12-10T10:48:02+00:00
tags:
  - linux
  - terminal
  - video
  - how to

---
Existen comandos para la consola (terminal) de linux para obtener meta-información de un archivo de vídeo:

<pre class="lang:default decode:true ">$ exiftool big_buck_bunny_480p_surround-fix.avi 
ExifTool Version Number         : 9.70
File Name                       : big_buck_bunny_480p_surround-fix.avi
Directory                       : .
File Size                       : 210 MB
File Modification Date/Time     : 2015:12:10 10:03:56+01:00
File Access Date/Time           : 2015:12:10 11:38:24+01:00
File Inode Change Date/Time     : 2015:12:10 10:11:57+01:00
File Permissions                : rw-r-----
File Type                       : AVI
MIME Type                       : video/x-msvideo
Frame Rate                      : 24
Max Data Rate                   : 0 kB/s
Frame Count                     : 14315
Stream Count                    : 2
Stream Type                     : Video
Video Codec                     : FMP4
Video Frame Rate                : 24
Video Frame Count               : 14315
Quality                         : 0
Sample Size                     : Variable
Image Width                     : 854
Image Height                    : 480
Planes                          : 1
Bit Depth                       : 24
Compression                     : FMP4
Image Length                    : 1229760
Pixels Per Meter X              : 0
Pixels Per Meter Y              : 0
Num Colors                      : Use BitDepth
Num Important Colors            : All
Audio Codec                     : 
Audio Sample Rate               : 56000
Audio Sample Count              : 33401088
Encoding                        : FAST Multimedia DVM
Num Channels                    : 6
Sample Rate                     : 48000
Avg Bytes Per Sec               : 56000
Bits Per Sample                 : 16
Duration                        : 0:09:56
Image Size                      : 854x480
</pre>

<pre class="lang:default decode:true">$ mplayer -vo null -ao null -identify -frames 0 big_buck_bunny_480p_surround-fix.avi 
MPlayer -4.8 (C) 2000-2015 MPlayer Team
mplayer: could not connect to socket
mplayer: No such file or directory
Failed to open LIRC support. You will not be able to use your remote control.

Playing big_buck_bunny_480p_surround-fix.avi.
libavformat version 56.40.101 (external)
AVI file format detected.
ID_VIDEO_ID=0
[aviheader] Video stream found, -vid 0
ID_AUDIO_ID=1
[aviheader] Audio stream found, -aid 1
VIDEO:  [FMP4]  854x480  24bpp  24.000 fps  2500.3 kbps (305.2 kbyte/s)
Load subtitles in ./
ID_FILENAME=big_buck_bunny_480p_surround-fix.avi
ID_DEMUXER=avi
ID_VIDEO_FORMAT=FMP4
ID_VIDEO_BITRATE=2500256
ID_VIDEO_WIDTH=854
ID_VIDEO_HEIGHT=480
ID_VIDEO_FPS=24.000
ID_VIDEO_ASPECT=0.0000
ID_AUDIO_FORMAT=8192
ID_AUDIO_BITRATE=448000
ID_AUDIO_RATE=0
ID_AUDIO_NCH=0
ID_START_TIME=0.00
ID_LENGTH=596.46
ID_SEEKABLE=1
ID_CHAPTERS=0
==========================================================================
Opening video decoder: [ffmpeg] FFmpeg's libavcodec codec family
libavcodec version 56.60.100 (external)
Selected video codec: [ffodivx] vfm: ffmpeg (FFmpeg MPEG-4)
==========================================================================
ID_VIDEO_CODEC=ffodivx
==========================================================================
Trying to force audio codec driver family libmad...
Opening audio decoder: [ffmpeg] FFmpeg/libavcodec audio decoders
AUDIO: 48000 Hz, 2 ch, floatle, 448.0 kbit/14.58% (ratio: 56000-&gt;384000)
ID_AUDIO_BITRATE=448000
ID_AUDIO_RATE=48000
ID_AUDIO_NCH=2
Selected audio codec: [ffac3] afm: ffmpeg (FFmpeg AC-3)
==========================================================================
AO: [null] 48000Hz 2ch floatle (4 bytes per sample)
ID_AUDIO_CODEC=ffac3
Starting playback...

Exiting... (End of file)
ID_EXIT=EOF
</pre>

&nbsp;

Otra forma es con `ffmpeg -i <filename>` o lo que es lo mismo:

<pre class="lang:sh decode:true " title="ffprobe or ffmpeg -i command">$ ffprobe sintel-1024-surround.mp4 
ffprobe version 2.8.4 Copyright (c) 2007-2015 the FFmpeg developers
  built with gcc 4.8 (SUSE Linux)
  configuration: --prefix=/usr --libdir=/usr/lib64 --shlibdir=/usr/lib64 --incdir=/usr/include/ffmpeg --extra-cflags='-fmessage-length=0 -grecord-gcc-switches -O2 -Wall -D_FORTIFY_SOURCE=2 -fstack-protector -funwind-tables -fasynchronous-unwind-tables -g' --optflags='-fmessage-length=0 -grecord-gcc-switches -O2 -Wall -D_FORTIFY_SOURCE=2 -fstack-protector -funwind-tables -fasynchronous-unwind-tables -g' --disable-htmlpages --enable-pic --disable-stripping --enable-shared --disable-static --enable-runtime-cpudetect --enable-gpl --disable-openssl --enable-avresample --enable-libcdio --enable-gnutls --enable-ladspa --enable-libass --enable-libbluray --enable-libcelt --enable-libcdio --enable-libdc1394 --enable-libfreetype --enable-libgsm --enable-libopenjpeg --enable-libopus --enable-libpulse --enable-libschroedinger --enable-libspeex --enable-libtheora --enable-libvorbis --enable-libvpx --enable-libwebp --enable-pic --enable-pthreads --enable-vaapi --enable-vdpau --disable-decoder=dca --enable-libdcadec --enable-libmp3lame --enable-libopencore-amrnb --enable-libopencore-amrwb --enable-version3 --enable-libtwolame --enable-libvo-aacenc --enable-libx264 --enable-libx265 --enable-libxvid --enable-x11grab
  libavutil      54. 31.100 / 54. 31.100
  libavcodec     56. 60.100 / 56. 60.100
  libavformat    56. 40.101 / 56. 40.101
  libavdevice    56.  4.100 / 56.  4.100
  libavfilter     5. 40.101 /  5. 40.101
  libavresample   2.  1.  0 /  2.  1.  0
  libswscale      3.  1.101 /  3.  1.101
  libswresample   1.  2.101 /  1.  2.101
  libpostproc    53.  3.100 / 53.  3.100
Input #0, mov,mp4,m4a,3gp,3g2,mj2, from 'sintel-1024-surround.mp4':
  Metadata:
    major_brand     : isom
    minor_version   : 512
    compatible_brands: isomiso2avc1mp41
    creation_time   : 1970-01-01 00:00:00
    title           : Sintel
    encoder         : Lavf52.78.5
    copyright       : (c) copyright Blender Foundation | durian.blender.org
    description     : Sintel open movie project
  Duration: 00:14:48.06, start: 0.000000, bitrate: 1164 kb/s
    Stream #0:0(und): Video: h264 (High) (avc1 / 0x31637661), yuv420p, 1024x436 [SAR 1:1 DAR 256:109], 718 kb/s, 24 fps, 24 tbr, 24 tbn, 48 tbc (default)
    Metadata:
      creation_time   : 1970-01-01 00:00:00
      handler_name    : VideoHandler
    Stream #0:1(eng): Audio: aac (LC) (mp4a / 0x6134706D), 48000 Hz, 5.1, fltp, 440 kb/s (default)
    Metadata:
      creation_time   : 1970-01-01 00:00:00
      handler_name    : SoundHandler
</pre>

Y si lo ves más claro en formato json:

<pre class="lang:sh decode:true ">ffprobe -v quiet -print_format json -show_format -show_streams video-file.mp4</pre>
