---
title: The fundamental theorem of Agile Software Development
author: Jose OC
type: post
date: 2016-01-01T00:00:00+00:00
draft: true
url: /?p=524
categories:
  - Coding
tags:
  - Agile
  - IT Video
  - TDD

---
<https://vimeo.com/79106557>

&nbsp;

We are not talking about complexity

Essential complication: the problem is hard so the system is complicated Accidental complication: the way the system has been developed is really hard to understand, efectos colaterales, etc.

The time to build a new feature is mostly the time caused by accidental complication.

To solve this issue -> TDD. Steps:

  1. Think
  2. Write a test. Wait. Ask how much that test could be smaller, simpler. If you get to have it simpler you&#8217;re removing the possibility of accidental complications.
  3. Run the test. It should fail, otherwise ti&#8217;s because you wrote too much code previously. This can cause accidental complications.
  4. Write just enough code to make the test pass, not more code.
  5. Then refactor your code.

Finally I think he says that we cannot use scrum but XP (extreme programming)

Recommended book: The mythical man-month (Frederick Brooks) or &#8220;No silver bullet&#8221; (Frederick Brooks)