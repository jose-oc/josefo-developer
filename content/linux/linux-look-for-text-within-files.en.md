---
title: Look for text in files in console
date: 2014-10-01T14:47:09+00:00
format: aside

---
Three commands to look for a text in files when you are in the linux terminal.

<pre class="lang:sh decode:true">find &lt;directory to search&gt; -type f | xargs grep -rl '&lt;text to search for&gt;'
</pre>

<pre class="lang:sh decode:true">find &lt;directory to search&gt; -type f -exec grep -l ‘&lt;text to search for&gt;’ {} +
</pre>

<pre class="lang:sh decode:true">grep -rl ‘&lt;text to search for&gt;’ &lt;directory to search&gt;/*</pre>

Source: <a href="http://www.my-guides.net/en/guides/linux/how-to-search-for-text-in-files-using-linux-command-line" target="_blank"><a href="http://www.my-guides.net/en/guides/linux/how-to-search-for-text-in-files-using-linux-command-line">http://www.my-guides.net/en/guides/linux/how-to-search-for-text-in-files-using-linux-command-line</a></a>