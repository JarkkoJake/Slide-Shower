import {View, StyleSheet, Image} from "react-native";
import React from "react";
import { Header } from "../components/header";
import { FooterButton } from "../components/footerButton";

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
    <FooterButton text="Poistu" onPress={() => {
      setRoute("MAIN");
    }}/>

  </View>
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    width: "100%",
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