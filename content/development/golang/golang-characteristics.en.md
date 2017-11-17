---
title: "Golang Characteristics"
date: 2017-11-16T15:32:21+01:00
draft: true
---

open-source created by Google in 2007
- compiler generates a single execuatable file
- statically typed (types are enforced before program is run)
- programs developped with golang are fast (concurrency built in)
- deploy is as simple as copying the executable into the server

This language is though for developing systems programming (programs that provide service to other systems). They don't show a graphic interface but instead they can be run via the command line (such as APIs, CLI apps and so on).


## Installation

You can download the executable version of _go_ for your OS.

### Paths

Having _go_ installed you can type `go env` to check where it is installed:

In my case: 

```
go env

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

I recomend you to add those paths to you $PATH environment variable.

## Project structure

The folder _src_ is the root of every project.
All runnable Go programs must have a `main` package and one `main` function.
If your project only has one file, call it `main.go` - this is a convention.


## Build the project

This is to compile it and generate the executable file. 

Execute: 
`go build`

### Build and run

This command does not generate an executable file.

`go run main.go`

## Tool: gofmt

This tool formats the source code. If you don't pass the `-w` argument the source formatted is showed in the console.

`gofmt -w main.go`

## Program arguments

To write a program which reads user's arguments typed via the console we can use `os.Args` which is an Array that contains all the arguments passed to the program. The first element is the name of the program.
Remember you have to import the `os` library.

The way we call this program would be:

```
go run main.go "This is an argument"
```

The command `go run` creates a temporary executable program. If you want to check where is this file created you can show it by typing a program with this instruction: 

```
fmt.Println(os.Args[0])
```

In my case that showed me this result: 

```
/tmp/go-build296861959/command-line-arguments/_obj/exe/main
```


`len` function is a built-in function, it doesn't need to be imported.


## Tool: goimport

This tool adds the missing import statements and remove the ones that aren't in use as well as formats the code as the gofmt tool does.

### Installation

```
go get -u -v golang.org/x/tools/cmd/goimports
```

This will create the `goimports` tool within `$HOME/go/bin`


## 
