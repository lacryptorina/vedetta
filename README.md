# Vedetta

Vedetta is the [korra.finance](https://korra.finance) pay-per-call market intelligence API for AI agents. It sells sentiment-vs-price divergence verdicts across crypto, US stocks and macro, live analyst answers, falsifiable predictions, and a verifiable track record — over the x402 payment protocol.

No signup. No API keys. Your agent pays per request in USDC on Base. Payment settles only on successful (2xx) responses.

> Descriptive research, not financial advice.

## How it works

1. Your client requests an endpoint (e.g. `GET /v1/snapshot`).
2. The server replies `402 Payment Required` with a machine-readable offer (price, network, receiving address).
3. An x402 client SDK (e.g. `x402-fetch`) signs a USDC (Base) payment with your wallet and retries automatically.
4. You get the full JSON payload back.

## Example client (this repo)

This repo includes a minimal working Node client — `index.mjs` — that fetches Vedetta's free discovery manifest, then makes one paid call.

```bash
npm install
echo 0xYOURBUYERWALLETPRIVATEKEY > privatekey.txt
npm start
```

`privatekey.txt` holds the key of the wallet that **pays** for calls (needs a little USDC on Base). Use a throwaway wallet. The file is gitignored and stays local — never commit it.

## Endpoints

20 routes, $0.005–$0.09 USDC per call. Highlights:

| Route | Price | What it does |
|---|---|---|
| `/v1/ask` | $0.09 | Free-form market question |
| `/v1/consensus` | $0.09 | Sentiment-vs-price divergence verdict |
| `/v1/screener` | $0.03 | All assets' cached signals + divergence flags |
| `/v1/snapshot` | $0.02 | Latest cached signal with age stamp |
| `/v1/history` | $0.01 | Backtest-ready signal history |
| `/v1/feed` | $0.005 | Cached desk posts stream |

Full list, parameters, and current prices: [`/openapi.json`](https://vedetta.dethboy.com/openapi.json) · [`/endpoints.txt`](https://vedetta.dethboy.com/endpoints.txt) · agent directives at [`/llms.txt`](https://vedetta.dethboy.com/llms.txt) · x402 metadata at [`/.well-known/x402.json`](https://vedetta.dethboy.com/.well-known/x402.json)

Every route returns descriptive research, not financial advice.

## Other ways to use Vedetta

- **Site:** [vedetta.dethboy.com](https://vedetta.dethboy.com)
- **Hermes agent skill (Nous Research):** `hermes skills install https://vedetta.dethboy.com/SKILL.md --name vedetta`
- **MCP / assistants:** hosted agent card at [`/vedetta.md`](https://vedetta.dethboy.com/vedetta.md)
- **All install options:** [`/install`](https://vedetta.dethboy.com/install)
- **Agentverse (human chat not working):** (https://agentverse.ai/agents/details/agent1qg6hwwk7zltxq7pamh4ufw04kjywl2ntrkgspmvhdq5yc3mkkjjmk872mxn/profile)

## License

MIT
