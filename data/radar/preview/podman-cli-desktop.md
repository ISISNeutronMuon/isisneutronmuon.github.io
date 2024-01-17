---
title: "Podman CLI/Desktop"
quadrant: platforms
ring: adopt
description: |
  [Podman](https://podman.io/) is an alternative to Docker for interacting with
  containers. It offers both a CLI and Desktop application that are both free to
  use under an Apache license.

  A crucial difference between Podman and Docker is Podman executes as the non-root
  user by default and does not require a daemon to interact with the containers.
  All images that work with Docker also work with Podman (and vice versa) as they
  both build OCI-compatible images.
---

Similarly to Docker CLI/Desktop these tools are useful for local development but
production-ready deployments should use more advanced tools such as Kubernetes.
