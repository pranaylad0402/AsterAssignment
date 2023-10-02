import React from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors.constants";

export const Loading: React.FC = () => {
  return (
    <ActivityIndicator
      size={"large"}
      style={styles.container}
      color={Colors.headerBgColor}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Loading;
