import { View, Text, StyleSheet } from "react-native";

export const Header = () => {
  return <View style = {styles.wrap}>
  <Text style= {styles.titleText}>Slide shower</Text>
</View>
};

const styles = StyleSheet.create({
  wrap: {
    height: 100,
    paddingVertical: 20,
    backgroundColor:"red",
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontSize: 30,
    color: "green",
  },
});