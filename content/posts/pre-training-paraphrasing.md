---
slug: "pre-training-paraphrasing"
title: "Pre-training via Paraphrasing (Paper Explained)"
excerpt: "Transformer model pre-trained on document retrieval and reconstruction performs well on both fine-tuned and zero-shot downstream tasks"
published_at: "2020-09-29T21:03:16.000Z"
updated_at: "2021-07-20T03:10:15.000Z"
feature_image: "https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766512216832-image-20200927143543270.png"
tags:
  - slug: "research"
    name: "Research"
  - slug: "machine-learning"
    name: "Machine Learning"
  - slug: "developers"
    name: "Developers"
  - slug: "notes"
    name: "Notes"
meta_description: ""
canonical_url: "https://whoisnnamdi.com/pre-training-paraphrasing/"
og_title: "Pre-training via Paraphrasing (Paper Explained)"
og_description: ""
og_image: "https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766512216832-image-20200927143543270.png"
twitter_title: "Pre-training via Paraphrasing (Paper Explained)"
twitter_description: ""
twitter_image: "https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766512216832-image-20200927143543270.png"
---

_(I'm trying something new: summarizing and explaining technical research papers I come across. I spend a ton of free time reading these so I figure why not put some of that time spent to good use? Hoping this benefits others who are knee-deep in machine learning and econometric research.)_

**Title:** Pre-training via Paraphrasing

**Authors:** [Mike Lewis](https://ai.facebook.com/people/mike-lewis/), [Marjan Ghazvininejad](https://www.linkedin.com/in/marjan-ghazvininejad/), [Gargi Ghosh](https://www.linkedin.com/in/gargi-ghosh-5b1087b/), [Armen Aghajanyan](https://www.linkedin.com/in/armenag/), [Sida Wang](https://www.linkedin.com/in/sidaw/), [Luke Zettlemoyer](https://twitter.com/lukezettlemoyer) (all of Facebook AI)

**One sentence summary:** Transformer model pre-trained on document retrieval and reconstruction performs surprisingly well on wide range of fine-tuned and zero-shot / unsupervised downstream tasks

**Source:** [http://arxiv.org/abs/2006.15020](http://arxiv.org/abs/2006.15020)

**Compression:** 10 pages (original ex. references and appendix) -> 3.5 pages (this article)

## Summary

"[Pre-training via Paraphrasing](http://arxiv.org/abs/2006.15020)" introduces **MARGE**, a **Multilingual Autoencoder that Retrieves and Generates**. In this architecture, a _retrieval model_ is trained to score the relevancy of batches of "evidence" documents \\(z\_{1...M}\\) based on their similarity to a "target" document \\(x\\). Simultaneously, a _reconstruction model_ is trained to reconstruct the original target document conditioning on the evidence documents and their relevance scores from the retrieval model. This back-and-forth emulates the behavior of an autoencoder (or even a denoising autoencoder) whereby the mapping of target document to evidence documents serves as an _information bottleneck_ forcing the model to learn document representations that will best enable the reconstruction of the input document.

Once pre-trained on this "paraphrasing" task, MARGE can then be leveraged for downstream tasks like sentence retrieval, machine translation, summarization, paraphrasing, and question answering. Even with no fine-tuning (i.e. "zero-shot"), the model demonstrates impressive performance on these tasks. Performance improves meaningfully with task-specific fine-tuning.

<div class="subscribe-form">
<h3 class="subscribe-form-title">Receive my new long-form essays</h3>
<p>Thoughtful analysis of the business and economics of tech</p>
<form action="/api/subscribe" method="POST">
<input type="email" name="email" placeholder="Enter your email" required />
<button type="submit">Go ⚡</button>
</form>
</div>

## Key results and takeaways

-   Transformer-based model pre-trained on retrieval / reconstruction performs admirably across multiple downstream generative and discriminative tasks, **including state of the art (SOTA) results on some tasks**
-   **Achieves BLEU scores of up to 35.8** on zero-shot unsupervised document translation with no task-specific fine-tuning
-   Outperforms other unsupervised models on unsupervised cross-lingual sentence retrieval by large margin
-   Impressively, **model is trainable from random initialization** despite "chicken-and-egg" problem of retrieval and reconstruction models being co-dependent

## Methodology

Retrieval and reconstruction together act as an _autoencoder_. The retrieved documents act as a noisy representation of the input, and this process serves as an information bottleneck for the algorithm (an encoder). The meaning of the original input is therefore encoded in these documents via the choice of which documents to retrieve along with the relevance score assigned to each. This mapping of input to retrieved documents is the "encoder" of the autoencoder. The reconstruction of the input via the retrieved documents is effectively the decoder.

Both the encoder and decoder here have a [Transformer](https://arxiv.org/abs/1706.03762)\-like architecture with [multi-headed attention](http://jalammar.github.io/illustrated-transformer/) calculated across multiple layers.

### Retrieval model

The input to the MARGE model is a batch of "evidence" (the documents to be retrieved) and a "target" (the document to be reconstructed). Batches are created by:

-   sharding the document dataset into groups of potentially documents using heuristics like publication date
-   taking the \\(k\\) evidence documents within the shard most similar to the target document (according to \\(f(x,z)\\) below)
-   including a subset of these \\(k\\) documents in the batch, weighting documents in other languages more than same-language documents

Batches are dropped and regenerated offline every 10K training steps by re-computing the pairwise relevance scores across documents.

The retrieval model compares candidate documents by computing a pairwise relevance score \\(f(x, z)\\) between a target document \\(x\\) and evidence document \\(z\\) from the corpus. This takes the form of the cosine similarity of the documents, encoded by a function \\(g(\\cdot)\\), which takes the form of the first token of a 4-layer Transformer network:

$$  
f(x,z) = \frac{g(x) \cdot g(z)}{|g(x)| |g(z)|}  
$$

These relevance scores are used both to select documents to be included in each batch as well as push the model to pay more attention to more similar documents when reconstructing the input, as I'll cover later on.

Using the same function for both targets and evidence ensures documents with similar words are more likely to be mapped to similar representations, even if the encoding function is largely random (which it will be at initialization).

### Reconstruction model

The reconstruction model computes the likelihood of the target document tokens, conditioned on the evidence documents within the batch and associated relevance scores. The vector representations for all evidence documents within each batch are concatenated together into a single vector \\(z\_{1...M}\\) before being used for reconstruction:

$$  
L\_\theta = - \sum\_i \log{p\_\theta(x\_i|z\_{1...M}, f(x\_i,z\_1), ..., f(x\_i,z\_M))}  
$$

During decoding, attention weights are calculated for each token of the target across the set of concatenated evidence documents, meaning that the weights correspond to the attention the decoder should pay to each token of each evidence document at each time-step, capturing token-wise similarity as in standard [dot-product attention](https://lilianweng.github.io/lil-log/2018/06/24/attention-attention.html). Here however, the relevance scores for each document are added to the attention scores for the tokens from that document, multiplied by a trainable scalar parameter \\(\\beta\\). These biased scores are then softmaxed, yielding the attention weights for each time-step, layer \\(l\\), and attention head \\(h\\):

$$  
\alpha = softmax\_{z\_{1...M}}(Q^{lh}(x\_i)K^{lh}(z\_{1...M}) + \beta f(x\_i,z\_j)) \in \mathbb{R}^{|x\_i| \times \sum\_j |z\_j|}  
$$

Backpropagating the reconstruction loss improves both the reconstruction model and the relevance model via this attention mechanism.

### Architecture and training

The model encoder (distinct from the encoder \\(g(\\cdot)\\) used to encode individual documents) is a 12-layer Transformer network with dimension 1024 and feedforward layers of size 4096. The decoder is similar in structure but the feedforward layers there are size 16536 and 4 additional Transformer layers are added to the base with only self-attention (i.e. attention only to other words within the same document) and feedforward layers of size 4096. These supplemental layers allow the words in the target to contextualize locally before doing so across documents. The first four layers of the encoder are used in the relevance model (this is the \\(g(\\cdot)\\) referred to above).

The model is initially pre-trained on the [CC-NEWS corpus](https://commoncrawl.org/2016/10/news-dataset-available/) for 1M total steps. At this point, the checkpointed model is referred to as MARGE-NEWS. Then, the authors further pre-train for an additional 100K steps on Wikipedia, referring to the resulting model as MARGE.

For fine-tuning, a different procedure is used for generation and classification problems. For generation (translation, summarization), the task input is fed into the encoder and the final output is generated by the decoder. For classification, the task input is fed into both the encoder and decoder

The MARGE model ends up with 963M parameters, more than most of its comparison set of "the strongest available multi-lingual pre-trained models" ([mBERT](https://arxiv.org/abs/1810.04805?source=post_page), [XLM](https://arxiv.org/abs/1901.07291), [XLM-R](https://arxiv.org/abs/1911.02116), [MMTE](https://arxiv.org/abs/1909.00437), [mBART](https://arxiv.org/abs/2001.08210)), but is trained on fewer languages and a medium-sized dataset and a medium amount of GPU pre-training days:

![image-20200927144908141](/https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766515773255-image-20200927144908141.png)

## Experiments and results

The papers show the wide applicability of MARGE and its paraphrasing pre-training technique by evaluating its performance across wide array of NLP tasks. MARGE performs well across many tasks, wider than any previous pre-trained model. This includes zero-shot document translation, and performance improves further with fine-tuning. The strong results of MARGE establish retrieval / reconstruction as a viable alternative to MLM for pre-training. The success of the method is partly driven by the higher relatedness of the pre-training task to downstream tasks.

### Document-Level Machine Translation

The authors demonstrate the models strong translation performance across a number of language pairs and within both zero-shot and fine-tuned settings, achieving 35.8 BLEU in the case of unsupervised translation from German into English on the [WMT19 dataset](http://www.statmt.org/wmt19/), the highest score ever achieved by a system trained with no bitext (as in iterative back-translation). Performance does vary significantly by language:

![image-20200927144848658](/https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766515771521-image-20200927144848658.png)

Supervised translation with labeled bitext improves performance further, achieving competitive results against mBART:

![image-20200927145026936](/https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766515775340-image-20200927145026936.png)

### Cross-lingual Sentence Retrieval

It would make sense that a model trained retrieve similar documents, sometimes in a different language, would perform well on a sentence retrieval task. Confirming this intuition, MARGE outperforms other unsupervised models by almost 10 points on the [BUCC2018 benchmark](https://comparable.limsi.fr/bucc2018/bucc2018-task.html), though the embeddings are tuned somewhat on BUCC development data:

![image-20200927144959013](/https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766515774293-image-20200927144959013.png)

### Summarization

The authors evaluate the model's performance on monolingual sequence-to-sequence generation via text summarization tasks sourced from the [MLSum](https://arxiv.org/abs/2004.14900) dataset. Performance is compared across multiple languages, and the extractive oracle performance level is shown for comparison-sake. What's impressive here is that MARGE's summaries are inherent abstractive - the model is generating summaries in its own words, not simply extracting words from the input text - and yet it manage to outperform an extractive mBERT model on a fundamentally extractive performance metric ([ROUGE-L](https://en.wikipedia.org/wiki/ROUGE_\(metric\))). This is not trivial to do:

![image-20200927145105128](/https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766515776930-image-20200927145105128.png)

### Question answering and paraphrasing

The [MLQA dataset](https://arxiv.org/abs/1910.07475) is used to test MARGE's performance on question answering. MARGE what over or underperforms XLM-R depending on the language, on average underperforming by a small margin (as measured by F1 score). Paraphrasing is tested on the [PAWS-X paraphrase detection dataset](https://arxiv.org/abs/1908.11828), where the model is trained on English and zero-shot transfer is tested on other languages. MARGE demonstrates SOTA performance relative to XLM-R:

![image-20200927145133850](/https://fbnlxna1ujeyw7ap.public.blob.vercel-storage.com/1766515778248-image-20200927145133850.png)

## Conclusion

I think this is an interesting paper mainly due to its demonstration of a new pre-training methodology that appears to work as well as masked language modeling for NLP-related tasks. The literature around pre-training grows daily, but I think we've only really scratched the surface of potential pre-training methods. That's why I'm excited to see some new blood in NLP pre-training, which has been dominated by masked language modeling a la BERT.

That said, the paper involves _some_ hackery that seems necessary to get the model to train. This includes the heuristics that are used to group documents into relevant batches to retrieve from (which is inherently non-differentiable) as well as others tricks like encouraging cross-lingual behavior via hardcoded overweighting of cross-lingual documents in the collected batches. These tricks act as a sort of "intelligent design" mechanism which is not uncommon in deep learning but does mean that the model is not entirely trainable end-to-end via gradient descent (though it mostly is).

Additionally, these steps are outlined in the paper but due to limitations of the human language are not easily replicable solely via the paper's explanation. The authors would need to open source the underlying model code for others to replicate and verify these results.

Model-specific training and architectural hacks aside, MARGE's performance is quite impressive and adds a new feather in the pre-training quiver for NLP models.

<div class="subscribe-form">
<h3 class="subscribe-form-title">Receive my new long-form essays</h3>
<p>Thoughtful analysis of the business and economics of tech</p>
<form action="/api/subscribe" method="POST">
<input type="email" name="email" placeholder="Enter your email" required />
<button type="submit">Go ⚡</button>
</form>
</div>