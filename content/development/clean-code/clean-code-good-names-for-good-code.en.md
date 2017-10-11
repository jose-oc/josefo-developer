---
title: Good names for good code
date: 2015-05-02T16:16:44+00:00
weight: 10
---
<h1 style="text-align: justify">
  Naming
</h1>

<p style="text-align: justify">
  The name of a variables and functions is extremely important. It should tell you
</p>

<ul style="text-align: justify">
  <li>
    <strong>why</strong> it <strong>exists</strong>,
  </li>
  <li>
    <strong>what</strong> it <strong>does</strong> and
  </li>
  <li>
    <strong>how</strong> it is <strong>used</strong>.
  </li>
</ul>

<p style="text-align: justify">
  You don't need to specify the type of a variable in its name so avoid using special words for programmers such as <em>List</em> or <em>Set</em> because the type of this variable may not be a <em>List</em> or a <em>Set</em> and this would be confusing; even if it is don't use it because this fact can change in the future.
</p>

<p style="text-align: justify">
  When you have a number of variables with <strong>similar purpose</strong> you should use <strong>similar names</strong> and it is important to start with the same words so that you can find the variable you need easily between all of them. This can be applied as a general rule for functions as well.
</p>

<h1 style="text-align: justify">
  Comments, needed?
</h1>

<p style="text-align: justify">
  Having comments could be important but are they so important? Really it is better include the information comments give us into the names of the variables and functions we write on the code, this way the code is much more readability and the comments will never be obsoletes.
</p>

<h1 style="text-align: justify">
  Solution language vs Domain language
</h1>

<p style="text-align: justify">
  <strong>Solution language</strong> is the use of specific words programmers use as tradition such as special words in patterns: consumer, observer, etc.
</p>

<p style="text-align: justify">
  <strong>Domain language</strong> are the words of a specific business we are working on.
</p>

<p style="text-align: justify">
  What type of language should we use? As long as you are using a common pattern solution you should use the traditional names for this pattern. These are the names other programmers expect to find in this code, otherwise a new programmer who watch this code will be confused. If you are not using a well known pattern design it would be a good idea use domain terms since a new programmer could ask a product owner in case of doubt.
</p>

<h1 style="text-align: justify">
  Factory method pattern
</h1>

<p style="text-align: justify">
  When constructor are overloaded use <strong>static factory methods with names that describe the arguments</strong> and turn the constructor into private.
</p>

```java
class Packet {
  private Packet() {
    // construct the instance
  }

  public static Packet parseFromBytes(byte[] bytes) {
    // parse bytes and construct the instance
  }
  public static Packet parseFromString(String[] data) {
    // parse bytes and construct the instance
  }
}
```


A good summary: <http://objectmentor.com/resources/articles/Naming.pdf>