---
title: Pintar un objeto como String y que resulte ser un null
author: Jose OC
type: post
date: 2015-07-23T16:49:51+00:00
url: /blog/pintar-un-objeto-como-string-y-que-resulte-ser-un-null/
categories:
  - Coding
  - java
tags:
  - java
  - null safe

---
Supongo que alguna vez te habrá pasado. Tienes un método toString para pintar el contenido de un objeto y de repente ves un bonito NullPointerException&#8230; horrible. Y es que si uno de los atributos de tu objeto es un objeto no instanciado, un null, y llamas a su método toString surge esta excepción. Para evitarlo puedes o bien omitir el toString() o bien usar la clase Objects.toString(o) que es null safe.

<pre class="lang:java decode:true ">@Test
       public void howToPrintNullObject() throws Exception {
             Object iAmNull = null;

             System.out.println("hi "+iAmNull+", is your life empty?");
             System.out.println("hi "+Objects.toString(iAmNull)+", this is a null safe utility");
             System.out.println("hi "+iAmNull.toString()+", it will raise a NullPointerException");
       }</pre>

&nbsp;

Lo que no sé es por qué eclipse, cuando autogenera el método toString() no usa Objects.toString(o).