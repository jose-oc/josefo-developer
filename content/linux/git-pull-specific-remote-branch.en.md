---
title: Pull specific remote branch
author: Jose OC
type: post
date: 2015-06-05T14:12:32+00:00
url: /en/blog/pull-specific-remote-branch/
tags:
  - git

---
When there is a branch in the remote server and you want to have it in your local git:

<pre class="lang:sh decode:true">git checkout -b &lt;branch-name&gt; origin/&lt;branch-name&gt;</pre>

Or just:

<pre class="lang:sh decode:true">git checkout &lt;remote-branch-name&gt;</pre>

&nbsp;