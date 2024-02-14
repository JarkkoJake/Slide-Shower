import { View, StyleSheet, ScrollView, Button } from "react-native";
import React from "react";
import { Header } from "../components/header";
import { NewShowPopup } from "../components/newShowPopup";

interface props {
  slideShows: slideShow[];
  setShows: React.Dispatch<React.SetStateAction<slideShow[]>>;
};

export const MainMenu: (props: props) => React.JSX.Element = ({slideShows, setShows}) => {

  const [popupShown, showPopup] = React.useState<boolean>(false);

  return <View style= {styles.wrap}>
    <Header/>

    <ScrollView style= {styles.scroll}>
      {slideShows.map(show => <Button title={show.name} onPress={() => console.log(show.name)} key={show.name}/>)}
    </ScrollView>

    <View style = {styles.fixedArea}>
      <Button title="Uusi kuvasarja" onPress={() => showPopup(true)}/>
    </View>
    
    <NewShowPopup visible={popupShown} slideShows={slideShows} setShows={setShows} showPopup={showPopup}/>
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
  scroll: {
    flex: 1,
  },
});
