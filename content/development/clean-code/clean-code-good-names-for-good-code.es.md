---
title: Buenos nombres para un buen código
date: 2015-05-02T16:33:49+00:00
weight: 10
categories:
  - Coding

---
<h1 style="text-align: justify">
  La importancia de los nombres
</h1>

<p style="text-align: justify">
  Los nombres de las variables y funciones es extremadamente importante. Éstos deben indicar:
</p>

<ul style="text-align: justify">
  <li>
    <strong>por qué</strong> existe (la variable o función),
  </li>
  <li>
    <strong>qué hace </strong>y
  </li>
  <li>
    <strong>cómo se usa. </strong>
  </li>
</ul>

<p style="text-align: justify">
  No necesitas especificar el tipo de una variable en su nombre, por tanto evita incluir nombres que son especiales para los programadores como List o Set ya que el tipo de dicha variable puede no ser éste, y aún en caso de serlo debes evitarlo ya que el tipo puede cambiar en un futuro.
</p>

<p style="text-align: justify">
  Cuando tengas una serie de variables con una finalidad similar debes ponerles nombres parecidos siendo importante que comiencen por las mismas palabras para que resulte sencillo buscar entre ellas y escoger la que necesitamos. Esto se aplica tanto a variables como a funciones.
</p>

<h1 style="text-align: justify">
  Comentarios, ¿para qué?
</h1>

<p style="text-align: justify">
  Los comentarios siempre se han visto como algo muy importante pero quizás ya no lo sean tanto, quizás sea mejor incluir la información que proporcionan los comentarios en los nombres que demos a nuestras variables y a nuestros métodos. De esta forma nunca tendremos comentarios obsoletos o perdidos en el código además de que el código será más fácil de leer.
</p>

# Solution language vs Domain language

**Solution language** son los términos específicos que los programadores usan tradicionalmente en soluciones como patrones de diseño: consumer, observer, etc.

**Domain language** son las palabras específicas del negocio en el que estemos trabajando.

¿Qué tipo de lenguaje debemos usar? Siempre que estemos usando una solución técnica como un patrón de diseño bien conocido debes usar los nombres que tradicionalmente se usan en él. Estos términos son los que el resto de programadores están acostumbrados a usar y si un programador nuevo llega a tu código estará confundido si se encuentra con otra terminología.

Si estás trabajando en una parte de código donde no se utiliza un patrón de diseño es buena idea usar la terminología propia del negocio para el que estés desarrollando ya que un nuevo programador siempre podrá ir a preguntar al product owner por el significado de un término que haya encontrado en el código.

<h1 style="text-align: justify">
  Factory method pattern
</h1>

<p style="text-align: justify">
  Cuando en una clase queremos tener varias formas de construir las instancias en función de los argumentos de entrada que tengamos es buena práctica crear métodos estáticos que los construyan y cambiar la visibilidad del constructor de la clase a privado. De esta forma seremos capaces de construir <strong>métodos con nombres que describan los argumentos</strong> que se le pasan.
</p>

```java
class Packet {
  private Packet() {
    // construct the instance
  }

  public static Packet parseFromBytes(byte[] bytes) {
    // parse bytes and construct the instance
  }
  public static Packet parseFromString(String[] data) {
    // parse bytes and construct the instance
  }
}
```

Un buen resumen: <http://objectmentor.com/resources/articles/Naming.pdf>