import { Box, Paper, Typography } from "@mui/material";
import { useState } from "react";
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
} from "./constants";
import "./App.css";
import "@fontsource/inter";

function App() {
  const { ipcRenderer } = window.require("electron");
  const [SP500, setSP500] = useState("");
  const [DOW, setDOW] = useState("");
  const [NASDAQ, setNASDAQ] = useState("");
  const [NASDAQFUTURE, setNASDAQFUTURE] = useState("");
  const [SOX, setSOX] = useState("");
  const [USDKRW, setUSDKRW] = useState("");
  const [KOSPI, setKOSPI] = useState("");
  const [KOSDAQ, setKOSDAQ] = useState("");
  const [US10YEARBOND, setUS10YEARBOND] = useState("");
  const [SSEC, setSSEC] = useState("");
  const [BITCOIN, setBITCOIN] = useState("");
  const [KIMCHIPREMIUM, setKIMCHIPREMIUM] = useState("");

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

  const replyPing = () => {
    ipcRenderer.on(REPLY_SP500_PING, (event, res) => {
      console.log(res);
    });
    ipcRenderer.on(REPLY_DOW_PING, (event, res) => {
      console.log(res);
    });
    ipcRenderer.on(REPLY_NASDAQ_PING, (event, res) => {
      console.log(res);
    });
    ipcRenderer.on(REPLY_NASDAQFUTURE_PING, (event, res) => {
      console.log(res);
    });
    ipcRenderer.on(REPLY_SOX_PING, (event, res) => {
      console.log(res);
    });
    ipcRenderer.on(REPLY_USDKRW_PING, (event, res) => {
      console.log(res);
    });
    ipcRenderer.on(REPLY_KOSPI_PING, (event, res) => {
      console.log(res);
    });
    ipcRenderer.on(REPLY_KOSDAQ_PING, (event, res) => {
      console.log(res);
    });
    ipcRenderer.on(REPLY_US10YEARBOND_PING, (event, res) => {
      console.log(res);
    });
    ipcRenderer.on(REPLY_SSEC_PING, (event, res) => {
      console.log(res);
    });
    ipcRenderer.on(REPLY_BITCOIN_PING, (event, res) => {
      console.log(res);
    });
  };

  const today = new Date();

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
      <Box className="box-outter-content">
        <Box className="box-left-column">
          <Box className="box-sp500">s&p500</Box>
          <Box className="box-dow">dow</Box>
          <Box className="box-nasdaq">nasdaq</Box>
          <Box className="box-nasdaqfuture">nasdaqfuture</Box>
          <Box className="box-sox">sox</Box>
        </Box>
        <Box className="box-center-column">
          <Box className="box-usdkrw">usdkrw</Box>
          <Box className="box-banner">banner</Box>
          <Box className="box-us10yearbond">us10yearbond</Box>
        </Box>
        <Box className="box-right-column">
          <Box className="box-kospi">kospi</Box>
          <Box className="box-kosdaq">kosdaq</Box>
          <Box className="box-ssec">ssec</Box>
          <Box className="box-bitcoin">bitcion</Box>
          <Box className="box-kimchi">kimchi</Box>
        </Box>
      </Box>
    </Box>
  );
}
export default App;
