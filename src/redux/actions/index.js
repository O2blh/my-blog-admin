import { LOGIN } from "../constants";

// 登录
export const login = (data) => ({
  type: LOGIN,
  data,
});
