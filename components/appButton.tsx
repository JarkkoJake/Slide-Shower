import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { COLORS } from "../colors";

interface props {
  onPress: () => void;
  text: string;
  disabled?: boolean;
};

export const AppButton = (props: props) => {
  return (<TouchableOpacity onPress={() => {
    if (props.disabled) return;
    props.onPress();
  }} style={[styles.button, props.disabled && {opacity: 0.5}]}>
    <Text style={styles.text}>{props.text}</Text>
  </TouchableOpacity>);
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    color: COLORS.accentFaded,
    textAlign: "center",
  },
  button: {
    backgroundColor: COLORS.secondaryFaded,
    borderWidth: 1,
    borderColor: COLORS.secondary,
    borderRadius: 10,
    width: "100%",
    paddingVertical: 10,
  },
});