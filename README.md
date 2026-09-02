# Protoface developer docs

Source for [docs.protoface.com](https://docs.protoface.com).

These are the public developer docs for the Protoface API, covering model
inference, Protoface Realtime, and the resources shared between them:
avatars, authentication, usage, limits, and errors. Protoface Studio, the
browser-based video editor, is not documented here.

## Run locally

```shell
npm install -g mint
mint dev
```

Requires Node 20.17+. The preview runs at `http://localhost:3000`.

## Repository structure

- `docs.json`: Mintlify navigation and site configuration
- `index.mdx`: docs homepage
- `quickstart.mdx`: realtime quickstart
- `guides/`: task-based guides
- `reference/`: errors, credits, limits
- `api-reference/`: API reference introduction
- `openapi.json`: generated endpoint reference

The published site also serves `/llms.txt` and `/llms-full.txt` for agents.

## Writing

Keep pages short and direct. Lead with the task, use working examples,
and link to the generated API reference for complete request and response
schemas.

The endpoint reference is generated from `openapi.json`. Update the API
schema from its source rather than editing that file or the generated
endpoint pages by hand.
