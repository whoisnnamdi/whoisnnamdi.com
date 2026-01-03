---
slug: "the-growth-share-matrix-of-software-development"
title: "The Growth-Share Matrix of Software Development"
excerpt: ""
published_at: "2018-11-22T23:45:00.000Z"
updated_at: "2021-06-24T18:59:04.000Z"
feature_image: "https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766512163462-growth_share_matrix_no_title.png"
tags:
  - slug: "developers"
    name: "Developers"
meta_description: ""
canonical_url: "https://whoisnnamdi.com/the-growth-share-matrix-of-software-development/"
og_title: "The Growth-Share Matrix of Software Development"
og_description: ""
og_image: "https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766512163462-growth_share_matrix_no_title.png"
twitter_title: "The Growth-Share Matrix of Software Development"
twitter_description: ""
twitter_image: "https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766512163462-growth_share_matrix_no_title.png"
---

**Human capital is our greatest asset.**

Like financial capital, [the all-powerful force of compound growth](https://whoisnnamdi.com/you-dont-understand-compound-growth/) means that a small difference in the rate of skill acquisition over time can lead to massive differences in career outcomes.

Choosing which skills to hone is therefore one of the most important keys to professional growth and success in any arena.

Among various forms of human capital, **technical aptitude** is quickly becoming **the** mission-critical skill for 21st century knowledge work.

However, there are any number of technologies that one could dive deep into and attempt to master, with varying usefulness and practical applicability.

**So how does one decide where to "invest" among a sea of options?**

A mental model I've found surprisingly helpful for this task is the [growth-share matrix](https://www.economist.com/news/2009/09/11/growth-share-matrix), a framework concocted 50 years ago by the Boston Consulting Group.

The framework was originally conceived as a tool to help executives prioritize different business units based on their respective relative market shares and growth. The two dimensions separate the market landscape into quadrants, each with certain characteristics:

-   Stars (High Growth / High Share)
-   Cash cows (Low Growth / High Share)
-   Question marks (High Growth / Low Share)
-   Dogs (Low Growth / Low Share)

BCG advised clients to invest in the stars, exploit the cows for their cash flow, evaluate the potential of the question marks, and exit or sell the dogs ASAP.

The growth-share matrix was originally intended to apply to product lines or business units - an asset a corporation could _own_. In that respect, you might imagine this framework has limited applicability to programming languages, given no single person "owns" any given language.

Not so fast!

I argue that we each _do_ own a little piece of a programming language, not in the form of equity or stock, but in the form of **human capital**.

Through careful curation of a "portfolio" of useful skills, we earn a return on our learning efforts - rewards for our time and effort.

Learning a programming language is a _perfect_ example of this.

But what makes a programming language _useful_?

**The value of any given programming language is a direct derivative of the number of other individuals who know that language and the number of companies using that language to develop and ship products.**

That may sound obvious to some, but it is in fact quite counter-intuitive.

In most of life's skills we seek to master the rare things - the things no one else can do. We think that by differentiating ourselves through a unique set of talents we will shine brighter in an increasingly competitive world. Learning that which is rare will pay meaningful dividends, so the thinking goes.

While yes, knowing an obscure language that few others have familiarity with might carve out a nice niche in the market for you to charge highly for your rare talents, I would argue that, for most, it is actually _more_ valuable to know a language that **lots of other people also know**, rather than one only a few have ever worked with.

Most people think that programming is how you speak to _computers_. Really, it's how you speak to **other developers**.

Due to network effects and the increasing size, scale, and scope of software development projects and teams, knowing the "[lingua franca](https://en.wikipedia.org/wiki/Lingua_franca)" is **much more** valuable than being an expert in some endangered language, soon to be discarded to the trash bin on the desktop of history.

Paradoxically, having low _personal_ market share in a high market share _language_ is actually not such a bad thing.

## Building the Matrix

![Matrix movie still](https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjExNzczfQ&s=59773981c4a4762fe474590959ddf064)

To construct the growth-share matrix for programming languages, we will leverage StackOverflow's [annual developer survey](https://insights.stackoverflow.com/survey/). For the [2018 edition](https://insights.stackoverflow.com/survey/2018/), they surveyed over 100,000 developers from around the world, covering a wide range of topics from job satisfaction to salary. Here we'll focus on US-based developers.

The key question for our purposes is:

> "Which of the following programming, scripting, and markup languages have you done extensive development work in over the past year?”

Answers to this question should give us a rough proxy of the popularity of any given language, as defined by the proportion of developers who have worked with a particular language.

For growth, we can compare the answers to this question across 2017 and 2018 to come up with an estimate of the growth of each language. We'll define growth as the % growth rate of the proportion of respondents who've worked with the language in the past year. So, a language that went from 10% coverage to 13% would be considered to have grown 30% (rather than 3 percentage points).

Quadrant boundaries will be set at the median growth rate and relative market share.

One final piece - as is convention with the growth-share matrix, we will show market share relative to the language with the most market share. Therefore, the axis will end at 100% (representing the most popular language). We will also show this on a log scale to better showcase the distribution, which tends to be quite crowded below 10% relative market share.

We now have all we need to build our growth-share matrix!

## Inside the Matrix

Take a look at the results:

![](/content/images/2018/11/growth_share_matrix-3.png)

One striking feature that immediately jumps out - very few languages saw a net decline in popularity. **Almost every language grew**, which by definition implies that the average developer is using an increasingly wide array of languages in their work.

Let’s spin through each quadrant and discuss some of the highlights.

<div class="subscribe-form">
<h3 class="subscribe-form-title">Receive my new long-form essays</h3>
<p>Thoughtful analysis of the business and economics of tech</p>
<form action="/api/subscribe" method="POST">
<input type="hidden" name="merge[SOURCE]" value="Top: The Growth-Share Matrix of Software Development" />
<input type="email" name="email" placeholder="Enter your email" required />
<button type="submit">Go ⚡</button>
</form>
</div>

## Stars

![pink star ornament decor](https://images.unsplash.com/photo-1481015172496-8cfcb0d85e59?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjExNzczfQ&s=c67577076a4f8934b61e78fa16a91909)

**_Python_** _-_ [Python has existed for decades](https://en.wikipedia.org/wiki/Python_\(programming_language\)) but only recently hit its stride as a go-to language for data analytics and machine learning use cases. Python is widely-regarded as one of the best languages for data-driven analysis given its relative ease of use and massive set of open source libraries that simplify and accelerate analytics. Python's syntax is quite simple compared to other languages. Ease of use and speed are especially important in data science, as data scientists often run and re-run numerous iterations of a model before settling on a preferred specification. The growing popularity of interactive and replicable computing environments like Jupyter notebooks dovetails nicely with Python's surging share among developers. I'm personally quite pleased to see Python's high popularity given I've spent the past 2 years self-teaching myself the language!

**_Ruby_** _-_ Ruby has historically been known for its extreme ease of use and strength within web development. Many a web developer wrote their first web app in Ruby. [The Ruby on Rails framework](https://rubyonrails.org/) only extended this user-friendliness further, making Ruby incredibly popular among developers who want a no-frills way to quickly develop and deploy functional web applications. For several reasons however, Ruby's growth is slowing and has been for a few years now. [No, Ruby is not “dead”](https://www.techrepublic.com/article/the-death-of-ruby-developers-should-learn-these-languages-instead/), but it will likely migrate to the cash cow zone soon as the initial fanfare wears off. Ruby continues to be a great language that serves developers well.

**_Go_** _-_ A new language seeing [rapid adoption](https://medium.com/@kevalpatel2106/why-should-you-learn-go-f607681fad65) among developers, Go simplifies the process of writing code, thereby making developers more efficient. Go was initially birthed at Google, where technical teams were trying to solve engineering problems that only seemed to be multiplying in an era of increasingly large codebases, multicore processors, and network-aware applications. Go is built with concurrency in mind, making it relatively easy to build multi-threaded applications. Outside of Google, major companies making use of Go include Uber, Netflix, Adobe, IBM, Intel, Dropbox, CloudFlare, and more.

**_TypeScript_** _-_ I debated including TypeScript as its own language here given its strong similarities to and overlap with JavaScript, but developers with experience in the language seem to be a distinct group worth highlighting. The language has also seen a [surge of growth](https://thenewstack.io/typescript-getting-popular/) in the past few years. The fundamental goal of TypeScript is to ease development of large-scale applications that would otherwise be written in vanilla JavaScript. Accordingly, TypeScript is a superset of JavaScript that also compiles to simple JavaScript. Why the distinction then? Typescript adds a number of features to core JavaScript common to other languages, such as classes and modules, in addition to strong typing, generics and interfaces. TypeScript is developed and maintained by Microsoft.

**Takeaway** - These languages are highly popular and would constitute a solid foundation any budding developer or product manager. If you don't already have basic proficiency in at least some of the stars - I implore you: **learn these growing tools of the trade**.

## Cash Cows

![black and white dairy cow on green grasses during daytime](https://images.unsplash.com/photo-1446126102442-f6b2b73257fd?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjExNzczfQ&s=7147b447746e0bd07fed39b36de70c9a)

**_JavaScript_** _-_ [JavaScript has become the go-to language](https://www.simplytechnologies.net/blog/2018/4/11/why-is-javascript-so-popular) for modern web development, with a number of [spin-off frameworks](https://raygun.com/blog/popular-javascript-frameworks/) that leverage its core elements. JavaScript is more popular than Java today, due to the ubiquity of web applications today and the move SaaS and other web-based models for application consumption. Here, JavaScript is leading the charge, and the numbers reflect that. However, it should be noted that, despite similar nomenclature, [Java and JavaScript are not closely related](https://www.geeksforgeeks.org/difference-between-java-and-javascript/) (it's a long story). Both are object-oriented, but the similarities end there.

**_Java_** - Java has long been a popular language for cross-platform development, and this flexibility has continued as new platforms have emerged, such as mobile. One of Java's many conventions is the idea of "[write once, run anywhere](https://en.wikipedia.org/wiki/Write_once,_run_anywhere)", meaning that code written in Java can be run on any other platform that supports Java with no recompiling. When complete, Java applications are compiled into [bytecode](https://en.wikipedia.org/wiki/Bytecode) which runs on a Java Virtual Machine. Originally built by Sun Microsystems, through acquisitions it's ended up in the hands of Oracle today.

**_SQL_** _-_ SQL (Structured Query Language) is an old workhorse that needs no introduction. It has existed for quite some time and is the main means by which analysts query and pull data from relational databases and data warehouses. Despite the popularity of “[NoSQL](https://www.mongodb.com/nosql-explained)” and other non-relational frameworks, [SQL remains king](https://raygun.com/blog/popular-javascript-frameworks/), and in recent years many of these other frameworks have bolted on SQL-like interfaces in order to ease data extraction and transformation. As companies collect data from a greater range of diverse sources and continue to store this information in central databases, SQL will only increase in importance.

**_The C Family_** _\-_ No big surprise here - the extended family of C languages has held a strong position within the software development community for some time and continues to serve as the backbone for many critical applications we know and love today. Further, C has found its way into other languages as well. For example, the reference implementation of Python, CPython, is written in C and Python, and significant chunks of the core Python codebase are actually written in C due to it being a compiled (rather than interpreted) language and thus having faster performance at runtime. [C is a hugely influential language](https://stackify.com/popular-programming-languages-2018/) that will not be going away any time soon.

**_PHP_** _-_ PHP lands squarely in the cash cow category. PHP is a server-side scripting language primarily suited for web development, as evidenced by its original meaning of “personal home page". [Numerous popular websites and web applications are built on PHP](https://en.wikipedia.org/wiki/Programming_languages_used_in_most_popular_websites), including, perhaps mostly famously, WordPress. However, the language has stagnated in terms of popularity, in part to due to its [clunkiness](https://eev.ee/blog/2012/04/09/php-a-fractal-of-bad-design/) and security vulnerabilities, where PHP has historically suffered from a number of severe exploits (ex: [SQL injection](https://en.wikipedia.org/wiki/SQL_injection)). That said, this is another language with incredible market share that will continue to see broad use for quite some time.

_**Swift**_ - The popularity of Swift derives directly from the underlying popularity of macOS and iOS devices which, though a minority of overall smartphone shipments, represents a massive install base, especially among more affluent western populations. Launched in 2014, Swift initially saw massive growth, [becoming one of the fastest growing languages in history](https://9to5mac.com/2018/03/09/swift-ranking-programming-languages/). Swift is heavily influenced by Objective-C, another cash cow, which it recently surpassed in popularity. As the brainchild of Apple, Swift will live or die by Apple's own success, so plan accordingly.

**Takeaway** - These languages really pay the bills. If you are already proficient in any of the above languages, great, leverage that saved time to pick up some skills in the rising stars. If you do not know these languages well today, evaluate how practical / necessary they are for the specific set of projects you want to work on now or in the near future.

<div class="subscribe-form">
<h3 class="subscribe-form-title">Receive my new long-form essays</h3>
<p>Thoughtful analysis of the business and economics of tech</p>
<form action="/api/subscribe" method="POST">
<input type="hidden" name="merge[SOURCE]" value="Bottom: The Growth-Share Matrix of Software Development" />
<input type="email" name="email" placeholder="Enter your email" required />
<button type="submit">Go ⚡</button>
</form>
</div>

## Question marks

![question mark neon signage](https://images.unsplash.com/photo-1484069560501-87d72b0c3669?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjExNzczfQ&s=8248324d302ce16e516054824000b147)

**_Rust_** _-_ Rust is a relatively new programming language that only appeared on the scene in the last decade. While Rust is technically a general-purpose language, due to its low-level nature, it is best used for embedded systems running close to bare metal. Comparisons are often made between Rust and C++, in part driven by their syntactic similarities. [Rust is often known to create enthusiastic fans among its users](https://medium.com/mozilla-tech/why-rust-is-the-most-loved-language-by-developers-666add782563). Though far from being one of the more popular languages, it is truly loved by the people who use it most. Development on Rust is quite active today, ensuring the language will stay on the bleeding edge for the foreseeable future.

_**Scala** -_ Like Go, Scala is language oriented towards improving developer productivity. The name Scala is a portmanteau of "scalable" and "language", which hints at original intent of the language to enable high performance of large-scale applications and userbases. Scala is built on JVM and JavaScript runtimes and combines elements of object-oriented and functional programming. Due to these strong connections, Scala is often seen as "next-gen" Java. Scala is uniquely suited for parallel and distributed computing, providing a level of future-proofing that many legacy languages lack. Though popular among a certain subset of developers, its growth appears to have [prematurely slowed](https://dzone.com/articles/the-rise-and-fall-of-scala) relative to languages like Go or Rust. Its boosters hope that Scala may one day overtake Java, but this won't happen for some time, if ever.

_**R**_ - R slightly missed the cutoff for star status, but given its incredible ~40% growth rate the language will easily cross the boundary next year. R is exploding in popularity for the same reasons as Python, though [most consider Python to be relative winner](https://www.datacamp.com/community/tutorials/r-or-python-for-data-analysis) in terms of speed, ease of use and general applicability. R's historical strength in data science and statistical analysis is now powering a major renaissance for R. Enthusiasts celebrated [R's 25th anniversary](https://blog.revolutionanalytics.com/2018/08/r-generation.html) earlier this year, and with the helpful tailwind of data science, the language shows no signs of slowing down.

_**Haskell**_ - Function over form, or in the case of Haskell, have both. Haskell is a [purely functional](https://en.wikipedia.org/wiki/Purely_functional_programming) programming language, meaning that the language focuses on functions that take immutable values as input and produce the exact same output every single time. It's also [lazy](https://en.wikipedia.org/wiki/Lazy_evaluation), which simply means results are not evaluated until absolutely necessary. These and other features make Haskell a very powerful and efficient language in the right hands but also potentially limit its applicability. Haskell's cult following is growing rapidly from its small base, but it's hard to say how long this will continue.

**Takeaway** - They're called _question marks_ for a reason. No one really knows how the future will play out for these emerging technologies. They are probably not worth betting the farm on today, but they are also prime candidates for becoming the next "must-know" tools among forward-looking dev teams. Keep an eye on them.

## Dogs

![](/content/images/2018/11/doge.jpg)

**_Visual Basic (All Flavors)_** \- VB.NET, VBA, VB6 - whichever your flavor, the Visual Basic ecosystem has clearly fallen from grace. VB.NET is one of only two languages in the growth-share matrix to actually lose share in 2018. [Significant chunks of VB's functionality exist in C# now](https://arstechnica.com/information-technology/2017/02/microsofts-developer-strategy-c-for-fancy-features-visual-basic-for-beginners/), and Microsoft's stance towards the languages has not been 100% clear, having gone from originally planning to end support for the language in 2008 to recently declaring that [Windows 10 will support the VB runtime](https://docs.microsoft.com/en-us/previous-versions/visualstudio/visual-basic-6/visual-basic-6-support-policy) for the lifetime of the OS. This is great for legacy applications built using Visual Basic, but these will inevitably need to be rewritten in a modern language or be end-of-lifed.

**Takeaway** - Unlike real dogs, dogs within the growth-share matrix are bound to be controversial. Developers and development teams need to seriously grapple with the current state of affairs these languages face and whether or not it's advisable to spend significant time and resources building applications powered by these less popular languages.

## (Human) Capital Allocation

![person holding pen](https://images.unsplash.com/photo-1523006520266-d3a4a8152803?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjExNzczfQ&s=fc3154037ad3cd02837b7591d6dc1424)

The moral of the story - **think critically about where to invest your time**.

To be clear - it’s not the end of the world if you pick the “wrong” language. In fact, there really aren’t any wrong choices here, even the "dogs". **Use the best tool for the job.** However, it certainly helps to avoid the transition costs inherent in trying to reposition oneself or play catch up later on.

If anything, don’t try to reposition yourself _per se_, but rather, seek to enhance your overall value and breadth of capabilities by acquiring at least intermediate mastery in several different languages. Again, similar to spoken languages, people who can converse in multiple valuable languages often gain disproportionate value from their learning efforts, which tend to [compound on one another](https://whoisnnamdi.com/you-dont-understand-compound-growth/), especially when learning the basic features which form the building blocks of many dialects.

Remember, this mental model, though imperfect, is arguably flexible enough to accommodate many skills, _not just programming_.

I hope this framework is useful to you as you decide where to grow your human capital as a technically savvy individual.

_You can find the full backup to this analysis in both Jupyter notebook and .py script format at my [GitLab](https://gitlab.com/whoisnnamdi/growth-share-matrix) or [GitHub](https://github.com/whoisnnamdi/growth-share-matrix)._

_This post has been published on [www.productschool.com](http://www.productschool.com) communities_