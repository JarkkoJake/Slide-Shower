import {View, StyleSheet, Image} from "react-native";
import React from "react";
import { Header } from "../components/header";
import { FooterButton } from "../components/footerButton";
import { AppButton } from "../components/appButton";
import { COLORS } from "../colors";

interface props {
  slideShow: slideShow;
  setRoute: React.Dispatch<React.SetStateAction<route>>;
};

export const PlayBackScreen = ({slideShow, setRoute}: props) => {

  const [index, setIndex] = React.useState<number>(0);

  React.useEffect(() => {
    if (slideShow.images[index].duration == 0) return;

    const subscribtion = setTimeout(() => {
      if (index < slideShow.images.length - 1 && slideShow.images[index + 1].imageURI) setIndex(i => i + 1);
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
      {slideShow.images[index].duration == 0 && <View style={styles.nextButton}>
        <AppButton
          text="Seuraava"
          onPress={() => {
            if (index < slideShow.images.length - 1 && slideShow.images[index + 1].imageURI) setIndex(i => i+1);
            else setRoute("MAIN");
          }}
        />
      </View>}
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
  nextButton: {
    position: "absolute",
    bottom: 25,
    width: "80%",
    alignSelf: "center",
    backgroundColor: COLORS.primary,
    borderRadius: 10,
  },
});