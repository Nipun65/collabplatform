import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const getTokens = async (payload: any) => {
  console.log(API_URL);
  const result: any = await axios.post(`${API_URL}/auth`, payload);
  localStorage.setItem("accesstoken", result.accessToken);
  localStorage.setItem("refreshtoken", result.refreshToken);
  return result;
};

export { getTokens };
