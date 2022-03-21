import cloudbase from "@cloudbase/js-sdk";
import { ENV_ID } from "../constants/info";

export const app = cloudbase.init({
  env: ENV_ID,
});

export const auth = app.auth({
  persistence: "local",
});
