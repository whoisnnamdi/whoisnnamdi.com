---
slug: "relative-growth"
title: "You Can't Eat Relative Growth"
excerpt: "In startup land, we talk way too much about relative growth. We'd do better to ground our thinking in absolute growth."
published_at: "2021-09-23T09:07:29.000Z"
updated_at: "2022-01-01T20:08:17.000Z"
feature_image: "https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766512261584-Pasted-image-20210922213513.png"
tags:
  - slug: "founders"
    name: "Founders"
  - slug: "investors"
    name: "Investors"
meta_description: ""
canonical_url: "https://whoisnnamdi.com/relative-growth/"
og_title: "You Can't Eat Relative Growth"
og_description: ""
og_image: "https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766512261584-Pasted-image-20210922213513.png"
twitter_title: "You Can't Eat Relative Growth"
twitter_description: ""
twitter_image: "https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766512261584-Pasted-image-20210922213513.png"
---

In 2006, Howard Marks, co-founder of Oaktree Capital Management, published a memo titled "[You Can't Eat IRR](https://www.oaktreecapital.com/docs/default-source/memos/2006-07-12-you-cant-eat-irr.pdf)." In doing so, he popularized the idea that [IRR](https://www.investopedia.com/terms/i/irr.asp), or internal rate of return, is a misleading measure of fund performance, as it gives no sense for the amount of capital put to work or the absolute dollars returned to investors:

> "A high internal rate of return does not in and of itself put money in one’s pocket. Only when it’s applied to a material amount of invested capital for a significant period of time does IRR produce wealth"

I've noticed a similar problem in how we measure and evaluate startup success, particularly **growth rates**.

There are two kinds of growth: **absolute** and **relative**:

-   Absolute growth is the _absolute_ increase in a metric, like dollars of revenue added or customers acquired in a given period. The metric this period minus its value last period gives you the absolute growth:

$$\text{Absolute Growth}_t = \text{Metric}_t - \text{Metric}_{t-1}$$

-   Relative growth is measured _relative_ to what came before: "We ended the year with 150% more customers", or "We grew revenue 3X this year." It's effectively unitless, but we tend to measure it in percentages, as in "percentage points of growth." It's the absolute growth divided by the metric's value last period

$$\text{Relative Growth}_t = \frac{\text{Metric}_t - \text{Metric}_{t-1}}{\text{Metric}_{t-1}}$$

**In startup land, we talk way too much about relative growth.** It muddles our thinking and makes compound, exponential growth seem easier than it really is. **We'd do better to ground our thinking in absolute growth.**

Obsessing too much over relative growth injects a number of "bugs" into our thinking:

-   It screws up our language
-   It makes us forget what startups actually do
-   It sets up unrealistic expectations

<div class="subscribe-form">
<h3 class="subscribe-form-title">Receive my new long-form essays</h3>
<p>Thoughtful analysis of the business and economics of tech</p>
<form action="/api/subscribe" method="POST">
<input type="hidden" name="merge[SOURCE]" value="Top: You Can" />
<input type="email" name="email" placeholder="Enter your email" required />
<button type="submit">Go ⚡</button>
</form>
</div>

## No sense, this makes

![Pasted-image-20210906134123](https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766515898670-Pasted-image-20210906134123.png)

The first problem with the concept of relative growth is that it warps our language in nonsensical ways.

A common scenario: a startup previously growing 100% Y/Y "slows" to 50% the subsequent year.

The board of directors asks "why did growth slow so much?" External investors evaluating the company think, "Wow, they really hit a wall."

**But they did no such thing.** Yes the growth rate measured in _percentage terms_ has declined, but the growth measured in terms of _dollars of revenue added_ hasn't slowed at all.

For example, let's say revenue went from $5M to $10M to $15M, which corresponds to 100% growth followed by 50%. Technically, the company added $5M in revenue each year, so growth hasn't slowed, per se. The problem isn't so much that growth "slowed" so much as it is that absolute growth _didn't increase_, hence the fall in the relative growth rate.

Think back to your high school physics class. Imagine we have an object, say a car, traveling in some direction. That car has a position, x, and a velocity, v. In business terms, imagine the level of revenue (or whatever metric) is the position of that car and it's absolute growth maps to the velocity.

![drawing-2021-09-22-17.21.13.excalidraw](https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766515888065-drawing-2021-09-22-17.21.13.excalidraw.png)

As long as that car keeps moving at the same velocity, we would say it neither accelerates nor decelerates. In startup land however, a business growing at constant absolute growth is said to to somehow be _decelerating_ because its relative growth is declining.

![drawing-2021-09-22-17.30.35.excalidraw](https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766515889241-drawing-2021-09-22-17.30.35.excalidraw.png)

This is super strange.

In fact, the only way to make sense of this thinking is to measure the size of the business on a logarithmic scale. As I discuss in "[You Don't Understand Compound Growth](https://whoisnnamdi.com/you-dont-understand-compound-growth/)", a constant slope (velocity, effectively) on a log scale implies constant relative growth. In this view, adding a constant $5M in revenue annually is in fact a declining amount of _log revenue_ added, thus matching the language of deceleration we tend to use.

OK fine, but this subtle rescaling goes completely unsaid. Further, as I'll discuss later on, constant relative growth is fairly unrealistic, yet it is effectively implied by our language on the topic.

We talk as if a reduction in relative growth implies something fundamentally changed about a business. And it would, if that's what companies actually did — that is, grow "relatively". However, more often than not, a decline in relative growth in fact suggests that **not enough changed** about the business.

## As Yoda said, "Grow absolutely. There is no relative"

![Pasted-image-20210906134610](https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766515903306-Pasted-image-20210906134610.png)

The second problem with relative growth is that it misleads us about what businesses fundamentally do.

The fundamental unit of growth is a dollar of additional revenue, not an additional _percentage point_ of growth. In other words, absolute growth is the more fundamental concept. We can calculate a relative growth rate after the fact if we want, but the core result is absolute growth.

Relative growth is merely a derived concept, a way to normalize absolute growth into a metric that can be compared across companies. That's great, and it's a valuable tool. But we seriously pervert the concept when we go from using it as an _ex post_ calculation to thinking that the primary activity of companies is to generate "percentage points of relative growth". That is putting the cart before the horse, the percentage points before the dollars.

**Relative growth is not what literally happens.** It's a way to benchmark what happened. **Absolute growth is what actually happened**, what was actually accomplished.

**Absolute growth is the "[hard thing](https://www.amazon.com/gp/product/0062273205/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0062273205&linkCode=as2&tag=whoisnn-20&linkId=e0d8ea2cb4b222b0461b55b48ca46c06)" that startups must do each and every day.** Relative growth imperfectly normalizes those efforts in order to make them comparable across scales of companies. It falls well short of its own goal. Further, the choice to normalize absolute growth by the previous level of revenue is simply a convention and a somewhat arbitrary choice. Hypothetically we could normalize growth by _anything_.

The job of the business is to generate absolute growth, to bring in more dollars this year than last year. The most informative information about the team's ability to do that comes from how much they were able to add in the past. Knowing that revenue tripled last year is not in fact informative about the likelihood of revenue tripling this year, because "tripling" is not what the company is in the business of doing. **It's in the business of generating more absolute dollars of revenue each year.** That it tripled last year doesn't really tell you whether it can triple this year. That it added $5M in revenue last year tells you A LOT about the likelihood of generating $5M in additional revenue this year.

Thinking in relative growth terms causes you to lose your sense of scale. Conversely, thinking in absolute growth makes things quite vivid. "How exactly are we going to find $5M in additional revenue next year" is a much more tangible and precise discussion than "How do we grow 80% next year" even if they mean the exact same thing.

The same relative growth rate can describe many different situations. For example, you hear that a company has grown 3X year-over-year, a relative growth metric. That single number is consistent with all of the following scenarios:

-   $300K to $900K
-   $1M to $3M
-   $3M to $9M

Yet there is nothing similar about any of these growth stories. It is a fundamentally different task (and therefore, accomplishment) to go from $300K in revenue to $900K than to go from $3M to $9M. To describe these in the same terms ("3X growth") is a complete misnomer that obfuscates an incredible amount of context. _These are nothing alike._ In this way, relative growth represents a **loss of information** compared to absolute growth.

It's seductive to think that, "well, we grew 100% last year so we should expect to grow similarly this year" when in fact the two tasks are completely different. Constant relative growth of 100% two years in a row in fact requires _doubling_ your growth rate in absolute terms because your existing revenue base is now twice as large. Absolute growth is the "real" growth target you need to hit, and for most companies that won't be easy. This is sobering.

Said differently, you can't eat _percentage points_ of growth, you can only eat **dollars** of growth.

## Rational expectations

![Pasted-image-20210906133733](https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766515895144-Pasted-image-20210906133733.png)

It's cliche to point out that [humans don't understand compound, exponential growth](https://whoisnnamdi.com/you-dont-understand-compound-growth/). In startups we have the opposite problem — people are so familiar with the concept that they apply it everywhere, in situations where exponential growth isn't likely or even plausible.

Exponential growth implies _constant relative growth_. Rather than seeing relative growth fall off, the business continues to grow at nearly the same rate for multiple periods.

Exponential growth is a great aspirational target to set for companies. Y Combinator does this and it works fantastically for focusing the minds of startup founders. When exponential growth is the goal, one realizes there are really very few ways to achieve it, and most growth hacks won't get the job done.

However, exponential growth is not a rational _expectation_ to have or _prediction_ to make. Few phenomena exhibit this sort of behavior outside of the natural world, like bacteria growing in a petri dish. Modern economies are often modeled as perpetual, exponential growth machines, but for most of human history, economies did not grow exponentially at all. Perhaps it's a fine approximation for a large economy, which aggregates an uncountable set of activities that sum up to something approximating constant exponential growth. But it's certainly not a good model for a single company.

Only at low growth rates is past relative growth predictive of future relative growth. At high growth rates the two are not very correlated at all. A business (or an economy for that matter) that grew 2% last year has a very good chance of growing roughly 2% this year. For a business that grew 200% last year... this year's growth is anyone's guess.

There's nothing inherent about startups that makes them grow exponentially other than the fact that it is easier to pull off for small companies than it is for larger ones. Any other correlation between startups and exponential growth is aspirational and attitudinal: startups grow exponentially because **we will them to**. It is not otherwise a reasonable expectation.

For forecasting purposes, constant absolute growth is a much better "baseline" or "base case" than constant relative growth. Constant relative growth may be a great target for setting the tone in the organization, raising ambitions, etc., but mark my words: it probably won't happen.

Constant growth in absolute terms is totally normal and unremarkable: startups often add similar amounts of revenue as they did the previous year. Constant _relative_ growth is totally _abnormal_. The idea that a startup growing 100% should somehow manage to grow close to that the subsequent year is a mental bias we tend to have in Silicon Valley that doesn't properly reflect reality. It rarely happens.

It is much more common to see a company go from $5 to 10 to 15 to 20 (constant absolute growth of $5M per year) than go from $5 to 10 to 20 to 40 (constant relative growth of 100% per year). Doing the latter requires a fundamental re-architecture of the company and go-to-market motion every 6 months. Going from $5-10M looks very different than going from $20-40M, even though they both involve a doubling of the business.

I find that founders and operators tend to understand this all too well, while investors consistently underappreciate and underestimate the difficulty of scaling at a constant relative rate.

Operators, by dint of living in the real world, viscerally understand that what got them _here_ won't necessarily get them _there_. Investors on the other hand like to think of companies "2X-ing year-over-year," as if the 2X relative growth is some fundamental property of the business, like its mass or electric charge. It is not, as they often discover 12 months later.

The investor mentality is in part driven by their relationship with the business. They invest at a certain valuation, and returns are measured relative to that entry price. Founders on the other hand start from **zero** — so they don't really measure themselves "relative" to anything. What matters is building as large a business as they possibly can in absolute terms.

## Deal in absolutes

![Pasted-image-20210906133514](https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766515892084-Pasted-image-20210906133514.png)

To close, I want to make sure I'm not misunderstood in my diatribe against relative growth.

There are actually very good theoretical reasons to focus on relative growth. For example, when relative growth is predictable and easy to pin down, we can use it to calculate the net present value of an asset, which is a direct function of the relative growth of cash flows. This is how discounted cash flow analysis works, for example.

Speaking of assets, the relative growth of asset prices (in other words, returns) is a fundamental building block of modern finance theory and is one of the primary traits that determines how attractive an asset is to potential investors (and the other is the risk or volatility of those returns).

So investors' focus on relative growth is not totally unfounded. That said, these notions all rely on either precisely knowing the relevant parameters (growth, discount rate, etc) or knowing precisely the variability of those metrics (their volatility, variance, etc). This is the world of quantifiable risk, and upon its core principles rests trillions of assets and millions of pages of academic finance research.

But startups do not live in the world of risk, they are squarely domiciled in the world of uncertainty (and the state of Delaware). Here, we barely know what we think we know and reliable invariants are hard to come by. Nothing can be taken for granted, certainly not growth.

So in our board rooms, pitch decks, and quarterly business reviews, let's ground ourselves in the harsh, brutal world of absolutes rather than the theoretically and mathematically convenient domain of relatives. We'll likely do better on both metrics, that way.

> This month I wrote about the difference between absolute and relative growth and the fact that Silicon Valley (esp. VC) focuses WAY too much on the latter  
>   
> Inspired by an old [@HowardMarksBook](https://twitter.com/HowardMarksBook?ref_src=twsrc%5Etfw) memo...[https://t.co/JlIT9T60Y4](https://t.co/JlIT9T60Y4)
> 
> — Nnamdi Iregbulem (@whoisnnamdi) [September 24, 2021](https://twitter.com/whoisnnamdi/status/1441460616917504008?ref_src=twsrc%5Etfw)

<div class="subscribe-form">
<h3 class="subscribe-form-title">Receive my new long-form essays</h3>
<p>Thoughtful analysis of the business and economics of tech</p>
<form action="/api/subscribe" method="POST">
<input type="hidden" name="merge[SOURCE]" value="Bottom: You Can" />
<input type="email" name="email" placeholder="Enter your email" required />
<button type="submit">Go ⚡</button>
</form>
</div>