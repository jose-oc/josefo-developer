---
title: Argumentos en funciones
date: 2015-05-05T04:58:58+00:00
weight: 30
categories:
  - Coding

---
<h1 style="text-align: justify">
  Número de argumentos
</h1>

<p style="text-align: justify">
  Uncle Bob recomienda en su libro &#8220;Clean code&#8221; usar los menos argumentos posibles en funciones, no usar ninguno es la mejor opción, seguido de uno, puedes usar dos argumentos si los necesitas pero intenta no usar tres o más argumentos.
</p>

<p style="text-align: justify">
  ¿Por qué? Él da un par de razones:
</p>

<li style="text-align: justify">
  <strong>Legibilidad</strong>: cuantos más argumentos tiene una función más difícil es de leer y entender lo que hace.
</li>
<li style="text-align: justify">
  <strong>Facilidad para testearla</strong>: cuantos más argumentos tenga una función más combinaciones podrá tener y por tanto más difícil será comprobar su funcionamiento.
</li>

Estoy completamente de acuerdo con él en la primera razón, en segunda con matices. Una función puede tener un solo argumento y que éste sea un objeto con numerosos estados o campos que se usen dentro de la función así que las comprobaciones serán igualmente extensos aún teniendo un solo argumento.

Recuerda que estamos trabajando en programación orientada a objetos luego podemos, en lugar de estar pasando numerosos argumentos a una función, tener esta información como miembros de la clase de forma que se usen estos campos y no se necesiten tantos argumentos. Esto no es posible siempre pero sí en muchos casos.

<h1 style="text-align: justify">
  Output arguments
</h1>

<p style="text-align: justify">
  Cuando vemos una función suponemos que los argumentos son datos de entrada a la misma y puede haber un resultado que es devuelto, pero en ocasiones nos encontramos con que una función coge uno o varios de los argumentos y los modifica de forma que cuando termina la ejecución de la función el resultado está en unos de estos parámetros, que suponíamos de entrada. Éstos son output arguments.
</p>

<p style="text-align: justify">
  Un código que se comporte así es difícil de leer, no estamos acostumbrados a él. No hay forma de saberlo a priori. Recuerda que Java pasa todos los argumentos por valor aunque si se tratan de objetos su contenido puede ser modificado, como se explicó en este <a href="https://www.joseoc.com/blog/parametros-por-valor-o-por-referencia-en-java/">post</a>.
</p>

<p style="text-align: justify">
  Podemos ver un ejemplo de funciones que usan este tipo de comportamiento en la clase ByteBuffer de java:
</p>

```java
ByteBuffer aByteBuffer = ByteBuffer.wrap( anArrayOfBytes );
array[] output = new array[64];
aByteBuffer.get(output); 
// output has 64 bytes from aByteBuffer
```

En este caso el método get de ByteBuffer cambia el valor de su argumento.

**Se debe evitar esta práctica**.

# Funciones de un solo argumento

Hay tres razones para pasar un solo argumento a una función:

  * Preguntar algo sobre el argumento y obtener una respuesta. <span class="lang:java decode:true  crayon-inline">boolean isEmptyOfGas( Car aCar );</span> 
  * Transformar o extraer información de él y devolverla. <span class="lang:java decode:true  crayon-inline">InputStream fileOpen( String pathToFile );</span> 
  * Informar a la clase de un evento ocurrido para que pueda actuar en consecuencia. En este caso no hay nada que devolver. <span class="lang:java decode:true  crayon-inline">void numberOfIncorrectLoginAttempts( int attempts );</span> 

# Argumentos de tipo flags

Usar un argumento de tipo flag, típicamente un boolean, es una mala práctica ya que está demostrando que la función tiene al menos dos diferentes tareas que hacer, una por cada valor del flag. En lugar de esto es mejor dividir la función en varias.

```java
// rather than
void doSomething( boolean flag );

// use something like this
void doSomethingForCaseA();
void doSomethingForCaseB();
```

Si necesitaras comparar el valor del flag en la función puede ser buena idea cambiar la función original a privada y crear dos nuevas que llamen a ésta con el valor del flag adecuado.

# Más de un argumento

Además de la legibilidad, el problema cuando usas más de un argumento es el orden en que van en la función, sobretodo si son del mismo tipo. ¿Cuántas veces te has confundido con el orden de los argumentos en una llamada a un assert? Uno es el esperado y otro el real.

Cuando te encuentres con una función con más de un argumento piensa en la forma de cambiarla:


  * Puedes crear una nueva clase que envuelva todos los argumentos ya que puede tener sentido conceptual tenerlos todos encapsulados en una clase.
  * Puedes convertir algunos de ellos en campos de la clase, miembros de la clase.
  * Puede que sea necesario tener una nueva clase con estos campos como miembros de la clase y un método que realice la operación de la función que estés tratando.
  * Si hay menos de tres argumentos y ninguna de las opciones anteriores te sirve, déjalo tal cual.

Hay funciones que tienen un número indeterminado de argumentos que se tratan todos de la misma manera, estos argumentos son tomados como una lista y se cuentan como si fueran uno solo, por ejemplo:

```java
String.format( String format, Object… args );
```