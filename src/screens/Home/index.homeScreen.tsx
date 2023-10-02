import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { FC, useState } from "react";
import { FlatList, Text, View } from "react-native";
import SearchBar from "../../components/SearchBar/searchBar.component";
import { Error, Loading, MovieDetail } from "../../components/index.components";
import { usePopularMoviesData } from "../../network/usePopularMoviesData";
import { StackParamList } from "../../utils/stackParamList.utils";
import { useSearchedResultsData } from "../../network/useSearchResultsData";
import { Typography } from "../../constants/typography.constants";

type Props = NativeStackScreenProps<StackParamList, "Home">;

export const HomeScreen: FC<Props> = ({ navigation }) => {
  const [searchedText, setSearchedText] = useState("");

  const onSearch = (text: string) => {
    setSearchedText(text);
  };
  const onClear = () => {
    setSearchedText("");
  };

  return (
    <View style={{ paddingTop: 16 }}>
      <SearchBar onSearch={onSearch} onClear={onClear} />

      {searchedText.length > 0 ? (
        <RenderSearchedMovies searchedText={searchedText} />
      ) : (
        <RenderPopularMovies />
      )}
    </View>
  );
};

const RenderPopularMovies = () => {
  const { data, loading, error } = usePopularMoviesData();
  if (loading) {
    return <Loading />;
  }
  if (error?.length > 0) {
    return <Error />;
  }
  return (
    <FlatList
      data={data}
      contentContainerStyle={{ paddingBottom: 400 }}
      renderItem={({ item }) => {
        return <MovieDetail item={item} />;
      }}
      keyExtractor={(item, index) => {
        return `${item.id}_${index}`;
      }}
    />
  );
};

const RenderSearchedMovies = ({ searchedText = "" }) => {
  const { data, loading, error } = useSearchedResultsData({ searchedText });
  if (loading) {
    return <Loading />;
  }
  if (error?.length > 0) {
    return <Error />;
  }
  return (
    <View>
      <Text
        style={[Typography.h1, { paddingHorizontal: 16, paddingBottom: 8 }]}
      >
        Result for: "{searchedText}"
      </Text>
      <FlatList
        data={data}
        contentContainerStyle={{ paddingBottom: 400 }}
        renderItem={({ item }) => {
          return <MovieDetail item={item} />;
        }}
        keyExtractor={(item, index) => {
          return `${item.id}_${index}`;
        }}
      />
    </View>
  );
};
