import React, { FC } from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { SCW, Typography } from "../../constants/typography.constants";
import { formatDate } from "../../utils/date.utils";
import { ENV_VARIABLE } from "../../network/env.constants";
export const MovieDetail: FC<{
  item: {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  };
}> = ({ item }) => {
  const {
    poster_path = "",
    title = "",
    overview = "",
    release_date = "",
  } = item || {};
  return (
    <View style={styles.container}>
      <Image
        style={styles.imgContainer}
        source={{
          uri: ENV_VARIABLE.IMG_BASE_URL + poster_path,
        }}
      />
      <View style={{ paddingHorizontal: 16 }}>
        <Text style={[Typography.h1, { marginTop: 8 }]}>{title}</Text>
        <Text style={Typography.sub2}>
          Released Date: {formatDate(release_date)}
        </Text>
        <Text style={[Typography.lb1, { marginTop: 4 }]}>{overview}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: "lightblue",
    paddingBottom: 16,
    borderRadius: 8,
  },
  imgContainer: {
    height: 160,
    width: SCW - 32,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
});
