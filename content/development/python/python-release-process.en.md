---
title: 'Releasing Python projects'
author: Jose OC
date: 2019-02-26T00:00:00+00:00
draft: true
---

Let's see how to release our project.

First of all, let's clean up the project



Let's create the package for our project:

```bash
python setup.py sdist bdist_wheel
```

To publish the project to Pypi we have to use the tools `twine` which can be installed just with pip `pip install -U twine`

Let's check the project is fine to be published:

```bash
twine check dist/*
```

Now we're ready to publish it, but before doing it in the official pypi let's doing in the testing pypi environment.
We have to sign up into [test.pypi.org](https://test.pypi.org/) and then use twine to publish the project

```bash
twine upload --repository-url https://test.pypi.org/legacy/ dist/*
```

The command will ask us for our credentials, a step that we can avoid (useful when you want to automate this process) by setting up the environment variables `TWINE_USERNAME`, `TWINE_PASSWORD` and `TWINE_REPOSITORY_URL` in case you want to specify a repository different than the official pypi.

You can also have this information in a file, by default `~/.pypirc` such as:

```
[distutils]
index-servers =
    pypi
    test-pypi

[pypi]
repository: <repository-url>
username: <username>
password: <password>

[test-pypi]
repository: https://test.pypi.org/legacy/
username: jose.oc
password: n3EdV79Geyr5PXx
```
