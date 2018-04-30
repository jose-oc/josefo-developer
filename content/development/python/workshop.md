Python is a  _Duck typing_ language.


you can use functions as simple objects


```python

def hi():
    return "hi"

def caller(f):
    print(f()) // just append () to the variable and you have converted into a function

```



----

It seems there's some tools to check static types to prevent failures at runtime.

---

Tuples are immutables: mytuple = (1,2,3).
Functions can return multiple elements (internally they return a tuple but it's transparent for the developer)

---

Annotations (decorators):
    you define a function which gets another function as argument, for instance @required_login or @double_this_function
    the decorator wraps your original function.

---

Define what you want to export from within your package:
    __all__ = [bla, bla]

---

pom.xml == setup.py

To create a new package use this repo: https://gitlab.piksel.com/prd-flow-compute/compute-python-lib-template


---

dir(variable) // useful function

---

def fu(a=[1,2]):
    return a

l = fu()
l.append(3,4)
print(l)

---


