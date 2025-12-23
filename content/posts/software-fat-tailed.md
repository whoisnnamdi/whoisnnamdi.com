---
slug: "software-fat-tailed"
title: "Enterprise Software Monetization is Fat-Tailed"
excerpt: "In enterprise software, averages are meaningless. Instead, focus on the tails."
published_at: "2020-10-06T15:59:16.000Z"
updated_at: "2022-09-24T22:19:10.000Z"
feature_image: "https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766512221769-header-resized.png"
tags:
  - slug: "investors"
    name: "Investors"
  - slug: "founders"
    name: "Founders"
meta_description: ""
canonical_url: "https://whoisnnamdi.com/software-fat-tailed/"
og_title: "Enterprise Software Monetization is Fat-Tailed"
og_description: ""
og_image: "https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766512221769-header-resized.png"
twitter_title: "Enterprise Software Monetization is Fat-Tailed"
twitter_description: ""
twitter_image: "https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766512221769-header-resized.png"
---

In enterprise software, **the "average" customer is a meaningless concept.**

Paying too much attention to the "average" customer leads many founders and investors astray.

Instead, **focus on the tails.**

Here's why.

## The basics

Define "monetization" as the average revenue a software vendor extracts from its customers:  
$$  
\text {monetization} = \text {total revenue / total customers}  
$$  
Wild variation in monetization across customers means most enterprise software customers contribute little to overall revenue.

For example, a late-stage software company with $50M+ in ARR and ~2,000 customers might have a small number of customers with enormous contracts, possibly greater than $500K or even $1M in ARR each, and a large number with tiny contracts in the ~$10K range.

The extreme, non-negative variation around the average produces a right or positively skewed monetization distribution:

![image-20200824082909012](/https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766515792704-image-20200824082909012.png)

Sufficiently skewed distributions are "[fat-tailed](https://en.wikipedia.org/wiki/Fat-tailed_distribution)." Large customer contracts will determine the properties of the distribution, like its mean or variance. Similarly, large customers will account for an enormous proportion of overall revenue. In other words, software monetization is a [power law](http://reactionwheel.net/2015/06/power-laws-in-venture.html).

In a [previous essay](https://whoisnnamdi.com/vcs-index-invest/), I introduced the notion of \\(\\alpha\\), or alpha, the shape or tail parameter, which characterizes the "fat-tailedness" of a power law distribution. The smaller \\(\\alpha\\), the more skewed the distribution, the fatter the tails, with \\(\\alpha < 2\\) indicating extreme skew and fat-tailedness. For software monetization, the fatter the tail, the more common and impactful are those "whale" customers.

Evidence for skewed monetization is tough to come by without access to a company's commercial contracts. However, we can infer the fat-tailedness from the SEC filings of public software companies with a simple trick.

### Receive my next long-form post

Thoughtful analysis of the business and economics of tech

 

Subscribe

## The math

The trick? A [formula](https://www.youtube.com/watch?v=XhTHG3QmVwM) exists that calculates the concentration in the top percentiles of a power law distribution based on the \\(\\alpha\\) of the distribution:  
  
$$  
\text{s} = p^{\frac{\alpha-1}{\alpha}}  
$$  
where \\(s\\) is the share of the total and \\(p\\) is the percentile.

Plug in the \\(\\alpha\\) and the percentile \\(p\\) you are interested in to get the share of the total that the top-p% of customers represent.

Invert the formula to yield the \\(\\alpha\\) of a power law distribution given a certain percentile and share:  
$$  
\alpha = \frac{\log{p}}{\log{p}-\log{\text{s}}}  
$$  
This means we can infer \\(\\alpha\\)​ and therefore how fat-tailed the revenue distribution is if we know the share of revenue represented by the largest customers of a given software vendor.

We can estimate the shape of the customer distribution by plugging \\(\\alpha\\) back into the first equation along with some other percentile X in order to estimate the share of revenue earned from the top-X% of customers, which we can repeat for other percentiles. For example, the relationship between \\(\\alpha\\) and the revenue concentrated in the top-20% of customer looks like this:

![img](/https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766515807452-qNmFsndFgJ.png)
*Source: David Salazar*

An \\(\\alpha = 1.16\\) yields the classic [Pareto 80/20 distribution](https://www.investopedia.com/terms/1/80-20-rule.asp), where 20% of customers account for 80% of revenue.

Before we proceed, know that this method only works if we assume upfront that the distribution is in fact power law distributed, at least in the tails. We never proved this, so don't interpolate/extrapolate too far with this method.

With that caveat acknowledged, let's throw caution to the wind!

## The evidence

Public companies do their best to hide customer concentration. But at a certain point fiduciary duty requires that they disclose revenue concentration, especially if a few customers account for a large enough chunk of revenue.

Commonly, companies will state that "no customer represents more than X% of revenue." Less frequently, companies will go further, disclosing the number of customers that exceed some revenue threshold, typically $100,000, and the proportion of revenue they represent. This gets framed as a point of strength — "look how many large customers we have" — but it also indicates customer concentration since the X customers with greater than $100K contracts are by definition the X largest customers.

Here's an example from [Slack's S-1](https://www.sec.gov/Archives/edgar/data/1764925/000162828019004786/slacks-1.htm):

![image-20200905234041096](/https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766515794480-image-20200905234041096.png)
*Source: Slack's S-1*

From this sort of disclosure we can calculate the \\(\\alpha\\) and fat-tailedness of customer monetization for public software vendors via the procedure outlined above, plugging in the share of total revenue and total customers represented by these large customers. [I've done the hard work for you](https://docs.google.com/spreadsheets/d/163g-Tn9AdjF4bb4v7j8VidqeqMJvAHvb7EHUR2ctYsk/edit?usp=sharing) for a subset of public software companies:

![image-20200905234326829](/https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766515796073-image-20200905234326829.png)
*Source*

**The alphas are universally below 2**, implying a high level of skew.

A more visual representation of the alphas (with the average in black):

![alpha](/https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766515782656-alpha.png)

The implied top-20% and top-1% revenue concentration are quite large for most companies (blue = top 20%, red = top 1%):

![share](/https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766515809416-share.png)

So, **the top 20% typically represent ~70% of revenue**, while **the top 1% represent ~40%**. Not quite Pareto 80/20, but pretty close! Interestingly, many companies tied to infrastructure in some way like Datadog, Fastly, and Twilio do have 80/20 monetization distributions, at least in some years.

As I caveated, these figures will be off to some degree. I'd guess they overestimate revenue concentration somewhat.

However, I'm comforted by corroboration from a [report by Theta Equity Partners](https://www.thetaequity.com/slack-ipo) that uses a completely different methodology to estimate the monetization distribution of Slack's customer base. Based on the [S-1 filing](https://www.sec.gov/Archives/edgar/data/1764925/000162828019004786/slacks-1.htm), they found that **Slack's top 1% of customers account for 40% of total revenue in 2019**:

> As we mentioned previously, the data and the model imply a high level of variability in the “goodness” of Slack’s customers – **a small (<1%) segment of “heavy” customers accounts for 40% of company’s revenues** and generates revenue per customer which is more than 100 times larger than everyone else.

Using my methodology, I find that **the top 1% of Slack's customers in 2019 represented 43% of revenue**, which is quite similar.

## The implications

It's easy to see these results and think "Yes, sure, customer concentration is a thing. So what?" But the implications of a fat-tailed monetization distribution are profound.

### Why don't software companies index invest?

First, as I discussed previously in [Why Don't VCs Index Invest](https://whoisnnamdi.com/vcs-index-invest/), when facing a sufficiently fat-tailed distribution of returns, it doesn't make sense to be picky or overly concentrated in one's investments. Index investing is the optimal allocation strategy.

Here, returns are synonymous with revenue and investment is synonymous with customer acquisition costs, or CAC. If the distribution of revenue is fat-tailed, vendors should be trying to insert their software into as many customers as possible, as cheaply as possible. Don't try to land large upfront, as this requires investing in a heavy and expensive enterprise sales motion that may not yield results. Instead, spend small and land small, with each customer contract acting as a potential "lottery ticket" that may unlock a much larger contract later on, similar to an early-stage startup investment.

There's some merit to this analogy between venture capital and software go-to-market strategies. One only has to look at estimates of \\(\\alpha\\) for venture capital investments to see that we are dealing with similar phenomena here (ignore the orange footnotes):

![img](/https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766515818071-zxdn9Kwr6j.png)
*Source: Reaction Wheel*

### Whale hunting

Second, as I allude to in the [aforementioned essay](https://whoisnnamdi.com/vcs-index-invest/), finite samples of a positively skewed, fat-tailed distribution tend to underestimate the average, or mean, of the distribution. Large values are rare, so small samples will tend to miss them. Unless you have an extremely large dataset, the "true" mean is typically larger than the mean you measure from the data. So the calculated sample mean tends to increase as the sample size grows, reflecting those large, infrequent outcomes.

Said more precisely:

> An additional difficulty in the numerical estimation of moments—and, therefore, of risk—is due to the very slow convergence of estimated values to the exact values of the process, even if the associated moments are finite. This “slow Law of Large Numbers” is caused by the large weight of rare events (black swans), which take a lot of data to show up, and prevent a proper estimation of the moments of such processes through the moments of a sample. — [Fat tails and black swans: Exact results for multiplicative processes with resets](https://aip.scitation.org/doi/10.1063/1.5141837)

Further, the largest value you are likely to see in a sample of power law distribution (the expected value of the maximum value) is proportional to the sample size \\(n\\) and inversely proportional to \\(\\alpha\\):  
$$  
\mathbb{E} \[x\_{max}\] \sim n^{1/(\alpha-1)}  
$$  
In plain English — your [personal best](https://en.wikipedia.org/wiki/Personal_record) can only get better with more attempts. In the realm of venture, that looks like this:

![image-20200907200713719](/https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766515797149-image-20200907200713719.png)
*Source: Reaction Wheel*

This is why returns in venture capital tend to increase with portfolio size:

![H5qNMNZPFO](/https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766515786685-H5qNMNZPFO.png)
*Source: AngelList*

In the context of software monetization, the "true distribution" is the set of **all** potential customers while the "sample" is the set of _current_ customers. Each customer is like a draw from a random variable representing all potential customers, just like a venture capital investment is like a random draw from a fat-tailed distribution of potential returns.

**My claim is that the average monetization across your customer base — ARR/customer, revenue/customer, etc. — is an underestimate of the "true" or "potential" monetization.** As you land more customers, so the logic goes, the revenue you extract will tend to rise due to this fat-tailed phenomenon, with no change in pricing model or customer targeting.

More _is_ more, or specifically, more customers is more monetization, for the same reason that [larger venture portfolios yield higher returns](https://www.institutionalinvestor.com/article/b1nlj1gb3g3bbd/The-Pervasive-Head-Scratching-Risk-Exploding-Problem-With-Venture-Capital). Your wins get bigger the more broadly you penetrate the market.

It's natural to ask — "**how much does current monetization underestimate potential monetization?**"

[Nassim Taleb](https://arxiv.org/abs/2001.10488) has already done the math for us. Imagine that true average monetization is the sum of the monetization of customers smaller than the largest customer we've acquired thus far, which he calls \\(K\\), and the contribution of potential customers larger than our largest:  
$$  
\text{true mean} = \text{mean of existing customers}\_{<K} + \text{contribution of potential customers}\_{>K}  
$$  
In the chart below, the shaded region represents larger customers yet to be acquired:

![image-20200909125015490](/https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766515798673-image-20200909125015490.png)
*Source: Statistical Consequences of Fat Tails*

What proportion of the total does this extra bit represent? That depends both on \\(\\alpha\\), or how fat-tailed the distribution is, and on the sample size. The smaller \\(\\alpha\\) and the smaller our sample, the more we underestimate the true mean:

![image-20200909124000940](/https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766515797904-image-20200909124000940.png)
*Source: Statistical Consequences of Fat Tails*

So for an enterprise software company with \\(\\alpha = 1.3\\), which is typical in my data set, and 1000 customers, these not yet acquired customers will account for 20% of the true mean. This means the **true monetization is about 1 / 0.8 = 25% higher than current monetization**.

_That number is conservative_ — it assumes that we've already acquired every customer up to a certain size, thereby maximizing monetization of customers equal to or below that size. We haven't really done this though, so even current monetization underestimates how well we could monetize, even without acquiring larger customers. Factor that in, and the degree to which we underestimate true monetization only increases.

### The math behind land and expand

Combined, the above insights form a mathematical justification for "[land and expand](https://saasx.com/2018/09/13/how-to-execute-a-saas-land-and-expand-strategy/)"-style go-to-market strategies.

Here, land and expand is effectively an [indexing strategy](https://whoisnnamdi.com/vcs-index-invest/) — land at as many organizations with as little investment as possible. Every once in a while you'll land a Google, a Facebook, or an Amazon (both figuratively and literally) which will drive a disproportionate share of revenue.

Even if those customers start off small, any given customer could potentially become quite large.

Further, it can make sense to overspend somewhat on establishing those small beachheads, as they likely underestimate the true average contract value. For this reason, common metrics for evaluating the efficiency of software sales like the "[magic number](https://whoisnnamdi.com/magical-magic-number/)" may underestimate the efficiency of land and expand models, especially during the land phase.

> If we suspect right-skewness, the true mean is more likely to be underestimated by measurement of past realizations, and the total potential is likewise poorly gauged. — [The Fourth Quadrant: A Map of the Limits of Statistics](http://www.edge.org/conversation/nassim_nicholas_taleb-the-fourth-quadrant-a-map-of-the-limits-of-statistics)

In fact, one of the best software investments I ever made (that shall remain nameless) was in a company that on its face seemed quite inefficient, with a magic number well below 1. The leadership team preached the virtues of its land and expand model, but our static analysis of its sales metrics was doomed to underestimate its true efficiency, even after many hours spent (by yours truly) wrangling and analyzing the data.

Luckily, we got over our concerns and made what turned out to be a great investment.

With more mathematical context, the story is a visceral personal reminder to properly grapple with the implications and dynamics of fat-tailed software monetization.

## The end

This is just a small taste of fat tails, and I plan to write more in the coming months on their broader implications for high-growth startups. Much ink has been spilled on this topic within the context of venture investing, but not so much for operating the underlying businesses themselves.

Here's a preview of the topics:

-   Why software markets are always larger than we think
-   [Why "Weighted ACV" beats the traditional ACV metric](https://whoisnnamdi.com/weighted-acv/)
-   Why investors consistently undervalue enterprise software and overvalue consumer startups
-   Why open source is built by individuals rather than communities
-   [Why product-market fit gets harder to achieve the longer you search for it](https://whoisnnamdi.com/product-market-fit-is-lindy/)

I've been thinking about some of these essays for the better part of a year, so I'm excited to _finally_ share these ideas.