---
slug: "old-valuations"
title: "Old Valuations Die Hard"
excerpt: "Private valuations substantially lag public tech valuations"
published_at: "2022-12-13T17:47:55.000Z"
updated_at: "2022-12-13T22:23:35.000Z"
feature_image: "https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766512288499-header-6.png"
tags:
  - slug: "founders"
    name: "Founders"
  - slug: "investors"
    name: "Investors"
meta_description: ""
canonical_url: "https://whoisnnamdi.com/old-valuations/"
og_title: "Old Valuations Die Hard"
og_description: ""
og_image: "https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766512288499-header-6.png"
twitter_title: "Old Valuations Die Hard"
twitter_description: ""
twitter_image: "https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766512288499-header-6.png"
---

Public technology valuations have crashed.

A worsening economic outlook and tight monetary policy sent tech stocks through the floor.

However, private valuations are slower to adjust.

Private valuations lag public valuations, often by a substantial amount and for a long time.

As we all lick our wounds during this venture downturn, many are asking: when will it all end?

The answer? **About three years.**

<div class="subscribe-form">
<h3 class="subscribe-form-title">Receive my new long-form essays</h3>
<p>Thoughtful analysis of the business and economics of tech</p>
<form action="/api/subscribe" method="POST">
<input type="email" name="email" placeholder="Enter your email" required />
<button type="submit">Go ⚡</button>
</form>
</div>

## Public-private partnership

Private valuations rose dramatically over the last decade. But so did the Nasdaq:

![nasdaq_valuation](https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766516114872-nasdaq_valuation.png)

It's remarkable how well the two track one another.

In a sense, the growth of public tech valuations seems to pin down the rise of private valuations, defining a trend to which private valuations always tend to return. It's clear that venture investors use public valuations to justify private ones.

One feature immediately stands out – private valuations are much more volatile than public valuations, particularly at the later stages:

-   This is to be expected – it's not the same companies that are fundraising each quarter, so we'd naturally expect the prices to jump around a bit
-   Meanwhile, the composition of the Nasdaq doesn't change much quarter to quarter, so as an aggregate it's much more stable

If we throw each one on its own axis, the relationship is even more obvious:

![nasdaq_valuation2](https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766516118040-nasdaq_valuation2.png)

Across stages, private valuations move one-for-one with public valuations.

-   Seed valuations have grown somewhat slower than the Nasdaq, moving 0.5% for every 1% move in the tech index
-   Series A, B, and C valuations have moved one-for-one
-   Series D+ valuations have grown 1.3% each point of growth in the Nasdaq

We can replicate the same analysis for private venture activity. The relationship is not as tight:

![nasdaq_deals](https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766516103145-nasdaq_deals.png)

Deal activity is more or less related to public tech valuations, depending on stage. Here too we see much more volatility in the private realm than the public, again, for understandable reasons.

![nasdaq_deals2](https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766516105657-nasdaq_deals2.png)

In general the slopes here are flatter than for valuations:

-   Seed deals have grown at roughly the same pace as public valuations
-   For other stages, growth has lagged public tech valuations – growing at about half the pace

## Level with me

Though intuitive, these comparisons are not rigorous. It's too easy to find spurious relationships among variables that are all trending in the same direction. There's less risk of that in our case since public and private technology markets are closely linked, but we should be wary regardless.

We can do better by focusing less on the relationship between _level_ of the Nasdaq and some other variable and more on the correlation between _changes_ in the respective metrics.

**The key question:** how does a change (up or down) in public technology valuations affect the prices of private financings, and how quickly?

Some good ol' regression analysis can answer this.

Glossing over a bunch of detail:

-   We can forecast future changes in private valuations and financings based on current changes in public tech valuations.
-   We'll run one regression for each forecast horizon: concurrent (time zero) impact, one quarter out, two quarters out, etc.
-   The coefficients of these regressions trace out the impact of the original movement in the Nasdaq on private prices and volume in later periods.

## The path to recovery

Hope you're still with me. Let's run those regressions and see what we get.

We'll focus on downward movements in the Nasdaq. This is how a 1% decline in the Nasdaq affects private valuations and deal flow over future quarters:

![valuations_deals-1](https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766516125140-valuations_deals-1.png)

Private valuations gradually decline after a drop in the Nasdaq:

-   **Prices drop continuously for four quarters**
-   At the trough, private valuations fall ~2.25% lower for every 1% loss in the Nasdaq
-   **Venture valuations take 10 quarters to recover**

Movements in the Nasdaq reliably forecast venture deal activity too, which drops and rebounds faster than prices:

-   Deal activity bottoms in the third quarter after impact
-   Overall deal count rises back to its original level by the 8th quarter

## Down for a down round?

This masks a lot of underlying variance between the different segments of the venture ecosystem. Starting with valuations, let's explore how the shape of the recovery varies by stage:

![nasdaq_valuation3-2](https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766516120390-nasdaq_valuation3-2.png)

**Valuation dynamics depend on stage:** Early stage valuations drop 1-1.5% for every 1% decline in the Nasdaq, while growth and late stage valuations decline 2-2.25%.

**Note: these aren't exact estimates.** Uncertainty grows as we look further out from initial impact, so don't pay much attention to the numbers at the 12-quarter mark. It's the shape and length of the recovery that matters most.

With some back-of-the-envelope math, we can estimate both the magnitude and the length of the current downturn:

-   The peak to trough decline in the Nasdaq this past year was about 25%, **implying a ~25-35% haircut to early stage valuations and a ~50-55% cut in growth and later stage valuations**
-   That might sound extreme, but the sudden explosion of late stage valuations these past few years was itself quite unusual. It's not implausible that prices could fall as dramatically as they rose

In fact, the correction is already well underway:

![nasdaq_valuation4](https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766516122830-nasdaq_valuation4.png)

As predicted, late stage valuations drop much more than the Nasdaq, while early stage valuations move roughly in line. Prices have fallen faster than my forecast, but the magnitudes are on point.

Timing the bottom based on my regression here is a bit tricky, as the market began its decline in Q1 2022 and mostly ran its course by Q3 2022. If we use the midpoint of Q2 2022 as the "start" of the venture recession:

-   **Private valuations should bottom in Q2 2023**
-   I'm hesitant to forecast the heydays of 2021 ever returning, but if they did, it'd happen around Q4 2024. _I wouldn't hold your breath though_

## Coming to terms

Again, let's focus on a 1% decline in the Nasdaq:

![nasdaq_deals3](https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766516109041-nasdaq_deals3.png)

Financings follow an interesting "sine wave" recovery in the aftermath of a plunge in the Nasdaq. Again we see more severe impact in the later stages: The quarterly volume of Seeds and As drops by 0.75-1% for each 1% decline in the Nasdaq. Late stage deals sink 2%.

One ray of hope – financing activity seems to come back _stronger_ after a venture recession.

Pulling out that scribbled envelope again, these numbers suggest **early stage deal activity will drop 20-25%; growth and late stage deal volumes should slide about 50%.**

Again, the data bears this out:

![nasdaq_deals4](https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766516112463-nasdaq_deals4.png)

Remember, the venture deals should only take about a year to hit their low, so activity should stabilize in or around Q1 2023, notably ahead of valuations.

As I've said, these are rough estimates. All the typical caveats apply: "this time could be different," etc.

## Conclusion

The bubble burst, but the pain won't last forever.

The historical relationship between the public and private tech markets lets us trace out the likely path of the venture recovery.

The first year is the hardest. Prices drop precipitously, in many cases, much further than their public tech comparables.

Things get better from there, with deal activity back on track after another year or so. Prices, however, remain depressed a little while longer.

All-in-all, it's a three year odyssey from start to finish.

<div class="subscribe-form">
<h3 class="subscribe-form-title">Receive my new long-form essays</h3>
<p>Thoughtful analysis of the business and economics of tech</p>
<form action="/api/subscribe" method="POST">
<input type="email" name="email" placeholder="Enter your email" required />
<button type="submit">Go ⚡</button>
</form>
</div>