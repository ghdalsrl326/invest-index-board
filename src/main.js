const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const axios = require("axios");
const cheerio = require("cheerio");
const {
  SEND_SP500_PING,
  SEND_DOW_PING,
  SEND_NASDAQ_PING,
  SEND_NASDAQFUTURE_PING,
  SEND_SOX_PING,
  SEND_USDKRW_PING,
  SEND_KOSPI_PING,
  SEND_KOSDAQ_PING,
  SEND_US10YEARBOND_PING,
  SEND_SSEC_PING,
  SEND_BITCOIN_PING,
  SEND_KIMCHIPREMIUM_PING,
} = require("./constants");

function createWindow() {
  const win = new BrowserWindow({
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  win.maximize();
  win.show();
  win.loadURL("http://localhost:3000");
}

app.whenReady().then(() => {
  createWindow();
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

const headersInvestingCom = {
  Host: "www.investing.com",
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1 Safari/605.1.15",
  Accept:
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
  "Accept-Language": "ko-KR,ko;q=0.8,en-US;q=0.5,en;q=0.3",
  "Accept-Encoding": "gzip,deflate,compress",
  Connection: "keep-alive",
  "Upgrade-Insecure-Requests": "1",
  Pragma: "no-cache",
  "Cache-Control": "no-cache",
};

function getInvestingComIndices(url, event, replyChannel) {
  axios
    .get(url, { headers: headersInvestingCom })
    .then((html) => {
      const $ = cheerio.load(html.data);
      const price = $(
        ".instrument-price_instrument-price__xfgbB .text-2xl"
      ).text();
      console.log(`${replyChannel}: ${price}`);
      event.reply(replyChannel, price);
    })
    .catch((e) => {
      console.log("[Error] something wrong with axios, cheerio", e);
    });
}

function getInvestingComRateBonds(url, event, replyChannel) {
  axios
    .get(url, { headers: headersInvestingCom })
    .then((html) => {
      const $ = cheerio.load(html.data);
      const price = $(".arial_26").text();
      console.log(`${replyChannel}: ${price}`);
      event.reply(replyChannel, price);
    })
    .catch((e) => {
      console.log("[Error] something wrong with axios, cheerio", e);
    });
}

function getInvestingComCrypto(url, event, replyChannel) {
  axios
    .get(url, { headers: headersInvestingCom })
    .then((html) => {
      const $ = cheerio.load(html.data);
      const price = $(".pid-1057391-last").text();
      console.log(`${replyChannel}: ${price}`);
      event.reply(replyChannel, price);
    })
    .catch((e) => {
      console.log("[Error] something wrong with axios, cheerio", e);
    });
}

ipcMain.on(SEND_SP500_PING, (event, arg) => {
  const url = "https://www.investing.com/indices/us-spx-500";
  getInvestingComIndices(url, event, "REPLY_SP500_PING");
});

ipcMain.on(SEND_DOW_PING, (event, arg) => {
  const url = "https://www.investing.com/indices/us-30";
  getInvestingComIndices(url, event, "REPLY_DOW_PING");
});

ipcMain.on(SEND_NASDAQ_PING, (event, arg) => {
  const url = "https://www.investing.com/indices/nasdaq-composite";
  getInvestingComIndices(url, event, "REPLY_NASDAQ_PING");
});

ipcMain.on(SEND_NASDAQFUTURE_PING, (event, arg) => {
  const url = "https://www.investing.com/indices/nq-100-futures";
  getInvestingComIndices(url, event, "REPLY_NASDAQFUTURE_PING");
});

ipcMain.on(SEND_SOX_PING, (event, arg) => {
  const url = "https://www.investing.com/indices/phlx-semiconductor";
  getInvestingComIndices(url, event, "REPLY_SOX_PING");
});

ipcMain.on(SEND_USDKRW_PING, (event, arg) => {
  const url = "https://www.investing.com/currencies/usd-krw";
  getInvestingComIndices(url, event, "REPLY_USDKRW_PING");
});

ipcMain.on(SEND_KOSPI_PING, (event, arg) => {
  const url = "https://www.investing.com/indices/kospi";
  getInvestingComIndices(url, event, "REPLY_KOSPI_PING");
});

ipcMain.on(SEND_KOSDAQ_PING, (event, arg) => {
  const url = "https://www.investing.com/indices/kosdaq";
  getInvestingComIndices(url, event, "REPLY_KOSDAQ_PING");
});

ipcMain.on(SEND_US10YEARBOND_PING, (event, arg) => {
  const url = "https://www.investing.com/rates-bonds/u.s.-10-year-bond-yield";
  getInvestingComRateBonds(url, event, "REPLY_US10YEARBOND_PING");
});

ipcMain.on(SEND_SSEC_PING, (event, arg) => {
  const url = "https://www.investing.com/indices/shanghai-composite";
  getInvestingComIndices(url, event, "REPLY_SSEC_PING");
});

ipcMain.on(SEND_BITCOIN_PING, (event, arg) => {
  const url = "https://www.investing.com/crypto/bitcoin";
  getInvestingComCrypto(url, event, "REPLY_BITCOIN_PING");
});
