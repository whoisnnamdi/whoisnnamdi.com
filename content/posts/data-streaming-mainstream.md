---
slug: "data-streaming-mainstream"
title: "How Redpanda is Taking Data Streaming Mainstream"
excerpt: "Monitoring that even (Franz) Kafka would approve of"
published_at: "2023-08-10T02:25:00.000Z"
updated_at: "2025-03-31T03:48:12.000Z"
feature_image: "https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766512297592-blog-lightspeed-hero.png"
tags:
  - slug: "developers"
    name: "Developers"
meta_description: ""
canonical_url: "https://whoisnnamdi.com/data-streaming-mainstream/"
og_title: "How Redpanda is Taking Data Streaming Mainstream"
og_description: ""
og_image: "https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766512297592-blog-lightspeed-hero.png"
twitter_title: "How Redpanda is Taking Data Streaming Mainstream"
twitter_description: ""
twitter_image: "https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766512297592-blog-lightspeed-hero.png"
---

Real-time data systems tend not to have amazing developer experiences. There are two core reasons.

One, the developer experience for the engine itself is poor. Streaming engines tend to be difficult to use, difficult to spin up, and difficult to operate on an ongoing basis, as they have a ton of moving parts and complexity to manage. This is especially painful when trying to self-host, develop locally, or integrate into a modern [continuous integration/deployment (CI/CD) pipeline](https://redpanda.com/blog/test-driven-development-ci-testing-kafka). As a result, only the most sophisticated and experienced engineers can make proper use of these systems, leaving behind most software developers and narrowing the market for event-based architectures.

Second, most streaming data systems don’t integrate well into the rest of the developer workflow, and they lack many of the “creature comforts” developers are used to seeing in their other tools. The modern developer workflow extends much further out and is much broader in scope than the streaming engine itself. For streaming engines to cement their place in the hearts and minds of developers, they must offer solutions to the rest of the puzzle.

We’ve talked before about [why developers love](https://medium.com/lightspeed-venture-partners/why-developers-love-redpanda-30bf2f3b8231) Redpanda’s core developer experience, which is leaps and bounds above what’s come before in the streaming space. With [native Raft](https://thenewstack.io/raft-native-the-foundation-for-streaming-datas-best-future/), no JVM, and full Kafka compatibility, Redpanda enables developers to do their best work, reducing unnecessary complexity and toil while doing it all at the [highest throughput, lowest latency](https://redpanda.com/blog/redpanda-vs-kafka-performance-benchmark), and, importantly, [lowest cost](https://redpanda.com/platform-tco).

![Comparison of infrastructure and admin costs between Redpanda and Kafka](/https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766516317236-6687382f21aa7598bd65ede7_blog-lightspeed-img1-1.png)
*Comparison of infrastructure and admin costs between Redpanda and Kafka*

But it’s also important to address that second point — how Redpanda creates a holistic developer experience that services all aspects of the modern developer’s workflow, from deployment to monitoring and Day 2 operations to long-term storage. These remain unresolved, “open loops” that have prevented a broader audience of developers and organizations from taking advantage of real-time capabilities.

At Lightspeed, it’s our core belief that there’s a potentially massive market expansion opportunity for real-time, streaming data systems. Opening up this opportunity will require thinking much bigger about what a streaming engine can be and do.

That’s where Redpanda comes in.

## Spinning up without spinning your wheels

Too often, developers looking to deploy streaming data systems are left to their own devices when it comes to deployment. Deployment is often a mess, involving multiple separate binaries, each with its own peculiarities, requiring engineers to develop expertise in systems they couldn't care less about and in which they have no comparative advantage. Streaming systems can easily become one of the most painful pieces of infrastructure they’ll deploy.

Further, developers increasingly see the cloud as their default deployment platform. In the same way that SaaS relieves some of the operational burden of running software by offloading that to the vendor, developers would love to be able to consume cloud-based streaming services with as few wrinkles as possible. Developers want a cloud experience but their organizations don’t want to lose data sovereignty. They need a security model that works within the constraints of the typical enterprise while also getting the ease of use of the cloud — [the best of both worlds](https://redpanda.com/blog/deploy-redpanda-clusters-cloud-aws-gcp).

Lastly, developers on the bleeding edge don’t want to think about infrastructure at all, cloud or otherwise. They don’t want to think about servers, machines, nodes, availability zones, or regions. They want access to true streaming as a service rather than streaming as a server. In other words, they want serverless, and they want it now.

The modern developer experience requires a modern platform. Redpanda is that platform.

Here’s how Redpanda makes deployment a breeze.

## One binary to rule them all

The core of the Redpanda deployment model is the way its nodes are architected. Redpanda nodes are [fully-contained processes](https://redpanda.com/blog/single-binary-architecture) that ship with everything needed in a modern streaming system, including an HTTP proxy, a Raft-based consensus mechanism, and a schema registry. Every node runs the same, single binary, leading to significant operational simplification along with a more efficient overall operating model.

![Close up of a self-contained Redpanda node ](/https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766516309674-6687382d569120c8751b8575_blog-lightspeed-img2.png)
*Close up of a self-contained Redpanda node*

It’s hard to overstate how game-changing this is. Due to this architecture, running a single Redpanda cluster doesn’t require operating a massive fleet of varying services. This is a massive boon for developer productivity and also enables Redpanda to go where previous streaming systems have struggled, including [edge / IoT deployments](https://redpanda.com/blog/real-time-security-iot-customer-story) and CI/CD pipelines with tight performance requirements and resource constraints.

> “The latency and the throughput we got with almost no configuration was incredible. Redpanda is fast, reliable, friction-free and has very low operational overhead.” - [Alpaca](https://alpaca.markets/)

## Hold my cloud

Redpanda’s cloud turns the table on traditional cloud infrastructure. While the company does offer standard, dedicated, managed clusters in the cloud, they didn’t want to stop there. Redpanda went further, pioneering a deployment model they call [BYOC](https://redpanda.com/blog/deploy-redpanda-clusters-cloud-aws-gcp), or, “bring your own cloud.” BYOC lets customers deploy Redpanda clusters within their own cloud environment, while still being fully managed by Redpanda.

> “BYOC’s privacy-first architecture drives compliance for streaming data, and allows you to scale on your own infrastructure while maintaining data sovereignty requirements.” - [Bring Your Own Cloud (BYOC): best of both worlds](https://redpanda.com/blog/deploy-redpanda-clusters-cloud-aws-gcp)

Redpanda does this by cleanly splitting the control and the data plane. The data plane stays within the customer’s cloud account, while the control plane stays on Redpanda’s side. This creates an incredibly slick and elegant setup, with proper separation of concerns between Redpanda’s and the customer’s cloud environment. With BYOC, organizations get all the benefits of the cloud while retaining [data sovereignty](https://redpanda.com/blog/kafka-redpanda-future) and maintaining privacy.

![Diagram of how BYOC keeps the customer cloud separate for data sovereignty and privacy](/https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766516315111-6687382d907eec59adc13e52_blog-lightspeed-img3.png)
*Diagram of how BYOC keeps the customer cloud separate for data sovereignty and privacy*

Redpanda takes care of everything you’d expect in a modern, competent cloud service, like provisioning, monitoring, and maintenance, while sensitive data and credentials never leave the customer environment. Rolling upgrades that the customer can control ensure zero application downtime. For obvious reasons, BYOC has become an incredibly popular deployment paradigm among Redpanda users.

> “Redpanda BYOC gives us a fully managed Kafka service running on our own cloud servers, balancing our internal compliance requirements with ease of use, and without compromising performance and compatibility.” - [LiveRamp](https://liveramp.com/)

## Fewer servers, better service

Lastly, Redpanda is working on a number of exciting features around serverless, a relatively new paradigm within the context of streaming systems. This is their focus on developer experience taken to the logical extreme — what a streaming data system could look like from the perspective of a developer who doesn’t want to worry about systems or deployment at all.

Importantly, serverless isn’t some esoteric technology that is far ahead of where developers are today. Serverless is here now. According to Datadog’s [2022 State of Serverless](https://www.datadoghq.com/state-of-serverless/) report, over half of the organizations surveyed in each of the major public clouds have already adopted serverless in some fashion. For AWS in particular that number is over 70%.

And yet streaming data systems haven’t kept pace. Developers today who want to pair streaming data with a serverless approach are largely figuring it out on their own.

We believe that serverless, in addition to [Redpanda’s planned WebAssembly capabilities](https://medium.com/lightspeed-venture-partners/webassembly-ing-the-pieces-vectorizeds-data-policy-engine-5ceea983ed5d), is the last major step toward unlocking accessible streaming and event-based systems for the great majority of developers out there. Developers will be able to talk to a streaming data system in their native tongue and perform data transformations on the fly, almost like a universal Google Translate for streaming data.

With JavaScript and Python being the world’s most popular programming languages broadly and most used specifically within serverless functions, Redpanda’s upcoming serverless offerings will expand the relevant, addressable audience for streaming data by an order of magnitude or more.

## Monitoring that even Franz Kafka would approve of

Streaming systems can be daunting, intimidating systems that are difficult to manage for the average developer. These difficulties are made no easier by the fact that the command line (i.e. a dark screen with some white text scrawled over it) is often the default way to manage these systems. Ad hoc inspection and analysis is much harder than it should be.

This is especially frustrating during crisis situations, such as production infrastructure going down. In such situations, time is of the essence, and engineers don’t have time to wrestle information out of their tools, searching for obscure command line invocations that they didn’t even know existed. Once the information is located, it often appears as a torrential downpour of logs and metrics, with little to no organization or formatting. We’ve all been there.

This just won’t do. While many developers swear by their terminals, many would love to have a more visual and intuitive representation of their infrastructure. This is especially true of younger, more junior developers who didn’t grow up writing MS-DOS applications and who have a higher standard for developer experience.

[Redpanda Console](https://redpanda.com/redpanda-console-kafka-ui) is a single pane of glass for managing the entire Kafka ecosystem. All of your streaming infrastructure in one place, with all the admin capabilities organizations expect:

-   Observability over clusters, topics, brokers, and partitions
-   Ability to easily change consumer group offsets
-   Management of schema registry, connectors, and Kafka Connect clusters

![Preview of how Redpanda Console serves as a dev-friendly pane of glass.](/https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766516302764-6687382d251781c480c13fdc_blog-lightspeed-img4.gif)
*Preview of how Redpanda Console serves as a dev-friendly pane of glass.*

But the most impressive thing about Redpanda Console is that it’s not merely a “dashboard” with a slew of charts and numbers — it goes so much further than that.

Redpanda Console gives developers data observability superpowers they aren’t used to. This includes capabilities like push-down JavaScript filter, allowing users to filter their cluster’s data at any level of complexity by writing programmable data filters in JavaScript, with encoding support for JSON, Protobuf, Avro, and more.

The console also simplifies and strengthens access control. The console presents an easy interface for configuring access control lists (ACLs), setting up fine-grained role-based access control (RBAC), and reviewing comprehensive audit logs. It also integrates tightly with all the identity providers you’d expect, like GitHub, Okta, and Google, enabling Single Sign On (SSO) access.

![Screenshot of the Kafka Access Control interface in Redpanda Console.](/https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766516312496-6687382d569120c8751b8579_blog-lightspeed-img5.png)
*Screenshot of the Kafka Access Control interface in Redpanda Console.*

> “Redpanda Console delivers a tremendous improvement in the productivity, effectiveness and quality of life of developers and operators who work with Redpanda or Kafka” - [Redpanda Console: Putting the “fun” back into Kafka](https://redpanda.com/blog/kafka-ui-redpanda-console)

## Store more

Okay, so a developer is running Redpanda. They’ve spun it up within their own cloud account as enabled by the BYOC model, and they have the beautiful Redpanda Console setup giving them full observability and control over their cluster. Everything is hooked up and data is flowing through Redpanda.

But all that data has to go somewhere. It’s time to talk _storage_.

Storage is quite important in the context of event-based architectures:

-   Systems like Redpanda sit between data producers and consumers, allowing each to go about their business without having to worry about what the other side is doing.
-   However, due to severing this tie between producers and consumers, the responsibility of confirming successful writes falls on the streaming system.
-   Data can be produced well in advance of being consumed, so streaming systems must guarantee that no data gets lost in the shuffle.

This is why Redpanda went out of its way to [submit itself for testing](https://jepsen.io/analyses/redpanda-21.10.1) by trusted third parties like [Jepsen](https://jepsen.io/).

> “How did Redpanda fare in its Jepsen testing? Redpanda is a safe system without known consistency problems. The consensus layer is solid. The idempotency and transactional layers had issues that we have already fixed. The only consistency findings we haven’t addressed reflect unusual properties of the Apache Kafka protocol itself, rather than of a particular implementation.” - [Redpanda’s official Jepsen report](https://redpanda.com/blog/redpanda-official-jepsen-report-and-analysis)

But it’s not just about the [CAP theorem](https://en.wikipedia.org/wiki/CAP_theorem) and distributed systems. Putting on our investor “cap” for a second — data gravity is how nearly every mission-critical data system of the past generated significant value for its creators and its customers. For a data infrastructure company to build a large and valuable business, it must hold and retain customer data for extended periods of time. Ephemerality won’t cut it:

-   Such a data system cannot merely be a place where data passes through on its way to its final destination. Such architectures and usage patterns have rarely generated multi-billion dollar outcomes. Instead, the system in question must become a trusted place for developers and organizations to store data on an ongoing basis
-   Users must be able to trust that once ingested, the data will always be there (or at least as long as their data retention policies demand).
-   Users must also trust that, once the data is there, it will be easily queryable and accessible.

## A sane default: the cloud

Here too, Redpanda has it covered. Presciently, the team built Redpanda with the cloud as its default storage tier. This is a stronger statement than merely being “cloud-native”: Redpanda intelligently manages reads and writes behind the scenes to provide the lowest friction and highest performance, effectively becoming an infinite storage destination:

> “Making cloud the default storage tier unlocks new streaming data use cases that were once considered out of reach. The long-term data retention capability encourages businesses to treat Redpanda as the “single source of truth” for their historical records.” - [How Redpanda’s cloud-first storage model reduces TCO](https://redpanda.com/blog/cloud-native-streaming-data-lower-cost)

In addition to unlimited data retention, Redpanda’s cloud-first architecture enables:

-   [Remote read replicas](https://redpanda.com/blog/remote-read-replicas-for-distributing-work) — a “CDN” for your streaming data, enabling developers to spin up and hydrate a new Redpanda cluster with mirrored data from an existing cluster, even across zones and regions
-   [Inexpensive disaster recovery](https://redpanda.com/blog/high-availability-software-deployment-patterns-part-1) — smooth failovers, with no need to maintain a separate data replication mechanism
-   [Reduced data management, admin, and toil](https://redpanda.com/blog/engineering-continuous-data-balancing) — Continuous data balancing, self-healing clusters, and unified retention controls

Redpanda accomplishes this with its [Shadowing Indexing](https://redpanda.com/blog/tiered-storage-architecture-shadow-indexing-deep-dive) architecture, which was built from scratch to support cloud-native [Tiered Storage](https://docs.redpanda.com/docs/manage/tiered-storage/), enabling Redpanda to seamlessly move data between brokers and reliable, cheap cloud stores like Amazon S3 or Google Cloud Storage (GCS). Users can access their data using the same Redpanda/Kafka APIs they’re used to, while getting infinite data retention and scalability for free.

![Diagram of how Redpanda’s Tiered Storage works with Amazon S3.](/https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766516298557-6687382d1dd2b64747bcf80f_blog-lightspeed-img6.png)
*Diagram of how Redpanda’s Tiered Storage works with Amazon S3.*

The upshot of all this innovation is amazing ease of use and performance at an incredibly low cost.

## Data unchained

We’ve already talked a bit about [data sovereignty](https://redpanda.com/blog/kafka-redpanda-future) in the context of the cloud, where security and retaining control of enterprise data are key concerns. That’s a very _literal_ interpretation of sovereignty. But there’s another, potentially equally important notion of control that developers and organizations care about, but often give up as a side effect of adopting cloud data stores. Often enough, one doesn’t even realize something has been lost until you’re in too deep.

> “Data sovereignty is much harder to achieve than data privacy. Privacy can be achieved with policy: delete this, mask that, obfuscate here, index like so. Sovereignty can only be achieved if you, the user, control the hard drive lifecycle where data resides. There are no two ways about it. Data either lives inside the hard drives that you control or it does not.” - [Data sovereignty is the future of cloud](https://redpanda.com/blog/kafka-redpanda-future)

Redpanda believes developers should control the data they produce. This goes without saying in the world of on-prem. However, we cannot take this for granted in the era of the cloud:

-   That hard drive holding your data is no longer running in your data center — it’s running in someone else’s.
-   Further, once it ends up in that external store, many vendors erect all sorts of barriers to accessing and manipulating the data: esoteric and proprietary data formats, domain-specific query languages, egregious egress fees, and the like.

These aren’t (pleasant sounding) data lakes or even (somewhat less enticing) data warehouses, they’re _data jails_, and the vendor holds the only key. As far as Redpanda is concerned, that isn’t true data sovereignty.

Redpanda wants to fix this. Leveraging popular open data formats like [Apache Iceberg](https://redpanda.com/blog/apache-hudi-iceberg-delta-lake-differences) and the unique BYOC architecture we discussed earlier, Redpanda will enable developers to finally regain ownership over their data. Developers will be able to pick their preferred storage vendor while maintaining ownership, queryability, indexing, and portability no matter where the data ends up. Today it’s S3, tomorrow it’s Snowflake and Databricks, and in the future, it’ll be any vendor they’d like. Organizations will also be able to bring their own query engines to the data, no matter the underlying data format.

Developers will once again own their data. All enabled by Redpanda.

## Conclusion

Redpanda meets developers where they are and then enables them to go even further. That reach will push Redpanda to places no streaming system has gone before, driving a level of mission-criticality beyond most other developer infrastructure. The ease of use and incredible flexibility of Redpanda will generate developer love and appreciation for the product. And, with infinite retention and a strong commitment to data sovereignty, Redpanda’s “data gravity” will only grow.

![Diagram of the Redpanda compatibility ecosystem](/https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766516319629-66a3d55edc368c41e27704d1_66873620cc1c1391aec633b1_blog-gaming-img2.png)
*Diagram of the Redpanda compatibility ecosystem*

It’s why we were so excited to lead their recent [$100M Series C financing](https://medium.com/lightspeed-venture-partners/why-lightspeed-is-leading-redpandas-100-million-series-c-553ffe38d6e). The real-time revolution has only just begun, and Redpanda is leading the charge.