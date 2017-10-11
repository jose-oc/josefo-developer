---
title: Delete a local branch
author: Jose OC
type: post
date: 2015-06-05T14:34:46+00:00
url: /en/blog/delete-a-local-branch/
tags:
  - git

---
This command delete a local branch:

<pre class="lang:sh decode:true">git branch -d &lt;branch-name&gt;</pre>

If the branch is not merged then git doesn&#8217;t allow you to delete it although you can force it this way:

<pre class="lang:sh decode:true">git branch -D &lt;branch-name&gt;</pre>

&nbsp;