import axios from "axios";

// Tùy cấu hình Vite/CRA, có thể dùng import.meta.env hoặc process.env
export const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export async function loginApi({
  username,
  password,
  system,
}: {
  username: string;
  password: string;
  system: string;
}) {
  const res = await axios.post(`${BASE_URL}/auth/login`, {
    username,
    password,
    system,
  });
  
  return res.data; // hoặc { user, token, ... } theo BE trả về
}
