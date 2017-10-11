---
title: Customized linux prompt
date: 2015-09-22T20:59:01+00:00
tags:
  - linux
  - terminal

---
When I use the terminal on Linux and I write a lot of commands with long responses I got lost very often, that's why I decided to change the prompt I use in order to identify it easily.

To do this you just have to modify the environment variable PS1 by adding this line at the end of the file ~/.bashrc:

<pre class="lang:sh decode:true ">export PS1="\[$(ppwd)\]\e[1;33m\u\e[m@\e[1;35m\h\e[m:\e[1;32m\w\e[m\$ \n"</pre>


Another option is

```bash
# Setup a red prompt for root and a green one for users.
NORMAL="\[\e[0m\]"
RED="\[\e[1;31m\]"
GREEN="\[\e[1;32m\]"
if [ "$USER" = root ]; then
        PS1="$RED\h [$NORMAL\w$RED]# $NORMAL"
else
        PS1="$GREEN\h [$NORMAL\w$GREEN]\$ $NORMAL"
fi
export PS1
```