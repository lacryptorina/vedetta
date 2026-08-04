// Vedetta x402 example client (x402 v2)
// 1) Fetches the free discovery manifest, 2) makes one paid call (/v1/feed, $0.005 USDC on Base).
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

// 1. Free discovery manifest
const manifest = await fetch(`${BASE_URL}/.well-known/x402.json`).then((r) => r.json());
const routes = Array.isArray(manifest?.resources) ? manifest.resources.length : "?";
console.log(`Discovery manifest OK — ${routes} x402 routes listed.`);

// 2. One paid call — /v1/feed ($0.005 USDC on Base, settles only on 2xx)
console.log("Calling /v1/feed (pays $0.005 USDC on Base)...");
const res = await fetchWithPay(`${BASE_URL}/v1/feed`);
if (!res.ok) {
  console.error(`Request failed: ${res.status} ${res.statusText}`);
  process.exit(1);
}
const data = await res.json();
const pretty = JSON.stringify(data, null, 2);
console.log(pretty.length > 1500 ? pretty.slice(0, 1500) + "\n... (truncated)" : pretty);
console.log("\nPaid call OK.");
