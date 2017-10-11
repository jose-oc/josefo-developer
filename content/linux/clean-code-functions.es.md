---
title: Funciones
author: Jose OC
type: post
date: 2015-05-04T04:49:44+00:00
url: /blog/funciones/
categories:
  - Coding

---
<h1 style="text-align: justify">
  Usa funciones, my friend
</h1>

<p style="text-align: justify">
  Algo que me encanta es leer el código como si se tratara de una receta, casi en lenguaje natural. Es la forma más rápida de leer código además de que cuando estás programando es la mejor forma de estar seguro de lo que tienes que hacer. Para conseguir esto puedes escribir código y luego empezar a dividir tus métodos en un número indeterminado de <strong>funciones con nombres descriptivos</strong>, tan largos como quieras, que sean de fácil lectura.
</p>

<p style="text-align: justify">
  Cada función debe ser tan pequeña como sea posible, funciones de una sola línea son las mejores. Cada función debe hacer una sola tarea. Cada función debe tener un solo nivel de abstracción, por ejemplo no mezcles en una función operaciones con bytes y Strings porque no tiene sentido, seguramente no estén en el mismo nivel de abstracción.
</p>

<p style="text-align: justify">
  Como iremos creando funciones para mejorar la legibilidad del código acabaremos con muchas funciones privadas que se seguramente se llamen en un solo sitio por tanto el mejor sitio para escribirla dentro de la clase Java es justo debajo del método que la llama.
</p>

<h1 style="text-align: justify">
  Command Query Separation
</h1>

Las funciones deben tener uno solo de estos propósitos, no ambos:

  * Dar información sobre el objeto.
  * Modificar el estado del objeto.

<h1 style="text-align: justify">
  Try-Catch es el objetivo de una función
</h1>

<p style="text-align: justify">
  Siguiendo la regla de que una función debe tener sólo una cosa que hacer, ¿por qué no darle la responsabilidad de lidiar con el manejo de excepciones a una función?
</p>

<p style="text-align: justify">
  Por ejemplo, si tenemos algo así:
</p>

<pre class="lang:java decode:true">public void doSomething() {
    try {
        callA();
        callB();
        callC();
    } catch (Exception e) {
        log.error("message", e);
    }
}</pre>

<p style="text-align: justify">
  convertirlo en esto:
</p>

<pre class="lang:java decode:true" title="Extract try/catch">public void doSomething() {
    try {
        manageTheProcess();
    } catch (Exception e) {
        manageTheException(e);
    }
}

private void manageTheProcess() {
    callA();
    callB();
    callC();
}

private void manageTheException(Exception e) {
    log.error("message", e);
}</pre>

<p style="text-align: justify">
  De esta forma tendremos un método que trata la excepción, solamente eso, y otro donde se desarrolla el proceso donde se espera que todo vaya bien. Todo queda más claro.
</p>