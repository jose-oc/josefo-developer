---
title: 'Docker: comandos útiles'
date: 2016-05-30T09:39:55+00:00
categories:
  - Linux
  - Terminal
tags:
  - bash
  - comandos
  - docker

---
Borrar **imáges** `<none>:<none>``

```
docker rmi $(docker images -f "dangling=true" -q)
```

Borrar volúmenes huérfanos

```
docker volume rm $(docker volume ls -qf dangling=true)
```
