---
title: Wrapping code
date: 2016-01-01T00:00:00+00:00
draft: true

---
# Using third party libraries

<p style="text-align: justify">
  When I had to use third party libraries I used to use it and that's it but after reading the chapter Boundaries in the Clean Code book I've changed my mind. I think it worths doing a class to wrap this code, it's little time writing a new class to wrap the library interface but you'll have some points in favor. Wrapping methods that we actually use we have these advantages:
</p>

<li style="text-align: justify">
  We can add more logic if we need it.
</li>
<li style="text-align: justify">
  We protect our code to futures changes on the library. For instance, let's pretend that the interface of the library change, then we just need to modify one class rather than a lot of code around all the project.
</li>
<li style="text-align: justify">
  We can deal with the library exceptions.
</li>

A common pattern we can use to do this job is the Adapter pattern so that we adapt the interface the library offers to the interface we really need.

# Learning using Tests

I've been using Unit tests to learn how to use a third party library for a while but just for the ease JUnit gives me, I can have different methods to approach to the library and know which ones work and which ones don't.

Uncle Bob recommends this use not only for this, but also because is a way of having the use of the library documented besides when a new version of the library would be released we can check that it still behave as we expect.