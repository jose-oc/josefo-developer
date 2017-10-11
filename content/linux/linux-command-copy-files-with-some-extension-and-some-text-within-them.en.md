---
title: 'Linux terminal: copy files with some extension and some text within them'
date: 2016-05-26T14:06:57+00:00
tags:
  - console
  - linux

---
To be able to copy the files which fulfill these criterias:

  * have a specific name, such as have the extension \`.json\`
  * have some text within them

We can combine two linux commands: **find** and **xargs**.

```bash
xargs -r0 --arg-file &lt;(find . -type f -name "*.json" -exec grep -lZi some_text_within_files {} +) cp -i --target-directory /tmp/dest/dir/
```
