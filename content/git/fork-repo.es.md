---
title: "About forks"
date: 2017-10-27T14:49:45+02:00
draft: false
---

Para mejorar el theme [docdock](https://github.com/vjeantet/hugo-theme-docdock/) me creé un fork del mismo e implementé mis cambios en una rama, pero en el proyecto principal se aplicaron cambios que yo quería traerme a mi fork así que añadí otro servidor remoto a mi repositorio llamado *upstream*, luego traje los cambios (*fetch*) y los apliqué a mi rama master.

```
cd into/cloned/fork-repo
git remote add upstream git://github.com/ORIGINAL-DEV-USERNAME/REPO-YOU-FORKED-FROM.git
git fetch upstream
git pull upstream master
```


From https://gist.github.com/CristinaSolana/1885435