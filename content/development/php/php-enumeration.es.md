---
title: Enumerations en PHP
author: Jose OC
type: post
date: 2014-11-07T09:47:33+00:00
url: /blog/enumerations-en-php/
categories:
  - Coding
  - PHP
tags:
  - enum

---
Estoy muy acostumbrado a usar el tipo enumerado en Java y quería usarlo en PHP pero parece ser que por defecto no tengo esta funcionalidad y googleando un poco encontré una manera rápida de implementarla.

En este caso quería un enum que definiera los idiomas que están soportados en mi aplicación.

Aquí dejo la implementación:

La clase que contenga el enum deberá extender a esta clase abstracta:

<pre class="lang:php decode:true ">&lt;?php
abstract class BasicEnum {
    private static $constCache = NULL;

    private static function getConstants() {
        if (self::$constCache === NULL) {
            $reflect = new ReflectionClass(get_called_class());
            self::$constCache = $reflect-&gt;getConstants();
        }

        return self::$constCache;
    }

    public static function isValidName($name, $strict = false) {
        $constants = self::getConstants();

        if ($strict) {
            return array_key_exists($name, $constants);
        }

        $keys = array_map('strtolower', array_keys($constants));
        return in_array(strtolower($name), $keys);
    }

    public static function isValidValue($value) {
        $values = array_values(self::getConstants());
        return in_array($value, $values, $strict = true);
    }
}
?&gt;</pre>

&nbsp;

Y un ejemplo de enum:

<pre class="lang:php decode:true ">&lt;?php

abstract class Idioma extends BasicEnum {
    const CHINESE = "CH";
    const SPANISH = "ES";
    const ENGLISH = "EN";
    const FRENCH = "FR";
    const GERMAN = "ES";
    const ITALIAN = "IT";

    private function __construct() {}
}

?&gt;</pre>

&nbsp;

La forma de usarlo será: <span class="lang:php decode:true  crayon-inline  ">Idioma::ENGLISH</span>