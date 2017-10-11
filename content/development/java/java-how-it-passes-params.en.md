---
title: How does Java pass params
date: 2015-05-02T17:39:32+00:00

---
<div>
  <div>
    <div style="text-align: justify">
      I remember when I was studying at University I was taught about the difference between passing parameters by value or by reference. But in Java there isn't any way to explicit this, then how is Java using parameters?
    </div>
    
    <div style="text-align: justify">
    </div>
    
    <div style="text-align: justify">
      The answer is <strong>by value</strong>, always. But this answer could be a little tricky, let's see it in detail.
    </div>
  </div>
  
  <h2>
    Primitive types
  </h2> Primitive types are passed by value, you 
  
  <strong>can not change its value</strong> within a method. I'll give you an example: 
  
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
  
  <h2>
    Objects
  </h2> When we pass an object as the argument of a method what it is really happen is that Java is doing a 
  
  <strong>copy of the pointer at the object</strong>, not the same pointer that we are using out of this method so it is passed by value. Being a pointer to the object we'll be able to modify the content of the object and we'll get the object modified after the execution of the method but we won't be able to create a new object and assign it from within the method because the pointer we have inside is not the same. I'll give you an example of this: 
  
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

    Running this example you'll notice that the field has been changed, the name we can see in the console is &#8220;Lola&#8221;.
</div>

<div>
  <div style="text-align: justify">
    Let's see another one:
  </div>
  

    Changing the pointer to an object

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

  
  <div style="text-align: justify">
    In this example we've created a new object Person called Mary and we give this object to the method changePerson where the argument (in this case the Person Mary) is replaced by a new Person called &#8220;Blas de Lezo&#8221; but we noticed that this replacement haven't been happen out of the method since the name printed is &#8220;Mary&#8221;. This is because the pointer passed was a copy.
  </div>
  
 
  
  <h3 style="text-align: justify">
    Source
  </h3>
  
  <div style="text-align: justify">
    You can download the source here: <a href="https://github.com/jose-oc/demo-java-params">https://github.com/jose-oc/demo-java-params</a>
  </div>
  
  
  <div style="text-align: justify">
    Information from: <a href="http://javadude.com/articles/passbyvalue.htm" target="_blank">http://javadude.com/articles/passbyvalue.htm</a>
  </div>
</div>