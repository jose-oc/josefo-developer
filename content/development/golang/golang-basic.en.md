---
title: "Golang Characteristics"
date: 2017-11-16T15:32:21+01:00
draft: false
---

This language is open source and was created by Google in 2007. 
The characteristics that stand out for me are: 

- it's a compiled language
- the compiler generates a single execuatable file
- it's statically typed (types are enforced before program is run)
- programs developped with golang are fast (concurrency built in)
- deployment is as simple as copying the executable into the server

This language is appropriate for developing systems programming (programs that provide service to other systems). They don't show a graphic interface but instead they can be run via the command line (such as APIs, CLI apps and so on). 
Nevertheless a web application can be developped using this language as the frontend can be written using HTML and CSS. Some important applications written in Go are: [Grafana](https://github.com/grafana/grafana), [Kubernetes](https://github.com/kubernetes/kubernetes) or [Hugo](https://github.com/gohugoio/hugo)

<!-- more -->

## Installation

You can download the executable version of _go_ for your OS.

### Paths

Having _go_ installed you can type `go env` to check where it is installed:

In my case: 

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

So you can have executable programs related to _go_ in _/usr/local/go/bin_ and _/home/jose/go/bin_

I recomend you to add those paths to you $PATH environment variable: 

```bash
export PATH=$PATH:/usr/local/go/bin:$HOME/go/bin
```

## Project structure

The folder _src_ is the root of every project.
All runnable Go programs must have a `main` package and one `main` function.

{{% notice tip %}}
If your project only has one file, call it **main.go** - this is a convention
{{% /notice %}}

## Build the project

This is to compile it and generate the executable file. 

Execute: 
`go build`

### Build and run

This command does not generate an executable file.

`go run main.go`


## Program arguments

To write a program which reads user's arguments typed via the console we can use `os.Args` which is an Array that contains all the arguments passed to the program. The first element is the name of the program.
Remember you have to import the `os` library.

The way we call this program would be:

```
go run main.go "This is an argument"
```

The command `go run` creates a temporary executable program. If you want to check where is this file created you can show it by typing a program with this instruction: 

```go
fmt.Println(os.Args[0])
```

In my case that showed me this result: 

{{% alert theme="success" %}}
/tmp/go-build296861959/command-line-arguments/_obj/exe/main
{{% /alert %}}


`len` function is a built-in function, it doesn't need to be imported.


## Some command line tools

### Tool: gofmt

This tool formats the source code. If you don't pass the `-w` argument the source formatted is showed in the console.

`gofmt -w main.go`

### Tool: goimport

This tool adds the missing import statements and remove the ones that aren't in use as well as formats the code as the gofmt tool does.

#### Installation

```
go get -u -v golang.org/x/tools/cmd/goimports
```

This will create the `goimports` tool within `$HOME/go/bin`


## Variables and Data types

Variables in Go are typed. 
There're two different ways to declare a variable.

Every variable has a default value (called zero value), depending on its types: 

- string -> ""
- int -> 0
- bool -> false
- float -> 0.0
- byte -> 0
- function -> nil
etc.

### Type inference

New variables are declared with the symbol `:=` which tells the compiler to **infer** the type of the variable, so the variable has a type but you don't need to write which type it has.
This is *type inference*, the compiler finds out the type.

```
name := "Ludwig van Beethoven"
```

This is the most common way to declare variables.

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

The function signature is like this: 

`func functionName(arg1 string, arg2 int) string {...}`

Notice the functions' arguments have their types.


### Errors

Functions can return multiple values:

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


It's a good practice in _Go_ to check if an error exists as the first thing on every function.

```go
greeting, err := getGreeting(hour)

if err != nil {
    fmt.Println(err)
    os.Exit(1)
}
```


## Useful packages

### fmt

fmt.Println()

### time

time.Now().Hour()




## Loops

Go only has the for loop, but you can use it in different ways. 
Loops have 3 components: 

- the init statement
- a conditional expression
- a post statement

## Style 1: classical

```go
  for  i := 0; i < 10; i++ {
    fmt.Println(i)
  }
```

### Style 2: classical

When the condiction is *false* the loop finishes.

```go
  isAlive := false
  for !isAlive {
    isAlive = util.PingChatServer()
  }
```

### Style 3: infinite

The keyword `break` is key here:

```go
  for {
    if util.PingChatServer() {
      break
    }
  }
```


## Array & Slices

Arrays start by 0. You have to set its dimensions.
Slices is a special type of array, you don't need to set its dimensions.
Slices use the built-in function `append`.


## Struct

We can define structure of data - similar to Java classes - and we can create functions to work with these type of data in two different ways: one is the classic function which gets the structured data as an argument or using the typical OOP way of calling methods.

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


## Values vs References

Functions' arguments are **copys** of the original value, check it out:

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

We can see how the value of `isAdult` doesn't change for the _person1_

{{% alert theme="info" %}}
within setAdulthood, person:  {Chiquito 66 false true}

after setAdulthood, person:  {Chiquito 66 false false}
{{% /alert %}}

### Values

```go
original := "Chopin - Prelude No. 4 in E Minor"
cheat := original
fmt.Println(original)
fmt.Println(cheat)

cheat = "Radiohead - Exit Music For A Film"
fmt.Println(original)
fmt.Println(cheat)
```

You migh imagine the result

{{% alert theme="info" %}}
Chopin - Prelude No. 4 in E Minor

Chopin - Prelude No. 4 in E Minor

Chopin - Prelude No. 4 in E Minor

Radiohead - Exit Music For A Film
{{% /alert %}}

The variable `cheat` has been overwritten while the _original_ one still has its value.

### References

Note how the operator `&` returns the pointer to the object, this is the memory address.

```go
original := "Chopin - Prelude No. 4 in E Minor"
cheat := &original
fmt.Println(original)
fmt.Println(cheat)
```

With that code the variable _cheat_ is getting the memory address where the data is stored, this is the pointer.
This is what is shown: 

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
The methods _setAdulthood_ and _changeName_ have a pointer to the object person so it is passed by reference and its values can be altered.
{{% /notice %}}

{{% notice tip %}}
You can think of the character **&** as saying go to take the memory address and the character __*__ as saying to go get the object which is in that memory address.
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

The convention says you call the interface as the method + 'er'.

The idea is to define the interface: 

```go
type Speaker interface {
    Speak() string
}
```

For a struct type to implement the interface you only have to write the method implementation. For instance, here the type Human implements the interface Speaker.

```go
func (h Human) Speak() string {
    return "Hi, my name's " + h.name
}
```

Then you can use the type Speaker, have a look at the method _getList_.

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


## Visibility

When you have code in another files different than main.go you have to capitalize the functions and types you want to export, this is to be visible from out of that specific file.



## GoRoutines

You can tell _Go_ to run a routine in **parallel** by using some special keywords (`go`, `` and ``)

Run a few examples [here](https://tour.golang.org/concurrency/1): 
> A goroutine is a lightweight thread managed by the Go runtime.
> Goroutines run in the same address space, so access to shared memory must be synchronized. The sync package provides useful primitives, although you won't need them much in Go as there are other primitives.

From https://tour.golang.org/concurrency/1:
```go
import (
    "fmt"
    "time"
)

func say(s string) {
    for i := 0; i < 5; i++ {
        time.Sleep(100 * time.Millisecond)
        fmt.Println(s)
    }
}

func main() {
    fmt.Println("start")
    go say("world") // It runs in background
    say("hello") // It runs without waiting for the earlier instruction to finish
    fmt.Println("end")
}
```


## Channels

Channels is a mechanism to send and receive values. It's specially useful to be used with the goroutines because it allows goroutines to synchronize without explicit locks or condition variables.

```go
ch := make(chan int) // Create the channel

ch <- v    // Send v to channel ch.
v := <-ch  // Receive from ch, and
           // assign value to v.
```

A channel doesn't support arrays (struct?) so using Buffered channels come in handy for that.

### Buffered channel

```go
ch := make(chan int, 10)
// you can get the capacity of a buffered channel
fmt.Println(cap(ch))
```

### Check if channel is closed

You can know if there are more elements on the channel by adding a second variable when reads from the channel: 
```go
v, ok := <-ch
```
if ok is false, there isn't any more elements on the channel.

### Close a channel

Only the sender should close the channel, although usually this isn't necessary to do it explicitly.
```go
close(channel)
```

### Range

To loop over the elements from a channel:
```go
for i := range channel
```

### Fibonacci example

```go
func fibonacci(n int, c chan int) {
    x, y := 0, 1
    time.Sleep(100 * time.Millisecond)
    for i := 0; i < n; i++ {
        c <- x
        x, y = y, x+y
        time.Sleep(100 * time.Millisecond) // With this time to wait between fibonacci numbers we check that the `range` instruction consumes data from the channel as long as they turn up there _until the channel is closed_.
    }
    close(c) // when the channel is closed the range instruction finishes.
}

func main() {
    c := make(chan int, 10)
    go fibonacci(cap(c), c) // this runs in background, while the for loop is running the channel is being populated with data within the fibonacci function.
    for i := range c {
        fmt.Println(i)
    }
}
```

### Select

```go
```


## Libraries

Top GoLang libraries: https://golanglibs.com/top


----

## Comparativa, por qué usar Go

> We use Go at ParallelDots to handle concurrent web requests (We already handle upto 3000 concurrent users in production). While most of our Machine Learning layer is written in Python, python's concurrency model was a poor choice in handling many parallel related requests (out of which many were duplicated, but not arriving at enough latency to get them cached). There are also some other inter-request constraints, which were easy to implement using channels.
> Go's concurrency model is very easy and intuitive (although it is also very opinionated and IMHO very optimized for Google-like use case servers). It also has one of the best http handlers written.  [TechEmpower Web Framework Performance Comparison](https://www.techempower.com/benchmarks/#section=data-r10&hw=ec2&test=json)
> If one is thinking of writing web services with precise control and finds C++ huge to learn in available time , I think Go is one of the best languages around (elixir being close).
https://www.quora.com/What-is-golang-good-for


## para aprender

https://golangbot.com/
https://tour.golang.org/concurrency/1