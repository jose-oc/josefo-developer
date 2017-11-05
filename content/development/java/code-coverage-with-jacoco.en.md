---
title: "Code Coverage using Jacoco"
date: 2017-11-03T23:46:43+01:00
draft: true
categories:
  - Unit tests
  - Code coverage
tags:

---

I assume you write unit tests, of course! and... do you review the code coverage? I mean, the amount of code coveraged by those tests.

Personally I'm not extremely strict with the percentage of code tested because a simple number isn't sensible, there are some cases where reaching a specific number doesn't make sense. Think in testing a simple POJO. 
Nevertheless, I believe it is important to have an automatic tool checking this value for you because that way you'll be forced to review your tests and you might realised there are some cases in your code which haven't been covered by your tests such as a branch or some complex code.

<!-- more -->

When I say branch or complexity I mean the code might have an _if_ with some conditions covered by tests but some others don't. Imagine you have an if like the following one, you'd have to cover all the different conditions that could make this to be true:

```java
if (amount > 499 && !offer && isAvailable) {
    doSomething();
} else {
    doAnyOtherThing();
}
```

In that case it's useful to have a tool that assure you're covering all the possible cases.


## Jacoco

### Basic configuration

OJO: TRADUCE ESTO

Podemos usar la herramienta jacoco en nuestro proyecto maven tan sólo añadiendo el plugin al _pom.xml_

```xml
    <build>
        <plugins>
            <plugin>
                <groupId>org.jacoco</groupId>
                <artifactId>jacoco-maven-plugin</artifactId>
                <version>0.7.9</version>
                <executions>
                    <execution>
                        <goals>
                            <goal>prepare-agent</goal>
                        </goals>
                    </execution>
                    <execution>
                        <id>report</id>
                        <phase>prepare-package</phase>
                        <goals>
                            <goal>report</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>
        </plugins>
    </build>
```

Para ilustrar esto he añadido el plugin a mi proyecto [codeLanguageFinder](https://github.com/jose-oc/codeLanguageFinder) ([commit a7db3f3](https://github.com/jose-oc/codeLanguageFinder/commit/a7db3f34b275eb56b5a7d9b206600d0cb4bdfc81)).

Simplemente añadiendo eso al pom puedes ejecutar `mvn clean test` y verás dentro del directorio `target` aparece un archivo `jacoco.exec`. Este archivo contiene toda la información sobre el code coverage de los tests de tu proyecto, pero es un archivo binario que no podrás ver directamente (sí con sonar qube), pero creo que es más práctico generar el informe en html y verlo en cualquier navegador, para ello simplemente puedes ejecutar `mvn clean test jacoco:report`, `mvn clean package` o `mvn clean install`.

Entonces verás que dentro del directorio _target_ se genera el informe html: _**site/jacoco/index.html**_ 
Abriéndolo verás unos valores y unas barras con colores claros: verdes y rojos, indicando cuánto código tienes probado. Luego podrás entrar en las clases de tu código y ver directamente en el código qué está cubierto por los tests y qué no. Fantástico.

{{< figure src="/development/java/code-coverage-jacoco/jacoco-code-coverage-report001.png" title="Jacoco report" >}}

### Forzar un mínimo de coverage

Puedes formar un mínimo porcentaje de code coverage añadiendo una nueva execution al plugin en el pom:

```xml
    <execution>
        <id>jacoco-check</id>
        <goals>
            <goal>check</goal>
        </goals>
        <configuration>
            <rules>
                <rule>
                    <element>PACKAGE</element>
                    <limits>
                        <limit>
                            <counter>LINE</counter>
                            <value>COVEREDRATIO</value>
                            <minimum>0.80</minimum>
                        </limit>
                    </limits>
                </rule>
            </rules>
        </configuration>
    </execution>
```

Puedes consultar la [documentación](http://www.jacoco.org/jacoco/trunk/doc/check-mojo.html) para poder configurar esta execution.

Añadiendo esa execution estamos forzando a cumplir el requisito que ahí se indica, si el porcentaje de cobertura no llegara al valor indicado en el `minimum` (en este caso el 80%) el comando maven fallaría.

#### Contadores jacoco

Hay distintos tipos de contadores, en el ejemplo anterior usamos la línea de código pero existen otros: 

- INSTRUCTION
- LINE
- BRANCH
- COMPLEXITY
- METHOD
- CLASS


Se puede encontrar una descripción de cada uno en la [documentación](http://www.jacoco.org/jacoco/trunk/doc/counters.html).

#### Excluir clases 

Podemos especificar que no inspeccione ciertas clases. En este ejemplo he añadido una clase para que no la inspeccione ya que es una clase sin lógica.

```xml
    <excludes>
        <exclude>es/joseoc/java/code_language_finder/model/**/*</exclude>
    </excludes>
```

[Commit 42696bcb](https://github.com/jose-oc/codeLanguageFinder/commit/42696bcba35a60296eeb9bfc41e09479ef5da785)

#### Ejemplo de falta de cobertura

Si tenemos falta de cobertura en nuestro proyecto veremos que el comando maven falla y podremos ver los detalles en la salida de maven, por ejemplo: 

```
[INFO] --- jacoco-maven-plugin:0.7.9:check (jacoco-check) @ code-language-finder ---
[INFO] Loading execution data file /home/jose/code/jose/codeLanguageFinder/target/jacoco.exec
[INFO] Analyzed bundle 'code-language-finder' with 3 classes
[WARNING] Rule violated for package es.joseoc.java.code_language_finder.finder: complexity covered ratio is 0.77, but expected minimum is 0.80
[INFO] ------------------------------------------------------------------------
[INFO] BUILD FAILURE
[INFO] ------------------------------------------------------------------------
[INFO] Total time: 3.965 s
[INFO] Finished at: 2017-11-04T09:57:44+01:00
[INFO] Final Memory: 23M/299M
[INFO] ------------------------------------------------------------------------
[ERROR] Failed to execute goal org.jacoco:jacoco-maven-plugin:0.7.9:check (jacoco-check) on project code-language-finder: Coverage checks have not been met. See log for details. -> [Help 1]
[ERROR] 
[ERROR] To see the full stack trace of the errors, re-run Maven with the -e switch.
[ERROR] Re-run Maven using the -X switch to enable full debug logging.
[ERROR] 
[ERROR] For more information about the errors and possible solutions, please read the following articles:
[ERROR] [Help 1] http://cwiki.apache.org/confluence/display/MAVEN/MojoExecutionException
```

Fíjate que el proyecto tiene en total 4 clases pero en el informe se dice que se analizan 3, esto es porque estamos excluyendo una. 

Además, se indica que la cobertura es de un 77%, no alcanzando el límite inferior que hemos especificado que es del 80%.
En este caso resulta muy útil ver el informe generado (en mi caso prefiero la versión html) para ver dónde tenemos código sin cubrir.


## Documentación

- [Jacoco doc](http://www.jacoco.org/jacoco/trunk/doc/)
