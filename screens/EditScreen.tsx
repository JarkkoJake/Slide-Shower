import {View, StyleSheet, Image, Button, TouchableOpacity, Text, Alert} from "react-native";
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
  }, [imgIndex, images])

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

      {/* Previous navigation area */}
      <View style={[styles.sideSectionWrap, imgIndex == 0 && {backgroundColor: "#0000"}]}>
        {imgIndex > 0 &&
          <TouchableOpacity
            onPress={() => setImgIndex(i => i - 1)}
            style={styles.previousButton}
          >
            <Text style={styles.sideButtonText}>{"<"}</Text>
          </TouchableOpacity>
        }
      </View>

      {/* Middle section, pick image and change duration */}
      <View style={styles.middleSectionWrap}>
        <View style={styles.middleContainer}>
          <TouchableOpacity style={styles.newImageButtonWrap} onPress={() => pickImage(images[imgIndex])}>
            {imgURI == "" ? <Text style={styles.sideButtonText}>Lisää kuva</Text> : <Image source={{uri: imgURI}} style={styles.image}/>}
          </TouchableOpacity>
          <View style={styles.durationWrap}>

            {/* Lower duration */}
            <TouchableOpacity
              onPress={() => {
                if (images[imgIndex].duration <= 1) return;
                images[imgIndex].duration -= 1;
                setImages(i => [...i])
              }}
              style={styles.changeDurationWrap}
            >
              <Text style={styles.sideButtonText}>-</Text>
            </TouchableOpacity>

            {/* Duration text */}
            <View style={styles.durationTextWrap}>
              <Text style={styles.textCenter}>{"Kuvan kesto (s)"}</Text>
              <Text style={[styles.textCenter, {fontSize: 30}]}>{images[imgIndex].duration}</Text>
            </View>

            {/* Add duration */}
            <TouchableOpacity
              onPress={() => {
                images[imgIndex].duration += 1;
                setImages(i => [...i]);  
              }}
              style={styles.changeDurationWrap}
            >
              <Text style={styles.sideButtonText}>+</Text>
            </TouchableOpacity>
          </View>
          <Button title="Poista kuva" onPress={() => {
            setImages(imgs => imgs.filter(i => i != images[imgIndex]));
            if (imgIndex == images.length - 1) setImgIndex(i => i-1);
          }}/>
        </View>
      </View>

      {/* Next / add new image section */}
      <View style={styles.sideSectionWrap}>
        {imgIndex == images.length - 1 ?
          <TouchableOpacity
            onPress={() => {
              if (imgURI == "") Alert.alert("Tyhjä kuva", "Valitse aijempi kuva ennen uuden lisäämistä.")
              setImages(i => [...i, {imageURI: "", duration: 5}]);
              setImgIndex(i => i + 1);
            }}
            style={styles.previousButton}
          >
            <Text style={styles.sideButtonText}>+</Text>
          </TouchableOpacity>
          :
          <TouchableOpacity
            onPress={() => setImgIndex(i => i + 1)}
            style={styles.previousButton}
          >
            <Text style={styles.sideButtonText}>{">"}</Text>
          </TouchableOpacity>
        }
      </View>
    </View>

    {/* Bottom area, save and exit */}
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
  middleContainer: {
    flex: 1,
    backgroundColor: "#0005",
    width: "100%",
  },
  newImageButtonWrap: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  durationWrap: {
    height: 70,
    width: "100%",
    backgroundColor: "#aaa",
    flexDirection: "row",
  },
  durationTextWrap: {
    paddingVertical: 10,
    flex: 1,
    backgroundColor: "#bbb"
  },
  changeDurationWrap: {
    width: 30,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  previousButton: {
    height: 60,
    width: 30,
    backgroundColor: "blue",
  },
  sideButtonText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  textCenter: {
    textAlign: "center",
    width: "100%",
  },
});