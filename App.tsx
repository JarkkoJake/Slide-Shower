import { StyleSheet, View } from 'react-native';
import { MainMenu } from "./screens/MainMenu";
import React from 'react';
import { EditScreen } from './screens/EditScreen';

export default function App() {

  const [shows, setShows] = React.useState<slideShow[]>([]);
  const [route, setRoute] = React.useState<route>("MAIN");
  const [activeShow, setActiveShow] = React.useState<slideShow | null>(null);

  return (
    <View style={styles.container}>
      { route == "MAIN" && <MainMenu slideShows= {shows} setShows={setShows} setRoute={setRoute} setActiveShow={setActiveShow}/>}
      { route == "EDIT" && activeShow && <EditScreen slideShow={activeShow} setShows={setShows} setRoute={setRoute}/>}
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
