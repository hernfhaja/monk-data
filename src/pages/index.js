import React, { useState, useEffect } from "react";
import "../css/layout.css";
import "../css/background-image.css";
import Helmet from "react-helmet";
import firebase from "gatsby-plugin-firebase";
import axios from "axios";
import Spinner from "@atlaskit/spinner";
import Textfield from "@atlaskit/textfield";
import Button from "@atlaskit/button";
import backLeft from "../images/left.png";
import backRight from "../images/right.png";
import backBottom from "../images/logo.png";
import { format } from "date-fns";

const isBrowser = typeof window !== "undefined";

export default ({ props }) => {
  useEffect(async () => {
    const liff = window.liff;
    try {
      await liff.init({ liffId: "1656318900-MdkDNb57" });
      if (!liff.isLoggedIn()) {
        liff.login();
      } else {
        try {
          let response = await liff.getProfile();
          if (Object.keys(response).length != 0) {
            setuserData(response);
            // console.log(response);
          } else {
            let response = await liff.getProfile();
            setuserData(response);
            // console.log(response);
          }
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const [value1, setValue1] = useState("");
  const handleChange1 = (e) => setValue1(e.target.value);
  const [value2, setValue2] = useState("");
  const handleChange2 = (e) => setValue2(e.target.value);
  const [value3, setValue3] = useState("");
  const handleChange3 = (e) => setValue3(e.target.value);
  const [value4, setValue4] = useState("");
  const handleChange4 = (e) => setValue4(e.target.value);
  const [value5, setValue5] = useState("");
  const handleChange5 = (e) => setValue5(e.target.value);
  const [value6, setValue6] = useState("");
  const handleChange6 = (e) => setValue6(e.target.value);
  const [value7, setValue7] = useState("");
  const handleChange7 = (e) => setValue7(e.target.value);

  //data request
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingUrl, setIsLoadingUrl] = useState(false);
  const [urlData, setUrlData] = useState({});
  const [userData, setuserData] = useState({});
  const [data, setData] = React.useState(null);

  const db = firebase.firestore();

  const sendbutton = () => {
    let dateData = new Date();
    let query_date = format(dateData, "dd-MM-yyyy");

    console.log(
      userData.userId,
      userData.displayName,
      userData.pictureUrl,
      value1,
      value2,
      value3,
      value4,
      value5,
      value6,
      value7
    );

    db.collection("monkData").add({
      userId: userData.userId,
      name: value1,
      surname: value2,
      position: value3,
      rank: value4,
      templeName: value5,
      province: value6,
      phoneNumber: value7,
      displayName: userData.displayName,
      pictureUrl: userData.pictureUrl,
      timestamp: query_date,
    });

    console.log("complete");
  };

  return (
    <>
      <Helmet>
        <title>คณะสงฆ์ช่วยภัยโควิด</title>

        <meta name="format-detection" content="telephone=yes"></meta>
        <meta name="title" content="คณะสงฆ์ช่วยภัยโควิด"></meta>
        <meta name="description" content="คณะสงฆ์ช่วยภัยโควิด"></meta>
        <meta property="og:type" content="website"></meta>
        <meta property="og:title" content="คณะสงฆ์ช่วยภัยโควิด"></meta>
        <meta property="og:description" content="คณะสงฆ์ช่วยภัยโควิด"></meta>
        <meta property="og:image" content="g"></meta>
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
            height: "20%",
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
            คณะสงฆ์ช่วยภัยโควิด
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
            height: "83%",
            width: "100%",
            position: "absolute",
            bottom: 0,
            backgroundImage: `url(${backBottom})`,
          }}
        >
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
            <h3
              style={{
                marginTop: 20,
                marginBottom: 20,
                alignItems: "center",
                color: "#e4bb4f",
              }}
            >
              กรอกข้อมูล เพื่อ ร่วมงานถวายสังฆทานคณะสงฆ์ 100,000 รูป
            </h3>

            {/* title+textfield 1 */}

            <div
              style={{
                width: "80%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <h4
                style={{
                  width: "30%",
                  color: "#96938c",
                }}
              >
                ชื่อ
              </h4>

              <Textfield
                placeholder="ชื่อ
      "
                name="basic"
                defaultValue={value1}
                onChange={handleChange1}
                aria-label="default text field"
                css={{
                  width: "100%",
                  textAlign: "center",
                  borderRadius: "10px",
                }}
              />
            </div>
            {/* title+textfield 2*/}
            <div
              style={{
                width: "80%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <h4
                style={{
                  width: "30%",
                  color: "#96938c",
                }}
              >
                ฉายา
              </h4>

              <Textfield
                placeholder="ฉายา
      "
                name="basic"
                defaultValue={value2}
                onChange={handleChange2}
                aria-label="default text field"
                css={{
                  width: "100%",
                  textAlign: "center",
                  borderRadius: "10px",
                }}
              />
            </div>
            {/* title+textfield 3*/}
            <div
              style={{
                width: "80%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <h4
                style={{
                  width: "30%",
                  color: "#96938c",
                }}
              >
                สมณศักดิ์
              </h4>

              <Textfield
                placeholder="สมณศักดิ์
      "
                name="basic"
                defaultValue={value3}
                onChange={handleChange3}
                aria-label="default text field"
                css={{
                  width: "100%",
                  textAlign: "center",
                  borderRadius: "10px",
                }}
              />
            </div>
            {/* title+textfield 4*/}
            <div
              style={{
                width: "80%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <h4
                style={{
                  width: "30%",
                  color: "#96938c",
                }}
              >
                ตำแหน่ง
              </h4>

              <Textfield
                placeholder="ตำแหน่ง
      "
                name="basic"
                defaultValue={value4}
                onChange={handleChange4}
                aria-label="default text field"
                css={{
                  width: "100%",
                  textAlign: "center",
                  borderRadius: "10px",
                }}
              />
            </div>

            {/* title+textfield 5*/}
            <div
              style={{
                width: "80%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <h4
                style={{
                  width: "30%",
                  color: "#96938c",
                }}
              >
                วัด
              </h4>

              <Textfield
                placeholder="วัด
      "
                name="basic"
                defaultValue={value5}
                onChange={handleChange5}
                aria-label="default text field"
                css={{
                  width: "100%",
                  textAlign: "center",
                  borderRadius: "10px",
                }}
              />
            </div>
            {/* title+textfield 6*/}
            <div
              style={{
                width: "80%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <h4
                style={{
                  width: "30%",
                  color: "#96938c",
                }}
              >
                จังหวัด
              </h4>

              <Textfield
                placeholder="จังหวัด
      "
                name="basic"
                defaultValue={value6}
                onChange={handleChange6}
                aria-label="default text field"
                css={{
                  width: "100%",
                  textAlign: "center",
                  borderRadius: "10px",
                }}
              />
            </div>
            {/* title+textfield 7*/}
            <div
              style={{
                width: "80%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                marginBottom: "30px",
              }}
            >
              <h4
                style={{
                  width: "30%",
                  color: "#96938c",
                }}
              >
                เบอร์โทร
              </h4>

              <Textfield
                placeholder="เบอร์โทร
      "
                name="basic"
                defaultValue={value7}
                onChange={handleChange7}
                aria-label="default text field"
                css={{
                  width: "100%",
                  textAlign: "center",
                  borderRadius: "10px",
                }}
              />
            </div>

            <Button
              appearance="primary"
              style={{
                backgroundColor: "#d79f00",
                borderRadius: "20px 20px 20px 20px",
                width: "160px",
                boxShadow: "2px 5px 16px 0px #A3A3A3",
                marginBottom: "20px",
                margintop: "20px",
              }}
              onClick={sendbutton}
            >
              {isLoading && <Spinner />}
              &nbsp;&nbsp; ตกลง
            </Button>

            {/* <button onClick={sendbutton} style={{ color: "#dea10a" }}>
              {isLoadingUrl && <Spinner />}
              &nbsp;&nbsp;ร่วมกิจกรรมผ่าน Application Zoom
            </button> */}
          </div>
        </div>
      </div>
    </>
  );
};
