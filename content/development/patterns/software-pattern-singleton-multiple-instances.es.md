---
title: Singleton para varios tipos de instancias
date: 2014-11-13T15:58:28+00:00
categories:
  - Coding
  - PHP
tags:
  - patrones de diseño

---
Esta clase implementa un patrón Singleton con la salvedad de tener un parámetro que indica un tipo, lo que permite tener un array de singleton.

<p style="text-align: justify">
  Es decir, imaginemos que queremos tener un objeto que contiene cierta información que será común siempre y no queremos tener muchas copias iguales del mismo objeto, así que pensamos en usar el patrón Singleton. Pero resulta que puede que queramos tres tipos distintos de objetos. Por ejemplo, en una web dependiendo del idioma escogido por el usuario se quiere cargar cierta configuración y como le objeto se cargará varias veces en distintos scripts php o se usará por varias clases no queremos que cada vez que se cree el objeto aparezca una instancia nueva, sobretodo siendo un objeto que sólo nos va a servir para leer información. Por tanto con un patrón Singleton podremos cargar el objeto tantas veces queramos y siempre será la misma instancia.
</p>

<p style="text-align: justify">
  Pero si cambio el idioma no me debe dar la información del idioma anterior sino del nuevo. Bien, esto lo podemos solucionar con un array de objetos que se instancien siguiendo un Singleton. Este es el código que muestro:
</p>

```php
class SingletonClass {
    private $type;

    /**
     * Returns the *Singleton* instance of this class.
     *
     * @staticvar Singleton $instance The *Singleton* instances of this class.
     *
     * @return Singleton The *Singleton* instance.
     */
    public static function getInstance($type, $other_params) {
            static $instance = null;

            if (empty ( $type ) || (! MyType::isValidName ( $type ))) {
                // If the type is not given I get my default type
                $type = MyType::DEFAULT;
            }

            if (null === $instance || empty ( $instance ) || empty ( $instance [$type] )) {
                $instance [$type] = new static ( $type );
            }
            return $instance [$type];
    }

    /**
     * Protected constructor to prevent creating a new instance of the
     * *Singleton* via the `new` operator from outside of this class.
     */
    protected function __construct($type, $params) {
        $this-&gt;type = $type;
        // TODO Create the object
    }

    /**
     * Private clone method to prevent cloning of the instance of the
     * *Singleton* instance.
     *
     * @return void
     */
    private function __clone() {}

    /**
     * Private unserialize method to prevent unserializing of the *Singleton*
     * instance.
     *
     * @return void
     */
    private function __wakeup() {}

    public function __destruct() {}

}
```
