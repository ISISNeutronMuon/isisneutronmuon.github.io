---
title: Jenkins
quadrant: tools
ring: adopt
---

[Jenkins](https://jenkins.io) is an automation server for running tasks.
Its plugin system allows for extensions supporting CI/CD as well as implementing
pipelines as code and configuring Jenkins itself through configuration files.

Jenkins is in widespread use across ICD for both CI/CD tasks.

New projects should seriously consider whether managed solutions such as
[GitHub Actions](https://docs.github.com/en/actions) could support all project CI/CD
requirements rather than taking on the ongoing support and maintenance of
internal Jenkins deployments.

Any new deployments should use containerisation and the
[Configuration as Code](https://www.jenkins.io/projects/jcasc/) paradigm and not
manual setup through the UI.
