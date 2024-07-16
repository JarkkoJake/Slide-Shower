import React, { SetStateAction } from "react";
import {View, Text, TextInput, StyleSheet} from "react-native";
import { COLORS } from "../colors";
import { AppButton } from "./appButton";

interface props {
  showPopup: React.Dispatch<SetStateAction<boolean>>;
  setShows: React.Dispatch<SetStateAction<slideShow[]>>;
  visible: boolean;
  slideShows: slideShow[];
};

export const NewShowPopup = ({visible, setShows, showPopup, slideShows}: props) => {

  const [newShowName, setNewShowName] = React.useState<string>("");

  if (!visible) return null;

  return <View style={styles.popupWrap}>
    <View style={styles.popupContentContainer}>
      <Text>Kuvasarjan nimi</Text>
      <TextInput style={styles.textInput} value={newShowName} onChangeText={t => setNewShowName(t)}/>
      <View style={{width: 200}}>
      <AppButton text="Valmis" onPress={() => {
        setNewShowName("");
        showPopup(false);
        setShows(s => [...s, {name: newShowName, images: []}]);
      }} disabled={slideShows.map(s => s.name).includes(newShowName) || newShowName == ""}/>
      <View style={{height: 20}}/>
      <AppButton text="Peruuta" onPress={() => {
        showPopup(false);
        setNewShowName("");  
      }}/>
      </View>
    </View>
  </View>
};

const styles = StyleSheet.create({
  popupWrap: {
    position: "absolute",
    top:0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000a"
  },
  popupContentContainer: {
    padding: 20,
    alignItems: "center",
    backgroundColor: COLORS.primary,
    borderRadius: 10,
  },
  textInput: {
    height: 50,
    paddingHorizontal: 10,
    marginVertical: 20,
    width: 200,
    borderWidth: 2,
    borderRadius: 6,
    borderColor: COLORS.secondary,
    color: COLORS.accent,
    fontSize: 30,
  },
});