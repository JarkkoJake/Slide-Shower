import { StyleSheet, View } from "react-native";
import { AppButton } from "./appButton";
import { COLORS } from "../colors";

interface props {
  onPress: () => void;
  text: string;
};

export const FooterButton = (props: props) => {
  return <View style = {styles.fixedArea}>
    <View style={styles.buttonWrap}>
      <AppButton text={props.text} onPress={props.onPress}/>
    </View>
  </View>
};

const styles = StyleSheet.create({
  fixedArea: {
    height: 100,
    paddingVertical: 20,
    backgroundColor: COLORS.secondaryFaded,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonWrap: {
    width: "75%",
  },
});