# Vedetta

Pay-per-call market sentiment divergence intelligence. 23 tools. Free track-record.

Vedetta is the [korra.finance](https://korra.finance) pay-per-call market intelligence API for AI agents. It sells sentiment-vs-price divergence verdicts across crypto, US stocks and macro, live analyst answers, falsifiable predictions, and a verifiable track record — over the x402 payment protocol.

No signup. No API keys. Your agent pays per request in USDC on Base (`/v1/*`) or Solana (`/sol/v1/*`, same path after `/sol`). Payment settles only on successful (2xx) responses. The HTTP 402 offer is the authoritative price.

> Descriptive research, not financial advice.

## Pricing

| Tier | Price | Routes |
|---|---|---|
| Free | Free | `/v1/track-record` only |
| Cached | $0.01 USDC | feed, snapshot, history, screener, route, and `/v1/korra/{calls,news,lean}` |
| Live desk | $0.05 USDC | 14 analyst reads (ask, consensus, equity, macro, prediction, pulse, theme, trend, news-read, house-view, event, odds, social, narrative) |

23 routes: 1 free + 8 cached + 14 live. The same 23 tools ship in `vedetta-mcp@2.0.9`. Buyer skill package **2.14.4**.

Same prices on both rails. Virtuals ACP escrow matches this ladder: live reads $0.05, cached Divergence screener and Sentiment snapshot $0.01.

## How it works

1. Your client requests an endpoint (for example `GET /v1/snapshot`, or the free `GET /v1/track-record`).
2. A paid route replies `402 Payment Required` with a machine-readable offer (price, network, receiving address). `/v1/track-record` returns `200` with no payment.
3. An x402 v2 client SDK (for example `@x402/fetch`) signs a USDC payment with your wallet and retries automatically.
4. You get the full JSON payload back.

## Example client (this repo)

`index.mjs` fetches the live discovery manifest, checks the free track-record, then makes one cached paid call to `/v1/feed`. The logged price is the manifest `price_usd` (currently **$0.01** USDC on Base). It does not hardcode an amount; the SDK pays the 402 offer.

```bash
npm install
echo 0xYOURBUYERWALLETPRIVATEKEY > privatekey.txt
npm start
```

`privatekey.txt` holds the key of the wallet that **pays** for calls (needs a little USDC on Base for the feed call). Use a throwaway wallet. The file is gitignored and stays local — never commit it.

## Endpoints

| Route | Price | What it does |
|---|---|---|
| `/v1/track-record` | Free | Verifiable logged signal and call history |
| `/v1/feed` | $0.01 | Recent desk posts as a cached stream |
| `/v1/snapshot` | $0.01 | Latest cached signal with an age timestamp |
| `/v1/history` | $0.01 | Cached signal history |
| `/v1/screener` | $0.01 | Cross-asset divergence screener |
| `/v1/route` | $0.01 | Plain-English task in; endpoint, params, and price out |
| `/v1/korra/calls` | $0.01 | Korra open calls and recent hit/miss |
| `/v1/korra/news` | $0.01 | Korra scored news stories |
| `/v1/korra/lean` | $0.01 | Korra lean gauge readings |
| `/v1/ask` | $0.05 | Live analyst answer to a free-form question |
| `/v1/consensus` | $0.05 | Sentiment × live price → divergence verdict |
| `/v1/equity` | $0.05 | Divergence read on a US stock ticker |
| `/v1/macro` | $0.05 | Analyst read on a macro instrument |
| `/v1/prediction` | $0.05 | Falsifiable prediction: claim, confidence, invalidation |
| `/v1/pulse` | $0.05 | Market-wide regime read |
| `/v1/theme` | $0.05 | Theme or narrative deep-dive |
| `/v1/trend` | $0.05 | Price-vs-sentiment trajectory over 24h / 7d / 30d |
| `/v1/news-read` | $0.05 | Market-moving story and the sentiment read on it |
| `/v1/house-view` | $0.05 | The desk’s current thesis and conviction |
| `/v1/event` | $0.05 | Live trigger probe, or a clean no-event |
| `/v1/odds` | $0.05 | Prediction-market odds vs social sentiment |
| `/v1/social` | $0.05 | Social sentiment: bullish %, score, volume trend |
| `/v1/narrative` | $0.05 | Dominant narrative and whether it changed in 24h |

Solana twins use the same prices at `/sol/v1/...`.

Full list and current prices: [`/endpoints.txt`](https://vedetta.dethboy.com/endpoints.txt) · [`/openapi.json`](https://vedetta.dethboy.com/openapi.json) · [`/llms.txt`](https://vedetta.dethboy.com/llms.txt) · [`/.well-known/x402.json`](https://vedetta.dethboy.com/.well-known/x402.json)

Every route returns descriptive research, not financial advice. Every resolved call is scored hit or miss by Korra. The running hit rate is public and free at `/v1/track-record`.

## Other ways to use Vedetta

- **Site:** [vedetta.dethboy.com](https://vedetta.dethboy.com)
- **MCP (23 tools):** `npx -y vedetta-mcp@2.0.9` — pin **2.0.9**. Health: [`/mcp-health`](https://vedetta.dethboy.com/mcp-health). Install: [`/install`](https://vedetta.dethboy.com/install)
- **Buyer skill 2.14.4:** `hermes skills install https://vedetta.dethboy.com/SKILL.md --name vedetta`
- **Agent card:** [`/vedetta.md`](https://vedetta.dethboy.com/vedetta.md)
- **Agentverse:** [vedetta profile](https://agentverse.ai/agents/details/agent1qg6hwwk7zltxq7pamh4ufw04kjywl2ntrkgspmvhdq5yc3mkkjjmk872mxn/profile)

## License

MIT
