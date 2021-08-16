import React, { useState, useEffect } from "react";
import "../css/layout.css";
import "../css/background-image.css";
import Helmet from "react-helmet";
import firebase from "gatsby-plugin-firebase";
import Textfield from "@atlaskit/textfield";
import star from "../images/star.png";
import button from "../images/button.png";

import { format } from "date-fns";

export default ({ props }) => {
  //lineliff
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

  //function send data to DB
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
      // console.log(
      //   userData.userId,
      //   value1,
      //   value2,
      //   value3,
      //   value4,
      //   userData.displayName,
      //   userData.pictureUrl,
      //   query_date
      // );
      console.log("send data complete");
    } catch (error) {
      console.log(error);
    }
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

      {/* Main div */}
      <div className="mainBg">
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
          {/*  Form */}

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            {/* title + textfield 1 */}

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

            {/* title + textfield 2*/}
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

            {/* title + textfield 3  */}
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

            {/* title +textfield 4 */}
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
                maxLength={10}
                label="Max length of 5"
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
            <button
              style={{
                position: "relative",
                marginTop: "30px",
              }}
            >
              <img
                src={button}
                style={{
                  width: "250px",
                  height: "50px",
                }}
                alt="my image"
                onClick={sendbutton}
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
