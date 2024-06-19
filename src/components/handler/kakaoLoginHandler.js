import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const KakaoLoginHandler = ({ onLogin }) => {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");
  const access_token_uri = "https://kauth.kakao.com/oauth/token";

  console.log("loginHandler", code);

  useEffect(() => {
    const sendTokenToBack = async () => {
      return await axios.get(process.env.REACT_APP_SERVER_URL + `/member/kakao/token?code=${code}`);
    };

    const getAccessToken = async () => {
      const header = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      };
      const body = {
        grant_type: "authorization_code",
        client_id: process.env.REACT_APP_KAKAO_REST_API_KEY,
        redirect_uri: process.env.REACT_APP_KAKAO_REDIRECT_URI,
        code: code,
      };

      const res = await axios.post(access_token_uri, body, header);
      console.log("res", res);

      const accessToken = res.data.access_token;
      console.log("acc11", accessToken);

      return accessToken;
    };

    const checkLoginStatus = async () => {
      try {
        const res = await axios.get(process.env.REACT_APP_SERVER_URL + '/member/me');
  
        console.log(res);
  
        if (res.status === 200) {
          localStorage.setItem("user", JSON.stringify(res.data));
          return res.data.name; // 서버로부터 사용자 이름을 가져옴
        }
      } catch (error) {
        console.error(error);
      }
    };

    const kakaoLogin = async () => {
      const returnData = (await sendTokenToBack()).data;
      console.log("acc", returnData);

      try {
        const res = await axios.post(
          process.env.REACT_APP_SERVER_URL + "/member/kakao/login",
          {
            id: 'kakao' + returnData.id,
            password: '',
          }
        );

        console.log("success", res);

        if (res.status === 200) {
          onLogin(await checkLoginStatus()); // 로그인 상태 업데이트
          navigate("/");
        }
      } catch (error) {
        console.log("error2");
        console.log(error);

        if (error.response.status === 422) {
          console.error("회원가입 필요");
          navigate("/register?id=" + returnData.id + "&email=" + returnData.email);
        }
      }
    };

    kakaoLogin();
  }, [code, navigate]);

  return (
    <div className="LoginHandler">
      <div className="notice">
        <p>로그인 중입니다.</p>
        <p>잠시만 기다려주세요.</p>
        <div className="spinner"></div>
      </div>
    </div>
  );
};

export default KakaoLoginHandler;
