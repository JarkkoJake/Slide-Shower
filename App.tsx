import { StyleSheet, View } from 'react-native';
import { MainMenu } from "./screens/MainMenu";
import React from 'react';

export default function App() {

  const [shows, setShows] = React.useState<slideShow[]>([]);

  return (
    <View style={styles.container}>
      <MainMenu slideShows= {shows} setShows={setShows}/>
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
