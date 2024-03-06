import {View, StyleSheet, Image, Button,} from "react-native";
import React from "react";
import { Header } from "../components/header";
import { COLORS } from "../colors";
import { AppButton } from "../components/appButton";

interface props {
  slideShow: slideShow;
  setRoute: React.Dispatch<React.SetStateAction<route>>;
};

export const PlayBackScreen = ({slideShow, setRoute}: props) => {

  const [index, setIndex] = React.useState<number>(0);

  React.useEffect(() => {
    const subscribtion = setTimeout(() => {
      if (index < slideShow.images.length - 1) setIndex(i => i + 1);
      else setRoute("MAIN");
    }, slideShow.images[index].duration * 1000);
    return () => {
      clearTimeout(subscribtion);
    };
  }, [index])

  return <View style={styles.wrap}>
    <Header/>
    <View style={styles.imageWrap}>
      <Image source={{uri: slideShow.images[index].imageURI}} style={styles.image}/>
    </View>
    {/* Bottom area, exit */}
    <View style = {styles.fixedArea}>
      <View style={{width: "80%"}}>
      <AppButton text="Poistu" onPress={() => {
        setRoute("MAIN");
      }}/>
      </View>
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
    backgroundColor: COLORS.secondaryFaded,
    justifyContent: "center",
    alignItems: "center",
  },
  imageWrap: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});