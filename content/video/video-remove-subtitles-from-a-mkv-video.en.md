---
title: How to remove subtitles from a mkv video
date: 2016-02-03T17:44:09+00:00
tags:
  - video
  - how to

---
Having a mkv video file with a stream of subtitles within it you can remove the subtitles with this linux command: 


First of all, install the tool mkvToolNix:

```
zypper in MKVToolNix
```

Now create a new mkv file without subtitle streams:

```
mkvmerge -o output.mkv --no-subtitles input.mkv
```

When I did this I was working on openSuSE.





You can read more about this tool: <https://mkvtoolnix.download/doc/mkvmerge.html#mkvmerge.subtitles>