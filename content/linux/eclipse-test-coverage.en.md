---
title: Test coverage
author: Jose OC
type: post
date: 2015-05-02T16:45:21+00:00
url: /en/blog/test-coverage-2/

---
<p style="text-align: justify">
  There is a fantastic plugin for eclipse which I've been using to analyze the amount of code coverage by tests, this is: <a href="http://www.eclemma.org/" target="_blank"><strong>EclEmma</strong> Java Code Coverage for Eclipse</a>.
</p>

<p style="text-align: justify">
  You can split your window to have the test class on the left and the class you are testing on the right, then use this plugin so that the JUnit test is executed and automatically your code is painted:
</p>

<li style="text-align: justify">
  lines painted on green are covered by the test
</li>
<li style="text-align: justify">
  lines painted on red not
</li>
<li style="text-align: justify">
  lines painted on yellow are lines with a loop or a switch and your test doesn't cover all the combinations.
</li>

<p style="text-align: justify">
  This is terrific, you can know at a glance how well covered is your code.
</p>