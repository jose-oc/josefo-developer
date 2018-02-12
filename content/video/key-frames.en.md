---
title: "Key Frames"
date: 2017-11-29T16:38:27+01:00
draft: false
---

A digital video file can be broken down into frames but not all the frames are the same type, there are different type of frames. Some of them are generally known as key frame but according to the research I've done there isn't a correct definition of it and people call key frame to different things.

<!-- more -->



# Vocabulary

## Frames

### I-Frame

**Intra-coded Frames**. These are the frames with less compression and more information. It's important to mention that they don't need from any other frame to be a picture of the film, it's like a static image of the film.

### P-Frame

**Predicted Frames**. They're frames with better compression than the I-frames and they use the information from the previous frame, so it doesn't have the whole picture.

### B-Frame

**Bi-directional predicted Frames**. They're the type of frames more compressed, even more than the P frames, as they use information from both the precedent and the following frames.

You can think about a movie, it has a lot of frames very similar between them and it doesn't make much sense to repeat the same information so many times. Avoiding this you'll save space.


## GOP (Group of Pictures)

A GOP is a collection of frames generally independent of any other GOP although there are some cases where they weren't. The lenght of a GOP is variable, it can have only one I-frame or an I-frame and any number of P and B frames. They normally aren't larger than 15 frames.


# In ffmpeg

## How to set a fixed GOP size

There are different ways to say to ffmpeg to transcode a video file setting the I-frames in fixed positions. Here I show two of them that I've tested with H.264 to end up with an HLS asset.

### `-g 60 -keyint_min 60`

This way you're saying to ffmpeg to set an I-frame every 2 minutes, although ffmpeg could add more I-frames if they're needed.
The parameter `-g` set the **maximum** distance between two I-frames, it is known as _keyframe interval_ or _GOP length_.
The parameter `-keyint_min` set the **minimum** distance between two I-frames, it is known as _minimum GOP length_.


### `-force_key_frames "expr:gte(t,n_forced*2)"`

This way ffmpeg will add a new I-frame every time the expression given is true. In that example it's every 2 minutes.
The parameter `n_forced` is a keyword to say the number of forced frames.
The parameter `t` is also a keyword to say the time of the processed frame.


## Avoid extra keyframes

With the previous command we won't avoid ffmpeg to add extra I-frames when the application considers appropriate, in case we wanted to avoid this behaviour we'd need to add these parameters:

`-g 48 -keyint_min 48`

In this example we're saying that every 48 frames as maximum it should be an i-frame (_-g_ param) and every 48 frames as minimum (_-keyint_min_ param) it should be an i-frame so we're specifying the exact position of the i-frames.

An example of ffmpeg command using these parameters:

```bash
ffmpeg -i input_video.mp4 -y -ss 0 -t 15 -aspect 16:9 -g 48 -keyint_min 48 -sc_threshold 0 output.mp4
```


## How to check where the key frames are

We can use the ffprobe command to check where the I-frames are within the video file, ffprobe can provide a bunch of information by using this command:

```bash
ffprobe -select_streams v -show_frames -print_format json video.mp4 > video.show_frames.json
```

A json file is generated and can be quite large if the video file is big, there will be some information per frame.

Applying a bit of bash you can filter the i-frames numbers:

```bash
ffprobe -select_streams v -show_frames \
-show_entries frame=pict_type \
-of csv ${VIDEO_FILENAME_OR_URL} \
| grep -n I | cut -d ':' -f 1 > keyframes_number.txt
```

Or extract the **times** where those i-frames are:

```bash
ffprobe -select_streams v:0 -show_frames \
-print_format csv ${VIDEO_FILENAME_OR_URL} \
| awk -F ',' '{ if ($4 > 0) print $6; }' > keyframes_times.txt
```

Thanks to [slhck](https://superuser.com/questions/885452/extracting-the-index-of-key-frames-from-a-video-using-ffmpeg)

# Más información: 

* https://en.wikipedia.org/wiki/Video_compression_picture_types
* https://en.wikipedia.org/wiki/Group_of_pictures
* https://superuser.com/questions/908280/what-is-the-correct-way-to-fix-keyframes-in-ffmpeg-for-dash