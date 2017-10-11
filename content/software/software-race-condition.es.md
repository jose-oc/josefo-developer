---
title: Race condition
author: Jose OC
type: post
date: 2017-01-05T16:08:34+00:00
url: /blog/race-condition/
categories:
  - Coding
  - java
  - PHP

---
Cuando programes algo siguiendo el patrón Time of check to time of use (**TOCTOU**):

  1. Comprueba si puedes hacer la operación
  2. Si puedes, haz la operación

Piensa en si se puede dar el caso que otro proceso (puede ser un proceso externo, otro hilo, etc.) realice el segundo paso justo antes de que lo haga tu proceso pero tras haber realizado la comprobación, el paso 1. A esto se le llama **Race condition**.

Recuerdo especialmente un caso en el que tenía que copiar ciertos archivos a un sitio ftp en una ruta concreta, mi código comprobaba si existía dicha ruta y si no existía la creaba para después copiar los archivos en ella. Si había algún problema capturaba la excepción y cortaba el proceso. Resultó que se dio el siguiente error: el código comprobaba si existía la ruta, que no existía y la creaba pero cuando iba a copiar los archivos fallaba el proceso. ¿Por qué? Porque había otro proceso que estaba haciendo lo mismo y cuando él llegaba la ruta ya estaba creada y copiaba directamente los archivos. Esto provocaba que cuando el primer proceso iba a copiar los archivos, estando ya seguro de que la ruta existía puesto que la había creado él mismo, fallaba.

Hay otros muchos ejemplos de race condition. Cuando programes, piensa que tu código no está solo ahí fuera y que tendrá que compartir y competir con otros muchos procesos.

Para saber más:

  * <https://en.wikipedia.org/wiki/Race_condition>
  * [https://en.wikipedia.org/wiki/Time\_of\_check\_to\_time\_of\_use][1]

 [1]: https://en.wikipedia.org/wiki/Time_of_check_to_time_of_use