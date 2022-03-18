import { Button } from "react-native";

import * as SecureStore from "expo-secure-store";

export default async function GetToken() {
  const token = await SecureStore.getItemAsync("secure_token");
  return token;
}
