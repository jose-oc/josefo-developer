---
title: Patrón Singleton en PHP
author: Jose OC
type: post
date: 2014-11-13T10:19:34+00:00
url: /blog/patron-singleton-en-php/
categories:
  - Coding
  - PHP
tags:
  - patrones de diseño

---
Un patrón Singleton normal, muy útil para cuidar que un objeto no se instancie varias veces. Si necesito, por ejemplo, tener un objeto con información que será igual a todo el que la pida puedo usar este patrón y ahorrar tener muchas copias iguales del mismo objeto en memoria.

Ojo, en PHP cada conexión al servidor es única, es decir que al contrario que en Java no se guarda nada en memoria entre conexiones (stateless), por tanto el Singleton devolverá una instancia por conexión al servidor web.

<pre class="lang:php decode:true" title="Singleton">class SingletonClass {

    /**
     * Returns the *Singleton* instance of this class.
     *
     * @staticvar Singleton $instance The *Singleton* instances of this class.
     *
     * @return Singleton The *Singleton* instance.
     */
    public static function getInstance($other_params) {
            static $instance = null;

            if (null === $instance || empty ( $instance ) ) {
                $instance = new static ( $other_params );
            }
            return $instance;
    }

    /**
     * Protected constructor to prevent creating a new instance of the
     * *Singleton* via the `new` operator from outside of this class.
     */
    protected function __construct($params) {
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
</pre>

&nbsp;