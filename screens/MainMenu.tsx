import { View, Text, StyleSheet, ScrollView, Button, TextInput } from "react-native";
import React from "react";

interface props {
  slideShows: slideShow[];
  setShows: React.Dispatch<React.SetStateAction<slideShow[]>>;
};

export const MainMenu: (props: props) => React.JSX.Element = ({slideShows, setShows}) => {

  const [popupShown, showPopup] = React.useState<boolean>(false);
  const [newShowName, setNewShowName] = React.useState<string>("");

  return <View style= {styles.wrap}>
    <View style = {styles.fixedArea}>
      <Text style= {styles.titleText}>Slide shower</Text>
    </View>
    <ScrollView style= {styles.scroll}>
      {slideShows.map(show => <Button title={show.name} onPress={() => console.log(show.name)} key={show.name}/>)}
    </ScrollView>
    <View style = {styles.fixedArea}>
      <Button title="Uusi kuvasarja" onPress={() => showPopup(true)}/>
    </View>
    {
    popupShown && <View style={styles.popupWrap}>
      <View style={styles.popupContentContainer}>
        <Text>Kuvasarjan nimi</Text>
        <TextInput style={styles.textInput} value={newShowName} onChangeText={t => setNewShowName(t)}/>
        <Button title="Valmis" onPress={() => {
          setNewShowName("");
          showPopup(false);
          setShows(s => [...s, {name: newShowName, images: []}]);
        }} disabled={slideShows.map(s => s.name).includes(newShowName) || newShowName == ""}/>
      </View>
    </View>
    }
  </View>
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    width: "100%",
  },
  fixedArea: {
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
  scroll: {
    flex: 1,
  },
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
