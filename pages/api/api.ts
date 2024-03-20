import axios from "axios";

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const getTokens = async (payload: { email: string }) => {
  const result: Tokens = await axios.post(`${API_URL}/auth`, payload);
  localStorage.setItem("accesstoken", result.accessToken);
  localStorage.setItem("refreshtoken", result.refreshToken);
  return result;
};

export { getTokens };
