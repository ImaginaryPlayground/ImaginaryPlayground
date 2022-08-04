import axios from "axios";
import { config } from "./config";
import swal from "sweetalert";

export const loginApi = (email, password) => {
  axios({
    url: `${config.api}/user/login`,
    method: "POST",
    data: {
      email: email,
      password: password,
    },
  })
    .then((res) => {
      console.log(res);
      if (res.data.status === "SUCCESS") {
        sessionStorage.setItem("token", JSON.stringify(res?.data.data));
        //회원정보 가져오는 비동기 처리

        //그 후 메인페이지 이동
        window.location.href = "/";
        //console.log("로그인 성공!");
      } else {
        swal(
          "로그인에 실패하였습니다.",
          "아이디와 비밀번호를 확인해주세요",
          "error"
        );
      }
    })
    .catch((err) => {
      alert("서버와 통신에러 발생");
      console.log(err);
    });
};
