---
slug: "forever"
title: "Beats and Misses Are Forever"
excerpt: "Revenue surprises permanently shift the trajectory of SaaS companies"
published_at: "2022-09-14T09:29:07.000Z"
updated_at: "2022-09-14T09:29:07.000Z"
feature_image: "https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766512283659-forever.png"
tags:
  - slug: "founders"
    name: "Founders"
  - slug: "investors"
    name: "Investors"
meta_description: ""
canonical_url: "https://whoisnnamdi.com/forever/"
og_title: "Beats and Misses Are Forever"
og_description: ""
og_image: "https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766512283659-forever.png"
twitter_title: "Beats and Misses Are Forever"
twitter_description: ""
twitter_image: "https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766512283659-forever.png"
---

Subscription revenue is a double-edged sword:

-   It's predictable, making the business much easier to forecast
-   It's persistent – over or underperformance today reverberates far into the future

Contrary to popular belief, SaaS companies do not in fact "pull forward revenue." A beat today puts the company on a permanently higher trajectory. Revenue doesn't mean revert later.

Likewise, deals might "slip," but there's no "catch up growth" – a missed quarter doesn't get made up for next quarter. A miss today predicts lower revenue for years to come.

[Diamonds](https://youtu.be/92FCRmggNqQ?t=56), beats, and misses are forever 💎.

## Long vs. short

Public market investors are often criticized for being too "short-term focused."

Politicians and CEOs alike love to hate on investors for overreacting to current business results, bidding up the stock or kicking off a fire sale depending on how quarterly earnings play out

> A widely-held view among Washington policymakers, corporate executives, the media, and the public is that frenzied, short-term stock market trading has coupled with Wall Street’s unquenchable thirst for immediate results to disrupt US firms and badly hurt the economy – [How Big Is the Problem of Stock-Market-Driven Short-Termism?](https://www.americanbar.org/groups/business_law/publications/blt/2022/05/short-termism/)

Baked into this criticism is a view that the long-run is hard to influence – fluctuations in the short-run tend to mean revert over time. One's view of a company should change only slowly and in the face of extraordinary evidence.

In defiance of this heavy-handed finger-wagging, there's an alternate view that short-run performance matters and is informative _about the long-run_. The future is bound to the present, and we should decisively update our forecasts in light of new information.

In summary:

-   Long-termists believe revenue will eventually revert back to some long-run trend based on the fundamentals of the business, its market opportunity, etc. Short-term fluctuations are noise and should be ignored. Quarterly beats and misses should have little, if any, impact on fundamental valuation analysis.
-   Short-termists (though they would never refer to themselves as such) believe the present moment matters and says much about the future. Short-term performance is a valuable signal that should factor into valuations. Mean revision dominates mean reversion.

Who is right? And how would we know?

## A random or deterministic walk down Wall Street?

There's a simple way to resolve this dispute. We only need to rephrase the positions of the long/short-termists, and the resolution will be clear.

Long-termists think today's revenue fluctuations poorly predict future revenue. They don't often phrase it that way, but that's the core underlying logic behind the belief in a stable, long-run trend.

This has multiple important implications.

For one – revenue can be "pulled forward," but this will tend not to influence the long-run trajectory of the company:

> Adobe was downgraded to neutral from buy at UBS... Analyst Karl Keirstead said after speaking with 14 large enterprise IT executives and services partners of Adobe, he's worried that spending was pulled forward in 2020 and 2021, which will pressure its growth rate this year. ([Link](https://markets.businessinsider.com/news/stocks/adobe-downgraded-to-neutral-at-ubs-on-concerns-that-spending-was-pulled-forward-10896540))

Further, a missed quarter today can be made up for next quarter. Missing the target leads to revenue in the future quarters to be slightly higher, as revenue reverts back to trend. You could call this "catch up growth."

Meanwhile, short-termists think today's revenue movements predict future revenue. One's long-term revenue forecast should be quite sensitive to beats and misses in the present day.

So, pulling forward revenue doesn't come at the cost of future revenue. Similarly, missing your target today doesn't mean you're any more likely to hit tomorrow's target. In fact, you're less likely, since you're now on a lower revenue path.

The clean and simple test?

Simply run a regression of future revenue on current over/underperformance! The coefficient tells us to what extent our estimates of future revenue should shift in response to strong or weak results today:

-   A coefficient near or greater than one tells us future revenue rises/falls by at least $1 for a $1 beat/miss today (the short-termists win)
-   A coefficient well below one means forward revenue is insensitive to today's performance and tends to mean revert (the long-termists win)

## Back to the future

The chart below plots revenue growth over four quarters against revenue growth today for 35 public software companies, demeaned by the respective average rate for each company. Positive values mean revenue came in higher than normal, and vice versa:

![future](https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766516057505-future.png)

**Future and current revenue over/underperformance are positively related.** The coefficient is 1.16, implying **a $1 beat today forecasts a $1.16 beat four quarters from now.** The exact reverse is true of a miss – a dollar of missed revenue this quarter lowers our expected revenue in four quarters by $1.16.

Additionally, the R^2 is decently high – 0.49, so about half of the variation in expected revenue four quarters out can be explained by revenue performance in the current quarter.

One quick aside since I know what certain folks are thinking here: I am not merely saying that current revenue predicts future revenue. I'm saying _changes in revenue_ predict changes in future revenue.

So far, the short-termists seem to be winning. But one year is not a long-time – perhaps mean reversion takes longer? Let's check by extending the analysis to eight and twelve quarters out. That's too crowded for a single scatterplot, so I'll summarize the results and only show the coefficients at each horizon:

![forever-3](https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766516054696-forever-3.png)

If anything, the case for short-termism only gets stronger. The two-year revenue forecast shifts by $1.25 for a $1 beat/miss today. The three-year forecast changes by $1.43.

Even three years out, we see no evidence of mean-reversion among the typical public software company. Beats and misses permanently shift the trajectory of the company.

Now, dollars are a nice unit of account, but they're admittedly hard to contextualize. A $1 beat/miss that turns into a $1.43 beat/miss three years out could be more or less meaningful depending on the scale of the company and its growth rate. Many of these companies were likely to be much larger in three years anyway.

Let's do the same analysis with percentages instead. What impact does a 1% beat/miss have on future revenue, also in percentage terms?

![persists](https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766516061204-persists.png)

Persistence persists, but this tells a slightly different story. Revenue three years from now is still 0.85% higher/lower than it would have otherwise been.

My interpretation: the additional (or lost) revenue from a beat (or miss) grows at a somewhat slower pace than the remaining revenue base, so we see some convergence. In other words, "surprise" revenue doesn't grow as fast as "expected" revenue.

You could frame this as slight mean reversion. Personally, I'd say the short-termists still have it.

## Working as intended

Why does this happen? Why is the future so sensitive to the present?

Rather than a surprising phenomenon, I see this as **the defining characteristic of subscription business models.**

To say revenue "recurs" is merely to say revenue today generates revenue tomorrow. Said differently, a good test of subscription revenue quality is **the degree to which it persists and predicts future revenue**.

In that light, these results are expected. If a change in revenue today didn't predict a change in revenue tomorrow, it'd be hard to call it recurring.

For some intuition, look at those [cohort revenue charts](https://thetaclv.com/resource/c3/) that have become so popular among public software companies (at least among those with good retention dynamics to show off):

![Pasted-image-20220910172026](https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766516059837-Pasted-image-20220910172026.png)

Missing a quarter means losing a slice of the cohort stack. Assuming positive net dollar retention, that slice would have grown over time; the opportunity cost of weak performance grows over time.

Ironically, a miss for a company with high retention hurts more than one for a company with low net retention, since the high retention company has more (future revenue) to lose. I examined this phenomenon from a slightly different angle a few years back:

> Both in theory and in practice, **better retention drives higher volatility** – ["High Retention = High Volatility"](https://whoisnnamdi.com/high-retention-high-volatility/)

**This is why SaaS beats and misses are so consequential.**

If investors think a miss or beat is likely to stick, that will meaningfully impact their valuation views, as it must. On the other hand, the stock shouldn't move much if short-term performance reflects merely temporary dynamics in a company's go-to-market engine.

That SaaS valuations tend to react so strongly implies investors do believe these GTM gyrations are permanent and must be reflected in future projections. It's possible there's some mean reversion happening under the hood, but this effect is totally swamped by the magnitude and persistence of the beat/miss itself.

## Revision of the mean

A bad reaction to this analysis would be: your sales leader says the quarter came in light because some deals slipped, you look them in the eyes and confidently tell them "there's no such thing as a deal slipping," and point them to this essay.

**No.** That's not what I'm saying at all. (Please do send them this essay though!)

At the level of individual sales, deals slip from one quarter to another all the time. But at the level of aggregate revenue that doesn't seem to matter. Revenue won't be higher next quarter simply because revenue came in low this quarter. Every quarter is, for the most part, a blank slate.

Likewise with pulling forward revenue – it happens, but on average you can't find it in the data. COVID is a good exception to this – companies that benefitted from the transition to remote work like Zoom or DocuSign are now slowing, reverting back to their long-run trend line:

> While DocuSign beat revenue expectations last quarter, full-year guidance came in far lower than expected. DocuSign… was perceived to be a "COVID winner." There are now fears that the company merely pulled forward years of sales over the course of the past two years, and that its revenue growth trajectory will be lower going forward. ([Link](https://www.theglobeandmail.com/investing/markets/stocks/APPN-Q/pressreleases/7587079/why-snowflake-appian-and-twilio-plunged-today-again/))

> While Coupa's upside certainly isn't at risk long term, it does appear some of its future growth was pulled forward during the COVID-19 crisis. ([Link](https://www.nasdaq.com/articles/down-over-30-is-coupa-software-stock-a-buy-2021-03-27))

> Unfortunately for Twilio, it belongs to the “high beta growth” club, which began a secular decline early last year. The San Francisco-based Cloud Communications company boomed from the work-from-home trend... But, like so many other tech companies, it pulled forward too many gains, setting itself up for a nasty re-pricing. ([Link](https://finance.yahoo.com/news/trade-twilio-stock-wednesday-earnings-175540896.html))

**Note:** this analysis only includes software companies. Businesses with more transactional business models probably see less persistence and more mean reversion. Think about companies like Peloton:

-   Despite having a subscription service, the vast majority of revenue was in physical bike sales that are one-time in nature
-   Peloton really did pull forward demand, which left little market left to grow into by the time things returned to normal

However, if you have significant recurring revenue, mean reversion is much less relevant.

This analysis continues a line of thinking I touched on in a [prior piece](https://whoisnnamdi.com/covid-hurt-software/) exploring COVID's impact on software companies:

> … mean reversion is a strong force, but **COVID was stronger**, especially on the downside. Once knocked down, the typical software business never got back up…
> 
> _Mean revision_ is at least as important as mean reversion. Not only are software companies below their pre-COVID trend, _the trend itself_ has changed for the worse – [COVID Hurt Most Software Companies](https://whoisnnamdi.com/covid-hurt-software/)

For software companies, every day is [Day 1](https://s2.q4cdn.com/299287126/files/doc_financials/annual/Shareholderletter97.pdf) or, at least, dependent on it.

