---
title: "Building Simple Web Server"
date: 2018-10-09T13:52:23+02:00
draft: true
---


## Basic web server to say hello

We're going to build a basic web server which just returns a _Hello world!_ 

The `net/http` package provides all the features we need to write both HTTP clients and servers.

## Dealing with JSON

We can use the built-in library `encoding/json` to encode and decode Json into Go types and viceversa using its functions `Marshal` and `Unmarshal`. You can use `Encoder` and `Decoder` types instead to have more control on how to manage data.

### Structs into Json

#### Marshal

Using the Marshal function, which signature is:

`func Marshal(v interface{}) ([]byte, error)`

Example: 

Happy path: create a json from a struct:

```go
package main

import (
	"encoding/json"
	"fmt"
)

type myStruct struct {
	Message string
	hidden  string
}

func main() {
	response := myStruct{Message: "Hello world!",
		hidden: "This won't be shown in the JSON as the field name starts by a lower case character"}
	data, err := json.Marshal(response)
	if err != nil {
		panic("Buuuups, error marshalling the Hello World response")
	}

	fmt.Println(string(data))
}
```

This returns: 

```
{"Message":"Hello world!"}
```

--- 

What if I want to use camel case field names in the json? 

```go
package main

import (
	"encoding/json"
	"fmt"
)

type myStruct struct {
	// change the output field to be "message"
	Message string `json:"message"`
	// do not output this field
	Author string `json:"-"`
	// do not output the field if the value is empty
	Date string `json:",omitempty"`
	// convert output to a string and rename "id"
	Id int `json:"id,string"`
}

func main() {
	response := myStruct{Message: "Hello world!", Author: "Jose", Id: 1}
	data, err := json.Marshal(response)
	if err != nil {
		panic("Buuuups, error marshalling the Hello World response")
	}

	fmt.Println(string(data))
}
```

This returns: 

```
{"message":"Hello world!","id":"1"}
```

#### Encoder

Marshal returns a byte array. Encoders can write directly to a stream though, which can improve the performance.

Why on earth do we want to get the json in a byte array if we can pass it directly to the stream? Let's do that:

```go
package main

import (
	"encoding/json"
	"os"
)

type myStruct struct {
	// change the output field to be "message"
	Message string `json:"message"`
	// do not output this field
	Author string `json:"-"`
	// do not output the field if the value is empty
	Date string `json:",omitempty"`
	// convert output to a string and rename "id"
	Id int `json:"id,string"`
}

func main() {
	response := myStruct{Message: "Hello world!", Author: "Jose", Id: 1}

	jsonEncoder := json.NewEncoder(os.Stdout)
	jsonEncoder.Encode(response)
}
```



{{% alert theme="warning" %}}
Channel, complex types, and functions cannot be encoded in JSON
{{% /alert %}}





### Json into Structs

#### Unmarshalling

