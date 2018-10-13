---
title: "Concurrency vs Parallelism"
date: 2018-10-13T22:39:25+02:00
draft: true
---

Estos dos términos se confunden entre sí muy frecuentemente. 

Tras leer algunos artículos creo que tengo clara la diferencia entre ellos y voy a tratar de explicarla aquí de la forma más simple que pueda. 

**Concurrency** - o *concurrencia* - es lo que mi madre era capaz de hacer mientras que **parallelims** - o *paralelismo* - era lo que mi madre conseguía cuando nos ponía a cada miembro de la familia en marcha para que cada uno consiguiera hacer una tarea.

Quiero decir, mi madre era capaz de llevar a cabo varias tareas al mismo tiempo; por ejemplo, podía estar hablando con mi hermana mientras me ayudaba a mí con los deberes del colegio al mismo tiempo que estaba preparando la cena y terminando un crucigrama. Ella hacía todo eso al mismo tiempo (yo me quedaba con hacer una sola tarea en cada momento) pero realmente si en mi casa hubiera habido una mosca super inteligente (recuerda que las mosas procesan lo que ven de una forma mucho más rápida que los humanos, nuestros movimientos van a cámara lenta para ellas) y hubiéramos podido preguntar a esta mosca cuántas cosas estaba haciendo mi madre al mismo tiempo, la mosca habría respondido que solamente una en cada momento, y llevaría razón porque de lo que mi madre era capaz no era de hacer muchas cosas al mismo tiempo sino de hacer un poco de cada tarea y cambiar a otra tarea de una forma muy rápida, recordando en qué punto dejó dicha tarea la vez anterior que estaba atendiéndola, cosa que a mí me asombraba porque realmente me parecía que hacía varias cosas al mismo tiempo. Pues ésto es lo que yo entiendo por **concurrencia**. 

En cambio, **paralelismo** es lo que conseguía mi madre cuando nos asignaba una tarea que hacer a cada uno de mis hermanos y a mi padre. Todos los poníamos a hacer la tarea encomendada al mismo tiempo para terminar antes. Éste sí es un caso en que el mismo instante de tiempo hay varias tareas siendo realizadas en cada instante de tiempo.


Si trasladamos esta idea al mundo informático, cada persona sería un core del procesador. Con un sólo core sólo se puede ejecutar un proceso a la vez, es decir, no hay paralelismo, pero sí que puede haber concurrencia.


## ¿Qué significa ésto en la práctica?

Como desarrolladores de software hay momentos en los que necesitamos o vemos que podemos mandar ejecutar cierta parte de la aplicación de forma concurrente o de forma paralela. Es algo que mientras estamos escribiendo código casi nunca podemos saber con certeza porque no sabemos sobre qué máquina se va a ejecutar e incluso no sabemos sobre qué sistema operativo. 

Hay que tener en cuenta que cuando en una aplicación se ejecuta cierta parte de forma concurrente o paralela se pierde el control de qué acabará antes o del orden en que se ejecutarán las tareas, es decir que se ejecutan de forma **asíncrona**.


## Sources

+ https://stackoverflow.com/questions/1050222/what-is-the-difference-between-concurrency-and-parallelism
+ https://pragprog.com/book/pb7con/seven-concurrency-models-in-seven-weeks
+ This post sets the basics about concurrency and compares the most important languages about this aspect: https://medium.freecodecamp.org/concurrency-ideologies-of-programming-languages-java-c-c-c-go-and-rust-bd4671d943f
+ https://vorpus.org/blog/notes-on-structured-concurrency-or-go-statement-considered-harmful/
+ https://medium.com/@tilaklodha/concurrency-and-parallelism-in-golang-5333e9a4ba64
