import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const KakaoLoginHandeler = (props) => {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");
  const access_token_uri = "https://kauth.kakao.com/oauth/token";

  console.log("loginHandler", code);

  useEffect(() => {
    const sendTokenToBack = async () => {
      return await axios.get(process.env.REACT_APP_SERVER_URL + `/member/kakao/token?code=${code}`)
    }

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

    const kakaoLogin = async () => {
      const accessToken = (await sendTokenToBack()).data.data;
      // const accessToken = await getAccessToken();
      console.log("acc", accessToken);

      try {
        const res = await axios.post(
          process.env.REACT_APP_SERVER_URL + "/member/kakao/login",
          {
            id: code,
            password: accessToken,
          }
        );

        console.log("success", res.data);

        if(res.data.code === "UNPROCESSABLE_ENTITY") {
          navigate("/register?code=" + code + "&accessToken=" + accessToken);
        }

      } catch (error) {
        console.log("error2");
        console.log(error);

        if (error.response.status === 422) {
          console.error("회원가입 필요");
          navigate("/register?code=" + code + "&accessToken" + accessToken);
        }
      }
    };

    kakaoLogin();
  });

  // useEffect(() => {
  //     const kakaoLogin = async () => {
  //       await axios({
  //         method: "GET",
  //         url: `${process.env.REACT_APP_SERVER_URL + '/member/kakao/callback/v2'}?code=${code}`,
  //         headers: {
  //           "Content-Type": "application/json;charset=utf-8", //json형태로 데이터를 보내겠다는뜻
  //         //   "Access-Control-Allow-Origin": "*", //이건 cors 에러때문에 넣어둔것. 당신의 프로젝트에 맞게 지워도됨
  //         },
  //       }).then((res) => { //백에서 완료후 우리사이트 전용 토큰 넘겨주는게 성공했다면
  //         console.log("res", res);
  //         //계속 쓸 정보들( ex: 이름) 등은 localStorage에 저장해두자
  //         // localStorage.setItem("name", res.data.account.kakaoName);
  //         console.log("id", res.data.data.code);
  //         console.log("pw", res.data.data.token);
  //         //로그인이 성공하면 이동할 페이지
  //         navigate("/register");
  //       });
  //     };
  //     kakaoLogin();
  //   }, [props.history]);

  return (
    <div className="LoginHandeler">
      <div className="notice">
        <p>로그인 중입니다.</p>
        <p>잠시만 기다려주세요.</p>
        <div className="spinner"></div>
      </div>
    </div>
  );
};

export default KakaoLoginHandeler;
