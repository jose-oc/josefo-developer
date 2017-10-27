---
title: "About forks"
date: 2017-10-27T14:49:45+02:00
draft: false
---

To improve the theme [docdock](https://github.com/vjeantet/hugo-theme-docdock/) I forked that project and applied my changes to a specific branch but while I was working on that some new commits were pushed to the master branch of the original project and I wanted to have my fork up to date.

You can achieve that by adding a new remote service to your git project pointing to the original project, then fetching the changes and applying them to the local master branch, this way:

```
cd into/cloned/fork-repo
git remote add upstream git://github.com/ORIGINAL-DEV-USERNAME/REPO-YOU-FORKED-FROM.git
git fetch upstream
git pull upstream master
```


From https://gist.github.com/CristinaSolana/1885435