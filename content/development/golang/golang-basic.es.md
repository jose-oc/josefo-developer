---
title: "Golang Characteristics"
date: 2017-11-16T15:32:21+01:00
draft: false
---

El lenguage de programación _Go_ es open source y fue creado por Google en 2007.
Las características que más me llaman la atención de él son: 

- es un lenguaje compilado
- el compilador genera un solo fichero ejecutable
- es estáticamente tipado (el compilador asegura los tipos antes del tiempo de ejecución)
- los programas desarrollados en go son rápidos (concurrencia viene por defecto)
- el despliegue es tan sencillo como copiar un ejecutable al servidor

Este lenguage es apropiado para dar servicio a otros sistemas (como APIs, aplicaciones de consola, etc.), no es habitual usar _Go_ para aplicaciones gráficas.
Sin embargo, una aplicación web puede ser desarrollada usando este lenguaje ya que el frontend debe ser HTML y CSS.

Algunas aplicaciones importantes escritas en _Go_ son: 
[Grafana](https://github.com/grafana/grafana), [Kubernetes](https://github.com/kubernetes/kubernetes) or [Hugo](https://github.com/gohugoio/hugo)

<!-- more -->

## Instalación

Hay ejecutables disponibles para los distintos sistemas operativos.

### Paths

Una vez que _go_ está instalado puedes ejecutar `go env` para ver dónde está instalado y qué variables de entorno está usando.

En mi caso: 

```bash
> go env

GOARCH="amd64"
GOBIN=""
GOEXE=""
GOHOSTARCH="amd64"
GOHOSTOS="linux"
GOOS="linux"
GOPATH="/home/jose/go"
GORACE=""
GOROOT="/usr/local/go"
GOTOOLDIR="/usr/local/go/pkg/tool/linux_amd64"
GCCGO="gccgo"
CC="gcc"
GOGCCFLAGS="-fPIC -m64 -pthread -fmessage-length=0 -fdebug-prefix-map=/tmp/go-build702338749=/tmp/go-build -gno-record-gcc-switches"
CXX="g++"
CGO_ENABLED="1"
CGO_CFLAGS="-g -O2"
CGO_CPPFLAGS=""
CGO_CXXFLAGS="-g -O2"
CGO_FFLAGS="-g -O2"
CGO_LDFLAGS="-g -O2"
PKG_CONFIG="pkg-config"
```

Como puedes ver _go_ está instalado en la ruta indicada por _GOROOT_ mientras que su home está difinida por _GOPATH_ así que puedes tener programas o herramientas de consola ejecutables en estas dos rutas:  _/usr/local/go/bin_ y _/home/jose/go/bin_.

Te recomiendo que añadas estos paths a la variable de entorno _$PATH_:

```bash
export PATH=$PATH:/usr/local/go/bin:$HOME/go/bin
```

## Estructura de proyecto

El directorio _src_ es la raíz donde están todos los poyectos.
Todos los programas de Go deben tener un paquete `main` y una función `main`.

{{% notice tip %}}
Si tu proyecto tiene tan sólo un fichero, llámalo  **main.go** - por convención
{{% /notice %}}

## Construir el proyecto

Hacer el **build** es compilar y generar el ejecutable. 

Ejecuta: 

`go build`

###  Build and run

En desarrollo generar el ejecutable y ejecutarlo son dos pasos que se convierten en una pérdida de tiempo, Go permite ejecutar directamente el código. Realmente genera el ejecutable en un directorio temporal y lo ejecuta.

`go run main.go`


## Argumentos en tu programa

Para escribir un programa en _Go_ que lea los argumentos que el usuario añada al comando para su ejecución se puede usar el array `os.Args` cuyo primer argumento es el propio programa que se está ejecutando.
Recuerda importar la libraría `os`.

La forma de llamar al programa podría ser así:

```
go run main.go "This is an argument"
```

El comando `go run` crea un ejecutable temporal. Si quieres saber dónde se ha creado dicho archivo puedes mostrar el primer elemento del array os.Args:

```go
fmt.Println(os.Args[0])
```

En mi ejemplo he obtenido este resultado:

{{% alert theme="success" %}}
/tmp/go-build296861959/command-line-arguments/_obj/exe/main
{{% /alert %}}


La función `len` está añadida por defecto así que no hace falta especificar ningún import.


## Herramientas de línea de comandos

### Tool: gofmt

Esta herramienta formatea el código fuente. Si no pasas el argumento `-w` el código fuente será formateado y mostrado en la consola (salida estándar).

`gofmt -w main.go`

### Tool: goimport

Esta herramienta añade los import que se están usando y no se han añadido automáticamente, además elimina los que no se estén usando y formatea el código tal y como lo hace la herramienta _gofmt_.

#### Instalación

```
go get -u -v golang.org/x/tools/cmd/goimports
```

De esta forma se creará la herramienta `goimports` en `$HOME/go/bin`.


## Variables y tipos de datos

Las variables en _go_ son tipadas, como ya se ha mencionado. 

Toda variable tiene un valor por defecto, lo que se llama _zero value_, distinto dependiendo del tipo:

- string -> ""
- int -> 0
- bool -> false
- float -> 0.0
- byte -> 0
- function -> nil

Hay dos formas distintas de declarar una variable, en una se infiere el tipo y en el otro se indica explícitamente.

### Type inference

Para declarar una variable nueva sin especificar el tipo, de forma que sea inferido del valor que se le asigne, hay que usar el símbolo `:=`.

```
name := "Ludwig van Beethoven"
```

Esta es la forma más habitual de declarar variables en Go.

### Manual type declaration

```
var name string = "Ludwig van Beethoven"
```

### Types

- int
- string
- bool
- []String
- struct


## Functions

La forma de definir una función es así:

`func functionName(arg1 string, arg2 int) string {...}`

Es importante indicar que los argumentos de las funciones tienen su tipo definido.

Las funciones **no** soportan sobrecarga, es decir no podemos tener algo así:

```go
type guestConnection struct {
  ip string
  userName string
  isAdmin bool
}

func (g guestConnection) notify() {
  fmt.Println("Guest connection from user name:", g.userName)
}

func (g guestConnection) notify(s string) {
  fmt.Println("Guest connection from user name " + s + " :", g.userName)
}
```


### Errores

Las funciones pueden devolver un valor más, el error:

```go
import ("errors")

func workingAt(hour int) (string, error) {
    var message string

    if hour > 23 {
        err := errors.New("Too late to be working, go to bed!!!")
        return message, err
    }
}
```

Es buena práctica en _Golang_ comprobar si hay errores tras invocar una función.

```go
greeting, err := getGreeting(hour)

if err != nil {
    fmt.Println(err)
    os.Exit(1)
}
```


## Algunos paquetes de utilidad

### fmt

fmt.Println()

### time

time.Now().Hour()




## Bucles

_Golang_ tiene sólo el bucle _for_ pero se puede usar de formas distintas:

## Estilo 1: tradicional

```go
  for  i := 0; i < 10; i++ {
    fmt.Println(i)
  }
```

### Estilo 2: booleano

El bucle termina cuando la condición es *false*.

```go
  isAlive := false
  for !isAlive {
    isAlive = util.PingChatServer()
  }
```

### Estilo 3: infinito

El bucle es infinito y termina con la keyword `break`.

```go
  for {
    if util.PingChatServer() {
      break
    }
  }
```


## Array & Slices

Los **array** empiezan en 0 y deben tener un tamaño predeterminado y fijo.
Como en otros lenguajes, los arrays empiezan por 0. 

Los **slices** son un tipo especial de array, no hay que especificar su tamaño.
Para añadirles elementos se usa la función `append`.


## Struct

Se pueden definir estructuras de datos - similar a las clases en Java - y podemos crear funciones para trabajar con esots tipos de datos de dos formas diferentes: llamando a una función al estilo procedural `miFunc(objeto)` o al estilo de programación orientada a objetos `objeto.miFunc()`.


```go
package main

import (
    "fmt"
)

type person struct {
    name string
    age  int
}

func main() {
    person1 := person{ name: "Chiquito", age: 66}
    person2 := person{ name: "Paco de Lucía", age: 55}

    fmt.Println("Soy " + person1.name + ", " + profesion(person1) + " de profesión.")
    fmt.Println("Soy " + person2.name + ", " + person2.getProfesion() + " de profesión.")
}

// This function uses the argument
func profesion(p person) string {
    if p.name == "Chiquito" {
        return "humorista"
    } else if p.name == "Paco de Lucía" {
        return "músico"
    } else {
        return "desconocida"
    }
}

// The same function in another way, it recalls the Java style: object.method()
// Not this method belongs to the type `person`
func (p person) getProfesion() string {
    if p.name == "Chiquito" {
        return "humorista"
    } else if p.name == "Paco de Lucía" {
        return "músico"
    } else {
        return "desconocida"
    }
}
```


## Por valor vs Por referencia

Los argumentos de las funciones son **copias** del valor original, compruébalo:

```go
type person struct {
    name string
    age  int
    isAlive bool
    isAdult bool
}

func main() {
    person1 := person{ name: "Chiquito", age: 66}
    setAdulthood(person1)
    fmt.Println("after setAdulthood, person: ", person1)
}

func setAdulthood(p person) {
    p.isAdult = p.age > 17
    fmt.Println("within setAdulthood, person: ", p)
}
```

Ahí podemos ver que el valor de `isAdult` no cambia el valor de _person1_

{{% alert theme="info" %}}
within setAdulthood, person:  {Chiquito 66 false true}

after setAdulthood, person:  {Chiquito 66 false false}
{{% /alert %}}

### Por valor

```go
original := "Chopin - Prelude No. 4 in E Minor"
cheat := original
fmt.Println(original)
fmt.Println(cheat)

cheat = "Radiohead - Exit Music For A Film"
fmt.Println(original)
fmt.Println(cheat)
```

Comprueba el resultado

{{% alert theme="info" %}}
Chopin - Prelude No. 4 in E Minor

Chopin - Prelude No. 4 in E Minor

Chopin - Prelude No. 4 in E Minor

Radiohead - Exit Music For A Film
{{% /alert %}}

La variable `cheat` ha sido sobreescrita mientras que _original_ aún tiene su valor.

### Por referencia

Date cuenta de que el operador `&` devuelve el puntero al objeto, es decir, la dirección de memoria.

```go
original := "Chopin - Prelude No. 4 in E Minor"
cheat := &original
fmt.Println(original)
fmt.Println(cheat)
```

Con ese código, la variable _cheat_ contiene el valor de la dirección de memoria donde el dato está guardado, es decir el puntero.
El código anterior devuelve esto: 

{{% alert theme="info" %}}
Chopin - Prelude No. 4 in E Minor

0xc420072030
{{% /alert %}}


```go
package main

import "fmt"

type person struct {
    name    string
    age     int
    isAlive bool
    isAdult bool
}

func main() {
    person1 := person{name: "Chiquito", age: 66}

    person1Pointer := &person1
    setAdulthood(person1Pointer)
    fmt.Println("after setAdulthood, person: ", person1)

    person1.changeAge()
    fmt.Println("after changeAge, person: ", person1)

    person1.changeName()
    fmt.Println("after changeName, person: ", person1)
}

func setAdulthood(p *person) {
    p.isAdult = p.age > 17
    fmt.Println("within setAdulthood, person: ", p)
}

func (p person) changeAge() {
    p.age = 50
    fmt.Println("within changeAge, person: ", p)
}

func (p *person) changeName() {
    p.name = "El gran Chiquito"
    fmt.Println("within changeName, person: ", p)
}
```
{{% notice info %}}
Los métodos _setAdulthood_ y _changeName_ tienen un puntero al objeto person así que es pasado por referencia y su valor puede ser modificado.
{{% /notice %}}

{{% notice tip %}}
Se podría pensar que el caracter **&** dice a Go que devuelva la dirección de memoria y el caracter __*__ le dice a Golang que tiene que recoger el objeto que está en la dirección de memoria indicada.
{{% /notice %}}

### Equals

```go
func main() {
    person1 := person{ name: "Chiquito", age: 66}
    person2 := person{ name: "Paco de Lucía", age: 55}

    // check if 2 objects are the same
    if person1 == person1 {
        fmt.Println("same person")
    }

    person3 := person{ name: "Chiquito", age: 66}
    if person1 == person3 {
        fmt.Println("two different objects with the same data are equals")
    } else {
        // this doesn't appear
        fmt.Println("two different objects with the same data are NOT equals")
    }
}
```


## Interfaces

La convención dice que llames a la interfaz como el método que define añadiendo el sufijo '-er'.

Ejemplo de cómo definir la interface:

```go
type Speaker interface {
    Speak() string
}
```

Para que un tipo struct implemente el interfaz tan sólo hay que implementar el método del interfaz, como se muestra en este ejemplo con la implementación del interfaz Speaker por parte del tipo Human.

```go
func (h Human) Speak() string {
    return "Hi, my name's " + h.name
}
```

Así ya se puede usar el tipo Speaker, echa un ojo al método _getList_.

```go
package main
    
import(
    "fmt"
)

type Human struct {
    name string
}

type Bot struct {
    nick string
}

type Speaker interface {
    Speak() string
}

func (h Human) Speak() string {
    return "Hi, my name's " + h.name
}

func (b Bot) Speak() string {
    return "I am a robot called " + b.nick
}

func getList() []Speaker {
    chano := Human{ name: "Chano Domínguez" }
    siri  := Bot{ nick: "Siri" }

    list := []Speaker{ chano, siri }
    return list
}

func main() {
    for _, sp := range getList() {
        fmt.Println(sp.Speak())
    }
}
```


## Visibilidad

Cuando tienes código en otro archivo distinto a main.go tienes que poner en mayúsculas la primera letra de las funciones y tipos que quieres que se vean fuera.



## GoRoutines

Puedes indicarle a GoLang que ejecute en paralelo alguna rutina con unas palabras reservadas.

TODO

## Channels



TODO



