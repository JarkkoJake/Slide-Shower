import { View, Text, StyleSheet, Image } from "react-native";
import { COLORS } from "../colors";
const logo = require("../assets/slideshowicon.png");

export const Header = () => {
  return <View style = {styles.wrap}>
  <Text style= {styles.titleText}>Slide shower</Text>
  <View style={styles.imageBG}>
    <Image fadeDuration={0} source={logo} style={styles.image}/>
  </View>
</View>
};

const styles = StyleSheet.create({
  wrap: {
    paddingBottom: 10,
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: COLORS.secondary,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  titleText: {
    fontSize: 45,
    color: COLORS.accent,
    fontWeight: "bold",
  },
  image: {
    width: 45,
    height: 45,
  },
  imageBG: {
    borderRadius: 100,
    backgroundColor: COLORS.accent,
  },
});