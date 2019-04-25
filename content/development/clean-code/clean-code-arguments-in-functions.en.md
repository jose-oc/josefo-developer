---
title: Arguments in functions
date: 2015-05-05T04:59:09+00:00
weight: 30
---
<h1 style="text-align: justify">
  Number of arguments
</h1>

<p style="text-align: justify">
  Uncle Bob recommends in his book &#8220;Clean code&#8221; to use <strong>the less arguments as possible</strong> in functions, zero arguments is the best option, then one, you can use two-argument functions if it is necessary but try to avoid three or more arguments.
</p>

<p style="text-align: justify">
  Why? He gives two reasons:
</p>

<ul style="text-align: justify">
  <li style="text-align: justify">
    <strong>Readability</strong>: the more arguments a function has the more complex it will be to read and understand.
  </li>
  <li style="text-align: justify">
    <strong>Ease of testing</strong>: the more arguments a function has the more number of different possibilities of tests it has.
  </li>
</ul>

<p style="text-align: justify">
  I agree with the first reason and with the second one to a certain extent, not entirely. A function can have just one argument but this can be an object with very many different states so it will need a lot of different tests.
</p>

<p style="text-align: justify">
  Remember that we are in a object oriented way of programming so we can rather than passing a number of arguments to a function use members of the object instead. This is not possible in every scenario but don't forget it.
</p>

<h1 style="text-align: justify">
  Output arguments
</h1>

<p style="text-align: justify">
  A function is supposed to get any arguments and it can give a result as the return value but sometimes we find functions which use output arguments, this is <strong>arguments</strong> which <strong>will be modified inside de function</strong> so that we get the result of the function in it. We are not used to this and it is more difficult to read and understand besides we don't know which of the arguments of the function are going to change. Remember that the arguments in Java are always passed by value but if they are objects their content can be changed (read this <a href="https://www.joseoc.com/blog/parametros-por-valor-o-por-referencia-en-java/">post</a>).
</p>

<p style="text-align: justify">
  We can see an example of this use of output arguments in the ByteBuffer class:
</p>

```java
ByteBuffer aByteBuffer = ByteBuffer.wrap( anArrayOfBytes );
array[] output = new array[64];
aByteBuffer.get(output); 
// output has 64 bytes from aByteBuffer</pre>
```

In this case the method get of ByteBuffer change the value of its argument.

You should avoid this practice.

# One-argument functions

There are three main reasons to pass one argument:

  * Ask something about this argument and return the answer.  
    <span class="lang:java decode:true  crayon-inline">boolean isEmptyOfGas( Car aCar );</span> 
  * Transform or extract some information and return it.  
    <span class="lang:java decode:true  crayon-inline">InputStream fileOpen( String pathToFile );</span> 
  * To inform of an event in order to the class can change its state. In this case there is nothing to return.  
    <span class="lang:java decode:true  crayon-inline ">void numberOfIncorrectLoginAttempts( int attempts );</span> 

# Flag arguments

Using a flag argument, typically a boolean argument, is a bad practice since it is showing that the functions has at least two different things to do, one for each value of the flag. Instead of this is better to split the function in a number of them.

```java
// rather than
void doSomething( boolean flag );

// use something like this
void doSomethingForCaseA();
void doSomethingForCaseB();</pre>
```

You may need to compare the flag value, in this case you could turn your original method into a private one and the other two public methods could call the first one.

# More than one argument

Apart from the readability, the problem when you use more than one argument is the order of them. How many times have you been confused with the arguments of an assert method? (assertEquals(expected, actual)).

When you find a function with more than one argument think of a way of change it:

  * You can create a new class to wrap all of them. It might make sense if all of them belong to the same concept.
  * You can move some of them as a field of the class.
  * You may need a new class with these fields and a method to do the operation.
  * If they are less than three and the above options are not possible, then is ok.

There are functions with a number of arguments that are treated in the same way. This arguments are taken as a List and they are counted as just one. For instance:

```java
String.format( String format, Object… args );
```