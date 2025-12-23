---
slug: "leaving-software-on-the-table"
title: "The Developer Productivity Manifesto Part 3 — Leaving Software on the Table"
excerpt: "Quantifying the billion dollar impact of developer inefficiency"
published_at: "2021-05-05T06:13:00.000Z"
updated_at: "2021-06-20T22:27:50.000Z"
feature_image: "https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766512251791-header-software-table.png"
tags:
  - slug: "founders"
    name: "Founders"
  - slug: "developers"
    name: "Developers"
  - slug: "investors"
    name: "Investors"
meta_description: ""
canonical_url: "https://whoisnnamdi.com/leaving-software-on-the-table/"
og_title: "The Developer Productivity Manifesto Part 3 — Leaving Software on the Table"
og_description: ""
og_image: "https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766512251791-header-software-table.png"
twitter_title: "The Developer Productivity Manifesto Part 3 — Leaving Software on the Table"
twitter_description: ""
twitter_image: "https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766512251791-header-software-table.png"
---

Developer inefficiency drives hundreds of billions of dollars of lost software output annually.

The sum is striking but also predictable in light of data showing we don’t even come close to maximizing developer productivity.

Mountains of technical debt and poor development practices burden and bog down developers. We lose billions as a result.

The Developer Productivity Manifesto has three parts, this is part 3:

-   [Part 1: The Developer Productivity Flywheel](https://nnamdi.net/the-developer-productivity-flywheel/)
-   [Part 2: More (Developers) Isn’t Always More](https://nnamdi.net/more-developers-isnt-always-more/)
-   ****Part 3: Leaving Software on the Table (you are here)****

In part 1, I talked about falling developer productivity and how spinning [the developer productivity flywheel](https://nnamdi.net/the-developer-productivity-flywheel/) can counteract this trend.

In part 2, I argued that [more developers won’t solve all our software engineering problems.](https://nnamdi.net/more-developers-isnt-always-more/)

I’ve thrown around a lot of equations, literary references, and even some memes. In this third and final piece, I’ll talk dollars and cents, quantifying the impact of lost developer productivity and how much software we’re “leaving on the table” as a result.

### Receive my next long-form post

Thoughtful analysis of the business and economics of tech

 

Subscribe

## (Technical) debt to (developer) GDP

In [part 2](https://nnamdi.net/more-developers-isnt-always-more/), I made the case that software maintenance is not sufficiently value generating to cover engineering salary expenses. In other words, ****busy work doesn’t work****:

> __According to one analysis, an engineer engaged in purely non-innovative activity ****destroys**** nearly $600K in employer market value. On the other hand, the average engineer, working on a combination of maintenance and innovation activities, ****adds**** $855K in market value to their employer.__

In a global, cross-industry [survey](https://stripe.com/files/reports/the-developer-coefficient.pdf), Stripe asked developers why productivity was lower than it otherwise could be. ****Maintenance of legacy systems / technical debt**** took the top spot:

![](/content/images/2021/05/hindering.png)
*Source: The Developer Coefficient, Stripe*

Even developers themselves see maintenance work as unproductive. Asking them to quantify this reveals that the typical developer spends ****13.5 hours per week**** addressing technical debt:

![](/content/images/2021/05/debt-hours.png)
*Source: The Developer Coefficient, Stripe*

Add to that another ****3.8 hours per week fixing “bad code”**** (debugging, refactoring, etc.). That totals 17.3 hours per week spent fixing the past rather than building the future. The typical work week among the surveyed was 41.1 hours, implying that a full ****42% of developer time is lost to drudgery****:

![](/content/images/2021/05/dev-work-week.png)
*Source: The Developer Coefficient, Stripe*

I like to call this ****technical debt to developer GDP****. While some level of technical debt is unavoidable, it eventually becomes an unbearable drag on software output and developer productivity. It eats up engineering time leaves little for generative development work.

## Developers could be 46% more productive

In another question, Stripe asked developers to rate the productivity of their engineering teams on a scale of 0–100%. The average response? ****68.4%****:

![](/content/images/2021/05/how-productive.png)
*Source: The Developer Coefficient, Stripe*

Said differently, the average developer could potentially be (100% — 68.4%) / 68.4% = ****46%**** more productive that they are today, nearly 50%.

With a 41.1 hour work week, such a productivity boost would be the equivalent of an ****additional ~19 hours of productive development work****, enough to completely compensate for all that time spent on technical debt and bad, buggy code.

![](/content/images/2021/05/extra-productive-hours.png)

## A $425B dollar bill on the ground

Based on the survey, Stripe conducted a back-of-the-envelope calculation multiplying estimates of the value generated by software developers around the world with the estimated productivity losses to arrive at an estimate for the global GDP lost due to software developer inefficiency.

I take issue with some of the assumptions, but the calculation is illustrative regardless. Assuming $900B of aggregate developer GDP and 31.6 percentage points of productivity lost suggests a $300B annual GDP shortfall:

![](/content/images/2021/05/stripe-calc.png)
*Source: The Developer Coefficient, Stripe*

This is an underestimate, in fact. Stripe’s math assumes 100% — 68.4% = 31.6% lost relative to existing productivity, but as I showed above, it’s in fact 31.6% / 68.4% = 46%. With this efficiency loss relative to maximum productivity, GDP lost to developer inefficiency grows to ****~$425B****.

So our failure to maximize productivity is losing us hundreds of billions in software production. Not exactly chump change.

## SUM()-ing it all up

To end, I want to return to where I started qualitatively, my goal to increase total software output, and quantitatively, the decomposition of software output into developers and developer productivity, and finally connect the two perspectives.

****How much more software output could we get with more developers and higher productivity?:****

![](/content/images/2021/05/image-20210425201756326.png)

Let’s start with developers. I tend to be skeptical of perennial “shortages” unless there’s some specific, identifiable reason for it. Regardless, estimates suggest there’s a ~3M shortage of software developers globally, with [1.4M unfilled computer science jobs](https://www.daxx.com/blog/development-trends/software-developer-shortage-us) in the US alone.

To make the numbers easy, let’s round up Stripe’s estimate for the global software engineering labor force from 18M to 20M (I’ve seen other estimates in the 20–25M range, so this feels reasonable). That would imply a 3M / 20M = 15% developer shortage at current levels of demand.

So we have a 15% developer shortage and a 50% productivity “shortage”. Multiplied, that yields a massive ****73% potential gain in software output****:

![](/content/images/2021/05/software-calc.png)

Said another way, ****current software output is only about 100% / 173% = 58% of what it could be****.

That’s ****$670B**** of software we’re leaving on the table.

This calculation is admittedly simplistic. One could argue that we’d need fewer developers if they were more productive. I push back on that — there’s so much we’ve yet to build, and more developers working more productively would unlock entirely new opportunities that we haven’t had the capacity to explore or can’t even yet imagine. This would further spur developer hiring and employment, another [flywheel](https://nnamdi.net/the-developer-productivity-flywheel/).

## We can do better

In this series I’ve made the case that by investing in [__technical tools for technical people__](https://nnamdi.net/about-me/), we can reverse the trend of declining developer productivity, spin the productivity flywheel in the right direction, and see massive gains in software output as a result.

As I’ve hopefully made clear, we can do A LOT better of a job maximizing developer productivity. I hope you’ll join me in my mission to do exactly that.

__Thanks so much for reading this — I hope it resonated with you. If it did, please share that feedback!__

****Follow me on**** [****Twitter****](https://twitter.com/whoisnnamdi)****, subscribe to my monthly essays**** [****here****](https://nnamdi.net/)****, and reach out to me directly via nnamdi@lsvp.com****