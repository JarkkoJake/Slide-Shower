import {View, StyleSheet, Image, Button} from "react-native";
import React from "react";
import { Header } from "../components/header";

interface props {
  slideShow: slideShow;
};

export const EditScreen = ({slideShow}: props) => {
  const [images, setImages] = React.useState<slideImage[]>(slideShow.images);
  const [imgIndex, setImgIndex] = React.useState<number>(0);
  return <View style={styles.wrap}>
    <Header/>
    <View style={styles.editAreaWrap}>
      <View style={styles.sideSectionWrap}></View>
      <View style={styles.middleSectionWrap}></View>
      <View style={styles.sideSectionWrap}></View>
    </View>
    <View style = {styles.fixedArea}>
      <Button title="Tallenna" onPress={() => {}}/>
    </View>
  </View>
};

const styles = StyleSheet.create({  wrap: {
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
  editAreaWrap: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 50,
  },
  sideSectionWrap: {
    width: "15%",
    height: "60%",
    margin: 10,
    backgroundColor: "#aaa",
  },
  middleSectionWrap: {
    flex: 1,
    height: "100%",
    backgroundColor: "red",
  },
});