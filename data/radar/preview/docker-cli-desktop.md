---
title: "Docker CLI/Desktop"
quadrant: platforms
ring: adopt
description: |
  [Docker](https://www.docker.com/) is one of the more widely used container
  runtime engines. Docker runs in a client-server mode with a daemon responsible
  for the full lifecycle of the container and a CLI or desktop application used
  by a user to interact with the containers. By default the Docker daemon requires
  root privileges and thus all containers runs as root. A rootless mode can be
  configured.
---

Typically used locally during development through [docker-compose](https://docs.docker.com/compose/) or in cases of simple
applications where the complexity of Kubernetes is not deemed necessary.

Note that Docker changed its [license agreement](https://docs.docker.com/subscription/desktop-license/) in 2021 so that Docker Desktop
is only "...free for small businesses
(fewer than 250 employees AND less than $10 million in annual revenue),
personal use, education, and non-commercial open source projects.".
As an alternative on Windows many people migrated to Docker through the WSL or
other tools such as [Podman](https://podman.io/).
