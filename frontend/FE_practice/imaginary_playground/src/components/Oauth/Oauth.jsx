//카카오 Oauth
export const REST_API_KEY = "3996185ef6e3d38118bd927690c20901";
export const REDIRECT_URI = "http://localhost:3000/middlepage";

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

//구글 Oauth
export const GOOGLE_AUTH_CLIENT_ID =
  "176512421673-4na4ptkqp14ejqoinam494es4i1m3apm.apps.googleusercontent.com";

export const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth
?scope=https://www.googleapis.com/auth/cloud-platform.read-only
&access_type=offline
&include_granted_scopes=true
&response_type=code
&state=state_parameter_passthrough_value
&redirect_uri=${REDIRECT_URI}
&client_id=${GOOGLE_AUTH_CLIENT_ID}`;

//네이버 Oauth
export const NAVER_AUTH_CLIENT_ID = "iSZlemnguNBRRiP2i9Hu";
