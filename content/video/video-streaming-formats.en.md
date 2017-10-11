---
title: HTTP-based adaptive streaming
date: 2016-01-01T00:00:00+00:00
draft: true
tags:
  - adaptative video streaming
  - streaming
  - video
---
# HTTP adaptive streaming

It&#8217;s a way of streaming with the main advantage of allowing users to always receive the best level of video quality they possibly can. To achieve this the video is chunked in a number of files in order to deliver them in short HTTP downloads. The point of using HTTP is that existing Web caches/proxies, such as the ones already built out by CDNs and ISPs, can be used. This improves scalability, accessibility (no firewall issues) and reach. It&#8217;s also generated different quality and therefore different file sizes in order to deliver the best quality the client can accept according to the network bandwidth and their CPU. This way the quality of the video can change through the video playback if those items change.

## Microsoft Smooth Streaming

It&#8217;s a technology developed by **Microsoft**. Container: ismv, ism and ismc There are multiple multimedia files and its extension is _.ismv whereas the manifest have the extension_ .ism and *.ismc. The video isn&#8217;t split up into thousands of chunks but just one ismv file is created per encoded bitrate. The minimum number of files is 3: the video (ismv) and two manifests (ismc and ism). An IIS server is needed to stream this kind of streaming videos, however it might work in Apache using the module &#8220;Smooth Streaming Module for Apache&#8221;. We should investigate about CloudFront which is a system to playback SS assets. It&#8217;s a AWS service.

Player: For Windows and MAC Silverlight is the player able to play SS videos back. For Linux Moonlight is the player but it is not longer maintained.

## Apple HLS (Http Live Streaming)

It&#8217;s a technology developed by Apple.

Container: ts and m3u8 variant playlist The multimedia files are the ts files while the manifest uses the extension m3u8.

## MPEG-DASH

Container: mpd (media presentation description) which is the manifest with the metadata information such as the video resolution or bitrates. MPEG transport stream (_.ts,_ .mts, *.mpeg-ts) or MP4, 3GP, 3G2, .mj2, .dvb, .dcf, .m21 for the mulmedia data. Audio and Video codec agnostic.

Player: A lot of different players support DASH, not standard HTML5 but there&#8217;s a js player for it. The reference online player: <http://dashif.org/reference/players/javascript/v1.5.0/samples/dash-if-reference-player/index.html> The shaka online player: <http://shaka-player-demo.appspot.com/>