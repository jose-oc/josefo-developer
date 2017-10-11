---
title: mini git guide
author: Jose OC
type: post
date: 2015-05-16T10:02:06+00:00
url: /en/blog/mini-git-guide/
tags:
  - git

---
# GIT &#8211; My notes

## Bases

### Status

Status files:

  * **Tracked**:
  * **Committed** (unmodified) means data file is stored in your local database.
  * **Modified** means your file has been modified and these changes are not stored in the local database.
  * **Staged** means you&#8217;ve marked the file to be committed in the next commit.
  * **Untracked**: Files which are not in the git database nor in the staging area.

![One area for each state][1]

* * *

**Repository**. The `.git` directory is where the database and metadata are and it&#8217;s what is copied when you clone a repository from other computer. **Working directory**. A directory where you have a copy of a version of the project. It&#8217;s where you work and use the files. **Staging area**. AKA `index`. It&#8217;s a file within the .git directory to store this information.

### Getting help

<pre class="lang:sh decode:true ">git help
git --help
man git-
</pre>

## Configuration

There are 3 config levels:

  * **System level**. File `/etc/gitconfig`: it&#8217;s for _all the users_ in the system. You can read it with this command: `git config --system --list` keyword: **system**
  * **User level**. File `~/.gitconfig`: configuration for _your user_. You can read it with this command: `git config --global --list` keyword: **global**
  * **Repository level**. File `.git/config` within the working directory. You can read it with this command: `git config --list` in the working directory.

### Configure your identity

This is essential to be able to commit.

<pre class="lang:sh decode:true ">$ git config --global user.name "Jose Ortiz"
$ git config --global user.email jose.ortiz@example.com
</pre>

### Configure your editor

<pre class="lang:sh decode:true ">$ git config --global core.editor vim
</pre>

## Usage

### Begining: create a new repository

<pre class="lang:sh decode:true ">$ git init
</pre>

### Begining: cloning a repository

<pre class="lang:sh decode:true ">$ git clone [url]
</pre>

You can use `http` protocol or `git` protocol or `user@server:path/to/repo.git` (this is ssh access).

Life cycle: ![file's life cycle][2]

### Checking the status of files

<pre class="lang:sh decode:true ">$ git status
</pre>

or to view it in [a compact way][3]:

<pre class="lang:sh decode:true ">$ git status --short
</pre>

### Adding files to the next commit

<pre class="lang:sh decode:true ">$ git add file|directory
</pre>

This is useful to add new files, add modified files or mark merge-conflicted file as resolved.

### Ignoring files

Add a [`.gitignore`][4] with the expressions to ignore.

### Comparing differences

#### Compare differences between working copy and stage area

<pre class="lang:sh decode:true ">$ git diff
</pre>

#### Compare changes will be committed

<pre class="lang:sh decode:true ">$ git diff --staged
</pre>

You can set your graphical tool to compare changes, see what ara available: `git difftool --tool-help`

### Committing changes

<pre class="lang:sh decode:true ">$ git commit -v
</pre>

Using the `-v` flag you&#8217;ll see the diff before add the comment.

<pre class="lang:sh decode:true ">$ git commit -a
</pre>

Using the `-a` flag git will perform the add operation for you before the commit adding all tracked files. This way you avoid adding files before the commit.

### History

<pre class="lang:sh decode:true ">$ git log -p -2 --stat
</pre>

You can specify the number of commits you want to see, in this case two. Using the `-p` argument you&#8217;ll see the changes in files (diff).

You can also use:

<pre class="lang:sh decode:true ">$ git log --pretty=oneline --decorate --all
</pre>

As a value of pretty you can use:

  * oneline
  * short
  * full
  * fuller
  * format:&#8221;%H &#8211; %an, %ar : %s&#8221;

You can use the param `--graph` with `oneline` and with `format` and see the branches.

You can use the param `--decorate` to see the branch we are working on.

You can use the param `--all` to see info related with other branchs apart from the branch where you&#8217;re work on.

#### Filtering

##### By time

<pre class="lang:sh decode:true ">$ git log --since=10.weeks --until=2015-05-05
</pre>

##### By author

<pre class="lang:sh decode:true ">$ git log --author=jose.ortiz
</pre>

##### Searching text in messages

<pre class="lang:sh decode:true ">$ git log --grep=coverage
</pre>

##### Searching text in source code

<pre class="lang:sh decode:true ">$ git log -StoString
</pre>

This will look for the text &#8216;toString&#8217;

##### Searching changes in files as of a directory

<pre class="lang:sh decode:true ">$ cd /path/I/am/interested/in
$ git log -- .
</pre>

This command will look for commits on files in the currect directory.

### Undoing things

#### Modifying the last commit

You can modify the last commit with the changes from your staging area. For instance:

<pre class="lang:sh decode:true ">cd /path/I/am/interested/in
git commit -a
echo 'archivo olvidado en el anterior commit, pero hago un amend para incluirlo' &gt; olvidado
git add olvidado
git rm fileAddByError
git commit --amend
</pre>

Now git will ask you to modify the before comment.

#### Unstaging files

You can execute

<pre class="lang:sh decode:true ">git reset HEAD
</pre>

and your file will be unstaged but modified by you.

#### Reverting your changes in file

You can revert all your changes in a file using

<pre class="lang:sh decode:true ">git checkout --
</pre>

as long as your file is unstaged, unless you can unstage it before. This is dangerous because you&#8217;ll lose every change you&#8217;ve made. You can use this other way: stage and branch.

## Managing remotes

To get information about the remote servers:

<pre class="lang:sh decode:true ">git remote -v
</pre>

By default git names the remote server: `origin`.

### Adding remote repository to local git

<pre class="lang:sh decode:true ">git init
git remote add origin
</pre>

### List info from remote

<pre class="lang:sh decode:true ">git remote show origin
</pre>

This way you can read information about branches, for instance.

### Getting information from remotes

<pre class="lang:sh decode:true ">git fetch origin
</pre>

Retrieves information from the remote server but **your work won&#8217;t be modified**, you&#8217;ll have to merge manually.

<pre class="lang:sh decode:true ">git pull
</pre>

This commando fetch the information and merge automatically.

### Sending your commits to remote server

<pre class="lang:sh decode:true ">git push
git push origin master
</pre>

Remember, before push your work you **must** have pulled from remote.

## Branches

`HEAD` is the pointer to the branch we are working.

### To get information about the branches

<pre class="lang:sh decode:true ">git branch -v
git branch -vv
</pre>

You can know which branches have been merged or not into this branch using `--merged` or `--no-merged`.

<pre class="lang:sh decode:true ">git branch --merged
</pre>

It&#8217;s important to note that this information is only since the last time you fetched from remote server; if you want to be up to date you should fetch first:

<pre class="lang:sh decode:true ">git fetch --all; git branch -vv
</pre>

### Creating a new branch

<pre class="lang:sh decode:true ">git branch
</pre>

This command creates a new branch but **don&#8217;t switch to that branch**.

### Switching branches

<pre class="lang:sh decode:true ">git checkout
</pre>

This command moves HEAD to the branch name. Remember that the files will change as well as the history. There isn&#8217;t any problem switching branches even if there is some untracked file. The file will remain in the folder.

If you want to switch branch but there are files modified which you don&#8217;t want to stage nor commit because the work is not done so you have another option, it is **to stash** it:

<pre class="lang:sh decode:true ">git stash
git status # working directory clean
git stash list # to see the stashes
git stash apply # to recover the files in this stash to the working directory
</pre>

You can save a stash on one branch, switch to another branch later, and try to reapply the changes.

There are many other helpful options, take a look: [http://git-scm.com/book/en/v2/ch07/\_git\_stashing][5]

### Creating and switching to a new branch

<pre class="lang:sh decode:true ">git checkout -b
</pre>

### Merge branches

<pre class="lang:sh decode:true ">git checkout master
git merge
</pre>

If I&#8217;m working on the branch &#8216;P100&#8217; but I want to have the latest changes made on the master I can run a `git merge master` from the P100 branch.

When there&#8217;s a conflict you can see the files haven&#8217;t been merged by typing `git status` and looking for files Unmerged paths. Using `git mergetool` you can see the conflict in a graphical application.

Once you resolved the conflict you should add the file to the staging area.

### Delete branch

<pre class="lang:sh decode:true ">git branch -d
</pre>

### Delete remote branch

<pre class="lang:sh decode:true ">git push origin --delete
</pre>

### Upload branch to remote server

You can do it just pushing your branch:

<pre class="lang:sh decode:true ">git push origin paul-branch
</pre>

When a colleague fetch the information from origin, the new branch is retrieved but they will have a pointer to the remote branch (origin/paul-branch) but not a local branch called &#8216;paul-branch&#8217; so they aren&#8217;t able to work on it.

If you want to work on a remote branch created by other colleague you can switch to that branch with this command, this way git retrieve the branch from the remote server and creates a local branch and switch to it:

<pre class="lang:sh decode:true ">git checkout -b paul-branch origin/paul-branch
</pre>

There&#8217;s an alias of this command:

<pre class="lang:sh decode:true ">git checkout --track origin/paul-branch
</pre>

This type of branch is called **track branch**. Git associate this local branch to the remote branch so that you can use `git push` and `git pull` without having to specify the name of the branches.

### Rebase

Same goal as &#8216;merge&#8217;: fusion a number of branches. The difference is, as you can [read on the book][6], there is using rebase looks like if the changes of your branch were have done after the last change on the master branch.

<pre class="lang:sh decode:true ">git checkout my-branch
git rebase master
git checkout master
git merge my-branch
</pre>

Very important point: **DO NOT rebase commit which you pushed.** [see][7]

_Good practice_: > In general the way to get the best of both worlds is to rebase local changes you’ve made but haven’t shared yet before you push them in order to clean up your story, but never rebase anything you’ve pushed somewhere.

Aliases:

<pre class="lang:sh decode:true ">git config --global alias.ci commit
git config --global alias.st 'status -sb'
git config --global alias.qlog '!git --no-pager log --oneline -n 10 --decorate'
git config --global alias.glog '!git --no-pager log --oneline -n 10 --decorate --graph'
git config --global alias.hist '!git log --pretty=format:"%C(yellow)%h%Creset (%ai) %C(cyan)%d%Creset %s %C(green)[%an]%Creset" --graph --date=short'
git config --global alias.qhist '!git --no-pager log -n 10 --pretty=format:"%C(yellow)%h%Creset (%ai) %C(cyan)%d%Creset %s %C(green)[%an]%Creset" --graph --date=short'
</pre>

Handling CR+LF issues:

<pre class="lang:sh decode:true ">git config --global core.autocrlf false
git config --global core.excludesfile ~/.gitignore
echo .DS_Store &gt;&gt; ~/.gitignore
echo Thumbs.db &gt;&gt; ~/.gitignore
echo ehthumbs_vista.db &gt;&gt; ~/.gitignore
</pre>

Set Rebase by default:

<pre class="lang:sh decode:true ">git config branch.master.rebase true
git config --global branch.autosetuprebase always
</pre>

To Push to the current branch

<pre class="prettyprint"><code>&lt;span class="pln">git config &lt;/span>&lt;span class="pun">--&lt;/span>&lt;span class="kwd">global&lt;/span>&lt;span class="pln"> push&lt;/span>&lt;span class="pun">.&lt;/span>&lt;span class="kwd">default&lt;/span>&lt;span class="pln"> current&lt;/span></code></pre>

&nbsp;

To read more: <http://gitready.com/>

&nbsp;

## Pull a remote branch which is not in local repo

Pull all data: `git pull`

Check branches: `git branch --all`

Create a new branch and track it: `git checkout --track origin/BRANCH_NAME`

 [1]: http://git-scm.com/book/en/v2/book/01-introduction/images/areas.png
 [2]: http://git-scm.com/book/en/v2/book/02-git-basics/images/lifecycle.png
 [3]: http://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository#Short-Status
 [4]: http://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository#Ignoring-Files
 [5]: http://git-scm.com/book/en/v2/ch07/_git_stashing
 [6]: http://git-scm.com/book/en/v2/Git-Branching-Rebasing
 [7]: http://git-scm.com/book/en/v2/Git-Branching-Rebasing#The-Perils-of-Rebasing