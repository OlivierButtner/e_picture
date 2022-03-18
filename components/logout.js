import * as React from "react";

import { Text, StyleSheet, Pressable } from "react-native";
import * as SecureStore from "expo-secure-store";

export default function Logout({ navigation }) {
  // Request
  const onPressLearnMore = async () => {
    const token = await SecureStore.deleteItemAsync("secure_token");
    navigation.navigate("Epicture", {
      screen: "Epicture",
    });
    alert("Déconnexion");
  };

  React.useEffect(() => {}, []);

  return (
    <Pressable
      style={styles.button}
      onPress={() => {
        onPressLearnMore();
      }}
    >
      <Text style={styles.textButton}>Logout</Text>
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
