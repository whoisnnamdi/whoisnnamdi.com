---
slug: "robinhood-party"
title: "Robinhood Traders are Last to the Party"
excerpt: "Robinhood traders get fleeced not by HFTs front-running milliseconds before their order hits but by other retail investors, days earlier."
published_at: "2021-03-01T08:10:00.000Z"
updated_at: "2021-03-01T08:21:38.000Z"
feature_image: "https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766512232204-header.png"
tags:
  - slug: "investors"
    name: "Investors"
meta_description: ""
canonical_url: "https://whoisnnamdi.com/robinhood-party/"
og_title: "Robinhood Traders are Last to the Party"
og_description: ""
og_image: "https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766512232204-header.png"
twitter_title: "Robinhood Traders are Last to the Party"
twitter_description: ""
twitter_image: "https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766512232204-header.png"
---

The recent Robinhood and Gamestop / Gamestock / Gamestonk fiasco shed a light on some of the complex financial infrastructure that undergirds equity trading.

One mechanism, [payment for order flow](https://www.investopedia.com/terms/p/paymentoforderflow.asp), plays a large role in how Robinhood provides commission-free trading to its users.

Payment for order flow is often characterized as a shady practice that enables high-frequency traders (HFTs) to front-run Robinhood traders, siphoning off a sliver of profit as they do.

I tend to think such concerns are overblown. From the perspective of an individual Robinhood trader, HFTs are of almost no importance, and their impact on trading profits is imperceptible, especially if one only transacts periodically.

The truth is much more ironic.

Robinhood traders get fleeced not by HFTs front-running milliseconds before their order hits but **by other retail investors, days earlier.**

### Receive my next long-form post

Thoughtful analysis of the business and economics of tech

 

Subscribe

## The party ended \*five\* days ago

It turns out, [trading activity among Robinhood users lags the rest of the retail community by multiple days](https://papers.ssrn.com/abstract=3776874), more than enough time to squeeze out any potential profits.

A few charts demonstrate this dynamic. The graph below plots "abnormal retail trading volume" against the days before and after a stock peaks on WallStreetBets, the popular Reddit community, measured in terms of mentions. You can think of day zero as representing the day when mentions of a particular stock, say GME, peaked, with "-5" representing five days before, "5" representing five days after, and so on. "Abnormal" simply means retail trading activity relative to the prior 20-day moving average of retail trading volume for a particular stock.

Notice how retail trading volume peaks about two days before WSB mentions peak:

![image-20210222140135524](/content/images/2021/03/image-20210222140135524.png)

In other words, popularity on WallStreetBets lags the broader retail market. Stocks first get popular among non-Robinhood retail traders, and the subreddit subsequently picks this up, increasing how often the name is mentioned.

Now let's look at Robinhood volume relative to WallStreetBets mentions. Robinhood activity peaks 2-3 days _after_ WSB activity:

![image-20210222140228350](/content/images/2021/03/image-20210222140228350.png)

All in all, that's a five day delay between when a stock begins to cool off among most retail investors and when Robinhood traders finally get the memo.

By the time most Robinhood users actually trade, the party is over. And when the festivities end, so do the profits.

## Noise traders

I started the piece with my skepticism about the impact HFTs have on the profits of Robinhood traders. But if retail investors are taking advantage of market opportunities a full _five days_ ahead of Robinhood traders, I'm much more inclined to think that could have an effect.

The data proves this out. While recent research has shown that retail traders are in fact informed (measure as a positive correlation between retail trading activity and future stock returns), **Robinhood activity has no positive relationship with future returns**.

The table below shows the results of a regression of future returns at 3, 5, and 20-day intervals on Robinhood user ownership and aggregate retail trading volume, along with a number of control variables. While the coefficient on retail volume is positive and statistically significant in all cases, suggesting that _non-Robinhood_ retail trading volume predicts future returns, the coefficient on Robinhood ownership is negative and statistically insignificant, meaning that **Robinhood activity has little relationship with future returns**:

![image-20210222140349147](/content/images/2021/03/image-20210222140349147.png)

This finding led the authors to conclude the following:

> Contrasting with recent evidence that retail traders are informed, we find that Robinhood ownership changes are unrelated with future returns, suggesting that zero-commission investors behave as noise traders.

If case you don't read a ton of academic finance research, that's an extremely polite and understated way of saying: **Robinhood trading is random** (with respect to financial returns at least). In other words, there's no _there_ there.

And I should say: nothing about the app necessitates that. It's the behavior of the folks using it.

## There's no such thing as free alpha

I think it's great that Robinhood exists. I love that individuals have more ways of accessing the financial markets without coughing up exorbitant fees.

**But access isn't everything.** We all have "access" to Las Vegas, but that doesn't make it a path to wealth creation. Likewise, if Robinhood traders use the app to merely gamble on 50/50 bets that a particular stock will go up or down, little wealth or value creation will result.

Despite the app's name, Robinhood users for the most part redistribute among themselves the breadcrumbs left by the rest of the market.