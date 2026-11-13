# Protoface Docs

The Protoface docs are live here: [docs.protoface.com](https://docs.protoface.com/?utm_source=github&utm_medium=referral&utm_campaign=github_docs&utm_content=protoface-docs)

## About Protoface

Protoface is a cost-effective generative media inference platform, running frontier models for video, images, speech, music, 3D assets, and realtime avatars behind a single API key. Now with the cheapest [Seedance 2.5 API](https://docs.protoface.com/guides/generate-video), alongside [MiniMax H3](https://docs.protoface.com/guides/model-inference) and more. Read the docs (published from this repo) to find out more!

Get a **free** API key at [protoface.com](https://protoface.com/?utm_source=github&utm_medium=referral&utm_campaign=github_docs&utm_content=protoface-docs).

Want to get started quickly? Check out the [Quickstart Repo](https://github.com/protoface-ai/protoface-quickstart), which has examples you can easily clone and run in under 5 minutes.

## For Docs Developers

To run the docs locally:

```sh
npm install -g mint
mint dev
```

## API Reference

The API reference is generated from `openapi.json`.

## Supported models table

The Models page includes a generated inference model table. Refresh it from
the live catalog with an API key supplied through the environment:

```sh
node scripts/sync-supported-models.mjs
```

Set `PROTOFACE_API_KEY` before running the command. Alternatively, use an
exported `GET /v1/models` response:

```sh
node scripts/sync-supported-models.mjs --catalog models.json
node scripts/sync-supported-models.mjs --catalog models.json --check
node --test scripts/sync-supported-models.test.mjs
```

Only public, available inference models are included. The generated table
contains model names, IDs, providers, and types derived from supported inference
operations. Video with a soundtrack is listed as Video; Audio denotes standalone
audio, speech, or music operations. Add provider marks
under `images/providers/<owner>.png` as new providers join the catalog.
