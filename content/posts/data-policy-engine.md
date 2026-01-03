---
slug: "data-policy-engine"
title: "WebAssembly-ing the Pieces: Vectorized’s Data Policy Engine"
excerpt: "Rather than ship data to code, which is expensive and latency-prone, why not ship code to the data?"
published_at: "2021-10-09T13:00:00.000Z"
updated_at: "2022-04-24T22:16:55.000Z"
feature_image: "https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766512265840-header-1.png"
tags:
  - slug: "developers"
    name: "Developers"
meta_description: ""
canonical_url: "https://whoisnnamdi.com/data-policy-engine/"
og_title: "WebAssembly-ing the Pieces: Vectorized’s Data Policy Engine"
og_description: ""
og_image: "https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766512265840-header-1.png"
twitter_title: "WebAssembly-ing the Pieces: Vectorized’s Data Policy Engine"
twitter_description: ""
twitter_image: "https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766512265840-header-1.png"
---

In [Why Developers Love Redpanda](https://whoisnnamdi.com/why-developers-love-redpanda/), I talked about the exciting developments around WebAssembly and how [Vectorized](https://vectorized.io/) is leveraging the technology to build it’s Intelligent Data API, [Redpanda](https://github.com/vectorizedio/redpanda):

> [_WebAssembly_](https://webassembly.org/)_, or WASM, is one of the most exciting up-and-coming technologies in software development today. WebAssembly lets developers write code in any major language, translate that code to the compact WASM format, and run it on the web with the high performance of a native application._  
>   
> _Redpanda is one of the first infrastructure technologies to take advantage of WASM, enabling developers to “write and edit code in their favorite programming language to perform one-shot transformations, like guaranteeing GDPR compliance by removing personal information or to provide filtering and simple aggregation functions.”_  
>   
> _JavaScript, Python, Rust, Go — anything that compiles to WebAssembly (basically everything at this point) can be used to transform data. Again the key is accessibility — inline WASM transforms in Redpanda represent just that._

Ever since partnering with Vectorized, we at [Lightspeed](https://lsvp.com/) knew that Redpanda was much more than a streaming engine. Redpanda truly is an Intelligent Data API, and it’s [Data Policy Engine](https://vectorized.io/blog/wasm-architecture/) unlocks one more piece of that puzzle.

Today, I want to expand on this and talk a bit more about the exciting developments coming down the pipe at Vectorized.

Here's the big idea: rather than ship data to code, which is expensive and latency-prone, why not ship code to the data?

<div class="subscribe-form">
<h3 class="subscribe-form-title">Receive my new long-form essays</h3>
<p>Thoughtful analysis of the business and economics of tech</p>
<form action="/api/subscribe" method="POST">
<input type="hidden" name="merge[SOURCE]" value="Top: WebAssembly-ing the Pieces: Vectorized’s Data Policy Engine" />
<input type="email" name="email" placeholder="Enter your email" required />
<button type="submit">Go ⚡</button>
</form>
</div>

## The keystone problem in streaming

Streaming has seen a ton of innovation over the last few years, but one area that remains painful today is stream processing. While a full explanation of these difficulties probably warrants its own article, I’ll cover the most salient points here.

The great thing about streaming is the immutable message queue. The not so good thing about streaming is, also, the immutable message queue.

What do I mean by this? The immutability of the message queue is great because it guarantees that data produced to the topic can be replicated one-to-one by simply consuming the whole queue from the start. This lets you effectively “replay” data like a VHS tape and also gives you built-in auditing, since you know the ordering hasn’t changed. It also decouples producers of data from the consumers of that data, letting the two operate independently without significant coordination work.

However, there are some problems. Immutability not only means you \*can\* consume the data in the same order it was produced — it means you must (at least as implemented today in the Kafka-API world). Further, immutability means one must consume at least as much as was produced, often many times as much, leading to additional costs in the form of network traffic and other resources. These issues can be avoided to some extent by being very diligent in setting up your architecture __a priori__, careful in segregating your use cases, etc., but few do this in practice.

In summary, the things that make streaming great also make stream processing complex and difficult.

## Shipping code to data

Here’s where WebAssembly comes in. WebAssembly lets us do a small amount of extra compute work to save us a ton of cost in the form of network utilization and latency. Mission critical streams can stay as large as they want without saturating the network.

We’re excited about the power and promise of WebAssembly, and we think it has the potential to do for server-side compute today what JavaScript did for the web in the late 90s. Like JavaScript enabled the shipping of code to the user’s client, WebAssembly lets engineers ship code to the storage engine.

Here’s how.

The Redpanda Data Policies Engine simultaneously extends the Kafka API and what you can do with server-side compute. It’s a server-side compute API for Redpanda that’s compatible with all existing Kafka tooling and the broader ecosystem, including Spark Streaming, Kafka Streams, Flink, and more.

With Data Policies, all your favorite tools can benefit from server-side WebAssembly filters, allowing for easy and simple data scrubbing, cleaning, filtering, normalization and more. As a runtime, WebAssembly allows code to execute inside Redpanda, allowing code to be injected into an active cluster at runtime.

![](https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766515906527-classical_scrubbing_vectorized_redpanda_graph.png)

Redpanda Transforms enable extremely low-latency transformations by avoiding the “data ping-pong” that happens in many systems and stream processors today, where data gets sent back and forth between storage and compute, even for very minor operations. Further, Redpanda Transform is built on the [V8 engine](https://v8.dev/), the high-performance JavaScript and WebAssembly engine that also powers Chrome and NodeJS.

Transforms in Redpanda are effectively a stateless [predicate pushdown](https://medium.com/microsoftazure/data-at-scale-learn-how-predicate-pushdown-will-save-you-money-7063b80878d7). In simple terms, that means performance is massively improved by “pushing down” code to the data, only touching the relevant data (and ignoring the rest), cutting down on wasteful network traffic, I/O, and latency.

![](https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766515908314-galaxy.png)

Redpanda Transforms are also completely auditable. The controller can report on which specific piece of code is touching which specific piece of data, on which machines, at which topic offsets.

## As easy as one, two, THREE

![](https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766515925324-Uppercase_filter.png)

Few things are simple in data engineering, but, as usual, Vectorized is changing the game. For all the cool things happening under the hood, getting started with Data Policies is shockingly easy.

First, write your policy/transform in a WebAssembly compatible language (read: everything). To make this even easier, Redpanda provides native plugins for inline transforms. In the end, you end up with something that looks like fairly standard (JavaScript in this case) code. Here’s a simple proof of concept: transforming all lowercase alphabetic characters in a record to uppercase:

```javascript
import { InlineTransform } from “@vectorizedio/InlineTransform”;
const transform = new InlineTransform();
transform.topics([{“input”: “lowercase”, “output”: ”uppercase”}]):
…
const uppercase = async (record) => {
    const newRecord = {
        ...record,
        value: record.value.map((char) => {
            return char.toUpperCase();
        }),
    };
    return newRecord;
}
```

Next, apply the policy to a Kafka topic. Again this is incredibly straightforward. All it takes is a single terminal command:

```bash
> bin/kafka-topics.sh \
— alter — topic my_topic_name \
— config x-data-policy={…}
(redpanda has a tool called `rpk` that is similar to kafka-topics.sh)
```

Now, Redpanda handles the rest.

-   Upon a TCP connection to consume from the topic, Redpanda initiates a [V8 context](https://v8docs.nodesource.com/node-0.8/df/d69/classv8_1_1_context.html)
-   Bytes are read from disk
-   Payload is transformed and re-checksumed (ensures Kafka protocol remains unchanged)
-   Redpanda returns the transformed record

![](https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766515922973-Uppercase_filter_2.png)

Pretty slick.

## Simplicity is the ultimate sophistication

I’ve [talked before](https://medium.com/lightspeed-venture-partners/why-developers-love-redpanda-30bf2f3b8231) about Vectorized’s deep understanding and appreciation for the power of simplicity:

> ___Redpanda abstracts away the complexity that often prevents the typical developer from adopting real-time streaming.___

The Data Policy Engine continues that tradition.

This was just an example use case, but they only get more interesting from here. GDPR compliance via masking rules. Encryption at-rest, on-disk. All at runtime, with near-native performance.

Curious to learn more after this quick introduction? [Alex Gallego](https://twitter.com/emaxerrno/), founder of Vectorized, gave a sneak preview of the Data Policy Engine at this year’s Kafka Summit, which you can check out here:

> I'm about to show a sneak preview of on the most anticipated features by the community here, as a sponsored talk.  
>   
> tl;dr - take an \*unmodified spark app\* and use a push-down predicate in [#wasm](https://twitter.com/hashtag/wasm?src=hash&ref_src=twsrc%5Etfw) 🤯🤯🤯  
>   
> Demo at the end.  
> [#redpanda](https://twitter.com/hashtag/redpanda?src=hash&ref_src=twsrc%5Etfw) [#kafka](https://twitter.com/hashtag/kafka?src=hash&ref_src=twsrc%5Etfw) [#KafkaSummit](https://twitter.com/hashtag/KafkaSummit?src=hash&ref_src=twsrc%5Etfw) [https://t.co/NiL2SNHrvq](https://t.co/NiL2SNHrvq)
> 
> — 🕺💃🤟 Alexander Gallego (@emaxerrno) [September 15, 2021](https://twitter.com/emaxerrno/status/1438214386124873728?ref_src=twsrc%5Etfw)

<div class="subscribe-form">
<h3 class="subscribe-form-title">Receive my new long-form essays</h3>
<p>Thoughtful analysis of the business and economics of tech</p>
<form action="/api/subscribe" method="POST">
<input type="hidden" name="merge[SOURCE]" value="Bottom: WebAssembly-ing the Pieces: Vectorized’s Data Policy Engine" />
<input type="email" name="email" placeholder="Enter your email" required />
<button type="submit">Go ⚡</button>
</form>
</div>