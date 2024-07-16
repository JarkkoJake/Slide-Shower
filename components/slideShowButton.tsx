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

    <View style={styles.bgEffect}/>
    <TouchableOpacity onPress={onSelect} style={styles.textContainer}>
      <Text adjustsFontSizeToFit minimumFontScale={0.6} numberOfLines={2} style={styles.text}>{slideShow.name.length < 45 ? slideShow.name : `${slideShow.name.slice(0, 45)}...`}</Text>
    </TouchableOpacity>

    <TouchableOpacity activeOpacity={1} onPress={onEdit} style={[styles.imageBG, {marginRight: 10}]}>
      <Image fadeDuration={0} source={editIcon} style={styles.icon}/>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => Alert.alert(
      "Varmistus",
      `Poistetaanko kuvasarja ${slideShow.name} lopullisesti?`,
      [
        { text: "Kyllä", style: "destructive", onPress: () => {setShows(s => s.filter(s => s != slideShow))} },
        { text: "Peruuta", style: "cancel" },
      ])} style={styles.icon}>
        <Image fadeDuration={0} source={deleteIcon} style={styles.icon}/>
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
    borderWidth: 2,
    borderColor: COLORS.secondary,
    alignItems: "center",
    overflow: "hidden",
  },
  bgEffect: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: 30,
    backgroundColor: COLORS.secondaryFaded,
    opacity: 0.7,
  },
  imageBG: {
    borderRadius: 100,
    backgroundColor: COLORS.accent,
  },
  textContainer: {
    flex: 1,
  },
  text: {
    fontSize: 30,
    color: COLORS.accent,
    fontWeight: "bold",
  },
  icon: {
    height: 45,
    width: 45,
  },
});