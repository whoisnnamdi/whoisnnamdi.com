---
slug: "rule-40"
title: "Breaking Apart the Rule of 40"
excerpt: "Rules are meant to be broken, and the Rule of 40 is no exception"
published_at: "2022-03-03T09:49:27.000Z"
updated_at: "2022-03-03T09:49:27.000Z"
feature_image: "https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766512270632-header.png"
tags:
  - slug: "investors"
    name: "Investors"
  - slug: "founders"
    name: "Founders"
meta_description: ""
canonical_url: "https://whoisnnamdi.com/rule-40/"
og_title: "Breaking Apart the Rule of 40"
og_description: ""
og_image: "https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766512270632-header.png"
twitter_title: "Breaking Apart the Rule of 40"
twitter_description: ""
twitter_image: "https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766512270632-header.png"
---

Rules are meant to be broken, and the Rule of 40 is no exception.

The Rule of 40 is a popular heuristic for evaluating financial performance and predicting valuation multiples.

But it's got 99 3 problems:

-   It's too rigid
-   It's too short-term
-   It's too narrowly focused

In this essay, I break apart the Rule of 40, fix it, and put it back together again.

<div class="subscribe-form">
<h3 class="subscribe-form-title">Receive my new long-form essays</h3>
<p>Thoughtful analysis of the business and economics of tech</p>
<form action="/api/subscribe" method="POST">
<input type="email" name="email" placeholder="Enter your email" required />
<button type="submit">Go ⚡</button>
</form>
</div>

## Laying down the rules

After flying high for some time, software valuation multiples have come back down to Earth (Note: LTM multiples used throughout this article):  
![rev_mul](https://nnamdi.net/content/images/2022/03/rev_mul.png)

While there are [all sorts](https://whoisnnamdi.com/grow-valuation/) of [explanations](https://whoisnnamdi.com/high-retention-high-volatility/) for the recent tech correction, the [Rule of 40](https://feld.com/archives/2015/02/rule-40-healthy-saas-company/) concerns itself not so much with the ebbs and flows of software valuations but rather their determinants at _a single point-in-time_. It provides a simple rule of thumb for evaluating the performance of software companies and estimating their likely valuation multiples:

$$\text{Rule of 40} = \text{Growth} + \text{Profitability}$$

The Rule of 40 states that the sum of annual revenue growth and profitability (either EBITDA or free cash flow margin) should equal 40 or more for the best performing companies, as in the following slide from [Battery Ventures' Software 2021 deck](https://www.scribd.com/document/497410287/Battery-Ventures-Software-2021-Report):  
![Pasted-image-20220222124207](https://nnamdi.net/content/images/2022/03/Pasted-image-20220222124207.png)

In general though, the "40" isn't particularly important. Higher is better; that's it.

## "Houston, we have three problems"

I see three problems with standard Rule of 40 analysis.

### Problem #1: Revenue and margin may not be equally important

Because the Rule of 40 adds revenue and margin together with no particular weighting of each (it's analogous to a simple average), in a subtle way it implies they are of equal importance.

This isn't necessarily true of course. An additional point of revenue growth could be worth more, the same, or less than an additional point of profitability.

**Fix #1: include revenue and margin separately in our regressions.**

### Problem #2: The long-run may look quite different

Even if revenue and margin were equally important on average, their relative importance could change over time.

Folks tend to run Rule of 40 regressions at a particular point in time, revealing how the market values growth and margin today, and today alone, saying nothing about how those relationships change over the long-run.

In a bull market, where growth is highly valued, our regressions fool us into thinking growth will be forever important. When the market subsequently turns, growth gets crushed, needlessly surprising many analysts and investors.

**Fix #2: pool data from multiple time periods.**

### Problem #3: Growth and margin aren't the only factors

Simple regressions inflate the importance of the Rule of 40 by misattributing the influence of other factors to growth and margin.

For example: Snowflake is a high flying company, both in terms of it's growth rate and revenue multiple. But Snowflake really is a special snowflake – it has a lot of other things going for it too, like the massive market for data warehouse solutions.

Thus, naively comparing Snowflake and other companies with smaller markets in the same regression will tend to overstate the value of revenue growth, leading to the false impression that, "if only we grow as fast as Snowflake, we'll be valued just as highly." This is wrong.

**Fix #3: control for the average influence of unobserved factors.**

## If it's broken, fix it

Let's implement each of these fixes one-by-one to see how they influence the results.

Here's the impact of revenue growth and free cash flow margin on valuation multiples with each of the three fixes implemented sequentially:  
![regs](https://nnamdi.net/content/images/2022/03/regs.png)

**First**, let's split up growth and margin to see how they separately impact valuations. To start, we pick a random date, June 30th 2021:

-   According to this simple analysis, a single additional percentage point of revenue growth increases valuation multiples by 3%, while an additional percentage point of free cash flow margin only adds 0.5%.
-   By this measure, growth is six times as important as margin.

**Second**, we'll pool together two years of trading data, excluding any companies that went public or got acquired during this time so we maintain a balanced sample throughout. The regression reveals the _average_ importance of growth and profitability over _the entire period_:

-   An additional point of revenue growth leads to a 2.7% higher revenue multiple (down from 3%) while an additional point of free cash flow margin yields 1.1% higher valuation (up from 0.5%).
-   Growth matters only ~2.5x as much as margin.

**Lastly**, the results still suffer from the fact that we're attempting to explain all the complexities of valuation with only two variables (the "Snowflake problem"), giving credit to growth and margin where credit isn't due. The final regression controls for the average impact of these unobserved factors ([fixed effects](https://www.youtube.com/watch?v=sFvV9b1cGFc) for the econometrics nerds):

-   1 point of either revenue growth or free cash flow margin increases valuation multiples by 1%.
-   **Growth and margin matter equally.**

So it turns out growth and margin are equally important after all!

Note: it may be much easier to increase growth or margin by one percentage point, so we have to be a little careful in saying they "matter equally."

Still, we've much more rigorously confirmed that growth and margin have similar effects on valuation. Very cool.

## How the rules have changed

Here's how the market value of growth and profitability have evolved over time:  
![fe](https://nnamdi.net/content/images/2022/03/fe.png)

We can see a number of interesting features:

-   The market value of profitability temporarily spiked in the early days of the pandemic but then fell significantly, bottoming out at almost zero in Q1 2021
-   Meanwhile, the market's thirst for growth surged from only 0.5% per percentage point of growth to 1.5% at the peak in late 2020
-   Beginning in early 2021, margin began a steady comeback, and **profitability is now as important as it was in the most uncertain days of the pandemic**
-   The value of growth fell in early 2021, recovered somewhat, and crashed even more spectacularly later in the year, **returning growth to its pre-pandemic value**

We can also plot the "spread" between the value of growth vs. margin, an interesting chart in its own right:  
![spread](https://nnamdi.net/content/images/2022/03/spread.png)

-   Growth and margin start off fairly close, with a slight market preference toward margin
-   After a brief period of uncertainty, the value of software growth relative to profitability roars back, peaking at a ~1% premium at the end of 2020
-   Again, we see the first blow to growth in the first half of 2021 and a second blow landing in late 2021
-   **Relative to profitability, growth is even less valuable than it was pre-COVID**

## Rewriting the rules

A few conclusions:

-   On average, **growth and profitability are equally impactful to valuation**, but one may win out over the other at various periods
-   Growth matters _much less_ than simple cross-sectional regressions imply
-   As of early 2022, **the market has turned decisively against growth in favor of profitability**

In a way, these results affirm the utility of the Rule of 40: growth and margin are similarly important. However it adds a wrinkle: the _degree_ of similarity varies over the market cycle.

Though the days of "growth at _all_ costs" are clearly over, it's still fair to ask: growth at _what_ cost? In other words, **how should companies trade off growth and margin?**

I'll leave that to a future post. 👀

<div class="subscribe-form">
<h3 class="subscribe-form-title">Receive my new long-form essays</h3>
<p>Thoughtful analysis of the business and economics of tech</p>
<form action="/api/subscribe" method="POST">
<input type="email" name="email" placeholder="Enter your email" required />
<button type="submit">Go ⚡</button>
</form>
</div>