# MKT Live (iPhone Home Screen and Mac browser)

Live US-market movement dashboard as a static PWA. Same futuristic look as BTC Live.

Live at [https://cofcgrad95.github.io/market-grid/](https://cofcgrad95.github.io/market-grid/). Source: [cofcgrad95/market-grid](https://github.com/cofcgrad95/market-grid).

## What it tracks

Default watchlist: the S&P 500 index (SPX), SPY, QQQ, the Mag 7 (AAPL, MSFT, NVDA, AMZN, GOOGL, META, TSLA), the VIX, and the ICE U.S. Dollar Index (DXY). You can add or remove tickers, including the defaults. The list is saved in this browser only.

Each tile shows today’s % change, today’s volume versus a 10-day average (with a Low / Normal / High tag), a linked price-and-volume intraday chart, premarket and after-hours moves, and week / month / year-to-date changes. The main chart is a two-pane graphic (price on top, green/red volume bars below, shared time axis and a linked crosshair). Times are Pacific Time (PT). Indexes such as SPX, VIX, and DXY do not publish share volume.

## Data sources

- **Live quotes, official SPX / VIX / DXY, and extended-hours moves** come from CNBC’s public quote API (no key, CORS-enabled). This is an unofficial feed and can change without notice. If it fails, that ticker shows an error or stale state — prices are never invented.
- **Intraday charts and week / month / YTD** need a free [Twelve Data](https://twelvedata.com/register) Basic API key. Paste it in Settings. The key stays in `localStorage` on this device and is never committed to the repo.

Twelve Data’s free plan is 8 API credits per minute and 800 per day. The app queues chart requests to stay inside that cap. Their Basic license is listed as “internal non-display usage”; this page uses your own key for a personal dashboard.

## Add to an iPhone Home Screen

1. Open the site in **Safari** (not Chrome).
2. Tap the Share button, then **Add to Home Screen**.
3. The icon should read **MKT Live**.
4. Open it from the Home Screen so it runs standalone.

On a Mac, open the same link in Safari or Chrome.

Display only — this page never places orders, never connects to a brokerage account, and never sends your API key anywhere except Twelve Data’s official API from your browser.
