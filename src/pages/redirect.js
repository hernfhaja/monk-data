import React, { useState, useEffect } from "react";
import Helmet from "react-helmet";
import axios from "axios";
import { format } from "date-fns";

// styles

// markup
const RedirectPage = () => {
  useEffect(() => {
    (async () => {
      const liff = window.liff;
      await liff.init({ liffId: "1656224658-1LbP7pB9" });
      if (!liff.isLoggedIn()) {
        liff.login({
          redirectUri:
            "https://blessingbranch.d9xmwf9fyptgb.amplifyapp.com/redirect",
        });
      } else {
        let response = await liff.getProfile();
        let dateData = new Date();
        let query_date = format(dateData, "dd-MM-yyyy");
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
                userId: response.userId,
                userName: response.displayName,
                userProfile: response.pictureUrl,
                typeUrl: "zoom",
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
                userId: response.userId,
                userName: response.displayName,
                userProfile: response.pictureUrl,
                typeUrl: "zoom",
                lineOA: "rabpornora",
                dateData: format(dateData, "dd-MM-yyyy"),
                timeData: format(dateData, "HH:mm"),
              },
              dateTimeData: format(dateData, "dd-MM-yyyy"),
            },
          });
        }
        setuserData(response);
      }

      const result = await axios({
        method: "get",
        url: "https://api.thedhamma.net/redirect/room/new",
      });
      if (result.status === 200) {
        window.location.href = result.data.base_url;
      }
    })();

    //console.log(result);
  }, []);

  const [userData, setuserData] = useState({});

  return (
    <>
      <Helmet>
        <title>Zoom on App by รับพรพระ 222,222 รูป</title>

        <meta name="format-detection" content="telephone=yes"></meta>

        <meta name="title" content="Zoom on App by รับพรพระ 222,222 รูป"></meta>
        <meta name="description" content="รับพรพระ 222,222 รูป"></meta>

        <meta property="og:type" content="website"></meta>
        <meta
          property="og:url"
          content="https://blessingbranch.d9xmwf9fyptgb.amplifyapp.com/redirect"
        ></meta>
        <meta
          property="og:title"
          content="Zoom on App by รับพรพระ 222,222 รูป"
        ></meta>
        <meta property="og:description" content="รับพรพระ 222,222 รูป"></meta>
        <meta property="og:image" content=""></meta>
      </Helmet>
      <main></main>
    </>
  );
};

export default RedirectPage;
