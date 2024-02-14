import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";

interface props {
  slideShow: slideShow;
  setShows: React.Dispatch<React.SetStateAction<slideShow[]>>;
};

export const SlideShowButton = ({slideShow, setShows}: props) => {
  return <View style={styles.wrap}>
    
    <TouchableOpacity onPress={() => console.log(slideShow.name)} style={styles.textContainer}>
      <Text style={styles.text}>{slideShow.name}</Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => console.log("edit")} style={styles.edit}></TouchableOpacity>

    <TouchableOpacity onPress={() => Alert.alert(
      "Varmistus",
      `Poistetaanko kuvasarja ${slideShow.name} lopullisesti?`,
      [
        { text: "Kyllä", style: "destructive", onPress: () => {setShows(s => s.filter(s => s != slideShow))} },
        { text: "Peruuta", style: "cancel" },
      ])} style={styles.remove}></TouchableOpacity>
  </View>
};

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    height: 60,
    padding: 10,
    width: "100%",
    marginTop: 20,
    backgroundColor: "#aaa",
  },
  textContainer: {
    flex: 1,
  },
  text: {
    fontSize: 24,
    color: "red",
    fontWeight: "bold",
  },
  edit: {
    height: "100%",
    aspectRatio: 1,
    backgroundColor: "blue",
  },
  remove: {
    marginLeft: 10,
    height: "100%",
    aspectRatio: 1,
    backgroundColor: "red",
  },
});