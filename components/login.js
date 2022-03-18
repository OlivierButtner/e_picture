import * as React from "react";
import * as WebBrowser from "expo-web-browser";
import { CLIENT_ID, CLIENT_SECRET } from "@env";
import {
  makeRedirectUri,
  useAuthRequest,
  ResponseType,
} from "expo-auth-session";

import { StyleSheet, Text, Pressable } from "react-native";

import * as SecureStore from "expo-secure-store";

WebBrowser.maybeCompleteAuthSession();

const discovery = {
  authorizationEndpoint: "https://api.imgur.com/oauth2/authorize",
  tokenEndpoint: "https://api.imgur.com/oauth2/token",
};

export default function Login({ navigation }) {
  // Request
  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,

      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      redirectUri: makeRedirectUri({
        scheme: "undefined",

      }),

      // imgur requires an empty array
      scopes: [],
    },
    discovery
  );

  React.useEffect(() => {
    if (response?.type === "success") {
      const { access_token } = response.params;
      SecureStore.setItemAsync("secure_token", access_token);
      navigation.navigate("Epicture", {
        screen: "Epicture",
      });
      alert("Connexion Réussi");
    }
  }, [response]);

  return (
    <Pressable
      disabled={!request}
      style={styles.button}
      onPress={() => {
        promptAsync();
      }}
    >
      <Text style={styles.textButton}>Login</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
  },
  textButton: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
