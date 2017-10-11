---
title: Remove subtitles from a mkv video
author: Jose OC
type: post
date: 2016-02-03T17:44:09+00:00
url: /en/blog/remove-subtitles-from-a-mkv-video/
tags:
  - video

---
I&#8217;m working on openSuSE.

First of all, install the tool mkvToolNix: <span class="lang:sh decode:true  crayon-inline ">zypper in MKVToolNix</span>

Create a new mkv file without subtitle streams:

<span class="lang:sh decode:true  crayon-inline">mkvmerge -o output.mkv &#8211;no-subtitles input.mkv</span>

&nbsp;

You can read more about this tool: <https://mkvtoolnix.download/doc/mkvmerge.html#mkvmerge.subtitles>