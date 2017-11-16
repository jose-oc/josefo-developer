---
title: Envolviendo el código
date: 2016-01-01T00:00:00+00:00
draft: true

---
# Using third party libraries

<h1 style="text-align: justify">Envolver el código, ¿realmente sirve para algo?</h1>
<p style="text-align: justify">Sí, encapsular es muy bueno, pero hasta leer el capítulo Boundaries de Clean Code no me había planteado envolver las librerías de terceros y tras leerlo creo que es buena idea, haciéndolo con cabeza.</p>
<p style="text-align: justify">Lo que plantea Uncle Bob en este capítulo es que cuando usemos una librería de un tercero es una muy buena opción crear una clase propia que la envuelva pero claro, no vamos a crear una interfaz igual a la que nos provee la libraría, en principio crearemos los métodos que vayamos a utilizar, si en un futuro necesitamos otro más pues lo hacemos igual.
Haciendo esto tenemos varios beneficios a cambio del pequeño trabajo de crear la clase, éstos son:</p>

<ul style="text-align: justify">
    <li>Al envolver los métodos podemos <strong>añadir</strong> algo <strong>más</strong> de <strong>lógica</strong> si lo necesitamos en nuestro proyecto.</li>
    <li>Nos <strong>protegemos ante futuros cambios de la librería</strong>.
Si en una futura versión de la librería cambia la interfaz, por ejemplo, sólo tendremos que modificar una clase en nuestro proyecto.</li>
    <li>Podemos<strong> tratar las excepciones</strong> que devuelva la librería conforme a nuestras necesidades</li>
</ul>
Un patrón que se puede aplicar para esto es el <strong>Adapter</strong> de forma que acomodemos la interfaz que nos provee un tercero a la que mejor se ajusta a nuestras necesidades.
<h1 style="text-align: justify">Aprender a usarla haciendo tests.</h1>
<p style="text-align: justify">Uncle Bob también aconseja usar JUnit para aprender a usar la librería, de esta forma matamos dos pájaros de un tiro, vamos aprendiendo a usarla y acabamos teniendo una serie de tests que nos sirven de documentación sobre cómo funciona a la par de pruebas para cuando cambie la versión de la misma. Cuando una nueva versión sea liberada tan solo tendremos que ejecutar nuestro test para saber si se sigue comportando igual que la versión anterior, que es lo que esperamos en nuestro proyecto.</p>
<p style="text-align: justify">La verdad es que aprender a usar una librería haciendo tests es algo que yo ya hacía, no por estos motivos sino porque me resulta cómodo usar JUnit para crearme distintas pruebas y poder marcar las que me funcionan y las que no.</p>