---
title: "Setting Up Ruby environment"
date: 2019-03-28T16:50:59+01:00
draft: true
---

I want to be able to change Ruby version to the one I need for every project as well as the gems I need, so I want to be able to manage different environments.

Basically there are two things to take care of:

1. The version of Ruby we want to use in a project.
2. The libraries that project uses, with the correct versions.


There are 2 popular alternatives: **rvm** and **rbenv**. The latter is getting more and more popular while the former used to be the more used.


## rvm

`rvm` stands for Ruby Version Manager. 

## rbenv

`rbenv` is short for *Ruby Environment*. 

There are other tools to manage environments in other languages similar to `rbenv`, such as `nodenv` or `pyenv`.

### Install rbenv on Ubuntu

Following the official documentation: https://github.com/rbenv/rbenv#installation
I've been lazy and opted for the automatic installation: https://github.com/rbenv/rbenv-installer

Then I've customized my ~/.zshrc and ~/.bashrc files to load rbenv.

```
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.zshrc
```

Now, execute `~/.rbenv/bin/rbenv init` and `echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.zshrc`.


### Upgrading rbenv

```
$ cd ~/.rbenv
$ git pull
```

### Install a new version of Ruby

To list the available versions: `rbenv install --list`

Then install a version with `rbenv install 2.5.5`, notice you don't need to run this with sudo as everything is installed in your home.

The first time the installation failed for me because I didn't have a system dependency, which was solved with `sudo apt install -y libssl-dev`.


### Select a version

You can ask rbenv which versions of Ruby are installed: `rbenv versions` and which one is in used at the moment `rbenv version`.

You can set a Ruby version to be used by default:
`rbenv global 2.6.2`

But you can also set a specific Ruby version per project:
`rbenv local 2.5.5`


### Useful commands

Check if you have a ruby command installed and in which Ruby versions: 

```
rbenv whence rake
2.5.5
2.6.2

rbenv whence bundle
2.6.2
```





https://metova.com/choosing-a-ruby-version-management-tool-rbenv-vs-rvm/
https://duseev.com/articles/rbenv-vs-rvm/
http://www.mindfiresolutions.com/blog/2018/01/rbenv-vs-rvm/







--------------------------

CANALO

Ruby 2.3.3

cd ~/code/prd-flow-compute/compute-automation-tests

bundle install --path=.vendor

bundle exec rake all \
env=sandbox \
tags=@jose \
exclude=~@pend \
compute_flow_agent=1154cca6d6d968fb \
local=false \
compute_client=compute-aurora-client==0.0.0.dev1144+1154cca6d6d968fb.post1



mira esto es un ejemplo para lanzar la pipe
en flow_agent puedes poner el snapshot
y en compute_aurora_cient puedes pillar el ultimo de la pipeline
que ahora mismo es compute-aurora-client==0.0.0.dev1252+ee25179df678a21e.post1

