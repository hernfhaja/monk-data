import React, { useState, useEffect } from "react";
import "../css/layout.css";
import "../css/background-image.css";
import Helmet from "react-helmet";
import firebase from "gatsby-plugin-firebase";
import axios from "axios";
import Spinner from "@atlaskit/spinner";
import Textfield from "@atlaskit/textfield";
import CustomThemeButton from "@atlaskit/button/custom-theme-button";
import BG from "../images/BG.jpg";
import head from "../images/head.png";
import star from "../images/star.png";
import button from "../images/button.png";
import redBG from "../images/red-bg.png";

import { format } from "date-fns";

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

  //data request
  const [userData, setuserData] = useState({});

  //connect firebase
  const db = firebase.firestore();

  //function click button
  const sendbutton = async () => {
    let dateData = new Date();
    let query_date = format(dateData, "dd-MM-yyyy");
    try {
      await db.collection("monkData").add({
        userId: userData.userId,
        name: value1,
        rank: value2,
        templeName: value3,
        phoneNumber: value4,
        displayName: userData.displayName,
        pictureUrl: userData.pictureUrl,
        timestamp: query_date,
      });
      console.log(
        userData.userId,
        value1,
        value2,
        value3,
        value4,
        userData.displayName,
        userData.pictureUrl,
        query_date
      );
    } catch (error) {
      console.log(error);
    }
    // console.log("complete");
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

      <div className="mainBg">
        {/* Top */}
        {/* <div
          className="colorbg"
          style={{
            height: "12%",
            width: "100%",
            padding: 0,
            display: "flex",
            justifyContent: "top",
            alignItems: "center",
            position: "relative",
            flexDirection: "column",
            backgroundImage: `url(${head})`,
            backgroundSize: "cover",
            position: "absolute",
            top: 0,
          }}
        >
          <h3
            style={{
              color: "#5c2605",
              textAlign: "center",
              fontFamily: "duangkaewregular",
              fontSize: "25px",
              fontWeight: "normal",
              padding: 0,
              marginTop: 10,
              marginBottom: 0,
            }}
          >
            กราบอาราทนานิมนต์คณะสงฆ์ <br></br>
          </h3>

          <h3
            style={{
              color: "#5c2605",
              textAlign: "center",
              fontFamily: "duangkaewregular",
              fontSize: "25px",
              fontWeight: "normal",
              padding: 0,
              marginTop: 5,
              marginBottom: 0,
            }}
          >
            ร่วมพิธีถวายมหาสังฆทาน (ออนไลน์)
          </h3>
        </div> */}

        {/* Bottom */}
        <div
          className="bgimgBottom"
          style={{
            height: "86%",
            width: "100%",
            position: "absolute",
            bottom: 0,
            margintop: 16,
          }}
        >
          {/* part form */}

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            {/* title+textfield 1 */}

            <div
              style={{
                width: "90%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <h4
                style={{
                  width: "97%",
                  textAlign: "left",
                  marginBottom: "5px",
                  fontSize: "20px",
                  color: "#660305",
                  fontWeight: "520",
                }}
              >
                <img
                  src={star}
                  style={{
                    width: "23px",
                    height: "23px",
                    marginTop: "0px",
                    marginRight: "10px",
                  }}
                />
                ชื่อ-ฉายา / สมณศักดิ์
              </h4>

              <Textfield
                placeholder="ชื่อ ฉายา/สมณศักดิ์
      "
                name="basic"
                defaultValue={value1}
                onChange={handleChange1}
                aria-label="customized text field"
                css={{
                  padding: 1,
                  "& > [data-ds--text-field--input]": {
                    // input style
                    fontSize: 15,
                  },
                  width: "100%",
                  textAlign: "center",
                  borderRadius: "10px",
                }}
              />
            </div>

            {/* title+textfield 2*/}
            <div
              style={{
                width: "90%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <h4
                style={{
                  width: "97%",
                  textAlign: "left",
                  marginBottom: "5px",
                  fontSize: "20px",
                  color: "#660305",
                  fontWeight: "520",
                }}
              >
                <img
                  src={star}
                  style={{
                    width: "23px",
                    height: "23px",
                    marginTop: "0px",
                    marginRight: "10px",
                  }}
                />
                ตำแหน่ง
              </h4>

              <Textfield
                placeholder="ตำแหน่ง
      "
                name="basic"
                defaultValue={value2}
                onChange={handleChange2}
                aria-label="customized text field"
                css={{
                  padding: 1,
                  "& > [data-ds--text-field--input]": {
                    // input style
                    fontSize: 15,
                  },
                  width: "100%",
                  textAlign: "center",
                  borderRadius: "10px",
                }}
              />
            </div>

            {/* title+textfield 3*/}
            <div
              style={{
                width: "90%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <h4
                style={{
                  width: "97%",
                  textAlign: "left",
                  marginBottom: "5px",
                  fontSize: "20px",
                  color: "#660305",
                  fontWeight: "520",
                }}
              >
                <img
                  src={star}
                  style={{
                    width: "23px",
                    height: "23px",
                    marginTop: "0px",
                    marginRight: "10px",
                  }}
                />
                วัด
              </h4>

              <Textfield
                placeholder="วัด
      "
                name="basic"
                defaultValue={value3}
                onChange={handleChange3}
                aria-label="customized text field"
                // aria-label="default text field"
                css={{
                  padding: 1,
                  "& > [data-ds--text-field--input]": {
                    // input style
                    fontSize: 15,
                  },
                  width: "100%",
                  textAlign: "center",
                  borderRadius: "10px",
                  height: "200px",
                }}
              />
            </div>

            {/* title+textfield 4*/}
            <div
              style={{
                width: "90%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <h4
                style={{
                  width: "97%",
                  textAlign: "left",
                  marginBottom: "5px",
                  fontSize: "20px",
                  color: "#660305",
                  fontWeight: "520",
                }}
              >
                <img
                  src={star}
                  style={{
                    width: "23px",
                    height: "23px",
                    marginTop: "0px",
                    marginRight: "10px",
                  }}
                />
                เบอร์โทร
              </h4>

              <Textfield
                placeholder="เบอร์โทร
      "
                aria-label="customized text field"
                name="basic"
                defaultValue={value4}
                onChange={handleChange4}
                css={{
                  padding: 1,
                  "& > [data-ds--text-field--input]": {
                    // input style
                    fontSize: 15,
                  },
                  width: "100%",
                  textAlign: "center",
                  borderRadius: "10px",
                  marginBottom: "100px",
                }}
              />
            </div>

            <button>
              <img
                src={button}
                style={{
                  marginTop: "30px",
                  width: "250px",
                  height: "50px",
                }}
                alt="my image"
                onClick={sendbutton}
              />
            </button>

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
