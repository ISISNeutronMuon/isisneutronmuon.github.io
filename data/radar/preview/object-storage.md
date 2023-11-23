---
title: "Object Storage"
quadrant: platforms
ring: adopt
---

[Object Storage](https://en.wikipedia.org/wiki/Object_storage) is a data storage
technique that manages data as blobs or objects rather than as a hiearchy or a block.
The API presented by object-stores are not concerned with the physical location
of the data allowing them to store vast amounts of unstructured data.

Most public cloud offerings also offer some form of object storage: AWS S3,
Azure Blob and Google Cloud Storage. The STFC cloud also offers an object store
through the Swift interface. An object store can also offer an S3-compatible
interface and take advantage of any existing tools that have been developed for
that system.

We have object storage available in the STFC cloud and it is currently used across
projects such as the IDAaaS system for caching experimental data.
