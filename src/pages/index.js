import React, { useState, useEffect } from "react";
import "../css/layout.css";
import "../css/background-image.css";
import Helmet from "react-helmet";
import axios from "axios";
import { format } from "date-fns";
import Spinner from "@atlaskit/spinner";
import { ZoomMtg } from "@zoomus/websdk";
import Textfield from "@atlaskit/textfield";
import Button from "@atlaskit/button";
import backLeft from "../images/left.png";
import backRight from "../images/right.png";
import backBottom from "../images/logo.png";

const isBrowser = typeof window !== "undefined";

export default ({ props }) => {
  useEffect(async () => {
    import("@zoomus/websdk").then((module) => {
      const { ZoomMtg } = module;

      ZoomMtg.setZoomJSLib("https://source.zoom.us/1.9.6/lib", "/av");
      console.log("checkSystemRequirements");
      console.log(JSON.stringify(ZoomMtg.checkSystemRequirements()));
      ZoomMtg.preLoadWasm();
      ZoomMtg.prepareJssdk();
      ZoomMtg.i18n.load("en-US");
      ZoomMtg.i18n.reload("en-US");
    });

    const liff = window.liff;
    try {
      await liff.init({ liffId: "1656224658-1LbP7pB9" });
      if (!liff.isLoggedIn()) {
        liff.login();
      } else {
        try {
          let response = await liff.getProfile();
          if (Object.keys(response).length != 0) {
            setuserData(response);
          } else {
            let response = await liff.getProfile();
            setuserData(response);
          }
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  // data name
  let randomNumber = 0;
  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
  }
  randomNumber =
    "ธรรมล้านดวง " + getRandomIntInclusive(100000, 999999).toString();

  const [value, setValue] = useState(randomNumber);
  const [currentDate, setCurrentDate] = useState("");
  const handleChange = (e) => setValue(e.target.value);

  //data request
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingUrl, setIsLoadingUrl] = useState(false);
  const [data, setData] = useState({});
  const [urlData, setUrlData] = useState({});
  const [userData, setuserData] = useState({});

  function startMeeting(signature, meetingNumber, passWord) {
    if (isBrowser) {
      document.getElementById("zmmtg-root").style.display = "block";
      ZoomMtg.init({
        leaveUrl: "https://zoom.thedhamma.net",
        isSupportAV: true,
        disablePreview: true, // default false
        success: (success) => {
          console.log(success);
          ZoomMtg.join({
            signature: signature,
            meetingNumber: meetingNumber,
            userName: value,
            apiKey: "Wr1maFh7QnOOCvAOhiCKTw",
            userEmail: "",
            passWord: passWord,
            success: (success) => {
              console.log("join meeting success");
              console.log(success);

              const buttonLeave =
                document.getElementsByClassName("zmu-btn--danger");
              if (buttonLeave.length !== 0) {
                buttonLeave[0].addEventListener("click", () => {
                  ZoomMtg.leaveMeeting({});
                });
              }
            },
            error: (error) => {
              console.log(error);
            },
          });
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }

  const requestTargetRoom = async () => {
    setIsLoading(true);
    if (Object.keys(userData).length != 0) {
      let dateData = new Date();
      let query_date = format(dateData, "dd-MM-yyyy");
      // change api
      const checkDate = await axios({
        method: "get",
        url: "https://api.thedhamma.net/socialcollect/line/date",
        params: {
          date: query_date,
        },
      });
      if (Object.keys(checkDate.data).length == 0) {
        const postNewRecord = await axios({
          method: "post",
          headers: { "Content-Type": "application/json" },
          url: "https://api.thedhamma.net/socialcollect/line/user",
          data: {
            user: {
              userId: userData.userId,
              userName: userData.displayName,
              userProfile: userData.pictureUrl,
              typeUrl: "web",
              lineOA: "rabpornora",
              dateData: format(dateData, "dd-MM-yyyy"),
              timeData: format(dateData, "HH:mm"),
            },
            dateTimeData: format(dateData, "dd-MM-yyyy"),
          },
        });
      } else {
        const postNewRecord = await axios({
          method: "put",
          headers: { "Content-Type": "application/json" },
          url: "https://api.thedhamma.net/socialcollect/line/user",
          data: {
            user: {
              userId: userData.userId,
              userName: userData.displayName,
              userProfile: userData.pictureUrl,
              typeUrl: "web",
              lineOA: "rabpornora",
              dateData: format(dateData, "dd-MM-yyyy"),
              timeData: format(dateData, "HH:mm"),
            },
            dateTimeData: format(dateData, "dd-MM-yyyy"),
          },
        });
      }

      const result = await axios({
        method: "get",
        url: "https://api.thedhamma.net/redirect/room/new",
      });

      //console.log(result);
      if (result.status === 200) {
        setData(result.data);
        const getSignatures = await axios({
          method: "post",
          headers: { "Content-Type": "application/json" },
          url: "https://api.thedhamma.net/genSignature",
          data: {
            meetingNumber: result.data.roomID,
            role: 0,
          },
        });
        //console.log(getSignatures.data.signature);
        //console.log(getSignatures.data);
        startMeeting(
          getSignatures.data,
          result.data.roomID,
          result.data.passcode
        );
      }
    }
    setIsLoading(false);
  };

  const urlTargetRoom = async () => {
    setIsLoadingUrl(true);

    const result = await axios({
      method: "get",
      url: "https://api.thedhamma.net/redirect/room/new",
    });

    //console.log(result);
    if (result.status == 200) {
      setUrlData(result.data);
      if (isBrowser) {
        //window.open(urlData.url);
        if (urlData.url !== undefined) {
          window.location.href = urlData.base_url;
        } else {
          window.location.href =
            // "https://dhammakaya-network.zoom.us/j/83471539842?pwd=bzV3aE1mZ3dmYU96Qkd0YlFvY2lidz09";
            "https://zoom.us/j/94881671898?pwd=elRXS0NJN2dDL0l5V2tOVjFkWUNSdz09&openExternalBrowser=1";
        }
      }
    }

    setIsLoadingUrl(false);
  };

  return (
    <>
      <Helmet>
        <title>Zoom on web by รับพรพระ 222,222 รูป</title>

        <meta name="format-detection" content="telephone=yes"></meta>
        <meta name="title" content="Zoom on Web by รับพรพระ 222,222 รูป"></meta>
        <meta name="description" content="รับพรพระ 222,222 รูป"></meta>
        <meta property="og:type" content="website"></meta>
        <meta
          property="og:url"
          content="https://zoom.thedhamma.net/redirect"
        ></meta>
        <meta
          property="og:title"
          content="Zoom on Web by รับพรพระ 222,222 รูป"
        ></meta>
        <meta property="og:description" content="รับพรพระ 222,222 รูป"></meta>
        <meta property="og:image" content="g"></meta>
        <link
          type="text/css"
          rel="stylesheet"
          href="https://source.zoom.us/1.9.6/css/bootstrap.css"
        />
        <link
          type="text/css"
          rel="stylesheet"
          href="https://source.zoom.us/1.9.6/css/react-select.css"
        />
      </Helmet>

      <div
        style={{
          display: "flex",
          height: "100%",
          justifyContent: "flex-start",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
        }}
      >
        {/* Top */}
        <div
          className="colorbg"
          style={{
            height: "34%",
            width: "100%",
            padding: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          <div
            className="bgimgTopLeft"
            style={{
              height: "60%",
              width: "40%",
              backgroundImage: `url(${backLeft})`,
            }}
          ></div>
          <h1
            style={{
              color: "#5c2605",
              textAlign: "center",
              fontFamily: "duangkaewregular",
            }}
          >
            เพจธรรมล้านดวง
          </h1>
          <div
            className="bgimgTopRight"
            style={{
              height: "100%",
              width: "50%",
              backgroundImage: `url(${backRight})`,
            }}
          ></div>
        </div>

        {/* Bottom */}
        <div
          className="bgimgBottom"
          style={{
            backgroundColor: "#ffffff",
            height: "66%",
            width: "100%",
            position: "absolute",
            bottom: 0,
            backgroundImage: `url(${backBottom})`,
          }}
        >
          {/* part1 */}
          <div style={{ width: "100%", backgroundColor: "#d79f00" }}>
            <div
              style={{
                width: "100%",
                height: 50,
                backgroundColor: "#ffffff",
                borderRadius: "30px 30px 0 0",
                boxShadow: "0 -7px 7px -5px #5B5B5B",
              }}
            ></div>
          </div>

          {/* part2 */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <h3 style={{ marginTop: 0, marginBottom: 0, color: "#e4bb4f" }}>
              ร่วมสวดธรรมจักรทุกวัน 2 ทุ่ม
            </h3>
            <h4
              style={{
                color: "#96938c",
                marginTop: "40px",
                marginBottom: "30px",
              }}
            >
              กรอกชื่อ
            </h4>

            <Textfield
              placeholder="กรอกชื่อของคุณ
      "
              name="basic"
              defaultValue={value}
              onChange={handleChange}
              aria-label="default text field"
              css={{ width: "60%", marginBottom: "30px", textAlign: "center" }}
            />

            <Button
              appearance="primary"
              style={{
                backgroundColor: "#d79f00",
                borderRadius: "20px 20px 20px 20px",
                width: "160px",
                boxShadow: "2px 5px 16px 0px #A3A3A3",
                marginBottom: "30px",
              }}
              onClick={requestTargetRoom}
            >
              {isLoading && <Spinner />}
              &nbsp;&nbsp; เข้าห้อง zoom
            </Button>

            <button onClick={urlTargetRoom} style={{ color: "#dea10a" }}>
              {isLoadingUrl && <Spinner />}
              &nbsp;&nbsp;ร่วมกิจกรรมผ่าน Application Zoom
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
