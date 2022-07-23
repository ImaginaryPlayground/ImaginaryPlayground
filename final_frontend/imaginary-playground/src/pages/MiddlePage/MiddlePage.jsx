import axios from "axios";
import React, { useEffect } from "react";
import { REST_API_KEY, REDIRECT_URI } from "../../components/Oauth/Oauth";
import GoogleLogin from "react-google-login";

const MiddlePage = () => {
  let accessTokendata = "";

  useEffect(() => {
    let code = new URL(window.location.href).searchParams.get("code");
    //const query = queryString.parse(window.location.search);

    const getKakaoTokenHandler = async (code) => {
      const data = {
        grant_type: "authorization_code",
        client_id: REST_API_KEY,
        redirect_uri: REDIRECT_URI,
        code: code,
      };
      const queryString = Object.keys(data)
        .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(data[k]))
        .join("&");
      axios
        .post("https://kauth.kakao.com/oauth/token", queryString, {
          headers: {
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        })
        .then((res) => {
          accessTokendata = res.data.access_token;
          console.log(accessTokendata);
        });
    };

    //getKakaoTokenHandler(code);
  }, []);
  return (
    <div className="MiddlePage">
      MiddlePage
      <div>
        <GoogleLogin
          clientId="842813680922-3dptorpm8jnhuamgt2obo4rn85n6mnvt.apps.googleusercontent.com"
          render={(renderProps) => (
            <div onClick={renderProps.onClick}>
              <img
                src="/iconFolder/SnsLogin/free-icon-google.png"
                alt=""
                style={{ cursor: "pointer" }}
              />
            </div>
          )}
          onSuccess={(res) => {
            console.log(res);
            console.log("성공");
          }}
          onFailure={(err) => {
            console.log(err);
            console.log("에러");
          }}
        />
      </div>
    </div>
  );
};

export default MiddlePage;
