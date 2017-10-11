---
title: 'Docker: useful commands'
date: 2016-05-30T09:40:41+00:00
tags:
  - docker
  - terminal

---
To delete **images** <none>:<none>

```
docker rmi $(docker images -f "dangling=true" -q)
```
