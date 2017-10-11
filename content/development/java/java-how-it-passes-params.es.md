---
title: Parámetros por valor o por referencia en Java
date: 2015-04-04T20:12:29+00:00
categories:
  - Coding
  - java
tags:
  - basis
  - params

---

Seguramente recordemos de cuando estudiamos programación o de otros lenguajes de programación que hay diferencia entre pasar parámetros por valor o por referencia. Cuando trabajamos en Java no pensamos explícitamente en esto, ¿por qué? ¿cómo se pasan los parámetros?


La respuesta es por valor, <strong>siempre por valor</strong>, pero esta respuesta puede resultar algo engañosa. Veámosla algo más en detalle.

            
## Datos primitivos

Si pasamos datos de tipo <strong>primitivos</strong> se pasan por valor, <strong>no puedes modificar un parámetro de tipo primitivo en un método.</strong> He aquí un ejemplo: 
            
primitive types:

```java
class Car {
        public void changeVariable(int a) {
            a = 321;
        }
    }

    private void demoPrimitiveValues() {
        int v = 1;
        Car car = new Car();
        car.changeVariable(v);
        System.out.println(v); // 1
    }
```
            
##  Objetos

¿Qué pasa con los objetos? Cuando pasamos objetos al método lo que realmente se le pasa no es el objeto en sí sino <span style="text-decoration: underline">un puntero</span> al objeto, pero no es el mismo puntero que tenemos fuera del método sino que hace una copia del puntero. Así que nos encontramos con el mismo caso: se pasa <strong>por valor</strong>. Aunque claro, al ser un puntero lo que sí podremos modificar son los valores de las propiedades del objeto.

Podemos ver esto con dos ejemplos fáciles: 
                          
Changing properties of an object param:

```java
class Person {
        String name;
    }

    class Writer {
        public void changeName(Person person) {
            person.name = "Lola";
        }
    }

    private void demoObjectValues_changingItsProperties() {
        Person person = new Person();
        person.name = "Mary";
        (new Writer()).changeName( person );
        System.out.println(person.name); //Lola
    }
```

Tras ejecutar este ejemplo vemos que la propiedad ha sido modificada, el nombre que obtenemos es &#8220;Lola&#8221;.
                        
Veamos un ejemplo distinto:
                        
Changing the pointer to an object:

```java
class Writer {      
        /**
         * Changing the pointer of the param
         * @param person
         */
        public void changePerson(Person person) {
            Person newPerson = new Person();
            newPerson.name = "Blas de Lezo";
            person = newPerson;
        }
    }

    private void demoObjectValues_changingPointer() {
        Person person = new Person();
        person.name = "Mary";
        (new Writer()).changePerson( person );
        System.out.println(person.name); //Mary
    }
```

En este otro ejemplo hemos creado un nuevo objeto Person y lo hemos asignado al puntero que hemos pasado como parámetro al método changePerson, pero comprobamos que dicho puntero no era el mismo que tenía le objeto person que se le pasó, sino que era otro, una copia, porque se pasó por valor.
                        
### Fuente

Puedes descargar el código con este ejemplo fácil: <a href="https://github.com/jose-oc/demo-java-params">https://github.com/jose-oc/demo-java-params</a>
                        

Fuente: <a href="http://javadude.com/articles/passbyvalue.htm" target="_blank">http://javadude.com/articles/passbyvalue.htm</a>
