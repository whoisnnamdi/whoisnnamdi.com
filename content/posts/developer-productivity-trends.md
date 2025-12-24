---
slug: "developer-productivity-trends"
title: "Six Trends Shaping Developer Productivity"
excerpt: "We interviewed developer productivity leaders. Here's what they said."
published_at: "2020-07-14T19:20:44.000Z"
updated_at: "2021-03-11T08:43:05.000Z"
feature_image: "https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766512207729-image-20200714021923342.png"
tags:
  - slug: "founders"
    name: "Founders"
  - slug: "developers"
    name: "Developers"
  - slug: "investors"
    name: "Investors"
meta_description: ""
canonical_url: "https://whoisnnamdi.com/developer-productivity-trends/"
og_title: "Six Trends Shaping Developer Productivity"
og_description: ""
og_image: "https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766512207729-image-20200714021923342.png"
twitter_title: "Six Trends Shaping Developer Productivity"
twitter_description: ""
twitter_image: "https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766512207729-image-20200714021923342.png"
---

Developer productivity is undergoing a tectonic shift. New software development paradigms and tooling have accelerated the pace and productivity of modern software teams, quickening the "shipping speed" of new software.

To dissect these trends, my good friend and colleague, [Clio Smurro](https://www.linkedin.com/in/clio-smurro-31967b9/), and I interviewed founders and executives at next-generation software and infrastructure startups pushing the developer productivity frontier to get their thoughts and insights. They shared their views on:

-   **major industry trends (you are here)**,
-   [top strategic priorities](https://whoisnnamdi.com/developer-productivity-strategic-priorities/), and
-   [biggest challenges and pain points](https://whoisnnamdi.com/developer-productivity-challenges/)

In this first chapter, we share our findings on the important trends shaping developer productivity, including:

-   Trend #1: [Developers have the power... and the purse](https://whoisnnamdi.com/developer-productivity-trends/#trend-1-developers-have-the-power-and-the-purse)
-   Trend #2: [Application security is "shifting left"](https://whoisnnamdi.com/developer-productivity-trends/#trend-2-application-security-is-shifting-left)
-   Trend #3: [The distributed cloud is having its COVID moment](https://whoisnnamdi.com/developer-productivity-trends/#trend-3-the-distributed-cloud-is-having-its-covid-moment)
-   Trend #4: [Remote software development is here to stay](https://whoisnnamdi.com/developer-productivity-trends/#trend-4-remote-software-development-is-here-to-stay)
-   Trend #5: [The growth of Python, Spark, and Big Data](https://whoisnnamdi.com/developer-productivity-trends/#trend-5-the-growth-of-python-spark-and-big-data)
-   Trend #6: [Transfer learning from DevOps to data science and data engineering](https://whoisnnamdi.com/developer-productivity-trends/#trend-6-transfer-learning-from-devops-to-data-science-and-data-engineering)

Want to be notified when we publish part two of our findings? Subscribe below, and we'll also send you a nicely formatted PDF of our research!

<div class="subscribe-form">
<h3 class="subscribe-form-title">Receive my new long-form essays</h3>
<p>Thoughtful analysis of the business and economics of tech</p>
<form action="/api/subscribe" method="POST">
<input type="email" name="email" placeholder="Enter your email" required />
<button type="submit">Go ⚡</button>
</form>
</div>

## Trend #1: Developers have the power... and the purse

![](/content/images/2020/07/dev-power.png)

> "**Buying products that save developer time is no longer an argument you need to explain**. People get it." — Executive, Developer Tools Startup

Software engineers continue to be a scarce resource in most organizations. Companies are increasingly focused on enhancing the productivity of developers. In doing so, power and autonomy flow to developers, and the dollars are quick to follow.

Vendors are reflecting this new reality in their go-to-market positioning and sales efforts:

> "In our sales conversation, **we frame things in terms of productivity and developer time saved**... You're comparing the cost of the product against engineering time saved." — Executive, Developer Tools Startup

Even before sales gets involved, developers are adopting software they need to get their work done on their own, often without the involvement or permission of procurement or upper management. Developers know what they want, the tools they love, and the technologies that enable their ideal architectures and designs.

> "**We're seeing lots of self-serve.** Developers are getting more autonomy as buyers. **Most of our sign-ups are via bottoms-up** — people signing themselves up, after which our sales team eventually reaches out to them." — Executive, Developer Tools Startup

Unlike many other domains of enterprise software, where features are built to appease higher and higher levels of management rather than end users themselves, the core developer experience remains hugely important. If anything, analogous trends in observability and monitoring are developing in a symbiotic rather than antagonistic fashion with developer productivity.

As engineering teams scale, the need for agile workflows becomes apparent, drawing many toward the burgeoning DevOps paradigm and its associated ecosystem of tools. DevOps enables ongoing operation of and rapid iteration on software via Git-based version control, continuous integration, continuous deployment, security testing, and more.

> "DevOps hasn’t been around for long, but more companies are realizing the need/value for it." — Developer Advocate, Application Infrastructure Startup

To the extent that vendors are attempting to appease management, they are doing so by building unified product ecosystems. These enable customers to purchase multiple component tools of the overall software development lifecycle in a single package. While these do carry some benefits for end users, most still prefer to purchase the best solution for each task, again reflecting in influence and clout of individual software developers:

> "GitHub, Atlassian, Microsoft... **They’re trying to get everyone to adopt a unified tool system.** But most people still go with best-of-breed, as far as tools go. The idea though is that some people will eventually go with more of a “you can’t get fired for buying IBM” approach, where you buy everything from a single vendor." — Executive, Application Security Startup

## Trend #2: Application security is "shifting left"

![](/content/images/2020/07/app-sec-left.png)

In past eras, application security was oftentimes dealt with after the fact. Software would be largely complete by the time security analysts had a chance to examine and poke holes in its defenses. In main cases, this might not even happen until after code is already running in production, where any vulnerabilities may have already been exploited by nefarious actors:

> "Once the code is built, the artifact goes into a registry. The security team wants to know...**what are the risks? Is this meeting my policies?**" — Executive, Application Security Startup

No longer. Application security is now a tier one priority in many organizations:

> "Security used to be an afterthought. In the past, someone would write code, someone would deploy code, and then someone else would handle security. **That boundary doesn’t exist anymore.**" — Executive, Developer Tools Startup

Spurred by the rash of high-profile security incidents and gaffes at major corporations around the world, organizations are challenging their development teams to take on more of the security burden upfront, well before software is even ready for production or artifacts have been built. "DevSecOps" is born:

> "**Shifting left means move everything towards the developer.** It doesn't have to be a security person's responsibility to ensure secrets are secure — the developer can do this now too. The more tooling you give, earlier on in the process of writing the application, the easier this is." — Director, Developer Tools Startup

Security vendors continue to sell mostly to security teams but realize their tools are increasingly landing directly in the hands of developers themselves:

> "We don't sell to developers, we sell to security teams...but at the end of the day, **it’s the developers who need to take more upfront responsibility for security.**" — Executive, Application Security Startup

It's easy to think these new tools are only valuable to large enterprises paranoid about breaches, hacks, and other threats to application security. Not true, say some of the security leaders we spoke to, who emphasized that the heightened focus on security is reverberating through the software development industry, at both large organization and small:

> "These security initiatives are not just for big companies...**every company needs them**." — Executive, Developer Tools Startup

Then there's the concept of "low trust" or even "no trust", where applications do not give each other the benefit of the doubt and every app must prove its credentials in order to send and receive requests and data from other apps and microservices. This adds new complexity to software development, heightening the important of thinking through security implications early on in development:

> "In low trust or no trust environments, how do you make sure applications can talk to each other?" — Executive, Developer Tools Startup

These complexities are inevitable, but vendors also know there are limits to developer patience. They are keen to insert security tooling into workflows as seamlessly as possible. Usability drives usage — if a tool is to difficult to use or increases cycle times too dramatically, developers won't use it, defeating the purpose entirely:

> "DevOps folks are often not security experts. **They’re looking for usability.** How easy is this to access? Does it fit in our existing workflows? Can it plug into [Jenkins](https://www.jenkins.io/)? I don't want my developers having to use a new tool." — Executive, Application Security Startup

As development and security increasingly merge, buying patterns and processes will incorporate the needs of both stakeholders, and vendors will need to adjust their tactics appropriately:

> "**DevOps needs to like it, SecOps needs to buy it**. Both are involved in the purchase process." — Executive, Application Security Startup

## Trend #3: The distributed cloud is having its COVID moment

![](/content/images/2020/07/distributed-cloud.png)

Demand for distributed computing is growing and that demand has only surged in the COVID era.

> "**COVID has caused a 2-3 year acceleration in everyone's journey to the cloud.** The companies who have survived and thrived are the ones which evolved sooner." — Executive, Developer Tools Startup

Elastic scaling of compute, storage, and other resources is important in a divergent set of scenarios. Some businesses (Zoom, Fastly, Amazon, Instacart, etc.) have seen demand for their services surge, requiring rapid scale up of existing deployments, assisted by prescient decisions to factor applications into microservices.

On the other hand, certain companies have seen business dry up overnight. This makes the ability to scale down equally important, allowing costs to flex proportionately with revenue:

> "Do only what's needed. That's key for dynamic shifts in needs. **You need to design software for scaling up, but the infrastructure also needs to be able to scale down**." — Executive, Developer Tools Startup

But what if your business runs on legacy applications or infrastructure technologies? You're in a much tougher position, which is prompting many organizations to ask the question — can you accelerate developer productivity within legacy application development?

> There's a lot of legacy .NET applications from 10 years ago that weren't originally built with containers. Organizations want to get those into containers. A question people are asking — **can you get developer productivity with legacy applications too?** — Executive, Application Security Startup

Increasingly, the answer is — yes. Legacy applications are being refactored from monolithic to microservices-based architectures, leveraging the power of containers and other associated advancements:

> "We are seeing a movement from cloud "greenfield", only using the cloud for new applications, to "lift and shift", getting legacy applications into containers and into the cloud. We've started working with Windows-based containers." — Executive, Application Security Startup

While old-school organizations and engineering teams play catch up, next-gen startups and technology companies aren't waiting around.

> "**The biggest trend right now is the move to serverless** — functions as a service, hiding more complexity from developers. Serverless is a way for developers to just focus on stateless applications, to just focus on what they use most directly." — Executive, Application Infrastructure Startup

Serverless has emerged as a major trend. Leveraging the "infinite" scalability of the major cloud providers, serverless promises to decompose applications into a series of function calls — without regard to the underlying infrastructure.

While the cloud providers have always had a clear incentive to push such a regime, it seems like development teams themselves are warming up to the idea, thought it's full realization is still years away:

> "At our company, we talk about nodes and clusters today. We think of elastic pools of storage and compute that you can just use. But, **a few years from now, we won't even be worried about literal nodes and clusters**." — Executive, Application Infrastructure Startup

## Trend #4: Remote software development is here to stay

![](/content/images/2020/07/remote-development.png)

In conducting our interviews, we were struck at how little COVID had affected the productivity of most software development teams. Perhaps we had a biased sample (we mostly spoke with startups), but the near-universal response was that the move to mandatory remote work had been relatively smooth. Many already had significant portions of their development teams working remotely, which helped to ease the transition.

Further, many had seen little disruption in their go-to-market efforts, given their focus on selling to developers who had themselves seen little interruption in their work.

If it is true that at least some teams and organizations can be nearly as productive working remotely as in-person, we may see some aspects of this new work paradigm stick around long after COVID subsides.

> "The shift to working remote is happening... It's month three of the new normal, and I think **there will be long-term changes as a result of this**." — Executive, Developer Tools Startup

Software developers who enjoy this new style of work may have other reasons to rejoice too. [As I've previously written about](https://whoisnnamdi.com/remote-software-developers-earn-more/), developers who work remotely earn up to 22% more than developers who don't. Of course, as with many aspects of a _forced_ transition to remote work, it's not clear whether this result applies when organizations had no choice about the move.

## Trend #5: The growth of Python, Spark, and Big Data

![](/content/images/2020/07/python-spark-big-data-growth.png)

> "From our perspective, **Python is winning**, and we see that trend continuing." — Executive, Data Science Startup

Teams love Python for its ease-of-use and rapid time-to-value even for relatively non-technical individuals, who can quickly get up to speed with the language and generate value output:

> "**It’s easy to learn….people can learn it in 8 weeks and then be useful in a Fortune 1000 company**." — Executive, Data Science Startup

In addition to its user-friendliness, Python is revered for its ecosystem of packages for tackling difficult data science challenges and processing large data sets.

Speaking of large data sets, after much hype and suspense, Big Data has finally arrived and is a major driver of Python's massive popularity:

> "Big Data is not just trendy anymore, but **it’s actually happening now**. Not like 5 years ago when it was first hyped." — Executive, Data Science Startup

These large datasets are increasingly shifting to the cloud, where various storage offerings from S3 to Snowflake and more have proliferated, offering no shortage of options at competitive prices for various performance levels and data access frequencies. Leaders agree that Python is the preeminent language for handling data in the cloud:

> "We are seeing a shift to the cloud, and **Python is dominant for data in the cloud**." — Executive, Data Science Startup

However, having been conceived well before the microservices revolution or the cloud generally, Python out-of-the-box does not come with much distributed computing functionality, though multiple vendors and technologies have arisen in recent years to cover this gap ([Dask](https://dask.org/), [Ray](https://ray.io/), etc.):

> "Python... is the fastest growing language and very popular, but **Python has no distributed functionality**." — Founder, Application Infrastructure Startup

Have no fear though, [Spark](https://spark.apache.org/) is here!

Spark bills itself as "a unified analytics engine for large-scale data processing", which in layman's terms mean it's very, very fast — fast enough to handle large datasets at high throughput. Spark is built from the ground up with distributed computing in mind, enabling it to take advantage of the advancements in cloud computing we discussed above. Spark also offers a number of high-level operators that enable interoperability with more popular languages like Python, SQL, Java and more.

> "Big data development cycles used to take forever, not fast enough for software developers. **Spark has meaningfully sped up the cycles**." — Founder, Data Science Startup

## Trend #6: Transfer learning from DevOps to data science and data engineering

![](/content/images/2020/07/devops-dataops-mlops.png)

Historically, data science has not had the emphasis on fast iteration and development cycles that DevOps has had. When merged with traditional software engineering, this is less of a problem. But as data science as a practice gains clout, data science professionals are being carved out into their own teams. While this comes with certain benefits, it often comes at the cost of speed:

> "Data science is now being carved out of development teams, and the data-related development cycles have elongated." — Founder, Data Science Startup

Additionally, data science is only becoming more complex. Data engineering has emerged as a key component of the overall data science lifecycle and, while less sexy than building and training the latest deep learning models, is often the phase that takes the longest in any given project. Many consider it to be an entirely different skill set from core data science. ETL (Extract, Transform, Load) tooling is just one example:

> "Let's look at the problem of managing ETL pipelines. There are actually two pieces — the ETL pipeline that transforms the data, and the pipeline that manages the ETL pipeline itself." — Executive, Data Science Startup

DataOps and MLOps are the response to these complexities and speed bumps, bringing best practices from DevOps to the realm of data science and machine learning:

> "DataOps and MLOps bring DevOps principles such as agile development to data and machine learning." — Founder, Data Science Startup

Instead of being crushed under the weight of increasingly intractable datasets and data engineering puzzles, DataOps and MLOps help data scientists and engineers better wrangle the data development process itself and achieve business outcomes with the same agility as traditional software development:

> "We're big on DevOps and the empowerment of the data scientist and data engineer. **They should have control over the end-to-end process.** Whoever is the creator is also the person who’s responsible for the ongoing success of the artifact." — Executive, Data Science Startup

DataOps and MLOps are opening new possibilities for data and model version control, machine learning feature engineering and storage, and more. Think unit or regression tests, except for datasets and machine learning models:

> "In GitOps, the continuous integration / continuous delivery / continuous deployment pipeline checks the code and deploys the application to a staging environment, eventually ending up in production. Most tech-forward companies have adopted that now. **We want to bring that to the data scientist**." — Founder, Data Science Startup

The grand vision? Driving efficiencies that will enable teams and organizations to keep up with the growth of Big Data:

> "**The trend toward DataOps will be big.** It'll make organizations more efficient." — Executive, Data Science Startup

## Conclusion

Developers are increasingly considered one of the most important constituencies within organizations. Organizations both old and young are generating and consuming greater amounts of software, and developers remain the basic economic unit of software production.

As the scarce input of the software production function, software engineers don't come cheap, and it's therefore critical to maximize their productivity and output. As software grows only more powerful, valuable, and essential, anything that makes software engineers more productive will be similarly potent and relevant.

Be informed of our next publication in this series, the **top strategic priorities of developer productivity companies**, by entering your email below:

<div class="subscribe-form">
<h3 class="subscribe-form-title">Receive my new long-form essays</h3>
<p>Thoughtful analysis of the business and economics of tech</p>
<form action="/api/subscribe" method="POST">
<input type="email" name="email" placeholder="Enter your email" required />
<button type="submit">Go ⚡</button>
</form>
</div>