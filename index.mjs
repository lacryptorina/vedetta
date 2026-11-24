// Vedetta x402 example client (x402 v2)
// 1) Fetches the live discovery manifest.
// 2) Checks the only free route, /v1/track-record.
// 3) Makes one cached paid call (/v1/feed). Price is read from the manifest
//    (live catalog: cached $0.01, live desk $0.05, 23 tools). The SDK pays the 402 offer.
// Descriptive research, not financial advice.

import { readFileSync } from "node:fs";
import { privateKeyToAccount } from "viem/accounts";
import { wrapFetchWithPaymentFromConfig } from "@x402/fetch";
import { ExactEvmScheme } from "@x402/evm";

const BASE_URL = "https://vedetta.dethboy.com";

let pk;
try {
  pk = readFileSync("privatekey.txt", "utf8").trim();
} catch {
  console.error("Missing privatekey.txt — create it first (throwaway wallet with a little USDC on Base):");
  console.error("  echo 0xYOURBUYERWALLETPRIVATEKEY > privatekey.txt");
  process.exit(1);
}
if (!pk.startsWith("0x")) pk = "0x" + pk;

const account = privateKeyToAccount(pk);
const fetchWithPay = wrapFetchWithPaymentFromConfig(fetch, {
  schemes: [{ network: "eip155:8453", client: new ExactEvmScheme(account) }],
});

console.log("Paying wallet:", account.address);

// 1. Live discovery manifest — prices, not a hardcoded ladder
const manifest = await fetch(`${BASE_URL}/.well-known/x402.json`).then((r) => r.json());
const resources = Array.isArray(manifest?.resources) ? manifest.resources : [];
const free = Array.isArray(manifest?.free_endpoints) ? manifest.free_endpoints : [];
const feed = resources.find((r) => String(r?.url || "").endsWith("/v1/feed"));
const feedUsd = typeof feed?.price_usd === "number" ? feed.price_usd : null;
const priceLabel = feedUsd == null ? "the live 402 price" : `$${feedUsd.toFixed(2)}`;
console.log(
  `Discovery manifest OK — ${resources.length} paid x402 routes, ${free.length} free (/v1/track-record).`
);

// 2. Free track-record (HTTP 200, no payment)
const freeRes = await fetch(`${BASE_URL}/v1/track-record`);
await freeRes.arrayBuffer();
if (freeRes.status !== 200) {
  console.error(`Free /v1/track-record failed: HTTP ${freeRes.status}`);
  process.exit(1);
}
console.log("Free /v1/track-record → HTTP 200 (no payment).");

// 3. One cached paid call — /v1/feed (settles only on 2xx)
console.log(`Calling /v1/feed (cached read, pays ${priceLabel} USDC on Base)...`);
const res = await fetchWithPay(`${BASE_URL}/v1/feed`);
if (!res.ok) {
  console.error(`Request failed: ${res.status} ${res.statusText}`);
  process.exit(1);
}
const data = await res.json();
const pretty = JSON.stringify(data, null, 2);
console.log(pretty.length > 1500 ? pretty.slice(0, 1500) + "\n... (truncated)" : pretty);
console.log("\nPaid call OK.");
