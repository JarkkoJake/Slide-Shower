import { View, Text, TouchableOpacity, StyleSheet, Alert, Image } from "react-native";
import { COLORS } from "../colors";

const editIcon = require("../assets/slideshowedit.png");
const deleteIcon = require("../assets/slideshowdelete.png");

interface props {
  slideShow: slideShow;
  setShows: React.Dispatch<React.SetStateAction<slideShow[]>>;
  onEdit: () => void;
  onSelect: () => void;
};

export const SlideShowButton = ({slideShow, setShows, onEdit, onSelect}: props) => {
  return <View style={styles.wrap}>

    <TouchableOpacity onPress={onSelect} style={styles.textContainer}>
      <Text style={styles.text}>{slideShow.name}</Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={onEdit} style={styles.icon}>
      <Image source={editIcon} style={styles.icon}/>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => Alert.alert(
      "Varmistus",
      `Poistetaanko kuvasarja ${slideShow.name} lopullisesti?`,
      [
        { text: "Kyllä", style: "destructive", onPress: () => {setShows(s => s.filter(s => s != slideShow))} },
        { text: "Peruuta", style: "cancel" },
      ])} style={styles.icon}>
        <Image source={deleteIcon} style={styles.icon}/>
      </TouchableOpacity>
  </View>
};

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    height: 60,
    padding: 10,
    width: "100%",
    marginTop: 20,
    backgroundColor: COLORS.secondaryFaded,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.secondary,
  },
  textContainer: {
    flex: 1,
  },
  text: {
    fontSize: 30,
    color: COLORS.accentFaded,
    fontWeight: "bold",
  },
  icon: {
    height: 45,
    width: 45,
  },
});