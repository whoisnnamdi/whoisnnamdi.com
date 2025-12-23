---
slug: "wealthy-investors-edge"
title: "Do Wealthy Investors Have an Edge?"
excerpt: "The super-rich earn more on their investments than the rest of us. \n\nSomething nefarious, or something else?"
published_at: "2021-08-18T07:47:55.000Z"
updated_at: "2022-01-01T20:07:45.000Z"
feature_image: "https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766512259274-header.png"
tags:
  - slug: "investors"
    name: "Investors"
meta_description: ""
canonical_url: "https://whoisnnamdi.com/wealthy-investors-edge/"
og_title: "Do Wealthy Investors Have an Edge?"
og_description: ""
og_image: "https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766512259274-header.png"
twitter_title: "Do Wealthy Investors Have an Edge?"
twitter_description: ""
twitter_image: "https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766512259274-header.png"
---

The super-rich earn more on their investments than the rest of us.

Something nefarious, or something else?

## The rich get richer, faster

Wealth and financial returns are positively correlated. Here's a plot of average annualized portfolio returns against ([log](https://en.wikipedia.org/wiki/Logarithm)) wealth, coming from a [study](https://conference.nber.org/conf_papers/f155140/f155140.pdf) using data from [Addepar](https://addepar.com/), a wealth management technology company:

![Pasted-image-20210725110126](https://nnamdi.net/content/images/2021/08/Pasted-image-20210725110126.png)

There's a strong positive relationship between wealth and financial returns. To translate the range on the x-axis into something a bit more meaningful, you can think of the left side as representing investors with less than $3 million in assets and the right side representing investors with more than $100M in wealth.

Here are the exact returns at various levels of wealth:

![Pasted-image-20210725105724](https://nnamdi.net/content/images/2021/08/Pasted-image-20210725105724.png)

Comparing the <$3M group to the >$300M group, **the richest investors earn roughly 2 percentage points more on their investment portfolios annually**, a sizable advantage.

<div class="subscribe-form">
<h3 class="subscribe-form-title">Receive my new long-form essays</h3>
<p>Thoughtful analysis of the business and economics of tech</p>
<form action="/api/subscribe" method="POST">
<input type="email" name="email" placeholder="Enter your email" required />
<button type="submit">Go ⚡</button>
</form>
</div>

## High class asset classes?

Richer investors could be allocating their capital to different asset classes than other investors, and that could be driving the return differential.

Is it true that asset allocations differ meaningfully across wealth groups? **Yes**:

![Pasted-image-20210815202907](https://nnamdi.net/content/images/2021/08/Pasted-image-20210815202907.png)

Richer investors put more of their money to work in [alternative investments](https://money.usnews.com/investing/investing-101/articles/a-beginners-guide-to-alternative-investments) (venture capital, private equity, hedge funds, etc.), private companies (owned directly, not via venture capital or private equity funds), and housing.

However, it turns out that while asset allocations do tend to correlate with wealth levels, the differences in returns cannot be fully or even mostly explained by high-level asset allocation decisions.

To test for this, the authors calculated the expected returns of various wealth groupings based purely on the typical asset allocation of those groups. So stocks are assumed to get the returns of the S&P 500, bonds are expected to earn the returns of the US Aggregate Bond Index, and so on.

When they do this, they find that the expected returns are not divergent enough to explain the rich investor advantage:

![Pasted-image-20210725110742](https://nnamdi.net/content/images/2021/08/Pasted-image-20210725110742.png)

Using this approach, the gap between investors with less than $3M in assets and those with $100M+ is only **0.35 percentage points**, whereas the difference in raw returns was a full _2 percentage points_. **So asset mix does not even come close to explaining the differences.**

We can also look at returns across wealth levels within each asset class. The table below shows the results of a regression of realized returns of individual investors on various wealth buckets, repeated for different asset classes. Interpret the numbers as the annualized returns of that group relative to the returns of investors with less than $3M in assets. For now, focus on panel A at the top:

![Pasted-image-20210725110838](https://nnamdi.net/content/images/2021/08/Pasted-image-20210725110838.png)

**Richer investors earn significantly higher returns in public equities, alternatives, and privately held companies.** The only major category they don't dominate is fixed income, which perhaps makes some sense given the spread of returns at the individual bonds tends to be much more compressed that other assets.

## You have to risk money to make money

So what gives? Why do the super rich earn so much more on their investments than everyone else, even after controlling for asset class?

Here's a thought: **is raw, realized returns even the right metric to compare?** (Hint: No)

Risk vs. reward is a classic dynamic in finance. Financial returns compensate investors for risks they take, with riskier investments generating higher returns, which encourages investors to buy them in the first place.

The [Sharpe Ratio](https://www.investopedia.com/terms/s/sharperatio.asp) quantifies the degree to which a portfolio earns excess returns relative to the risk undertaken. The Sharpe Ratio divides the excess returns of a portfolio relative to some risk-free asset by the standard deviation of the portfolios excess returns, which represents volatility and risk, yielding "risk-adjusted" returns.

When the researchers do this, the relationship between wealth and returns completely breaks down:

![Pasted-image-20210725110133](https://nnamdi.net/content/images/2021/08/Pasted-image-20210725110133.png)

The Sharpe Ratios of wealthier investor portfolios are no better than those of less wealthy investors:

> “having controlled for risk, the point estimates of the Sharpe ratio for very wealthy investors is not higher, and **the relationship between returns and wealth remains statistically insignificant**”

So wealthy investors earn more but those earnings are explained by more risk-taking.

Remember, this risk-taking is happening within asset classes rather merely than across, so this result implies that the rich are investing in riskier individual assets (e.g. companies) within each category. For example, the wealthiest investors hold a much larger share of their public equity portfolio in individual stocks (vs. ETFs or mutual funds) relative to other investors, leading to more volatile portfolios:

![Pasted-image-20210815223154](https://nnamdi.net/content/images/2021/08/Pasted-image-20210815223154.png)

High net worth investors also tend to invest in smaller, higher growth companies, naturally riskier. Interestingly, this behavior generates a lower market "beta" for rich investors in the [CAPM model](https://www.investopedia.com/terms/c/capm.asp), as their portfolios correlate less well with the overall equity market than do those of less wealthy investors, who have betas close to 1:

![Pasted-image-20210815224634](https://nnamdi.net/content/images/2021/08/Pasted-image-20210815224634.png)

> “Higher-wealth households load more heavily on the SMB factor, reflecting an **increased focus on small-cap companies**. High net worth portfolios also load more negatively on the HML factor, meaning that they have **more exposure to growth companies** than lower wealth investors.”

## Looking at all the alternatives

There's one more wrinkle though. Here's that last table again, showing returns across wealth groups and asset classes. This time focus on panel B, which focuses on risk-adjusted returns:

![Pasted-image-20210725110838-1](https://nnamdi.net/content/images/2021/08/Pasted-image-20210725110838-1.png)

**For public equities and privately-held companies, controlling for risk largely eliminates / accounts for the return premium earned by wealth investors.** However, accounting for risk doesn't totally do the trick for alternative investments, where richer investors do better even taking risk into account. In fact, less wealthy investors do _so_ badly in alternatives that the average investor with less than $3M in assets only earned an annualized return of 1.75%, which is not much higher than the risk-free rate during the same period of 1.33%, despite taking on significant risk.

We can dive a layer deeper by examining the returns across subgroups within alternatives, primarily hedge funds, venture capital and private equity, and real estate. **Richer investors earn higher raw and risk-adjusted returns in hedge funds and VC/PE** but do no better in real estate, where they actually earn _lower_ risk-adjusted returns:

![Pasted-image-20210725113425](https://nnamdi.net/content/images/2021/08/Pasted-image-20210725113425.png)

**The least wealthy earn less than 1% annually on their hedge fund, venture capital, and private equity investments**, which is stunning.

It's hard to pinpoint the exact drivers of the alternative investments advantage of the richest investors. What we do know is that the alternative investment portfolios of the richest investors differ quite substantially from those of less wealthy investors:

![Pasted-image-20210815213652](https://nnamdi.net/content/images/2021/08/Pasted-image-20210815213652.png)

For example, investors in the sub-$3M group have only two alternative investments on average, while the $100M+ group has **35**. On that basis alone we would expect the better diversification to generate lower volatility for the richest investors and potentially even higher returns based on my argument in "[Why Don't VCs Index Invest?](https://whoisnnamdi.com/vcs-index-invest/)" (citing [Abe Othman](https://angel.co/blog/venture-returns)):

> ... investors increase their expected return by indexing as broadly as possible at the seed stage (i.e., by putting money into every credible deal), because any selective policy for seed-stage investing—absent perfect foresight—will eventually be outperformed by an indexing approach.

Another quirk: **the alternatives positions of richer investors are updated much less frequently**, meaning the valuations at which the companies are held are updated less often. This makes the portfolios of richer investors appear less volatile. Further, as folks in the industry know, companies that are doing well will typically see their valuations rise faster and their carrying values updated more frequently. So less updating means less volatility, and any volatility they do see is largely to the upside:

> **The smoothed returns of private equity understate the true economic risk** and are an artifact of the lack of mark-to-market for illiquid assets — [Demystifying Illiquid Assets: Expected Returns for Private Equity](https://www.aqr.com/Insights/Research/White-Papers/Demystifying-Illiquid-Assets-Expected-Returns-for-Private-Equity)

Still, having stared at the data for a while, my sense is the alternative advantage represents a real returns premium and isn't merely an artifact of mark-to-market gamesmanship. Let's keep digging.

## Real estate: location, location, location. Alternatives: access, access, access

We've crossed out anything nefarious in all the other asset classes. In all asset classes outside of alternatives, wealthier investors earn higher returns in the same way anyone earns them — by taking more risk. But alternatives remain a mystery. What's going on there?

**Is it skill?** Probably not, at least not in traditional sense of "stock picking". Most investments in alternatives are intermediated by managers — hedge, venture capital, and private equity funds — who make the actual investments. Therefore, it's unlikely that better stock picking ability on the part of the wealthy investors themselves explains their enhanced returns.

But that's also why the returns gap is _so strange_. If the individual investor is not actually making the investments, then why should their personal net worth correlate so highly with their portfolio returns in alternatives? The only explanation is differences in skill at picking great managers or access to those managers across wealth levels:

> "Higher-wealth investors may receive preferential access to better-performing managers because they can offer larger amounts of funds at once, which reduces marketing and related overhead costs to the fund manager... In contrast, lower-wealth investors may only receive access to hedge fund and private equity solutions that are distributed through advanced marketing networks and are originated by large platform operators. However, **funds that provide more accessibility may deliver worse performance**"

For example, the authors find that [fund-of-funds](https://www.investopedia.com/terms/f/fundsoffunds.asp), investment funds that invest in other funds rather than in securities directly, earn "almost exactly two percentage points lower" returns on an annualized basis "evidence for fees imposed by additional layers of management." Another piece of evidence — the fewer investors who hold the same alternatives security, the higher than returns, and vice versa: "assets with limited investor participation are significantly related to higher investment returns." In other words, **exclusivity generates better returns**. This points to the importance of access.

One highly suggestive piece of evidence comes from the returns of investors whose funds are managed by a single family office (SFO), which is an investment firm setup solely to manage the wealth and investments of a single family or person. **Portfolios managed by family offices earn significantly higher returns** than portfolios of investors in the same wealth bracket who do not have a family office. Not only that, the return differential across wealth groups disappears when we look only at portfolios managed by family offices:

![Pasted-image-20210725112023](https://nnamdi.net/content/images/2021/08/Pasted-image-20210725112023.png)

Depending on the asset class, among portfolios managed by family offices, investors with less than $3M in assets earn **more** than investors with over $100M in assets:

> "While lower-wealth investors earn substantially lower returns on their hedge fund and private equity investments than ultra-high net worth investors, **this does not apply to investors with smaller portfolios that are managed by an SFO**. Even SFO investors with less than three million, or 3-10 million earn roughly the same return as those with more than 100 million on their investments in hedge funds and private equity, and **substantially more than investors in the same wealth brackets but without SFO management.**"

Something about the nature of family offices and their influence on manager selection causes the wealth-returns relationship to disappear entirely. The study's authors speculate that this "likely \[relates\] to the difficulty of identifying and **accessing** high-performing alternative investment funds."

**Access to assets matters.** In the public markets, access is effectively democratized, so we can completely explain the advantage of richer investors in the public markets via differential risk-taking. However, the advantage in alternative assets reflects more than mere risk tolerance or preference. Ironically, family offices, which likely _exacerbate_ inequality between the rich and the rest, **level the playing field \*among\* the rich**.

## The 1% vs. the 0.1%

So do wealthy investors have an edge? Relative to non-wealthy, not really. It's risk-loving turtles all the way down.

But do the wealthiest have an edge versus their somewhat less wealthy peers? Yes, though I won't lose much sleep over it. It's an **access advantage**, and it's limited to the assets where access remains important: the relatively opaque and exclusive worlds of hedge funds, venture capital, and private equity.

Candidly, I'm more focused on expanding access to these alternative asset classes in general than on helping already well-off investors get access to the best funds. That said, the excess returns of alternatives are quite low for investors with only a few million in assets. On that basis, they aren't much better than public equities except for the extremely wealthy.

If these new investors only receive access to the worst-performing funds, the effort will be worthless. Worth pondering further.

> The super-rich earn more on their investments than the rest of us.  
>   
> In the battle between the 1% and the 0.1%, the richest get richer, faster.  
>   
> Something nefarious? Or something else?[https://t.co/Mc8imZTiH3](https://t.co/Mc8imZTiH3)
> 
> — Nnamdi Iregbulem (@whoisnnamdi) [August 20, 2021](https://twitter.com/whoisnnamdi/status/1428770455414992899?ref_src=twsrc%5Etfw)

_Thanks to [Cynthia Balloch](https://www.lse.ac.uk/finance/people/faculty/Balloch) and [Julian Richers](https://sites.google.com/site/julianrichers/home), the authors of the study from which much of this essay is derived._

<div class="subscribe-form">
<h3 class="subscribe-form-title">Receive my new long-form essays</h3>
<p>Thoughtful analysis of the business and economics of tech</p>
<form action="/api/subscribe" method="POST">
<input type="email" name="email" placeholder="Enter your email" required />
<button type="submit">Go ⚡</button>
</form>
</div>