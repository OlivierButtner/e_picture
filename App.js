import React from "react";

import Tabs from "./navigation/tabs";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";

export default App = () => {
  return (
      <NavigationContainer>
        <Tabs />
      </NavigationContainer>
  );
};

const styles = StyleSheet.create({

  myState: {
    /*  marginTop: 35,
        textAlign: 'left',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 40,*/
  },

  container: {
    flex: 1,
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
    color: "#fdfafa",
  },
});
