import assert from "node:assert/strict";
import test from "node:test";
import { renderSupportedModels } from "./sync-supported-models.mjs";

const model = {
  id: "openai/gpt-image-2",
  display_name: "GPT Image 2",
  available: true,
  output_modalities: ["image"],
  operations: { "image.generate": {} },
};

test("publishes inference identities and types without pricing or private fields", () => {
  const output = renderSupportedModels(
    [
      {
        ...model,
        pricing: { secret: "private-price" },
        private_route: "private-route",
      },
      {
        ...model,
        id: "example/realtime",
        operations: { "realtime.session": {} },
      },
      { ...model, id: "example/internal", internal_only: true },
      { ...model, id: "example/hidden", catalog_visible: false },
      { ...model, id: "example/unavailable", available: false },
    ],
    new Set(["openai"]),
  );
  assert.match(output, /GPT Image 2/);
  assert.match(output, /images\/providers\/openai\.png/);
  assert.match(output, /\| Image \|/);
  assert.doesNotMatch(
    output,
    /private-price|private-route|realtime|internal|hidden|unavailable/,
  );
});

test("escapes MDX table content and supports multiple output types", () => {
  const output = renderSupportedModels([
    {
      ...model,
      display_name: "Image | {video}",
      output_modalities: ["video", "image", "video"],
      operations: { "image.generate": {}, "video.generate": {} },
    },
  ]);
  assert.match(output, /Image &#124; &#123;video&#125;/);
  assert.match(output, /\| Image, Video \|/);
});

test("classifies video soundtracks separately from standalone audio operations", () => {
  const output = renderSupportedModels([
    {
      ...model,
      id: "example/video",
      output_modalities: ["video", "audio"],
      operations: { "video.general": {} },
    },
    {
      ...model,
      id: "example/music",
      output_modalities: ["audio"],
      operations: { "music.generate": {} },
    },
    {
      ...model,
      id: "example/speech",
      output_modalities: ["audio"],
      operations: { "speech.generate": {} },
    },
    {
      ...model,
      id: "example/audio",
      output_modalities: ["audio"],
      operations: { "audio.generate": {} },
    },
    {
      ...model,
      id: "example/3d",
      output_modalities: ["model.3d"],
      operations: { "3d.generate": {} },
    },
    {
      ...model,
      id: "example/mixed",
      output_modalities: ["video", "audio"],
      operations: { "video.general": {}, "audio.generate": {} },
    },
  ]);
  assert.match(output, /`example\/video`.*\| Video \|/);
  for (const id of ["music", "speech", "audio"])
    assert.match(output, new RegExp("`example/" + id + "`.*\\| Audio \\|"));
  assert.match(output, /`example\/3d`.*\| 3D \|/);
  assert.match(output, /`example\/mixed`.*\| Audio, Video \|/);
});

test("refuses an empty, duplicate, or unknown output catalog", () => {
  assert.throws(
    () => renderSupportedModels([]),
    /No supported inference models/,
  );
  assert.throws(
    () => renderSupportedModels([model, model]),
    /Duplicate model ID/,
  );
  assert.throws(
    () => renderSupportedModels([{ ...model, output_modalities: ["unknown"] }]),
    /Unknown model output type/,
  );
});
