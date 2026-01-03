---
slug: "discount-rates"
title: "Don't Discount Interest Rates"
excerpt: "It's Jay Powell's world. We're just living in it."
published_at: "2023-05-10T16:59:24.000Z"
updated_at: "2023-05-10T17:08:03.000Z"
feature_image: "https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766512292592-header.png"
tags:
  - slug: "founders"
    name: "Founders"
  - slug: "investors"
    name: "Investors"
meta_description: ""
canonical_url: "https://whoisnnamdi.com/discount-rates/"
og_title: "Don't Discount Interest Rates"
og_description: ""
og_image: "https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766512292592-header.png"
twitter_title: "Don't Discount Interest Rates"
twitter_description: ""
twitter_image: "https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766512292592-header.png"
---

Interest rates are the Federal Reserve's go-to treatment for an ailing, lethargic economy.

But the Fed's meds have a curious side effect – **they're a shot of adrenaline for the venture market.**

Low interest rates jolt the heart rate of venture capital, driving a manic frenzy of transactions and funding for startups.

On the other hand, high interest rates kill the vibe, causing deals to dwindle and prices to plummet.

You don't need a PhD to understand that. What's less obvious is exactly how large of an effect we're talking about here.

Turns out – it's huge. For a 25 basis point or 0.25% change in the one-year Treasury yield:

-   Deal activity adjusts ~10%
-   Valuations move ~25%
-   Capital invested shifts by ~30%

These effects are persistent, meaning we're always dealing with the aftermath of past interest rate shocks. It's the (highly oxygenated) air we breathe.

It's Jay Powell's world. We're just living in it.

<div class="subscribe-form">
<h3 class="subscribe-form-title">Receive my new long-form essays</h3>
<p>Thoughtful analysis of the business and economics of tech</p>
<form action="/api/subscribe" method="POST">
<input type="hidden" name="merge[SOURCE]" value="Top: Don" />
<input type="email" name="email" placeholder="Enter your email" required />
<button type="submit">Go ⚡</button>
</form>
</div>

## Interest rates are interesting

The Federal Reserve's zero interest rate policy (ZIRP) has come to an end:

![int_rate](https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766516178670-int_rate.png)

It's no secret interest rates affect tech valuations:

> During the last few years low interest rates and money printing [led to a funding bubble in private technology](https://blog.eladgil.com/p/changing-times-or-why-is-every-layoff) – Elad Gil, [Startup Decoupling & Reckoning](https://blog.eladgil.com/p/startup-decoupling-and-reckoning)

So the corporate finance logic goes, companies are worth the [present value](https://www.investopedia.com/terms/n/npv.asp) of their cash flows, and the "discount rate" one applies to those cash flows is the key input – lower rates mean higher valuations, and vice versa.

As much as investors like to ignore it, there's an obvious connection between valuations and interest rates:

![Pasted-image-20230321221512](https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766516192967-Pasted-image-20230321221512.png)  
Source: [Redpoint Ventures](https://docs.google.com/presentation/d/1Hyn4FWHSNRrWJeddi0BMEQIMlmXy2SNj50T8jJcrKbw/edit#slide=id.g11953bc14ff_2_116)

![Pasted-image-20230413194408](https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766516196109-Pasted-image-20230413194408.png)  
Source: [Bessemer Venture Partners](https://www.bvp.com/atlas/state-of-the-cloud-2023)

These charts reference publicly traded companies. However, I've never seen anyone quantify the sensitivity of _private_ tech valuations. In other words, "if interest rates fall by X percentage points, venture valuations rise by Y%," and vice versa:

-   Merely knowing Y is a positive number is only marginally helpful; **we should really want to know exactly how large Y is!**
-   Also, to what extent are tech valuations driven by interest rates and to what extent by other factors?
-   Oh, and while we're at it – is the effect instantaneous? Or does the effect take time to percolate given the inefficiencies of the venture market?

Meanwhile, interest rates could affect more than just valuations. Recall [a few essays ago](https://whoisnnamdi.com/its-valuations/) I introduced the following framework for thinking about the individual "components" of a dollar of venture capital funding – deals, valuation, and dilution:

![decomposition_excalidraw](https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766516162014-decomposition_excalidraw.png)

Interest rates could affect all these variables, and we should want to know how:

-   **Deals:** Low interest rates drive speculation, encouraging "betting" on startups. High rates send the gamblers home.
-   **Dilution:** Low rates create a more founder-friendly environment, reducing the ownership founders give up. Vice versa for high rates.
-   **Funding:** To the degree investors "search for yield," startups attract capital when other investment opportunities are scarce.

So I set out to find some answers.

A quick note before we proceed. It turns out, the Federal Reserve is mostly predictable, so most of its moves are already "priced in" by the market. I instead focus on _unexpected_ and unanticipated shifts in interest rates that market actors haven't yet reacted to. To account for these expectations, I control for other macro variables like U.S. GDP, inflation, and the Nasdaq index.

For example, if the one-year Treasury rate declines by 0.5%, the market may have only expected a 0.25% decline based on current economic conditions, leaving 0.25% unexpected:

![int_rate_excalidraw](https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766516176997-int_rate_excalidraw.png)

OK – that's the most complicated concept you need to understand. With that out of the way, let's jump to the results.

## Long and variable lags

The following charts trace the effect of a 0.25 percentage point or 25 basis point (bps) cut in the [one year U.S. Treasury yield](https://fred.stlouisfed.org/series/DGS1) on various measures of venture activity, up to twelve quarters / three years out:

-   25 bps is the typical increment the Federal Reserve uses.
-   I focus solely on the "surprise" component. The "total" change in rates would have been even larger.

The effects are quite strong, especially on deal flow and valuations:

![lp_1](https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766516181469-lp_1.png)

-   Deal activity rises for six quarters before receding back down to zero after ten quarters. Peak impact is substantial – **about 10% more deals are getting done six quarters out**
-   Valuations take longer to peak but the size of the effect is more extreme; **seven quarters out valuations are up ~25%**, falling back to their original level after three years
-   **Dilution is more muted**, remaining largely flat initially but then dipping ~5% after a few quarters without ever recovering with the three year window

Critically, interest rates affect deal flow, not just valuations:

-   It's not simply the same set of companies raising money at higher prices. **More companies get funded in the first place as well.**
-   As I found in [Old Valuations Die Hard](https://whoisnnamdi.com/old-valuations/), deal flow reacts quickly, while valuations take longer to adjust but see a larger impact overall.

This has pros and cons:

-   More deals means more entrepreneurs get to take a swing.
-   Conversely, however, when interest rates rise, founders not only accept lower valuations – _some founders don't get funded at all_.

Let's drive that point home by visualizing the same analysis but for an increase in interest rates rather than a decrease:

![lp_1n](https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766516184651-lp_1n.png)

Rising rates squeeze the life out of venture capital. Per the logic I outlined in my [last essay](https://whoisnnamdi.com/not-enough-startups/), we know this reflects reduced investor demand, since quantities and prices drift together:

> Demand can shift… which causes prices and quantities to move in the **same** direction (up when demand increases, down when demand decreases – [We Don't Have Nearly Enough Startups](https://whoisnnamdi.com/not-enough-startups/)

The (multiplicative) aggregation of these individual sub-effects yields the overall effect on venture funding:

![lp_2](https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766516187735-lp_2.png)

-   Funding builds up for almost two years, peaks at nearly 30% above baseline, then falls back to zero by about 11 quarters out.

With rising rates, funding falls just over 20%:

![lp_2n](https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766516190086-lp_2n.png)

Perhaps it's obvious, but these are extremely large effects!

Thankfully, interest rates don't move up or down enough to regularly generate these sorts of reactions. A 10 bps / 0.1% surprise is much more common than a 25 bps / 0.25% one.

Notably, the effects aren't permanent; As interest rates reset, so does the venture market.

## A brief history of time value

The current "era" of venture capital has been deeply influenced by this strange interest rate regime, having evolved entirely within it.

With our previous estimates, we can run a backwards-looking "attribution analysis", explaining the ups and downs of venture in terms of interest rates. In other words, we can break down the recent history of venture activity into the portions influenced by interest rates vs. other factors.

First up: deal activity. In red I plot an index of the overall growth in venture deal activity since early 2014, averaged across funding stages, and in blue I plot the portion attributable to unexpected interest rate shocks:

![hd_deals](https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766516167290-hd_deals.png)

-   **Interest rates explain nearly the entire explosion of venture deal activity over the last few years.**

Of all the charts, this is the one I probably spent the most time staring at and double-checking the numbers, as it's just so striking.

Let's do the same for valuations (notice the bigger scale here):

![hd_valuation](https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766516175139-hd_valuation.png)

-   The higher rates of the 2018 era pushed down valuations, but the effect reversed as rates fell heading into 2020. **Interest rates on their own doubled valuations.**
-   However, the valuation inflation was so extreme that interest rates can't explain it all, implying more had to be going on.

**This is important:** that interest rates explain nearly all deal flow but only part of the rise in valuations implies that demand for startups has outstripped supply of startups. With nowhere else to go, that excess demand spills over into prices. You can't invest in startups that don't yet exist, so you compete for the few that do, bidding up prices. This is the same conclusion I reached in a prior essay:

> … the valuation inflation we've seen "comes from" the incredible growth in demand and lack of supply of startup equity – [It's Valuations (Almost) All the Way Down](https://whoisnnamdi.com/its-valuations/)

Here's dilution:

![hd_dilution](https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766516171162-hd_dilution.png)

-   Dilution is noisier, complicating interpretation. The way to read this chart is that interest rates increased dilution through 2019 but afterward exerted downward pressure on dilution.
-   From 2019 through 2022, interest rates drove dilution down 20%, which is exactly how much they declined in total, therefore **accounting for nearly all of the fall.**

Putting it all together, here's what our little attribution methodology has to say about the effect of interest rates on overall VC funding:

![hd_capital](https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766516164359-hd_capital.png)

-   From 2014 through the top of the market in 2021, **interest rates accounted for a 200% (!!!) expansion in venture funding.**
-   As with valuations, the run up in venture funding was too extreme to be completely explained by interest rates.

## Don't discount interest rates

> Monetary actions affect economic conditions only after a lag that is both long and variable – Milton Friedman

Before concluding, I should mention some caveats to this analysis:

-   First, **there aren't many examples of big interest rate moves over this period.** I may have overfit to the few meaningful changes in rates since the 2008 Financial Crisis.
-   Second, **it's possible I haven't controlled for all the relevant variables.** For example, a lot happened during the pandemic that isn't fully captured by my choice of controls.
-   Third, **I use the U.S. Treasury yield, i.e. the risk free rate, as my measure of interest rates**, which doesn't fit a high-risk asset class like venture capital. Unfortunately, no venture-specific analog exists.
-   Fourth, and I'm repeating myself because it's important, **these are the effects of an unexpected shift in rates**, whereas most interest rate movement is expected by the market. If interest rates change by 50 basis points tomorrow, no more than half of that was in fact a "surprise."

Caveats aside, Friedman's proclamation appears to hold for venture capital – it takes multiple years for interest rate effects to fully play out.

**Even in the private markets, we're all Fed watchers now:** these interest rate effects are too large to ignore. In fact, interest rates are so impactful that they explain most of the mass hysteria of the last few years, both on the upside and the down.

Importantly, **interest rates cannot forever move in one direction.** Over the years, they mean revert, making their impact temporary at best. Don't get too accustomed to any particular regime – the new normal will always eventually look like the "old normal."

Don't discount interest rates.

<div class="subscribe-form">
<h3 class="subscribe-form-title">Receive my new long-form essays</h3>
<p>Thoughtful analysis of the business and economics of tech</p>
<form action="/api/subscribe" method="POST">
<input type="hidden" name="merge[SOURCE]" value="Bottom: Don" />
<input type="email" name="email" placeholder="Enter your email" required />
<button type="submit">Go ⚡</button>
</form>
</div>