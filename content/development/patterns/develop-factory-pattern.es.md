---
title: Ejemplo de patrón Factory
date: 2015-11-01T03:15:09+00:00
categories:
  - Coding
  - java
tags:
  - Builder pattern
  - Factory pattern
  - patrones de diseño

---

## Refactorizar legacy code usando un patrón Factory

Vamos a poner un ejemplo de cómo podemos usar un patrón de diseño para refactorizar código en el que se ha usado un if (podría ser un switch case) para elegir qué función aplicar dependiendo de un parámetro.

Este caso se puede dar con cierta frecuencia, un parámetro nos puede indicar que apliquemos distinta forma de procesar dando el mismo tipo de resultado.

Se ha querido poner un ejemplo muy sencillo para poner el foco de atención en cómo se realiza la refactorización. En este ejemplo el código deberá aplicar una operación matemática básica: sumar, restar, multiplicar o dividir a dos números enteros. Los argumentos del programa por tanto serán éstos: dos números enteros y la operación a realizar.


###  Step 1: Código inicial

El primer paso será mostrar el programa usando un _if_ que en función de la operación llame a la clase que se encargue de realizar la operación matemática. Podemos ver el código completo en [github.com/jose-oc/refactoring.switchifstatement](https://github.com/jose-oc/refactoring.switchifstatement/tree/946de0377cdb692d02ec10b4cceab196379334c5) 


Debemos fijarnos [en estas líneas de código](https://github.com/jose-oc/refactoring.switchifstatement/blob/946de0377cdb692d02ec10b4cceab196379334c5/src/main/java/es/joseoc/learning/java/refactoring/switchifstatement/Operator.java#L42-L64): un _if_ donde en función del parámetro que indica la operación a realizar se llama a una clase u otra:

```java
public int performOperation() 
    {
        if (operation.equals(Operation.ADDITION)) 
        {
            AdditionExecutor adder = new AdditionExecutor(operand1, operand2);
            return adder.execute();
        } else if (operation.equals(Operation.SUBTRACTION)) 
        {
            SubractionExecutor subtracter = new SubractionExecutor(operand1, operand2);
            return subtracter.execute();
        } else if (operation.equals(Operation.MULTIPLICATION)) 
        {
            MultiplicationExecutor multiplier = new MultiplicationExecutor(operand1, operand2);
            return multiplier.execute();
        } else if (operation.equals(Operation.DIVISION)) 
        {
            DivisionExecutor div = new DivisionExecutor(operand1, operand2);
            return div.execute();
        } else 
        {
            throw new InvalidOperatorException(this);
        }
    }
```

###  Step 2: Factory class

En primer lugar refactorizamos la clase creando una nueva clase que haga las funciones de factoría para instanciar una nueva clase que sea la que realiza la operación. De esta forma reducimos el if anterior a un par de líneas:

```java
BinaryOperation executor = BinaryOperationFactory.getInstance(operation);
return executor.execute(operand1, operand2);
```


El tipo que devuelve la factoría es un <strong>nuevo interfaz</strong> (BinaryOperation) que es implementado por las cuatro clases de las operaciones matemáticas:



Interfaz:


```java
public interface BinaryOperation {
    public int execute(int operand1, int operand2);
}
```


Ejemplo de clase que lo implementa:


```java
public final class AdditionExecutor implements BinaryOperation 
{
    @Override
    public int execute(int operand1, int operand2) {
        return operand1 + operand2;
    }

}
```


Por último echemos un ojo a la factoría, que no es más que el mismo if que teníamos inicialmente, ligeramente modificado por los cambios en las clases que realizan las operaciones matemáticas.


```java
public final class BinaryOperationFactory {

    public static BinaryOperation getInstance(Operation operation) {
        if (operation.equals(Operation.ADDITION)) 
        {
            return new AdditionExecutor();
        } else if (operation.equals(Operation.SUBTRACTION)) 
        {
            return new SubractionExecutor();
        } else if (operation.equals(Operation.MULTIPLICATION)) 
        {
            return new MultiplicationExecutor();
        } else if (operation.equals(Operation.DIVISION)) 
        {
            return new DivisionExecutor();
        } else 
        {
            throw new InvalidOperatorException(operation);
        }
    }

```

Podemos ver los cambios aplicados entre el código inicial y éste en el commit [4414b80b62a137c81c18cadfd60a9d7c0e2715ec](https://github.com/jose-oc/refactoring.switchifstatement/commit/4414b80b62a137c81c18cadfd60a9d7c0e2715ec). 


Y el código completo de este paso aquí en [4414b80b62a137c81c18cadfd60a9d7c0e2715ec](https://github.com/jose-oc/refactoring.switchifstatement/tree/4414b80b62a137c81c18cadfd60a9d7c0e2715ec)


### Step 3: Usar properties

Ahora vamos a extender el código para poder cambiar el comportamiento de una operación matemática sin necesidad de compilar o añadir nuevas operaciones fácilmente. Esto lo haremos con un archivo properties encargado de especificar qué clase es la encargada de realizar una operación matemática. De esta forma si queremos una nueva operación tan sólo implementaremos la clase y la añadiremos al properties o si queremos realizar una nueva implementación de una clase simplemente escribiremos la nueva clase y en el properties cambiamos qué clase implementa la operación.



Veamos cómo es este properties:


```
## This file holds the association between the operation and the class which implements it.

ADDITION=es.joseoc.learning.java.refactoring.switchifstatement.math.operation.AdditionExecutor
SUBTRACTION=es.joseoc.learning.java.refactoring.switchifstatement.math.operation.SubractionExecutor
MULTIPLICATION=es.joseoc.learning.java.refactoring.switchifstatement.math.operation.MultiplicationExecutor
DIVISION=es.joseoc.learning.java.refactoring.switchifstatement.math.operation.DivisionExecutor
```


Se ha modificado el *BinaryOperationFactory* para hacer uso de este properties, leyéndolo e instanciando la clase especificada en él mediante reflexión. Esta clase merece verse en detalle al completo [BinaryOperationFactory.java#L21-L26](https://github.com/jose-oc/refactoring.switchifstatement/blob/7ac01221089c78b1e29a7e48010119d45b9befde/src/main/java/es/joseoc/learning/java/refactoring/switchifstatement/math/operation/factory/BinaryOperationFactory.java#L21-L26) 
, pero destacamos el método que devuelve la instancia requerida, aquí es donde estaba el if que ya ha desaparecido:

```java
public static BinaryOperation getInstance(Operation operation) {
    BinaryOperationFactory factory = new BinaryOperationFactory(operation);
    String clazzName = factory.readClassNameForOperation();
    Class&lt;?&gt; clazz = factory.loadClass(clazzName);
    return factory.createNewInstance(clazz);
}
```


Merece la pena destacar el uso de las excepciones aquí ya que para cada tipo de excepción se ha creado una unchecked exception como inner class. Como campos de la excepción está la información relevante a ella y en el constructor (super) se especifica en detalle lo ocurrido.


### Step 4: registrar las clases automáticamente


En este paso nos deshacemos del properties, en su lugar se escanean las clases de forma que se detecte qué clases implementan las operaciones matemáticas y qué tipo de operación y automáticamente se registran en el factory para poder devolver una instancia de la que se requiera.



Para hacer esto se ha optado por crear una anotación para indicar qué clase implementa una operación matemática y el tipo. Una alternativa podría haber sido buscar las clases que implementen el interfaz y haberle añadido un método que devolviera el tipo de operación.



Anotación:


```java
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
public @interface BinaryOperationExecutor {
    Operation type();
}
```


Ejemplo de clase que la implementa:


```java
@BinaryOperationExecutor(type = Operation.ADDITION)
public final class AdditionExecutor implements BinaryOperation
```


Y en el factory se ha añadido un mapa para guardar las clases registradas para cada operación. Además un método que lo inicializa.


```java
public final class BinaryOperationFactory {
    private static final Logger LOG = LoggerFactory.getLogger(BinaryOperationFactory.class);
    private static final Map&lt;Operation, Class&lt;?&gt;&gt; registeredOperations = new HashMap&lt;&gt;(Operation.values().length);

    private void init() {
        if (registeredOperations.isEmpty()) {
            scanClasses();
        }
    }
```

Invito a echar un ojo a la clase [BinaryOperationFactory.java](https://github.com/jose-oc/refactoring.switchifstatement/blob/397fdb11193f7972338c4c6d9d3a49a19f143672/src/main/java/es/joseoc/learning/java/refactoring/switchifstatement/math/operation/factory/BinaryOperationFactory.java) para ver cómo se escanéan las clases y se registran.


Cambios respecto al paso anterior [diff master...Scanning_classes](https://github.com/jose-oc/refactoring.switchifstatement/compare/master...Scanning_classes) 


Todo el código: https://github.com/jose-oc/refactoring.switchifstatement/tree/397fdb11193f7972338c4c6d9d3a49a19f143672


### Patrón Builder


Por cierto, en este ejemplo se puede observar el **patrón Builder** que se ha aplicado para crear instancias de la clase Operator.


https://github.com/jose-oc/refactoring.switchifstatement/blob/397fdb11193f7972338c4c6d9d3a49a19f143672/src/main/java/es/joseoc/learning/java/refactoring/switchifstatement/Operator.java#L46-L74