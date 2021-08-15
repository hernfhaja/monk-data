import React from "react";
import PropTypes from "prop-types";

export default function HTML(props) {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover"
        ></meta>
        {props.headComponents}
        <script
          charSet="utf-8"
          src="https://static.line-scdn.net/liff/edge/versions/2.12.0/sdk.js"
        ></script>
      </head>

      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />

        {props.postBodyComponents}
        <script src="https://source.zoom.us/1.9.6/lib/vendor/react.min.js"></script>
        <script src="https://source.zoom.us/1.9.6/lib/vendor/react-dom.min.js"></script>
        <script src="https://source.zoom.us/1.9.6/lib/vendor/redux.min.js"></script>
        <script src="https://source.zoom.us/1.9.6/lib/vendor/redux-thunk.min.js"></script>
        <script src="https://source.zoom.us/1.9.6/lib/vendor/lodash.min.js"></script>
        <script src="https://source.zoom.us/zoom-meeting-1.9.6.min.js"></script>
      </body>
    </html>
  );
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
};
