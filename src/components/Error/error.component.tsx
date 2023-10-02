import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Colors } from "../../constants/colors.constants";
import { Typography } from "../../constants/typography.constants";
import { CommonStyles } from "../../utils/commonStyles.utils";

export const Error: React.FC = () => {
  return (
    <View style={styles.container}>
      <Icon name="exclamation-circle" size={120} color={Colors.error} />
      <Text style={[Typography.sub1, CommonStyles.fwBold, CommonStyles.mv_10]}>
        Oops! Something went wrong.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Error;
