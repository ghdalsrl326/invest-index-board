const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
const pie = require("puppeteer-in-electron");
const puppeteer = require("puppeteer-core");
const { investing } = require("investing-com-api");

const {
  SEND_BITCOIN_PING,
  SEND_DOW_PING,
  SEND_KIMCHIPREMIUM_PING,
  SEND_KOSDAQ_PING,
  SEND_KOSPI_PING,
  SEND_NASDAQFUTURE_PING,
  SEND_NASDAQ_PING,
  SEND_SOX_PING,
  SEND_SP500_PING,
  SEND_SSEC_PING,
  SEND_US10YEARBOND_PING,
  SEND_USDKRW_PING,
  REPLY_SP500_PING,
  REPLY_DOW_PING,
  REPLY_NASDAQ_PING,
  REPLY_NASDAQFUTURE_PING,
  REPLY_SOX_PING,
  REPLY_USDKRW_PING,
  REPLY_KOSPI_PING,
  REPLY_KOSDAQ_PING,
  REPLY_US10YEARBOND_PING,
  REPLY_SSEC_PING,
  REPLY_BITCOIN_PING,
  REPLY_KIMCHIPREMIUM_PING,
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
  if (isDev) {
    win.loadURL("http://localhost:3000");
  } else {
    win.loadFile(path.join(__dirname, "../build/index.html"));
  }
}

const initPuppeteer = async () => {
  await pie.initialize(app);
};
initPuppeteer();

async function getKimchiPremium(event, replyChannel) {
  const browser = await pie.connect(app, puppeteer);

  const window = new BrowserWindow({ show: false });
  const url = "https://cryprice.com/";
  await window.loadURL(url);

  const page = await pie.getPage(browser, window);
  await page.waitForSelector("#upbit_binance_btc", { visible: true });
  const data = await page.$("#upbit_binance_btc");
  const evalData = await page.evaluate((element) => {
    return element.textContent
      .split(" ")
      .at(-1)
      .replace("(", "")
      .replace(")", "");
  }, data);
  event.reply(replyChannel, evalData);
  window.destroy();
}

async function getBitcoin(event, replyChannel) {
  try {
    const browser = await pie.connect(app, puppeteer);

    const window = new BrowserWindow({ show: false });
    const url = "https://cryprice.com/";
    await window.loadURL(url);

    const page = await pie.getPage(browser, window);
    await page.waitForSelector("#upbit_binance_btc", { visible: true });
    const data = await page.$("#upbit_binance_btc");
    const evalData = await page.evaluate((element) => {
      return (
        element.textContent
          .split(" ")
          .at(4)
          .replaceAll("\n", "")
          .replaceAll("\t", "") +
        " " +
        element.textContent.split(" ").at(7)
      );
    }, data);
    // console.log(evalData);
    event.reply(replyChannel, evalData);
    window.destroy();
  } catch (err) {
    console.error(err);
  }
}

app.whenReady().then(() => {
  createWindow();
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

async function getInvestingCom(pairId, event, replyChannel) {
  try {
    const apiResponse = await investing(pairId, undefined, "P1D", 120);
    const price = apiResponse.at(-1).price_close.toFixed(2).toLocaleString();
    let priceChange = (
      apiResponse.at(-1).price_close - apiResponse.at(-2).price_close
    )
      .toFixed(2)
      .toLocaleString();
    const priceChangePercentage = (
      (priceChange * 100) /
      apiResponse.at(-2).price_close
    )
      .toFixed(2)
      .toLocaleString();
    const res = price + " " + priceChange + " " + priceChangePercentage;
    console.log(`${replyChannel}: ${res}`);
    event.reply(replyChannel, res);
  } catch (err) {
    console.error(err);
  }
}

async function getInvestingComCurrencies(pairId, event, replyChannel) {
  try {
    const apiResponse = await investing(pairId, "P1D", "PT15M", 120);
    const price = apiResponse.at(-1).price_close.toFixed(2).toLocaleString();
    let priceChange = (
      apiResponse.at(-1).price_close - apiResponse.at(0).price_close
    )
      .toFixed(2)
      .toLocaleString();
    const priceChangePercentage = (
      (priceChange * 100) /
      apiResponse.at(0).price_close
    )
      .toFixed(2)
      .toLocaleString();
    const res = price + " " + priceChange + " " + priceChangePercentage;
    console.log(`${replyChannel}: ${res}`);
    event.reply(replyChannel, res);
  } catch (err) {
    console.error(err);
  }
}

async function getInvestingComRatesBonds(pairId, event, replyChannel) {
  try {
    const apiResponse = await investing(pairId, "P1D", "PT30M", 120);
    const price = apiResponse.at(-1).price_close.toFixed(3).toLocaleString();
    let priceChange = (
      apiResponse.at(-1).price_close - apiResponse.at(-2).price_close
    )
      .toFixed(3)
      .toLocaleString();
    const priceChangePercentage = (
      (priceChange * 100) /
      apiResponse.at(-2).price_close
    )
      .toFixed(2)
      .toLocaleString();
    const res = price + " " + priceChange + " " + priceChangePercentage;
    console.log(`${replyChannel}: ${res}`);
    event.reply(replyChannel, res);
  } catch (err) {
    console.error(err);
  }
}

ipcMain.on(SEND_SP500_PING, (event, arg) => {
  // const url = "https://www.investing.com/indices/us-spx-500";
  const pairId = "indices/us-spx-500";
  getInvestingCom(pairId, event, REPLY_SP500_PING);
});

ipcMain.on(SEND_DOW_PING, (event, arg) => {
  // const url = "https://www.investing.com/indices/us-30";
  const pairId = "indices/us-30";
  getInvestingCom(pairId, event, REPLY_DOW_PING);
});

ipcMain.on(SEND_NASDAQ_PING, (event, arg) => {
  // const url = "https://www.investing.com/indices/nasdaq-composite";
  const pairId = "14958";
  getInvestingCom(pairId, event, REPLY_NASDAQ_PING);
});

ipcMain.on(SEND_NASDAQFUTURE_PING, (event, arg) => {
  // const url = "https://www.investing.com/indices/nq-100-futures";
  const pairId = "indices/nq-100-futures";
  getInvestingCom(pairId, event, REPLY_NASDAQFUTURE_PING);
});

ipcMain.on(SEND_SOX_PING, (event, arg) => {
  // const url = "https://www.investing.com/indices/phlx-semiconductor";
  const pairId = "40034";
  getInvestingCom(pairId, event, REPLY_SOX_PING);
});

ipcMain.on(SEND_USDKRW_PING, (event, arg) => {
  // const url = "https://www.investing.com/currencies/usd-krw";
  const pairId = "currencies/usd-krw";
  getInvestingComCurrencies(pairId, event, REPLY_USDKRW_PING);
});

ipcMain.on(SEND_KOSPI_PING, (event, arg) => {
  // const url = "https://www.investing.com/indices/kospi";
  const pairId = "37426";
  getInvestingCom(pairId, event, REPLY_KOSPI_PING);
});

ipcMain.on(SEND_KOSDAQ_PING, (event, arg) => {
  // const url = "https://www.investing.com/indices/kosdaq";
  const pairId = "38016";
  getInvestingCom(pairId, event, REPLY_KOSDAQ_PING);
});

ipcMain.on(SEND_US10YEARBOND_PING, (event, arg) => {
  // const url = "https://www.investing.com/rates-bonds/u.s.-10-year-bond-yield";
  const pairId = "23705";
  getInvestingComRatesBonds(pairId, event, REPLY_US10YEARBOND_PING);
});

ipcMain.on(SEND_SSEC_PING, (event, arg) => {
  // const url = "https://www.investing.com/indices/shanghai-composite";
  const pairId = "40820";
  getInvestingCom(pairId, event, REPLY_SSEC_PING);
});

ipcMain.on(SEND_BITCOIN_PING, (event, arg) => {
  // const url = "https://www.investing.com/crypto/bitcoin";
  // const pairId = "1057391";
  getBitcoin(event, REPLY_BITCOIN_PING);
});

ipcMain.on(SEND_KIMCHIPREMIUM_PING, (event, arg) => {
  getKimchiPremium(event, REPLY_KIMCHIPREMIUM_PING);
});
