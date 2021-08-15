const path = require(`path`);

module.exports = {
  siteMetadata: {
    title: "เพจธรรมล้านดวง",
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: path.join(__dirname, `src`, `images`),
      },
      resolve: "gatsby-plugin-firebase",
      options: {
        credentials: {
          apiKey: "AIzaSyD9InOa_b91Diihg5vj6LNQWQ4LEA2-zPQ",
          authDomain: "monk-data-b4020.firebaseapp.com",
          projectId: "monk-data-b4020",
          storageBucket: "monk-data-b4020.appspot.com",
          messagingSenderId: "821695493332",
          appId: "1:821695493332:web:ca47d9f944fae3e3393741",
          measurementId: "G-823R3WNBT3",
        },
      },
    },
    "gatsby-plugin-react-helmet",
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
  ],
};
