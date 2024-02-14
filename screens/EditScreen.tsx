import {View, StyleSheet, Image, Button, TouchableOpacity} from "react-native";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import { Header } from "../components/header";

interface props {
  slideShow: slideShow;
  setShows: React.Dispatch<React.SetStateAction<slideShow[]>>;
  setRoute: React.Dispatch<React.SetStateAction<route>>;
};

export const EditScreen = ({slideShow, setShows, setRoute}: props) => {
  const [images, setImages] = React.useState<slideImage[]>(slideShow.images.length > 0 ? slideShow.images : [{imageURI:"", duration: 5}]);
  const [imgIndex, setImgIndex] = React.useState<number>(0);
  const [imgURI, setImgURI] = React.useState<string>("");

  React.useEffect(() => {
    setImgURI(images[imgIndex].imageURI);
  }, [imgIndex])

  const pickImage = async (image: slideImage) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      allowsMultipleSelection: false,
    });
    if (!result.canceled) {
      image.imageURI = result.assets[0].uri;
      setImgURI(result.assets[0].uri);
    };
  };

  return <View style={styles.wrap}>
    <Header/>
    <View style={styles.editAreaWrap}>
      <View style={[styles.sideSectionWrap, imgIndex == 0 && {backgroundColor: "#0000"}]}>
        {imgIndex > 0 && <TouchableOpacity onPress={() => setImgIndex(i => i - 1)} style={styles.previousButton}></TouchableOpacity>}
      </View>
      <View style={styles.middleSectionWrap}>
        <TouchableOpacity onPress={() => pickImage(images[imgIndex])} style={[styles.image, imgURI == "" && {height: 100, backgroundColor: "blue",}]}>
          {imgURI != "" && <Image source={{uri: imgURI}} style={styles.image}/>}
        </TouchableOpacity>
      </View>
      <View style={styles.sideSectionWrap}>
        {imgIndex == images.length - 1 ?
          <TouchableOpacity onPress={() => {
            setImages(i => [...i, {imageURI: "", duration: 5}]);
            setImgIndex(i => i + 1);
          }} style={styles.previousButton}></TouchableOpacity>
          :
          <TouchableOpacity onPress={() => setImgIndex(i => i + 1)} style={styles.previousButton}></TouchableOpacity>
        }
      </View>
    </View>
    <View style = {styles.fixedArea}>
      <Button title="Tallenna ja poistu" onPress={() => {
        setShows(s => [{name: slideShow.name, images: images}, ...s.filter(sh => sh != slideShow)]);
        setRoute("MAIN");
      }}/>
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
    justifyContent: "center",
    alignItems: "center",
  },
  middleSectionWrap: {
    flex: 1,
    height: "100%",
    backgroundColor: "red",
  },
  previousButton: {
    height: 60,
    width: 30,
    backgroundColor: "blue",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});