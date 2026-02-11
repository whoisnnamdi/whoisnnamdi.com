---
slug: "ai-benchmarking-broken"
title: "AI Benchmarking Is Broken"
excerpt: "We should take AI models seriously, which means taking their evaluation seriously"
published_at: "2024-05-28T13:29:17.000Z"
updated_at: "2024-05-30T05:40:31.000Z"
feature_image: "https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766512303112-header-ai-benchmarking-broken.jpg"
tags:
  - slug: "founders"
    name: "Founders"
  - slug: "developers"
    name: "Developers"
meta_description: ""
canonical_url: "https://whoisnnamdi.com/ai-benchmarking-broken/"
og_title: "AI Benchmarking Is Broken"
og_description: ""
og_image: "https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766512303112-header-ai-benchmarking-broken.jpg"
twitter_title: "AI Benchmarking Is Broken"
twitter_description: ""
twitter_image: "https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766512303112-header-ai-benchmarking-broken.jpg"
---

_To celebrate [Patronus AI’s $17M Series A](https://www.patronus.ai/blog/announcing-our-17-million-series-a), I wanted to share some thoughts on the current state of AI benchmarking._

Imagine a standardized test that works like this:

-   The questions and answers are freely available on the public internet
-   Cheating is not regulated, it’s a 100% honor system
-   The exam never changes, it’s the same questions every time
-   Scores on the exam seem to be getting better every year

In case you’re wondering, the correct reaction is “this is not a very good exam.” Cheating is rampant. The answers can all be memorized. The test isn’t really much of a “test.” The scores are meaningless.

This is the current state of AI benchmarking. Ironically, we hold AI benchmarks to a very _low_ standard. We allow practices that would never fly in other serious domains. It’s happening in plain sight, with a nod and a wink every time an AI lab releases a new model that tops the leaderboards.

We must do better.

## Something’s in the water

![training-data-contamination](https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766516274212-training-data-contamination.jpeg)

The first dirty secret of AI benchmarks is quite literally, dirty: **training data contamination**.

A common refrain among machine learning researchers and engineers — “don’t train on the test set.” In other words, don’t train a model on the same dataset that you will evaluate it on. If you do, whether on purpose or not, that particular test is useless for evaluating model performance.

Most open benchmarks are available on the public internet. In other words, the entire set of questions and answers exists on the open web, likely in multiple places. It is extremely easy for this data to inadvertently make its way into LLM training pipelines. The big AI labs are constantly hoovering up data from the internet via web crawlers, scraping their way across the web. While diligent researchers are careful about what ends up in the training data, applying all sorts of sophisticated filters to the raw data before feeding it to their models, invariably these filters are imperfect, and data from the benchmarks leaks in. It can happen during pre-training, it can happen during fine-tuning, either way, the bad data gets in. This renders invalid the downstream model performance on the benchmark.

The test data from a particular benchmark can appear in many places. It could be in plaintext on a webpage somewhere. It could be a file in a GitHub repo, alongside code which a model is being trained with. It could be in the _comments_ of a file or script inside of a repo. It could be on Reddit or X. It could really be anywhere.

> An increasingly important issue with evals is test set contamination. After the creation of a good eval, examples of the eval tend to get propagated into various places in the internet, like arxiv papers, ChatGPT examples, or reddit — [Jason Wei, OpenAI](https://www.jasonwei.net/blog/evals)

It’s been shown that a single training example can meaningfully impact the behavior of a model, so it only takes one mishap to contaminate a model. Model builders routinely train on trillions of tokens, so there’s no shortage of ways for accidents to occur.

You might wonder, if the entire benchmark makes its way into the training data, then why don’t the models score perfectly on the benchmarks? Remember, these models are complicated mathematical functions of the data — they are optimizing for all sorts of criteria that we don’t fully understand ([though we’re making progress](https://www.anthropic.com/research/mapping-mind-language-model)) and have been trained on vast sums of data, so any particular benchmark represents a very small share of the overall training corpus. A model trained on a particular dataset will fail to reproduce that data at times. This complex and non-deterministic mapping of inputs to outputs is arguably the distinguishing feature of LLMs relative to traditional machine learning models. So we shouldn’t necessarily expect to see perfect benchmark performance even in the most blatantly contaminated scenarios.

## It’s not what you think

The next time you hear about how a new model crushes some well-established benchmark, take a moment to actually go to the primary source and review the tasks in the benchmark. Pick any of them, it doesn’t really matter which. I would bet that, even as a non-specialist, you will very quickly begin to question whether the benchmark is really testing what it claims to test.

Sometimes this is subtle; sometimes it’s not. Many AI coding benchmarks have fairly trivial solutions that don’t require meaningful code understanding or “intelligence.” Many “reasoning” benchmarks don’t require any reasoning.

Again, don’t take my word for it — I encourage you to, right now, read through a few examples from the many published benchmarks, and see what you think about the concepts they are purportedly testing. **You will be less than impressed**, and you will leave the exercise with a much reduced opinion of and trust in the performance of the latest and greatest models.

This also relates to my point earlier about contamination, which is especially pernicious in the software development domain. Many “brain twister” coding tasks are well-represented in the training data for these models, in part because software developers spend so much time preparing for such questions as part of job interviews. Coding competitions abound, which can serve as a signal to employers of an engineer’s talent and skills. Their competition code often ends up on the public internet, where it gets picked up by training data crawlers.

At test time, the model has already seen the question, perhaps in slightly modified form, and has memorized the answer. It’s not right to say a model regurgitating some code from some repo is “reasoning” about software development. It’s much more akin to an engineer getting stuck and looking up some code on Stack Overflow, pasting it into their editor, and moving on.

There’s nothing wrong with a “Stack Overflow bot”! I would and do pay for such things. I just think we need to be very careful and specific about what we call it.

## Teaching to the test

Critics of standardized tests often complain they encourage teachers to “teach to the test”, focusing exclusively on material that will improve their students’ performance on the test but that perhaps misses other information valuable to their overall edification as human beings and citizens. I think this critique has bite to it in the context of AI models.

Here’s why. [Kaggle](https://www.kaggle.com/) is the most famous competition platform for machine learning practitioners. They hold frequent competitions where the goal is to build a machine learning model that can generate accurate predictions in a particular context based on provided (or otherwise procured) inputs. A key feature of Kaggle competitions is the [public leaderboard](https://www.kaggle.com/docs/competitions#leaderboard) — the real-time ranking of submitted models on a “validation” dataset that only Kaggle has access to. Thus, they avoid the problem of data [leaking](https://www.kaggle.com/docs/competitions#leakage) into the training set.

However, as is well-known among Kagglers, this “one weird trick” doesn’t solve all problems. After some time, the competition closes, at which point every model is re-evaluated on a previously closed “test set”, the scores for which make up the “private leaderboard”. It is extremely common for the “best” model from the public leaderboard to fall a few places in the rankings on the private leaderboard and for another model to rise to the top. In fact, this happens so often that being in 1st place going into the final evaluation can often be a source of stress rather than relief, since you know there’s some risk you’ve “[overfit to the public leaderboard.](https://www.kaggle.com/docs/competitions#leaderboard)”

> Many users watch the public leaderboard closely, as breakthroughs in the competition are announced by score gains in the leaderboard. These jumps in turn motivate other teams working on the competition in search of those advancements. But it’s important to keep the public leaderboard in perspective. It’s very easy to overfit a model, creating something that performs very well on the public leaderboard, but very badly on the private one. This is called overfitting.

Even though your model never saw the validation data directly, you did see its _score_ on the data. That score is a noisy proxy for the data itself, so anything you do to improve the score implicitly leverages features of validation data, even if you never saw data directly. Since that score influenced the techniques and tricks you employed during model training, there’s a sense in which the validation data did “leak” into training.

You’ve effectively “taught to the _practice_ test”. And as anyone who’s experimented with the materials of various test prep providers, _practice_ tests can differ meaningfully from the _actual_ test.

The same risk applies to most AI benchmarks, which are the “public leaderboard” of AI evaluation. At any point during the training process, researchers can check their models against the benchmark to see how it’s doing and ensure that performance is moving in the right direction. Benchmark performance isn’t a “surprise” at the end of a training run. It’s the same with Kaggle contests — contestants can always check their performance via the public leaderboard. This creates perverse incentives to only do things that drive direct improvement on the benchmarks, leading to overfitting, the curse of all machine learning practitioners.

Again, if you want some intuition, think about the education context. Imagine if teachers knew in real-time how their students would perform on the test — a score every day of class rather than one a year. Whatever concerns you have about teaching to the test, you should be only more concerned if teachers had a real-time view of their students’ test performance. The dopamine rush of seeing those scores bob up and down every day would drive an even more myopic focus on test performance. Anything a teacher could do to drive up those scores, even if it meant rote memorization of facts, would be extremely tempting. This is the world we live in when it comes to AI benchmarking.

There’s a balance we must strike. To the degree the test actually tests what you think and hope it does, it makes sense to “teach to the test”, assuming it’s actual learning and not just coerced memorization. However, if the test isn’t perfectly correlated with the true objective, these efforts can drive perverse behaviors in both the teachers (trainers) and students (models).

## Closed source benchmarks

![closed-source-benchmarks](https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766516265094-closed-source-benchmarks.jpeg)

[I’m a big fan of open source](https://whoisnnamdi.com/portfolio/) when it comes to software. I’m a big fan of closed source when it comes to standardized testing.

Open benchmarks have an important role to play, and **I don’t think we think we should dispose of them.** A common basis of comparison that is open access, that we can all inspect and contribute to, is certainly valuable. But we also need to round out the ecosystem with **closed, private benchmarks**, a critical complement.

Just like in the world of standardized testing, private benchmarks would need to establish themselves as standard-bearers for quality, which requires building up trust with the broad community. In a competitive market where end users of these models really do care about quality and performance, benchmark providers will sprout up and compete for their business, jostling for position as the ultimate arbiter of model performance. In the limit, _the benchmarks will be benchmarked_, in the same way that colleges are ranked for quality in explicit and implicit ways. Trusted “brands” will emerge.

Ideally, these private evaluators would not train and market state-of-the-art foundation models themselves, as there would always be an incentive to either leak the benchmark data to the training pipeline or craft a benchmark that the researchers know their model will perform well on.

In a perfect world, you would have **blind benchmarking**, which is to say benchmarking that is obfuscated from the folks who trained the model, so that there would be no way for the training pipeline to be contaminated. Model trainers would not know in advance what the benchmark is or what the questions are. They would train models to the best of their abilities, and only know how it performs on the benchmark after training is done. This is analogous to pre-registration of scientific studies, where researchers pre-commit to a certain methodology before conducting a trial or analysis.

Even better, you would want **one-time benchmarks**: benchmarks crafted \*once\* and then only used \*once\* to test a model or a set of models. At that point, the benchmark would be “used up” and no longer valid. That’s how Kaggle works, and it’s exactly how most standardized tests work — each exam is only given once, on a certain day, and then it’s thrown out or farmed out to test prep providers and tutors who use it as part of their materials. This is fine — as long as the score students report to colleges is from a clean, never-before-seen exam.

Again, a college would never accept a student’s scores from an SAT practice exam as equally valid as the real thing. All I’m asking for here is a similar level of rigor.

## Super serious

My point here is not — “this AI stuff is a big conspiracy, these models are just stochastic parrots with no real intellect at all”. I think we’re far enough along and the results of these models are way too compelling to short change them like that. We should take these models very seriously; they really are getting better and better all the time.

My point is exactly that — **we should take these models seriously, which means taking their evaluation seriously.** We aren’t right now, at least not in the public discourse around model performance.

No exam is perfect — as we know, standardized tests have their flaws. But we’re much better off having them than not. Right now, the broader AI community has no form of standardized testing for AI models. This is untenable.

It’s why I was so excited to lead [Patronus AI’s](https://www.patronus.ai/) [seed round](https://lsvp.com/stories/building-with-patronus-ai-automated-ai-evaluation/) last year, and it’s why I’m even more pumped now that they’ve raised a [$17M Series A](https://www.patronus.ai/blog/announcing-our-17-million-series-a).

![patronus-series-a](https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766516270273-patronus-series-a.jpeg)

