---
title: Agrupar commits en Git
date: 2015-10-13T10:15:28+00:00
categories:
  - Terminal
tags:
  - git
  - linux terminal

---

```
git rebase --interactive
```

<!-- more -->

Muchas veces tenemos un número de commits en git que no llegan a tener especial sentido o tenemos que hacer un rebase con otra rama; si éste es el caso y hay conflictos de forma que git automáticamente no es capaz de hacer el rebase, será una pesadilla trabajar los commits uno a uno.

En estos casos puede ser conveniente agruparlos en uno solo. Podemos hacerlo con un rebase interactivo: `git rebase --interactive` o `git rebase -i`.

El rebase interactivo nos permite especificar qué operación queremos aplicar a cada commit:

  * **Squash** fusiona el commit con el anterior.
  * **Fixup** hace lo mismo pero además descarta el comentario (mensaje) del commit.
  * **Reword** para cambiar el mensaje del commit.
  * **Pick** para no hacer nada, respetar el commit como está.

La instrucción para realizar esto sería algo como: `git rebase -i HEAD~4` para fusionar 4 commits desde HEAD. Esto abrirá un editor de texto, posiblemente el vi, con una línea por commit. Al principio de cada línea se especifica la operación que queremos realizar.

Después guardar y git ejecutará las acciones correspondientes.

&nbsp;