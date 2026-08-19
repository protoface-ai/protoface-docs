# Protoface Developer Docs

This repository contains the documentation published at
[docs.protoface.com](https://docs.protoface.com).

The docs cover two parts of the Protoface API:

- Model inference, currently focused on video generation.
- Realtime avatars for agents, calls, and web experiences.

They also cover shared resources such as avatars, authentication, usage, limits,
and errors. Protoface Studio is the browser-based video editor; its interface is
not documented here.

Create an API key in the [Protoface dashboard](https://app.protoface.com).

## Run locally

```shell
npm install -g mint
mint dev
```

## Repository structure

- `docs.json` contains the Mintlify navigation and site configuration.
- `index.mdx` is the developer documentation homepage.
- `guides/` contains task-based guides.
- `reference/` contains shared behavior such as errors and limits.
- `api-reference/` contains the API reference introduction.
- `openapi.json` generates the endpoint reference.

## API Reference

The endpoint reference is generated from `openapi.json`. Update the API schema
from its source rather than editing generated endpoint pages by hand.

## Writing

Keep pages short and direct. Lead with the task, use working examples, and link
to the generated API reference for complete request and response schemas.
