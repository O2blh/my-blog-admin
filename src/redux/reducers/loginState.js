import { LOGIN } from "../constants";
import { ENV_ID } from "../../constants/siteInfo";
const initState = localStorage.getItem(`user_info_${ENV_ID}`) ? true : false;

export default function addReducer(preState = initState, action) {
  const { type, data } = action;
  switch (type) {
    case LOGIN:
      return data;
    default:
      return preState;
  }
}
