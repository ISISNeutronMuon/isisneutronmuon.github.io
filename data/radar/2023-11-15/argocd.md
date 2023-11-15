---
title: ArgoCD
quadrant: tools
ring: trial
---

[ArgoCD](https://argoproj.github.io/cd/) is a continuous delivery tool for
Kubernetes based on [GitOps](./gitops.md). The required state for an application
is stored in a [Git](./git.md) repository and ArgoCD automates the deployment to
the target environments. A UI is provided enabling

- continuous monitoring deployments
- visualizing differences in desired & deployed state

It is currently on trial within the
[Interactive Reduction](https://github.com/interactivereduction) project.
