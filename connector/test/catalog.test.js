import assert from "node:assert/strict";
import test from "node:test";
import { getMethod, METHODS, searchMethods } from "../src/catalog.js";

test("search finds public methods by intent", () => {
  assert.equal(searchMethods("verify jobs")[0].id, "job-search");
  assert.equal(searchMethods("resume")[0].id, "resume-tailoring");
  assert.equal(searchMethods("").length, METHODS.length);
});

test("fetch reads current main content on each request", async () => {
  let version = 1;
  const requests = [];
  const fetcher = async (url, options) => {
    requests.push({ url, options });
    return new Response(`current version ${version++}`, { status: 200 });
  };
  assert.equal((await getMethod("job-search", fetcher)).content, "current version 1");
  assert.equal((await getMethod("job-search", fetcher)).content, "current version 2");
  assert.equal(requests.length, 2);
  assert.ok(requests.every(({ url, options }) => url.startsWith("https://raw.githubusercontent.com/productdave/Job-Search-OS/main/job-search-os/SKILL.md?read=") && options.cache === "no-store"));
});

test("only allowlisted methods can be fetched", async () => {
  let called = false;
  await assert.rejects(getMethod("../../profile.md", async () => { called = true; }), /Unknown method ID/);
  assert.equal(called, false);
});

test("upstream failures do not return stale instructions", async () => {
  await assert.rejects(getMethod("job-search", async () => new Response("missing", { status: 404 })), /GitHub returned 404/);
});
