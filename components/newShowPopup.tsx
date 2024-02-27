import React, { SetStateAction } from "react";
import {View, Text, TextInput, Button, StyleSheet} from "react-native";

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
      <Button title="Valmis" onPress={() => {
        setNewShowName("");
        showPopup(false);
        setShows(s => [...s, {name: newShowName, images: []}]);
      }} disabled={slideShows.map(s => s.name).includes(newShowName) || newShowName == ""}/>
      <View style={{height: 20}}/>
      <Button title="Peruuta" onPress={() => {
        showPopup(false);
        setNewShowName("");  
      }}/>
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
    backgroundColor: "#ddd"
  },
  popupContentContainer: {
    padding: 20,
    alignItems: "center",
  },
  textInput: {
    height: 40,
    paddingHorizontal: 10,
    marginVertical: 20,
    width: 200,
    borderWidth: 2,
    borderColor: "#aaa"
  },
});