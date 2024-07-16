import {View, StyleSheet} from "react-native";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import { Header } from "../components/header";
import { AppButton } from "../components/appButton";
import { FooterButton } from "../components/footerButton";
import { EditPreview } from "../components/editPreview";
import { EditBottomArea } from "../components/editBottomArea";

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

  const pickImage = async (image: slideImage, multiple: boolean) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: !multiple,
      allowsMultipleSelection: multiple,
    });
    if (!result.canceled && !multiple) {
      image.imageURI = result.assets[0].uri;
      setImgURI(result.assets[0].uri);
    };
    if (!result.canceled && multiple) {
      image.imageURI = result.assets[0].uri;
      setImgURI(result.assets[0].uri);
      setImages(i => {
        for (const pickedImage of result.assets.slice(1)) {
          i.push({imageURI: pickedImage.uri, duration: 5});
        }
        return [...i];
      })
    };
  };

  return <View style={styles.wrap}>
    <Header/>

    <EditPreview imageIndex={imgIndex} imageURI={imgURI} images={images} pickImage={pickImage} setImageIndex={setImgIndex} setImages={setImages}/>
    <EditBottomArea imageIndex={imgIndex} imageURI={imgURI} images={images} setImageIndex={setImgIndex} setImages={setImages}/>

    <View style={styles.buttonWrap}>
      <AppButton text="Poista kuva" onPress={() => {
        setImages(imgs => imgs.filter(i => i != images[imgIndex]));
        if (imgIndex == images.length - 1) setImgIndex(i => i-1);
      }}/>
    </View>

    {/* Bottom area, save and exit */}
    <FooterButton text="Tallenna ja poistu" onPress={() => {
      setShows(s => [{name: slideShow.name, images: images}, ...s.filter(sh => sh != slideShow)]);
      setRoute("MAIN");
    }}/>
  </View>
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    width: "100%",
  },
  buttonWrap: {
    width: "80%",
    marginVertical: 10,
    alignSelf: "center",
  },
});