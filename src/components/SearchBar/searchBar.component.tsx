import React, { FC, useState } from "react";
import { Button, Keyboard, StyleSheet, TextInput, View } from "react-native";

const SearchBar: FC<{
  onSearch: (_?: any) => void;
  onClear: () => void;
}> = ({ onSearch = () => {}, onClear = () => {} }) => {
  const [searchText, setSearchText] = useState("");
  const handleSearch = () => {
    // Pass the searchText to the parent component for further processing
    onSearch(searchText);
    Keyboard.dismiss();
  };

  const handleClear = () => {
    setSearchText("");
    onClear();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        onChangeText={(text) => setSearchText(text)}
        value={searchText}
      />
      <Button title="Search" onPress={handleSearch} />
      <View style={{ marginLeft: 8 }}>
        <Button title="Clear" onPress={handleClear} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 16,
    paddingHorizontal: 4,
    paddingVertical: 4,
    borderColor: "#ccc",
    borderWidth: 1,
    marginVertical: 8,
    borderRadius: 8,
  },
  input: {
    flex: 1,
    marginRight: 10,
    backgroundColor: "#f2f2f2",
  },
});

export default SearchBar;
