import { View, StyleSheet, ScrollView, Button, Alert } from "react-native";
import React from "react";
import { Header } from "../components/header";
import { NewShowPopup } from "../components/newShowPopup";
import { SlideShowButton } from "../components/slideShowButton";
import { COLORS } from "../colors";

interface props {
  slideShows: slideShow[];
  setShows: React.Dispatch<React.SetStateAction<slideShow[]>>;
  setRoute: React.Dispatch<React.SetStateAction<route>>;
  setActiveShow: React.Dispatch<React.SetStateAction<slideShow>>;
};

export const MainMenu: (props: props) => React.JSX.Element = ({slideShows, setShows, setRoute, setActiveShow}) => {

  const [popupShown, showPopup] = React.useState<boolean>(false);

  return <View style= {styles.wrap}>
    <Header/>

    <ScrollView style= {styles.scroll}>
      {slideShows.map(show => <SlideShowButton onSelect={() => {
        if (show.images.length > 0) {
          setActiveShow(show);
          setRoute("PLAYBACK");
        } else {
          Alert.alert("Tyhjä kuvasarja", "Tyhjää kuvasarjaa ei voida toistaa.", [{text: "OK", style: "cancel" }]);
        }
      }} setShows={setShows} slideShow={show} key={show.name} onEdit={() => {
        setRoute("EDIT");
        setActiveShow(show);
      }}/>)}
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
    backgroundColor: COLORS.secondary,
    justifyContent: "center",
    alignItems: "center",
  },
  scroll: {
    flex: 1,
    width: "80%",
    alignSelf: "center",
  },
});
