import React, { useEffect } from "react";
import Helmet from "react-helmet";
import axios from "axios";

// styles

// markup
const RedirectPage = () => {
  useEffect(() => {
    (async () => {
      const result = await axios({
        method: "get",
        url: "https://api.thedhamma.net/redirect/room/new",
      });
      if (result.status === 200) {
        window.location.href = result.data.base_url;
      }
    })();

    //console.log(result);
  });
  return (
    <>
      <Helmet>
        <title>Zoom on App by ธรรมล้านดวง</title>

        <meta name="format-detection" content="telephone=yes"></meta>

        <meta name="title" content="Zoom on App by ธรรมล้านดวง"></meta>
        <meta
          name="description"
          content="เพจธรรมล้านดวง ร่วมสวดธรรมจักรทุกวัน 2 ทุ่ม"
        ></meta>

        <meta property="og:type" content="website"></meta>
        <meta
          property="og:url"
          content="https://zoom.thedhamma.net/redirect"
        ></meta>
        <meta property="og:title" content="Zoom on App by ธรรมล้านดวง"></meta>
        <meta
          property="og:description"
          content="เพจธรรมล้านดวง ร่วมสวดธรรมจักรทุกวัน 2 ทุ่ม"
        ></meta>
        <meta
          property="og:image"
          content="https://logo-file-dhmom.s3.ap-southeast-1.amazonaws.com/tbLogo_resize.png"
        ></meta>
      </Helmet>
      <main></main>
    </>
  );
};

export default RedirectPage;
