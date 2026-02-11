---
slug: "highest-paid-software-engineers-2020"
title: "The Highest-Paid Software Engineers: 2020 Edition"
excerpt: "Engineers are the basic economic unit of modern software development.\n\nThe software production function depends critically on developer productivity and compensation.\n\nAnd yet software engineering pay remains poorly understood."
published_at: "2020-02-24T17:15:07.000Z"
updated_at: "2020-06-05T07:45:27.000Z"
feature_image: "https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766512192005-clip-programming.png"
tags:
  - slug: "developers"
    name: "Developers"
  - slug: "founders"
    name: "Founders"
meta_description: ""
canonical_url: "https://whoisnnamdi.com/highest-paid-software-engineers-2020/"
og_title: "The Highest-Paid Software Engineers: 2020 Edition"
og_description: ""
og_image: "https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766512192005-clip-programming.png"
twitter_title: "The Highest-Paid Software Engineers: 2020 Edition"
twitter_description: ""
twitter_image: "https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766512192005-clip-programming.png"
---

Engineers are the basic economic unit of modern software development.

The software production function depends critically on developer productivity and compensation. No developers, no software.

Yes “[no code](https://medium.com/@rrhoover/the-rise-of-no-code-e733d7c0944d)” is a thing — but even the no code systems themselves are developer-built. You can’t get around it.

And yet software engineering pay remains poorly understood. Different employers pay differently for the same engineering talent. Engineers with similar resumes are paid varying salaries by the same employer.

This guide explains why.

Developer compensation is a critical piece of technology's economic impact. Awareness of this data makes you a better informed citizen of the industry.

**I am dedicated to enhancing the careers of software developers and the functioning of the organizations that employ them.** Compiling this report [every year](https://whoisnnamdi.com/highest-paid-software-developer/) is one way I do this.

If you’re a…

-   developer,
-   founder,
-   manager,
-   or executive

... then this guide is for you.

## Table of contents

-   [Part 1: How Age, Race, and Gender Affect Software Engineering Pay](/age-race-gender-software-engineering-pay)
    -   How `age`, `race`, `gender` and other characteristics affect pay and the extent of pay discrimination in the software development industry
-   [Part 2: Do College Degrees Matter for Software Engineers?](/college-degrees-software-engineers/)
    -   Does `education` matter for how software engineers get paid? The answer: maybe
-   Part 3: The Characteristics of the Best-Paid Software Engineers and Best-Paying Companies (coming soon)
    -   The highest and lowest-paid `engineering roles`, how much big Big Tech pays, the `experience` advantage, and more
-   Part 4: The Highest-Paid Programming Languages, Databases, and Frameworks (coming soon)
    -   Does `React.js` pay better than `AngularJS`? How do `operating systems` affect developer earnings? How important is fluency with `cloud infrastructure`?

## About this guide

### The data

As with [last year’s analysis](https://whoisnnamdi.com/highest-paid-software-developer/), the data in this report is based on a subset of [Stack Overflow’s annual developer survey](https://insights.stackoverflow.com/survey/2019). They have run this survey for a while now and each year graciously open source the responses in an easy work with CSV file.

The survey is global, but here I focus on 10,355 U.S. based individuals employed as software engineers on either a part-time, full-time, or independent basis.

The data is entirely self-reported, so I implicitly assume respondents make accurate claims as to their income, personal characteristics, qualifications, etc. To the extent there are obviously false responses, I have attempted to remove them.

I used Python for the analysis, and if you’d like to reproduce the results, I’ll be releasing the code I wrote after publishing the full results on my [GitHub](https://github.com/whoisnnamdi/).

### Why it’s important to adjust pay gaps for observable factors

Two possible statements comparing the pay of different groups of software developers:

1.  Developers of `type A` make X% more than developers of `type B`, on average
2.  Developers of `type A` make Y% more than developers of `type B`, all else equal

X and Y are rarely the same number. X compares the average earnings of the group A and B. Y compares hypothetical As and Bs who are similar in all dimensions except one, allowing us to attribute the difference to that single trait.

Most analyses of pay gaps stop at statement #1 and call it a day. **This is lazy and misleading.**

Though we’d love to know both X and Y, it is Y that corresponds better to our intuitive meaning of “pay gaps” — the difference between the earnings of two groups who are equivalent except for a single trait of interest (`age`, `gender`, `years of experience`, etc.).

Identifying Y requires additional data on characteristics that may correlate with earnings.

### We can't explain everything

Using the above methodology, I’ll use the following terms in this report:

-   **Total / Unadjusted gap:** X, as above, the average difference between groups (e.g. pay difference between white and black engineers)
-   **Unexplained / Adjusted gap:** Y, as above, the difference between groups who vary on some dimension that can’t be explained by that variance (e.g. pay difference between similar white and black engineers)
-   **Explained gap:** X - Y, the portion of the total gap that is explainable by factors other than the trait of interest (e.g. pay difference between white and black engineers explained by factors unrelated to race)

Note — the unexplained gap is exactly that, unexplained. We cannot say for certain that the entire unexplained gap between, say, white and black software engineers is due to discrimination on race, for example. If we use different controls, the “unexplained” gap would change. At best, the unexplained gap provides an upper bound estimate of the gap attributable to that trait.

How do we know what to control for? The Stack Overflow survey upon which this analysis is based provides a rich set of data on each developer based on their answers to various questions. It’s too complicated to cover here, but I do principled covariate selection using Double Lasso per ([Chernozhukov, Hansen, Urminsky 2016](http://home.uchicago.edu/ourminsky/Variable_Selection)) for find the best set of controls for each gap I examine.

All references to statistical significance are at the p < 0.05 level. Confidence intervals are upward skewed because the original regressions used log-transformed income as the dependent variable.

### It gets better every year

This year’s new and improved analysis comes with the following enhancements:

-   **Interactive charts via Plot.ly**
    -   Hover over the charts for additional data points
-   **Uncontrolled and controlled differences**
    -   Uncontrolled effects correspond to the statement: “Developers of type X earn Y% more than developers of type Z”
    -   Controlled effects correspond to the statement: “All else equal (that we can control for) developers of type X earn Y% more than developers of type Z”
-   **Deep dives into the drivers behind unadjusted pay gaps**
    -   Disaggregation of the explainable pay gaps
    -   Decomposition follows methodology of ([Gelbach 2016](https://www.journals.uchicago.edu/doi/abs/10.1086/683668))

I am also releasing a developer earnings calculator (coming soon). Answer a few questions, and the calculator will output a pay estimate and confidence range based on the same data in this analysis.

Check out [last year’s report](https://whoisnnamdi.com/highest-paid-software-developer/) to see how the numbers changed year-over-year.

## Knowledge (of money) is power

I do this analysis every year because I think it’s vital to understand how developers, **the basic economic unit of software development**, are compensated and rewarded for their efforts.

By the end of this analysis, you will:

-   Enhance your knowledge and understanding of the factors driving software developer earnings
-   See why some software engineers are paid more than others
-   Understand progress on eliminating discrimination in engineering pay
-   Develop an appreciation for how various factors intermingle and interact

I hope this 2020 guide to software engineering pay is valuable to you. The many hours spent conducting and assembling this analysis were certainly valuable to me!

