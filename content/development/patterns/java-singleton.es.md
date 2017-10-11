---
title: Singleton en Java
date: 2016-04-13T16:40:13+00:00
categories:
  - Coding
  - java
tags:
  - patrones de diseño

---
<p style="text-align: justify">
  Implementar el patrón Singleton en Java no es difícil pero habría que cuidar un par de detalles, que sea thread safe y lazy load, no es difícil pero no acostumbro a ver estos detalles en las clases que implementan Singleton en Java, a decir verdad tampoco yo lo hacía hasta que mi compañero Ezequiel me lo advirtió.
</p>

<p style="text-align: justify">
  El ser thread safe es para asegurar que aunque más de un hilo trate de ejecutar el código al mismo tiempo no se vaya a crear más de una instancia de la clase que implementa el patrón singleton, y lazy load es para que se instancie solamente en el momento en que se haga uso de la clase por primera vez y no antes.
</p>

<p style="text-align: justify">
  Aquí tenemos un ejemplo de lo sencillo que es esta implementación obtenido de la wikipedia:
</p>

```java
public class Something {
    private Something() {}

    private static class LazyHolder {
        private static final Something INSTANCE = new Something();
    }

    public static Something getInstance() {
        return LazyHolder.INSTANCE;
    }
}
```

<p style="text-align: justify">
  Esta implementación además de ser sencilla está probado que es la que mejor rendimiento tiene.
</p>

<p style="text-align: justify">
  Veamos cómo se consigue esto. La clase que va a ser singleton sólo se puede obtener invocando al método estático getInstance() ya que el constructor de la clase es privado. Este método devuelve la instancia que está guardada en un campo estático y final con lo cual no puede ser sobreescrito y al ser estático Java, según su especificación, lo va a crear de forma no concurrente con lo cual es safe thread. Además es lazy load y esto se consigue embebiendo este campo estático dentro de otra clase privada, así cuando Java cree la clase Something no creará la instancia porque no tiene ningún campo static, en cambio sí inicializará INSTANCE cuando se llame por primera vez a getInstance().
</p>

<p style="text-align: justify">
  Más información: <a href="https://en.wikipedia.org/wiki/Initialization-on-demand_holder_idiom" target="_blank">https://en.wikipedia.org/wiki/Initialization-on-demand_holder_idiom</a>
</p>