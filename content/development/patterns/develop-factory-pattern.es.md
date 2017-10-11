---
title: Refactorizar legacy code usando un patrón Factory
date: 2015-11-01T03:15:09+00:00
categories:
  - Coding
  - java
tags:
  - Builder pattern
  - Factory pattern
  - patrones de diseño

---
<p style="text-align: justify">
  Vamos a poner un ejemplo de cómo podemos usar un patrón de diseño para refactorizar código en el que se ha usado un if (podría ser un switch case) para elegir qué función aplicar dependiendo de un parámetro.
</p>

<p style="text-align: justify">
  Este caso se puede dar con cierta frecuencia, un parámetro nos puede indicar que apliquemos distinta forma de procesar dando el mismo tipo de resultado.
</p>

<p style="text-align: justify">
  Se ha querido poner un ejemplo muy sencillo para poner el foco de atención en cómo se realiza la refactorización. En este ejemplo el código deberá aplicar una operación matemática básica: sumar, restar, multiplicar o dividir a dos números enteros. Los argumentos del programa por tanto serán éstos: dos números enteros y la operación a realizar.
</p>

<h1 style="text-align: justify">
  Step 1: Código inicial
</h1>

<p style="text-align: justify">
  El primer paso será mostrar el programa usando un if que en función de la operación llame a la clase que se encargue de realizar la operación matemática. Podemos ver el código completo aquí: <a href="https://github.com/jose-oc/refactoring.switchifstatement/tree/946de0377cdb692d02ec10b4cceab196379334c5" target="_blank">https://github.com/jose-oc/refactoring.switchifstatement/tree/946de0377cdb692d02ec10b4cceab196379334c5</a>
</p>

<p style="text-align: justify">
  Debemos fijarnos en estas líneas de código. Es un if donde en función del parámetro que indica la operación a realizar se llama a una clase u otra:
</p>

<p style="text-align: justify">
  <a href="https://github.com/jose-oc/refactoring.switchifstatement/blob/946de0377cdb692d02ec10b4cceab196379334c5/src/main/java/es/joseoc/learning/java/refactoring/switchifstatement/Operator.java#L42-L64" target="_blank">https://github.com/jose-oc/refactoring.switchifstatement/blob/946de0377cdb692d02ec10b4cceab196379334c5/src/main/java/es/joseoc/learning/java/refactoring/switchifstatement/Operator.java#L42-L64</a>
</p>

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

<h1 style="text-align: justify">
  Step 2: Factory class
</h1>

<p style="text-align: justify">
  En primer lugar refactorizamos la clase creando una nueva clase que haga las funciones de factoría para instanciar una nueva clase que sea la que realiza la operación. De esta forma reducimos el if anterior a un par de líneas:
</p>

```java
BinaryOperation executor = BinaryOperationFactory.getInstance(operation);
return executor.execute(operand1, operand2);
```

<p style="text-align: justify">
  El tipo que devuelve la factoría es un <strong>nuevo interfaz</strong> (BinaryOperation) que es implementado por las cuatro clases de las operaciones matemáticas:
</p>

<p style="text-align: justify">
  Interfaz:
</p>

```java
public interface BinaryOperation {
    public int execute(int operand1, int operand2);
}
```

<p style="text-align: justify">
  Ejemplo de clase que lo implementa:
</p>

```java
public final class AdditionExecutor implements BinaryOperation 
{
    @Override
    public int execute(int operand1, int operand2) {
        return operand1 + operand2;
    }

}
```

<p style="text-align: justify">
  Por último echemos un ojo a la factoría, que no es más que el mismo if que teníamos inicialmente, ligeramente modificado por los cambios en las clases que realizan las operaciones matemáticas.
</p>

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


<p style="text-align: justify">
  Podemos ver los cambios aplicados entre el código inicial y éste aquí: <a href="https://github.com/jose-oc/refactoring.switchifstatement/commit/4414b80b62a137c81c18cadfd60a9d7c0e2715ec" target="_blank">https://github.com/jose-oc/refactoring.switchifstatement/commit/4414b80b62a137c81c18cadfd60a9d7c0e2715ec</a>
</p>

Y el código completo de este paso aquí: <a href="https://github.com/jose-oc/refactoring.switchifstatement/tree/4414b80b62a137c81c18cadfd60a9d7c0e2715ec" target="_blank"><a href="https://github.com/jose-oc/refactoring.switchifstatement/tree/4414b80b62a137c81c18cadfd60a9d7c0e2715ec">https://github.com/jose-oc/refactoring.switchifstatement/tree/4414b80b62a137c81c18cadfd60a9d7c0e2715ec</a></a>

# Step 3: Usar properties

<p style="text-align: justify">
  Ahora vamos a extender el código para poder cambiar el comportamiento de una operación matemática sin necesidad de compilar o añadir nuevas operaciones fácilmente. Esto lo haremos con un archivo properties encargado de especificar qué clase es la encargada de realizar una operación matemática. De esta forma si queremos una nueva operación tan sólo implementaremos la clase y la añadiremos al properties o si queremos realizar una nueva implementación de una clase simplemente escribiremos la nueva clase y en el properties cambiamos qué clase implementa la operación.
</p>

<p style="text-align: justify">
  Veamos cómo es éste properties:
</p>

```
# This file holds the association between the operation and the class which implements it.

ADDITION=es.joseoc.learning.java.refactoring.switchifstatement.math.operation.AdditionExecutor
SUBTRACTION=es.joseoc.learning.java.refactoring.switchifstatement.math.operation.SubractionExecutor
MULTIPLICATION=es.joseoc.learning.java.refactoring.switchifstatement.math.operation.MultiplicationExecutor
DIVISION=es.joseoc.learning.java.refactoring.switchifstatement.math.operation.DivisionExecutor
```

<p style="text-align: justify">
  Se ha modificado el BinaryOperationFactory para hacer uso de este properties, leyéndolo e instanciando la clase especificada en él mediante reflexión. Esta clase merece verse en detalle al completo (aquí el link <a href="https://github.com/jose-oc/refactoring.switchifstatement/blob/7ac01221089c78b1e29a7e48010119d45b9befde/src/main/java/es/joseoc/learning/java/refactoring/switchifstatement/math/operation/factory/BinaryOperationFactory.java#L21-L26" target="_blank">https://github.com/jose-oc/refactoring.switchifstatement/blob/7ac01221089c78b1e29a7e48010119d45b9befde/src/main/java/es/joseoc/learning/java/refactoring/switchifstatement/math/operation/factory/BinaryOperationFactory.java#L21-L26</a>) pero destacamos el método que devuelve la instancia requerida, aquí es donde estaba el if que ya ha desaparecido:
</p>

```java
public static BinaryOperation getInstance(Operation operation) {
    BinaryOperationFactory factory = new BinaryOperationFactory(operation);
    String clazzName = factory.readClassNameForOperation();
    Class&lt;?&gt; clazz = factory.loadClass(clazzName);
    return factory.createNewInstance(clazz);
}
```

<p style="text-align: justify">
  Merece la pena destacar el uso de las excepciones aquí ya que para cada tipo de excepción se ha creado una unchecked exception como inner class. Como campos de la excepción está la información relevante a ella y en el constructor (super) se especifica en detalle lo ocurrido.
</p>

# Step 4: registrar las clases automáticamente

<p style="text-align: justify">
  En este paso nos deshacemos del properties, en su lugar se escanean las clases de forma que se detecte qué clases implementan las operaciones matemáticas y qué tipo de operación y automáticamente se registran en el factory para poder devolver una instancia de la que se requiera.
</p>

<p style="text-align: justify">
  Para hacer esto se ha optado por crear una anotación para indicar qué clase implementa una operación matemática y el tipo. Una alternativa podría haber sido buscar las clases que implementen el interfaz y haberle añadido un método que devolviera el tipo de operación.
</p>

<p style="text-align: justify">
  Anotación:
</p>

```java
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
public @interface BinaryOperationExecutor {
    Operation type();
}
```

<p style="text-align: justify">
  Ejemplo de clase que la implementa:
</p>

```java
@BinaryOperationExecutor(type = Operation.ADDITION)
public final class AdditionExecutor implements BinaryOperation
```

<p style="text-align: justify">
  Y en el factory se ha añadido un mapa para guardar las clases registradas para cada operación. Además un método que lo inicializa.
</p>

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

Invito a echar un ojo a la clase para ver cómo se escanéan las clases y se registran: <a href="https://github.com/jose-oc/refactoring.switchifstatement/blob/397fdb11193f7972338c4c6d9d3a49a19f143672/src/main/java/es/joseoc/learning/java/refactoring/switchifstatement/math/operation/factory/BinaryOperationFactory.java" target="_blank"><a href="https://github.com/jose-oc/refactoring.switchifstatement/blob/397fdb11193f7972338c4c6d9d3a49a19f143672/src/main/java/es/joseoc/learning/java/refactoring/switchifstatement/math/operation/factory/BinaryOperationFactory.java">https://github.com/jose-oc/refactoring.switchifstatement/blob/397fdb11193f7972338c4c6d9d3a49a19f143672/src/main/java/es/joseoc/learning/java/refactoring/switchifstatement/math/operation/factory/BinaryOperationFactory.java</a></a>

<p style="text-align: left">
  Cambios respecto al step anterior: <a href="https://github.com/jose-oc/refactoring.switchifstatement/compare/master...Scanning_classes" target="_blank">https://github.com/jose-oc/refactoring.switchifstatement/compare/master&#8230;Scanning_classes</a>
</p>

<p style="text-align: justify">
  Todo el código: <a href="https://github.com/jose-oc/refactoring.switchifstatement/tree/397fdb11193f7972338c4c6d9d3a49a19f143672" target="_blank">https://github.com/jose-oc/refactoring.switchifstatement/tree/397fdb11193f7972338c4c6d9d3a49a19f143672</a>
</p>

# Patrón Builder

<p style="text-align: justify">
  Por cierto, en este ejemplo se puede observar el <strong>patrón Builder</strong> que se ha aplicado para crear instancias de la clase Operator.
</p>

<a href="https://github.com/jose-oc/refactoring.switchifstatement/blob/397fdb11193f7972338c4c6d9d3a49a19f143672/src/main/java/es/joseoc/learning/java/refactoring/switchifstatement/Operator.java#L46-L74" target="_blank"><a href="https://github.com/jose-oc/refactoring.switchifstatement/blob/397fdb11193f7972338c4c6d9d3a49a19f143672/src/main/java/es/joseoc/learning/java/refactoring/switchifstatement/Operator.java#L46-L74">https://github.com/jose-oc/refactoring.switchifstatement/blob/397fdb11193f7972338c4c6d9d3a49a19f143672/src/main/java/es/joseoc/learning/java/refactoring/switchifstatement/Operator.java#L46-L74</a></a>