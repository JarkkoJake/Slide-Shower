import { StyleSheet, View, BackHandler, Alert } from 'react-native';
import { MainMenu } from "./screens/MainMenu";
import React from 'react';
import { EditScreen } from './screens/EditScreen';
import { PlayBackScreen } from './screens/PlayBack';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {

  const [shows, setShows] = React.useState<slideShow[]>([]);
  const [route, setRoute] = React.useState<route>("MAIN");
  const [activeShow, setActiveShow] = React.useState<slideShow | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    if (loading) return;
    AsyncStorage.setItem("Slideshower_slideshows", JSON.stringify(shows));
  }, [shows]);

  const loadShows = async () => {
    const result = await AsyncStorage.getItem("Slideshower_slideshows");
    if (result) setShows(JSON.parse(result));
    setTimeout(() => setLoading(false), 1000);
  };

  React.useEffect(() => {
    loadShows();
  }, []);

  const backButtonFunctions: {[Property in route]: () => boolean} = {
    "EDIT": () => {
      Alert.alert("Huomio!", "Poistutaanko tallentamatta muutoksia?", [
        {text: "Kyllä", style: "destructive", onPress: () => setRoute("MAIN")},
        {text: "Peruuta", style: "cancel"}
      ]);
      return true;
    },
    "MAIN": () => {
      BackHandler.exitApp();
      return true;
    },
    "PLAYBACK": () => {
      setRoute("MAIN");
      return true;
    },
  };

  React.useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backButtonFunctions[route]);
  }, [route]);

  return (
    <View style={styles.container}>
      { route == "MAIN" && <MainMenu slideShows= {shows} setShows={setShows} setRoute={setRoute} setActiveShow={setActiveShow}/>}
      { route == "EDIT" && activeShow && <EditScreen slideShow={activeShow} setShows={setShows} setRoute={setRoute}/>}
      { route == "PLAYBACK" && activeShow && <PlayBackScreen slideShow={activeShow} setRoute={setRoute}/>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
