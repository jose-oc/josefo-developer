---
title: Functions
date: 2015-05-04T04:48:53+00:00
weight: 20
---
# Use functions, my friend

Something that I love is to read code as a recipe, almost in natural language. To achieve this you can split your methods up writing a number of functions with descriptive names.

Each function should be **as small as possible**, you can even get one-line functions, awesome. Each function should **do** just **one thing**. Each function should have **one level of abstraction**, for instance, don't mix operation at byte level with operations a String level.

Using functions this way we'll write a number of **private functions** that will be called just by one method, so the best place to **write them is just bellow** the method will call them because this way will improve readability.

# Command Query Separation

Functions should have one of these purposes, but **not both** of them:

  * **Give** **information** about the object.
  * **Change the state** of the object.

# Try-Catch is the goal of a function

Following the rule that say that a function must do just one thing, why don't give the responsibility of do the try-catch to a function? It is convert this:

```java
public void doSomething() {
    try {
        callA();
        callB();
        callC();
    } catch (Exception e) {
        log.error("message", e);
    }
}
```

into this:

```java
public void doSomething() {
    try {
        manageTheProcess();
    } catch (Exception e) {
        manageTheException(e);
    }
}

private void manageTheProcess() {
    callA();
    callB();
    callC();
}

private void manageTheException(Exception e) {
    log.error("message", e);
}
```

This way we have a method were we treat the exception and another one where we write the correct process, everything is cleaner.