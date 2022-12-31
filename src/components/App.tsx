import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Icon,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  Slider,
} from "@mui/material";
import { useEffect, useState } from "react";
import Clock from "react-live-clock";
import {
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
} from "../constants";
import "./App.scss";
import "@fontsource/inter";
import DownloadIcon from "@mui/icons-material/Download";
import UploadIcon from "@mui/icons-material/Upload";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import SlideShow from "./SlideShow";
import SlideSettings from "./SlideSettings";

function App() {
  const { ipcRenderer } = window.require("electron");
  const [SP500p, setSP500p] = useState("");
  const [SP500pc, setSP500pc] = useState("");
  const [SP500pcp, setSP500pcp] = useState("");
  const [DOWp, setDOWp] = useState("");
  const [DOWpc, setDOWpc] = useState("");
  const [DOWpcp, setDOWpcp] = useState("");
  const [NASDAQp, setNASDAQp] = useState("");
  const [NASDAQpc, setNASDAQpc] = useState("");
  const [NASDAQpcp, setNASDAQpcp] = useState("");
  const [NASDAQFUTUREp, setNASDAQFUTUREp] = useState("");
  const [NASDAQFUTUREpc, setNASDAQFUTUREpc] = useState("");
  const [NASDAQFUTUREpcp, setNASDAQFUTUREpcp] = useState("");
  const [SOXp, setSOXp] = useState("");
  const [SOXpc, setSOXpc] = useState("");
  const [SOXpcp, setSOXpcp] = useState("");
  const [USDKRWp, setUSDKRWp] = useState("");
  const [USDKRWpc, setUSDKRWpc] = useState("");
  const [USDKRWpcp, setUSDKRWpcp] = useState("");
  const [KOSPIp, setKOSPIp] = useState("");
  const [KOSPIpc, setKOSPIpc] = useState("");
  const [KOSPIpcp, setKOSPIpcp] = useState("");
  const [KOSDAQp, setKOSDAQp] = useState("");
  const [KOSDAQpc, setKOSDAQpc] = useState("");
  const [KOSDAQpcp, setKOSDAQpcp] = useState("");
  const [US10YEARBONDp, setUS10YEARBONDp] = useState("");
  const [US10YEARBONDpc, setUS10YEARBONDpc] = useState("");
  const [US10YEARBONDpcp, setUS10YEARBONDpcp] = useState("");
  const [SSECp, setSSECp] = useState("");
  const [SSECpc, setSSECpc] = useState("");
  const [SSECpcp, setSSECpcp] = useState("");
  const [BITCOINp, setBITCOINp] = useState("");
  const [BITCOINpc, setBITCOINpc] = useState("");
  const [BITCOINpcp, setBITCOINpcp] = useState("");
  const [KIMCHIPREMIUMp, setKIMCHIPREMIUMp] = useState("");
  const [KIMCHIPREMIUMpc, setKIMCHIPREMIUMpc] = useState("");
  const [KIMCHIPREMIUMpcp, setKIMCHIPREMIUMpcp] = useState("");

  const sendPing = () => {
    ipcRenderer.send(SEND_SP500_PING, "send");
    ipcRenderer.send(SEND_DOW_PING, "send");
    ipcRenderer.send(SEND_NASDAQ_PING, "send");
    ipcRenderer.send(SEND_NASDAQFUTURE_PING, "send");
    ipcRenderer.send(SEND_SOX_PING, "send");
    ipcRenderer.send(SEND_USDKRW_PING, "send");
    ipcRenderer.send(SEND_KOSPI_PING, "send");
    ipcRenderer.send(SEND_KOSDAQ_PING, "send");
    ipcRenderer.send(SEND_US10YEARBOND_PING, "send");
    ipcRenderer.send(SEND_SSEC_PING, "send");
    ipcRenderer.send(SEND_BITCOIN_PING, "send");
    ipcRenderer.send(SEND_KIMCHIPREMIUM_PING, "send");

    replyPing();
  };

  const replyParser = (res: string): string[] => {
    const entireMessage = res.split(" ");
    return entireMessage;
  };

  const replyPing = () => {
    ipcRenderer.once(REPLY_SP500_PING, (event, res) => {
      const [price, priceChange, priceChangePercentage] = replyParser(res);
      setSP500p(price);
      setSP500pc(priceChange);
      setSP500pcp(priceChangePercentage);
    });
    ipcRenderer.once(REPLY_DOW_PING, (event, res) => {
      const [price, priceChange, priceChangePercentage] = replyParser(res);
      setDOWp(price);
      setDOWpc(priceChange);
      setDOWpcp(priceChangePercentage);
    });
    ipcRenderer.once(REPLY_NASDAQ_PING, (event, res) => {
      const [price, priceChange, priceChangePercentage] = replyParser(res);
      setNASDAQp(price);
      setNASDAQpc(priceChange);
      setNASDAQpcp(priceChangePercentage);
    });
    ipcRenderer.once(REPLY_NASDAQFUTURE_PING, (event, res) => {
      const [price, priceChange, priceChangePercentage] = replyParser(res);
      setNASDAQFUTUREp(price);
      setNASDAQFUTUREpc(priceChange);
      setNASDAQFUTUREpcp(priceChangePercentage);
    });
    ipcRenderer.once(REPLY_SOX_PING, (event, res) => {
      const [price, priceChange, priceChangePercentage] = replyParser(res);
      setSOXp(price);
      setSOXpc(priceChange);
      setSOXpcp(priceChangePercentage);
    });
    ipcRenderer.once(REPLY_USDKRW_PING, (event, res) => {
      const [price, priceChange, priceChangePercentage] = replyParser(res);
      setUSDKRWp(price);
      setUSDKRWpc(priceChange);
      setUSDKRWpcp(priceChangePercentage);
    });
    ipcRenderer.once(REPLY_KOSPI_PING, (event, res) => {
      const [price, priceChange, priceChangePercentage] = replyParser(res);
      setKOSPIp(price);
      setKOSPIpc(priceChange);
      setKOSPIpcp(priceChangePercentage);
    });
    ipcRenderer.once(REPLY_KOSDAQ_PING, (event, res) => {
      const [price, priceChange, priceChangePercentage] = replyParser(res);
      setKOSDAQp(price);
      setKOSDAQpc(priceChange);
      setKOSDAQpcp(priceChangePercentage);
    });
    ipcRenderer.once(REPLY_US10YEARBOND_PING, (event, res) => {
      const [price, priceChange, priceChangePercentage] = replyParser(res);
      setUS10YEARBONDp(price);
      setUS10YEARBONDpc(priceChange);
      setUS10YEARBONDpcp("(" + priceChangePercentage + ")");
    });
    ipcRenderer.once(REPLY_SSEC_PING, (event, res) => {
      const [price, priceChange, priceChangePercentage] = replyParser(res);
      setSSECp(price);
      setSSECpc(priceChange);
      setSSECpcp(priceChangePercentage);
    });
    ipcRenderer.once(REPLY_BITCOIN_PING, (event, res) => {
      const [price, priceChange, priceChangePercentage] = replyParser(res);
      setBITCOINp(price);
      setBITCOINpc(priceChange);
      setBITCOINpcp("(" + priceChangePercentage + ")");
    });
    ipcRenderer.once(REPLY_KIMCHIPREMIUM_PING, (event, res) => {
      setKIMCHIPREMIUMpc(res);
    });
  };

  function switchArroow(
    price: string,
    priceChange: string,
    priceChangePercentage: string
  ) {
    switch (priceChange.charAt(0)) {
      case "+":
        return (
          <Box
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            <Box sx={{ color: "#D02C2C", fontSize: "1.6rem" }}>{price}</Box>
            <UploadIcon fontSize="medium" sx={{ color: "#D02C2C" }} />
            <Box sx={{ color: "#D02C2C" }}>
              {priceChange} {priceChangePercentage}
            </Box>
          </Box>
        );
      case "-":
        return (
          <Box
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            <Box sx={{ color: "#127EFF", fontSize: "1.6rem" }}>{price}</Box>
            <DownloadIcon fontSize="medium" sx={{ color: "#127EFF" }} />
            <Box sx={{ color: "#127EFF" }}>
              {priceChange} {priceChangePercentage}
            </Box>
          </Box>
        );
      default:
        return (
          <Box
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            <Box sx={{ fontSize: "1.6rem" }}>{price}</Box>
            <HorizontalRuleIcon fontSize="medium" />
            <Box>
              {priceChange} {priceChangePercentage}
            </Box>
          </Box>
        );
    }
  }

  function switchArrowKimchi(priceChange: string) {
    if (parseFloat(priceChange.replace("%", "")) > 0) {
      return (
        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <Box sx={{ color: "#D02C2C", fontSize: "1.6rem" }}>{priceChange}</Box>
          <UploadIcon fontSize="medium" sx={{ color: "#D02C2C" }} />
        </Box>
      );
    } else if (parseFloat(priceChange.replace("%", "")) < 0) {
      return (
        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <Box sx={{ color: "#127EFF", fontSize: "1.6rem" }}>{priceChange}</Box>
          <DownloadIcon fontSize="medium" sx={{ color: "#127EFF" }} />
        </Box>
      );
    } else {
      return (
        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <Box>{priceChange}</Box>
          <HorizontalRuleIcon fontSize="medium" />
        </Box>
      );
    }
  }

  const today = new Date();

  useEffect(() => {
    sendPing();
  }, []);

  return (
    <Box className="box-outter-app">
      <Box className="box-timezone">
        <Box className="box-timezone-date">{`${today.getFullYear()}년 ${
          today.getMonth() + 1
        }월 ${today.getDate()}일`}</Box>
        <Box className="box-timezone-clock">
          <Box className="box-timzone-utc">
            <>{"협정세계시(UTC) "}</>
            <Clock
              format={"HH:mm"}
              ticking={true}
              timezone={"UTC"}
              onChange={async () => {
                console.log(new Date().getSeconds());
                if (new Date().getSeconds() === 0) {
                  await sendPing();
                }
              }}
            />
            {/* <button onClick={() => sendPing()}>send ping</button> */}
          </Box>
          <Box className="box-timzone-us">
            <>{" 미국시간 "}</>
            <Clock format={"HH:mm"} ticking={true} timezone={"US/Eastern"} />
          </Box>
          <Box className="box-timzone-rok">
            <>{" 한국시간 "}</>
            <Clock format={"HH:mm"} ticking={true} timezone={"ROK"} />
          </Box>
        </Box>
      </Box>
      <Box className="box-content">
        <Box className="box-left-column">
          <Box className="box-sp500">
            <div className="div-sp500-title">{"S&P500"}</div>
            <div className="div-sp500-subtitle">{"S&P500 (24H 변동 %)"}</div>
            <div className="div-sp500-price">
              {switchArroow(SP500p, SP500pc, SP500pcp)}
            </div>
          </Box>
          <Box className="box-dow">
            <div className="div-dow-title">{"DJI"}</div>
            <div className="div-dow-subtitle">{"다우 (24H 변동 %)"}</div>
            <div className="div-dow-price">
              {switchArroow(DOWp, DOWpc, DOWpcp)}
            </div>
          </Box>
          <Box className="box-nasdaq">
            <div className="div-nasdaq-title">{"IXIC"}</div>
            <div className="div-nasdaq-subtitle">{"나스닥 (24H 변동 %)"}</div>
            <div className="div-nasdaq-price">
              {switchArroow(NASDAQp, NASDAQpc, NASDAQpcp)}
            </div>
          </Box>
          <Box className="box-nasdaqfuture">
            <div className="div-nasdaqfuture-title">{"Nasdaq 100 Futures"}</div>
            <div className="div-nasdaqfuture-subtitle">
              {"나스닥 선물 (24H 변동 %)"}
            </div>
            <div className="div-nasdaqfuture-price">
              {switchArroow(NASDAQFUTUREp, NASDAQFUTUREpc, NASDAQFUTUREpcp)}
            </div>
          </Box>
          <Box className="box-sox">
            <div className="div-sox-title">{"SOX"}</div>
            <div className="div-sox-subtitle">
              {"필라델피아반도체 (24H 변동 %)"}
            </div>
            <div className="div-sox-price">
              {switchArroow(SOXp, SOXpc, SOXpcp)}
            </div>
          </Box>
        </Box>
        <Box className="box-center-column">
          <Box className="box-usdkrw">
            <div className="div-usdkrw-title">{"USD/KRW"}</div>
            <div className="div-usdkrw-subtitle">
              {"달러/원환율 (24H 변동 %)"}
            </div>
            <div className="div-usdkrw-price">
              {switchArroow(USDKRWp, USDKRWpc, USDKRWpcp)}
            </div>
          </Box>
          <Box className="box-slideouter">
            <Box className="box-slidesettings">
              <SlideSettings />
            </Box>
            <Box className="box-banner">
              <SlideShow />
            </Box>
          </Box>
          <Box className="box-us10yearbond">
            <div className="div-us10yearbond-title">
              {"US 10-Year Bond Yield"}
            </div>
            <div className="div-us10yearbond-subtitle">
              {"미국 국채 10년물 (24H 변동 %)"}
            </div>
            <div className="div-us10yearbond-price">
              {switchArroow(US10YEARBONDp, US10YEARBONDpc, US10YEARBONDpcp)}
            </div>
          </Box>
        </Box>
        <Box className="box-right-column">
          <Box className="box-kospi">
            <div className="div-kospi-title">{"KS11"}</div>
            <div className="div-kospi-subtitle">{"코스피 (24H 변동 %)"}</div>
            <div className="div-kospi-price">
              {switchArroow(KOSPIp, KOSPIpc, KOSPIpcp)}
            </div>
          </Box>
          <Box className="box-kosdaq">
            <div className="div-kosdaq-title">{"KQ11"}</div>
            <div className="div-kosdaq-subtitle">{"코스닥 (24H 변동 %)"}</div>
            <div className="div-kosdaq-price">
              {switchArroow(KOSDAQp, KOSDAQpc, KOSDAQpcp)}
            </div>
          </Box>
          <Box className="box-ssec">
            <div className="div-ssec-title">{"SSEC"}</div>
            <div className="div-ssec-subtitle">
              {"상해종합주가지수 (24H 변동 %)"}
            </div>
            <div className="div-ssec-price">
              {switchArroow(SSECp, SSECpc, SSECpcp)}
            </div>
          </Box>
          <Box className="box-bitcoin">
            <div className="div-bitcoin-title">{"Bitcoin"}</div>
            <div className="div-bitcoin-subtitle">{"비트코인 (1BTC = $)"}</div>
            <div className="div-bitcoin-price">
              {switchArroow(BITCOINp, BITCOINpc, BITCOINpcp)}
            </div>
          </Box>
          <Box className="box-kimchi">
            <div className="div-kimchi-title">{"Kimchi Premium (BTC)"}</div>
            <div className="div-kimchi-subtitle">{"김치프리미엄(%) "}</div>
            <div className="div-kimchi-price">
              {switchArrowKimchi(KIMCHIPREMIUMpc)}
            </div>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
export default App;
