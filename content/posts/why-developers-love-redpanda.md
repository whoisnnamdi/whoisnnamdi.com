---
slug: "why-developers-love-redpanda"
title: "Why Developers Love Redpanda"
excerpt: "Why Vectorized's focus on developer experience will unlock real-time streaming for the great majority of developers"
published_at: "2021-02-10T21:02:00.000Z"
updated_at: "2022-07-13T01:29:13.000Z"
feature_image: "https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766512237802-Why_Developers_Love_Redpanda_vectorized_img.png"
tags:
  - slug: "developers"
    name: "Developers"
meta_description: ""
canonical_url: "https://whoisnnamdi.com/why-developers-love-redpanda/"
og_title: "Why Developers Love Redpanda"
og_description: ""
og_image: "https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766512237802-Why_Developers_Love_Redpanda_vectorized_img.png"
twitter_title: "Why Developers Love Redpanda"
twitter_description: ""
twitter_image: "https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766512237802-Why_Developers_Love_Redpanda_vectorized_img.png"
---

[Red pandas](https://en.wikipedia.org/wiki/Red_panda) are cute. But for a while, that was the only thing they had going for them.

No longer. As with whales (Docker) and elephants (Hadoop, Postgres) before them, red pandas finally have the backing of a hardcore application infrastructure technology.

Meet [Redpanda](https://github.com/vectorizedio/redpanda), a real-time event streaming platform backed by [Vectorized](https://vectorized.io/). We at Lightspeed led the company’s [recently announced](https://techcrunch.com/2021/01/26/vectorized-announces-15-5m-investment-to-build-simpler-streaming-data-tool/) Seed and Series A rounds, and we couldn’t be more excited about the potential for Vectorized to revolutionize real-time streaming.

Vectorized is one of the most technical companies I’ve ever worked with. But unlike many products, where deep technical innovation often comes at the cost of incredible complexity, Redpanda bucks this trade-off. Like its animal namesake, Redpanda is approachable, combining a simple and accessible developer experience with an underlying engine that pushes streaming to never-before-seen performance levels.

Vectorized is maniacally focused on the developer experience. As a result, it “just works”:

> ___“RedPanda’s performance, simplicity and ease of operation dramatically improves next generation data applications. Switching our development environment from Kafka to Redpanda dramatically lowered development overhead, while pipelines feeding Clickhouse “just worked” and moved our I/O bottleneck back to the disks where it belongs. Recommended.” —_ ****_Eric LaBianca, CTO, The Seventh Sense_****__

In this post, I want to highlight three key aspects of the Redpanda developer experience — ****simplicity****, ****accessibility****, and ****performance**** — and discuss why we think Vectorized’s emphasis on usability will unlock real-time streaming for the great majority of developers, who are underserved by existing solutions. You’ll also hear it straight from members of the community, who I’ve quoted throughout.

### Receive my next long-form post

Thoughtful analysis of the business and economics of tech

 

Subscribe

# Simple is beautiful

Redpanda abstracts away the complexity that often prevents the typical developer from adopting real-time streaming. There’s a long list of optimizations that I won’t entirely do justice to here, but I wanted to highlight two of the most impactful: ****No Zookeeper**** and ****No JVM (Java Virtual Machine)****.

# No Zookeeper

[Apache Zookeeper](https://zookeeper.apache.org/) is a critical piece of infrastructure in Kafka and many other big data technologies. Its core purpose is to manage coordination of nodes and metadata in distributed systems, and it runs as a separate set of machines that must themselves be managed by the operator.

Zookeeper is hardened tech at this point and does its job reasonably well. However, it’s a pain to manage and requires a separate set of Zookeeper-specific expertise to deal with problems as they inevitably occur. No one asked to manage an entirely separate distributed system, yet it has historically been a hard requirement in streaming technologies like Kafka, creating additional operational overhead and burden for many Kafka users:

> ___“Running five node zookeeper clusters was pure overhead.” —_ ****_Hacker News_****__

The issue is near and dear to me — while a product manager at Confluent, I made the case for the removal of the Zookeeper dependency, eventually resulting in the landmark [KIP (Kafka Improvement Proposal)-500](https://cwiki.apache.org/confluence/display/KAFKA/KIP-500%3A+Replace+ZooKeeper+with+a+Self-Managed+Metadata+Quorum) which proposed replacing Zookeeper with a self-managed quorum. KIP-500 was met with applause from much of the Kafka community, who were sick and tired of dealing with Zookeeper. It was time for the Zookeeper to retire.

Removing a core dependency from a decade-old technology is not trivial. A year and a half after the publication of KIP-500, Zookeeper removal proceeds with incremental steps, necessary to mitigate potential migration issues. This can’t be done in a single update.

Redpanda takes a different approach. Thoughtfully architected from the start to leverage the open source [Raft consensus algorithm](https://raft.github.io/), Redpanda obviates the need for a third-party consensus system like Zookeeper. This meaningfully reduces operational complexity and has a direct, positive impact on developer productivity:

> ___“We care about reliability and performance at Zenly, so no Zookeeper and 10x faster was a no brainer.” —_ ****_Jean-Baptiste Dalido, Head of Infrastructure Engineering, Zenly_****__

# No JVM

> ___“I was avoiding Kafka for some time because of admin costs and lack of JVM expertise” —_ ****_Vectorized Community Slack_****__

Another driver of complexity in the event streaming ecosystem historically has been the Java Virtual Machine, or JVM, a hard requirement in Java-based systems. The JVM is the virtual machine that enables applications compiled to Java bytecode to run, acting as an intermediary between the source code and the system.

Unfortunately, JVM expertise is in low supply outside of the Java/Scala developers. Ironically, the JVM is often the source of issues when working with Kafka.

Developers want streaming, but they don’t necessarily want to become Java (assuming they weren’t already familiar) or distributed systems experts. There is meaningful pent-up demand among developers for a non-JVM based streaming architecture to power modern real-time applications. Sizing this up, the Python and JavaScript communities alone could be an order of magnitude greater than the existing Kafka/Java population:

![](/https://nnamdi.net/content/images/2021/05/No_JVM__Redpanda_vectorized_img.png)

Written in C++, Redpanda needs no JVM and thus users need no JVM knowledge or expertise. This finally moves streaming technology away from Java, a big deal given how many data infrastructure technologies have been built around Java or the JVM over the years:

> ___“This looks awesome! I’ve been waiting for a long time for someone to think outside the JVM, and I really hope this is a growing trend. The “big data” industry has seemingly been joined at the hip with Java ever since Hadoop came onto the scene, and the Apache community in particular has a lot of apps that are deeply unfriendly to non-Java apps” —_ ****_Hacker News_****__

# Power to the developers

Real-time event streaming technologies are not always accessible to the typical software developer. In fact, most individual developers have been left behind in the streaming revolution. Seeing this untapped opportunity, the team at Vectorized architected Redpanda in ways that expand the pool of developers that can productively operate the system.

# Kafka compatibility

![](/https://nnamdi.net/content/images/2021/05/0_rzLnKt-j8CZ6Ezd6.png)

Too often, when new technology comes around it bifurcates the existing community in an attempt to grow adoption. This leaves individual developers and teams in the ensuing crossfire.

In building the future of real-time streaming, Redpanda respects what came before it. Despite all its improvement under the hood, Redpanda maintains ****full API compatibility with Kafka****. This means that existing Kafka-based systems can be swapped over to Redpanda with no changes to existing applications, making for an easy and straightforward migration path.

More than a smart business move, maintaining Kafka compatibility makes Redpanda much more accessible to existing Kafka users. This is important because developers in fact love the Kafka __API__, though they don’t always love managing the associated infrastructure.

Further, Kafka API compatibility means that Redpanda users can continue to leverage the amazing Kafka ecosystem that has built up over the years. This can lead to interesting combinations of Kaka-related tools and Redpanda as the core streaming engine:

> ___“Very cool — I was able to use a kafka connector to get websocket fanout out of a redpanda installation no problem. I’ll be writing a blogpost about this.” —_ ****_Vectorized Community Slack_****__

# WebAssembly

![](/https://nnamdi.net/content/images/2021/05/The_future_of_streaming_Redpanda_vectorized_img.png)

[WebAssembly](https://webassembly.org/), or WASM, is one of the most exciting up-and-coming technologies in software development today. WebAssembly lets developers write code in any major language, translate that code to the compact WASM format, and run it on the web with the high performance of a native application.

Redpanda is one of the first infrastructure technologies to take advantage of WASM, enabling developers to “write and edit code in their favorite programming language to perform one-shot transformations, like guaranteeing GDPR compliance by removing personal information or to provide filtering and simple aggregation functions.” Here’s how one community member described Redpanda’s WASM engine:

> ___“Very clever and useful way to take advantage of WASM… It reminds me a little bit of JS-derived views in CouchDB, just way more powerful and performant thanks to WASM rather than plain JS interpreter”_ ****_— Vectorized Community Slack_****__

JavaScript, Python, Rust, Go — anything that compiles to WebAssembly (basically everything at this point) can be used to transform data. Again the key is accessibility — inline WASM transforms in Redpanda represent just that. WASM also unlocks interesting use cases beginning to emerge among the community:

> ___“What excites me the most is the WebAssembly feature, as it enables us to create a “Data Firewall’’, the last mile of access, transforms and policy.” —_ ****_Jean-Baptiste Dalido, Head of Infrastructure Engineering, Zenly_****__

# Gotta go fast

Performance isn’t often pitched as a productivity boost. But it is, especially at scale.

Better performance at the __infrastructure__ level leaves more room for the application itself to function as intended without running into resource constraints. This means less optimization work by the developer and also opens up streaming to other languages like JavaScript and Python, whose worse performance as high-level languages is balanced out by speed at the infrastructure level.

To better understand this, let’s talk cores and tails.

# Hold my Coors, I mean, cores

![](/https://nnamdi.net/content/images/2021/05/Hold_my_core_Redpanda_vectorized_img.png)

Hardware is moving target, continuously evolving and improving. The last 15 years have been no exception. The underlying hardware targeted by streaming and message queue systems has changed meaningfully since the advent of real-time systems, opening up new opportunities for performance enhancements that take advantage of new physical resources.

Written in lower-level C++, Redpanda’s [thread-per-core architecture](https://vectorized.io/blog/tpc-buffers/) is optimized for modern hardware and squeezes out every last bit of performance, fully exploiting the resources it runs on. Redpanda also comes with [intelligent auto-tuning](https://vectorized.io/blog/autotune-series-part-1-storage/) out-of-the-box, which automatically generates optimal settings for your specific hardware/kernel/Redpanda setup. Organizations can do more with less, and the benefits extends down to the level of the individual developer too, who now has more “breathing room” when it comes to performance due to Redpanda’s more efficient streaming engine. Developers can worry less about optimization and just write the applications they want, enhancing developer productivity.

# Don’t fail in the tail

Averages rarely tell the whole story when it comes to performance. Latency, for example, can be, on average, quite similar between two systems and yet diverge meaningfully at the 99th+ percentile. Reliable performance “in the tails” is critical for certain use cases like fraud detection, where financial institutions must return decisions ASAP at the point of sale.

Unfortunately, performance issues often “hide” in the tails of the latency distribution, only rearing their head periodically. But when they do pop up, the delays can be monstrous.

Because Vectorized built a new storage engine from scratch that removes much of the overhead in Kafka and can fully saturate the underlying device, Redpanda operates with stable tail latencies. This means architects get predictable performance in their applications and fewer unexpected spikes in latency.

![](/https://nnamdi.net/content/images/2021/05/End-to-End_Latency_Percentiles_Redpanda_vectorized_img.png)

This sort of reliability is difficult to achieve in JVM-based systems like Kafka. With a C++-based architecture and CPU-level optimizations, Redpanda achieves 19x better tail latency.

# Developer love always wins

We love Vectorized’s focus on improving the developer experience for real-time infrastructure. Redpanda represents an improvement to the status quo along multiple dimensions. Through simplicity, accessibility, and performance enhancements, Redpanda opens up streaming to a wider audience of developers who, at the end of the day, simply want to write applications — __without__ having to struggle with operational complexity.

Here’s how one engineer put it:

> Congratulations to [@emaxerrno](https://twitter.com/emaxerrno?ref_src=twsrc%5Etfw) and the [@VectorizedIO](https://twitter.com/VectorizedIO?ref_src=twsrc%5Etfw) team on their funding!  
>   
> Their mission to make a faster and more reliable Kafka alternative is a worthy one. Our industry deserves diverse data infrastructure options, and it's exciting to see so many new ones getting traction.
> 
> — Large Data Bank (@JordanALewis) [January 26, 2021](https://twitter.com/JordanALewis/status/1354149159755010056?ref_src=twsrc%5Etfw)

We at Lightspeed couldn’t agree more.

__Want to learn more, connect with the Vectorized team, and meet other Redpanda users? Join the__ [__Slack community__](https://vectorized.io/slack)__, check out the__ [__repo__](https://github.com/vectorizedio/redpanda)__, and sign up for early access to__ [__Vectorized Cloud__](https://vectorized.io/cloud)__.__