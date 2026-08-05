# SurDev Site

A personal website/blog built with Next.js, with posts written as Markdown files. The project also serves as a learning playground for DevOps — documenting the process of containerization, image publishing, and deployment to a personal VPS.

**Live:** [http://164.132.64.53:3000/](http://164.132.64.53:3000/)
**Blog:** [http://164.132.64.53:3000/blog](http://164.132.64.53:3000/blog)

## Stack

- **Next.js** — application framework
- **Markdown** — blog post content (`content/posts/`)
- **Docker** — application containerization
- **GitHub Container Registry (GHCR)** — Docker image registry
- **GitHub Actions** — automated image build and publish on every push to `main`

## Project structure

```
app/              # Next.js pages and routing
components/       # React components
content/posts/    # blog posts in Markdown format
lib/              # helper functions
Dockerfile        # production image build recipe
compose.yaml      # container run configuration
```

## How deployment works

The app is deployed to a private VPS (OVH) as a Docker container. The process works as follows:

1. A push to the `main` branch triggers the GitHub Actions workflow.
2. The workflow builds the Docker image and pushes it to `ghcr.io`, tagging it both `latest` and with a unique commit hash (enabling easy rollback to any previous version).
3. On the production server, the latest image is pulled (`docker pull`) and started with `docker compose up -d`.

The server never builds the code itself — it receives a ready, pre-built artifact from the registry. This keeps deployment fast and avoids putting build load on the production machine.

## Running locally

```bash
npm install
npm run dev
```

## Running with Docker

```bash
docker build -t surdev-site .
docker compose up -d
```

## Adding a new post

New posts are added as `.md` files in `content/posts/`, with front matter in the following format:

```yaml
---
title: "Post title"
description: "Short description"
date: "YYYY-MM-DD"
---
```

## Status

Work in progress — the next step is fully automating deployment (deploying to the VPS with no manual step) via SSH from GitHub Actions.
