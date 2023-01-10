import axios from "axios";

const baseURL = process.env.NEXTAUTH_URL;

export const get = async (endpoint: string, context: any) => {
  const { req } = context;
  const data = await axios.get(`${baseURL}/${endpoint}`, {
    withCredentials: true,
    headers: {
      Cookie: req.headers.cookie,
    },
  });
  return data;
};

export const post = async (context: any, endpoint: string) => {
  const { req } = context;
  const data = await axios.post(`baseURL/${endpoint}$`, {
    withCredentials: true,
    headers: {
      Cookie: req.headers.cookie,
    },
    body: req.body,
  });
  return data;
};
