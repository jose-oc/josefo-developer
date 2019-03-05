---
title: 'Installing Python'
author: Jose OC
date: 2019-03-05T00:00:00+00:00
draft: true
---

There are several ways of having python installed on your computer, I've been asked about this many times. 
This post doesn't pretend to explain the correct way of doing so but the way I'm getting my computer ready.

## Python versions

You may need to use different versions of python either to develop new projects or to run some of them. 
You'll need a version of python2 and python3, at least. Although in my case I need more than one version of python3 installed, I use `tox` in my projects to test them using different versions and it requires to have the versions of python that you want to use. 
At the moment I use tox to test my projects in python 2.7, 3.5 and 3.6

{{% alert theme="info" %}}
[tox](https://docs.python-guide.org/writing/tests/#tox) is a tool for automating test environment management and testing against multiple interpreter configurations.
{{% /alert %}}

## Python virtual environments

When you work on a python project you have some dependencies to third party projects and you usually want to specify the version you use. 
Having this dependencies shared among all your projects will end up being a mess at some point, so the best option is to define a new fresh environment to each project. This is achievable using virtual environments. 

A virtual environment is a way of specify the version of python you want to use and to have some dependencies installed different than the ones you use for another project.

## Install Python

By default, Linux (the OS I use) comes with two versions of python installed: python2 (which is configured to be used by default) and python3. 
If you, like me, want to have more than these versions installed, you can rely on the OS package manager, install them from source or using the non-official tool [pyenv](https://github.com/pyenv/pyenv) - which is the one I'm using at the moment.


### PyEnv

Simple Python version management.

What this project actually does is to tell your OS to use the tool called `python` which isn't the actual python but a tools which select the one you really want to use and then call it. 
This is a brief summary but you can understand how pyenv works by reading its [github readme](https://github.com/pyenv/pyenv#how-it-works).

#### Installation

The easiest way of installing it is by using the project [pyenv-installer](https://github.com/pyenv/pyenv-installer) to install some plugins on top of *pyenv*.

```
curl https://pyenv.run | bash
```

Then, modify the script to configure your shell as the installation process will advise you. 
It's basically to modify the PATH and initialize pyenv this way:

```bash
export PATH="/home/USERNAME/.pyenv/bin:$PATH"
eval "$(pyenv init -)"
eval "$(pyenv virtualenv-init -)"
```










https://amaral.northwestern.edu/resources/guides/pyenv-tutorial
https://github.com/pyenv/pyenv
  Check out rbenv and ruby-build (mentioned in the above link) to do the same with ruby
  To allow tox to use different versions of python, first install them using pyenv, then make them available in the path with the command `pyenv global system 3.6 3.5`

----- JULI -------
Instalar pyenv y sus plugins:

git clone https://github.com/pyenv/pyenv.git ~/.pyenv
git clone https://github.com/pyenv/pyenv-virtualenv.git $(pyenv root)/plugins/pyenv-virtualenv
git clone https://github.com/pyenv/pyenv-virtualenvwrapper.git $(pyenv root)/plugins/pyenv-virtualenvwrapper


En el .bashrc:

export PYENV_ROOT="$HOME/.pyenv"
export PATH="$PYENV_ROOT/bin:$PATH"
export PYENV_VIRTUALENVWRAPPER_PREFER_PYVENV="true"
if command -v pyenv 1>/dev/null 2>&1; then
  eval "$(pyenv init -)"
  eval "$(pyenv virtualenv-init -)"
  pyenv virtualenvwrapper_lazy
fi


