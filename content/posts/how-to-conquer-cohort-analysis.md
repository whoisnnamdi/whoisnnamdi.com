---
slug: "how-to-conquer-cohort-analysis"
title: "How to Conquer Cohort Analysis With a Powerful Clinical Research Tool"
excerpt: ""
published_at: "2019-06-03T12:00:00.000Z"
updated_at: "2019-06-04T04:30:45.000Z"
feature_image: "https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766512172481-lucas-vasques-453684-unsplash.jpg"
tags:
  - slug: "investors"
    name: "Investors"
  - slug: "founders"
    name: "Founders"
meta_description: ""
canonical_url: "https://whoisnnamdi.com/how-to-conquer-cohort-analysis/"
og_title: "How to Conquer Cohort Analysis With a Powerful Clinical Research Tool"
og_description: ""
og_image: "https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766512172481-lucas-vasques-453684-unsplash.jpg"
twitter_title: "How to Conquer Cohort Analysis With a Powerful Clinical Research Tool"
twitter_description: ""
twitter_image: "https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766512172481-lucas-vasques-453684-unsplash.jpg"
---

**Understanding cohort performance is critical for modern, high-velocity businesses, especially those with subscription or recurring revenue models.**

In SaaS or consumer subscription settings, small changes in churn can [radically impact revenue growth](https://www.forentrepreneurs.com/why-churn-is-critical-in-saas/?fbclid=IwAR3RmfnV8ek0lDyyWwEXdkHNJhJxXymIN-hJeuo32c3cYekTnQOgLvAryi4).

Product managers, growth hackers, marketers, data scientists, and investors all need to understand how business decisions impact user retention.

With so many recurring revenue businesses going public, Silicon Valley _should_ get the picture by now.

Believe it or not, however, **medical researchers measure customer retention better than you do.**

What?

Sounds bold, but it’s not. Over decades, clinical researchers have refined precise and rigorous ways of measuring retention—except instead of _customer_ retention, they measure _patient survival_.

The gravity of life and death means researchers take great care in measuring treatment efficacy.

To do this, clinical researchers use a statistical method called the [**Kaplan-Meier estimator**](https://en.wikipedia.org/wiki/Kaplan%E2%80%93Meier_estimator). The formula elegantly solves a frequent issue that pops up in cohort retention analysis: **making valid comparisons within and across groups of cohorts of different lifespans**:

$$ \widehat S(t) = \prod\limits_{i:\ t_i\le t} \left(1 - \frac{d_i}{n_i}\right) $$

Despite the fancy formula, survival analysis using Kaplan-Meier (KM) is actually quite simple and delivers much better results than other methods:

![4](/content/images/2019/05/4.png)

In this post I'll explain these results, breakdown the KM estimator in simple terms, and convince you to use it for retention analysis.

The bottom-line: **if you are an operator or investor who wants to properly measure customer cohort retention, Kaplan-Meier is the way to do it.**

<div class="subscribe-form">
<h3 class="subscribe-form-title">Receive my new long-form essays</h3>
<p>Thoughtful analysis of the business and economics of tech</p>
<form action="/api/subscribe" method="POST">
<input type="hidden" name="merge[SOURCE]" value="Top: How to Conquer Cohort Analysis With a Powerful Clinical Research Tool" />
<input type="email" name="email" placeholder="Enter your email" required />
<button type="submit">Go ⚡</button>
</form>
</div>

## Two inevitabilities: Death and Churn

The core problem the KM estimator helps us deal with is **missing data**.

**Cohort data is inherently flawed in that more recent cohorts have fewer data points to compare against older cohorts**. For example, a five-month-old cohort can only be compared with the first five months of a ten-month-old cohort. The retention rates of a cohort of customers acquired seven months ago can only reasonably be compared to the first seven month retention of older cohorts.

Imagine you had the full retention history of the previous 12 monthly cohorts and you wanted to predict the 12-month retention curve of a newly acquired customer. It’s not at all obvious how to do this.

To understand this better, let’s visualize a simpler example with only five cohorts:

![1](/content/images/2019/05/1.png)

You might first try to calculate average retention across cohorts. This is problematic for two reasons:

-   The simple average will not be representative if our cohorts differ in size
-   For any given month we can only average over cohorts that have been alive at least that long, so we effectively average over fewer and fewer cohorts over time

We can see the second issue below. With both the simple and weighted average, we get strange results when performance oscillates across cohorts:

![2-1](/content/images/2019/05/2-1.png)

Assuming we don’t re-add returning users who previously churned into their original cohort, retention cannot possibly tick up after declining—it’s a one way street. This is an artifact of our flawed method, as 5-month retention cannot exceed 4-month retention by definition.

A third, related problem arises when comparing groups of cohorts to other groups, for example, comparing 2016’s group of monthly cohorts to 2017’s. As we’ve just shown, using averages to estimate retention curves for each group doesn’t work, which means we also cannot compare one group to another.

## Questions? Ask your doctor

![ani-kolleshi-684082-unsplash](/content/images/2019/05/ani-kolleshi-684082-unsplash.jpg)

Believe it or not, clinical researchers deal with this same issue all the time.

Customer cohorts are analogous to groups of patients starting treatment at different times. Here the “treatment” is the time of customer acquisition and “death” is simply churn.

Or, imagine if the “2016 cohorts” and “2017 cohorts”, rather than being year-grouped cohorts, were groups receiving different treatments in a clinical trial. We want to quantify differences in patient survival rates (customer retention) between the two groups.

Pharmaceutical companies and other research outfits regularly contend with this. Patients start treatment at different times. Patients drop out of studies, by dying, but also by moving locations or deciding to stop taking the medication.

This creates a host of missing data issues at the beginning, middle, and end of any patient’s clinical test record, complicating analysis of effectiveness and safety.

To solve this problem, in 1958, a mathematician, [Edward Kaplan](https://en.wikipedia.org/wiki/Edward_L._Kaplan), and statistician, [Paul Meier](https://www.chicagotribune.com/news/ct-xpm-2011-08-18-ct-met-meier-obit-20110818-story.html), jointly created the [Kaplan-Meier estimator](https://www.tandfonline.com/doi/abs/10.1080/01621459.1958.10501452). Also called the _product-limit estimator_, the method effectively deals with the missing data issue, providing a more precise estimate of the probability of survival up to any point.

[The core idea behind Kaplan-Meier](http://biostat.mc.vanderbilt.edu/wiki/pub/Main/ClinStat/km.lam.pdf):

> The estimated probability of surviving up to any point is the cumulative probability of surviving each preceding time interval, calculated as the product of the preceding survival probabilities

That strange formula above is simply multiplying a bunch of probabilities against one another to find the cumulative probability of survival at a certain point.

Where do these probabilities come from? **Directly from the data**.

KM says our best estimate of the probability of survival from one month to the next is exactly the weighted average retention rate for that month in our dataset (also called the [_maximum likelihood estimator_](https://towardsdatascience.com/a-gentle-introduction-to-maximum-likelihood-estimation-9fbff27ea12f) in statistics parlance). So if in a group of cohorts we have 1000 customers from month one, of which 600 survive until month two, our best guess of the “true” probability of survival from month 1 to 2 is 60%.

We do the same for the next month. Divide the number of customers that survived through month 3 by the number of customers who survived through month 2 to get the estimated probability of survival from month 2 to 3. If we don’t have month 3 data for a cohort because it’s only two months old, we exclude those customers from our calculations for month 3 survival.

Repeat for as many cohorts / months as you have, excluding in each calculation any cohorts missing data for the current period. Then, to calculate the probability of survival through any given month, multiply the individual monthly ([conditional](https://www.khanacademy.org/math/statistics-probability/probability-library/conditional-probability-independence/v/calculating-conditional-probability)) probabilities up through that month.

Though a morbid thought, measuring patient survival is functionally equivalent to measuring customer retention, so we can easily transfer KM to customer cohort analysis!

## Putting Kaplan-Meier to the test

Let’s make this clearer by applying the Kaplan-Meier estimator to our previous example.

![3-1](/content/images/2019/05/3-1.png)

The probability of surviving month 1 is **69%** (total customers alive in month 1 divided by total in month 0). The probability of surviving month 2, given a customer survived month 1, is **72%** (total customers alive in month 2 divided by total in month 1, excluding the last cohort which is missing month 2 data). So the cumulative probability of surviving at least two months is 69% x 72% = **50%**. Rinse, wash, and repeat for each subsequent month.

Side-by-side comparison reveals the superiority of KM:

![4](/content/images/2019/05/4.png)

What’s great about KM is it leverages all the data we have, even the younger cohorts for whom we have fewer observations. For example, while the average of all the available cohorts at month 3 only uses the data for cohorts 1-3, due to its cumulative nature, the KM estimator effectively incorporates the improved early retention of the newer cohorts. This yields a 3-month retention estimate of 38%, which is higher than any of the cohorts we can actually measure at month 3.

**This is exactly what we want**—cohorts 4 and 5 are both larger and better retaining than 1-3. Hence, it is likely that the 3-month retention rate for a random customer picked among these cohorts will exceed the historical average, as the customer will likely be in cohorts 4 or 5.

Using all the data is also nice because it makes our estimates of the tail probabilities much more precise than if we could only rely on the data of customers who we retained that long.

Kaplan-Meier curves also fixes the wonky behavior in the right tail of the retention curve by respecting a [fundamental law of probability](https://www.investopedia.com/terms/c/compound-probability.asp): cumulative probabilities can only decline as you multiply more numbers.

## Recommended by 95% of doctors

This analysis could easily be extended. Let’s go back to the 2016 vs 2017 example—we could run the Kaplan-Meier calculation on each respective group of cohorts and then compare the resulting survival curves, highlighting differences in expected retention between the two groups.

While I won’t cover it here, you can also calculate [p-values, confidence intervals, and statistical significance tests](https://math.unm.edu/~james/w4.pdf) for Kaplan-Meier curves. This lets you to make rigorous statements like “the improvement of cohort retention in 2018 relative to 2017 was statistically significant (at the 5% level)”—cool stuff:

![5](/content/images/2019/05/5.png)

**Kaplan-Meier is a powerful tool for anyone who spends time analyzing customer cohort data.** KM has been battle-tested in rigorous clinical trials—if anything it’s surprising it hasn’t caught on more among technology operators and investors.

If you're a product manager, growth hacker, marketer, data scientist, investor, or anyone else who understands the deep importance of customer retention analysis, the Kaplan-Meier estimator should be a valuable weapon in your analytics arsenal.

<div class="subscribe-form">
<h3 class="subscribe-form-title">Receive my new long-form essays</h3>
<p>Thoughtful analysis of the business and economics of tech</p>
<form action="/api/subscribe" method="POST">
<input type="hidden" name="merge[SOURCE]" value="Bottom: How to Conquer Cohort Analysis With a Powerful Clinical Research Tool" />
<input type="email" name="email" placeholder="Enter your email" required />
<button type="submit">Go ⚡</button>
</form>
</div>