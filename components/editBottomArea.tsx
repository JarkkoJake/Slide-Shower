import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { COLORS } from "../colors";

interface props {
  imageIndex: number;
  setImageIndex: React.Dispatch<React.SetStateAction<number>>;
  images: slideImage[];
  setImages: React.Dispatch<React.SetStateAction<slideImage[]>>;
  imageURI: string;
  pickImage: (image: slideImage) => void;
};

export const EditBottomArea = (props: props) => {
  return <View style={styles.wrap}>

  <TouchableOpacity
    onPress={() => {
      if (props.images[props.imageIndex].duration <= 1) return;
      props.images[props.imageIndex].duration -= 1;
      props.setImages(i => [...i])
    }}
    style={styles.changeDurationWrap}
  >
    <Text style={styles.text}>-</Text>
  </TouchableOpacity>

  <View style={styles.durationTextWrap}>
    <Text style={styles.textCenter}>{"Kuvan kesto (s)"}</Text>
    <Text style={[styles.textCenter, {fontSize: 30}]}>{props.images[props.imageIndex].duration}</Text>
  </View>

  <TouchableOpacity
    onPress={() => {
      props.images[props.imageIndex].duration += 1;
      props.setImages(i => [...i]);  
    }}
    style={styles.changeDurationWrap}
  >
    <Text style={styles.text}>+</Text>
  </TouchableOpacity>
</View>
};

const styles = StyleSheet.create({
  wrap: {
    height: 70,
    width: "80%",
    alignSelf: "center",
    flexDirection: "row",
    backgroundColor: COLORS.secondary,
  },
  durationTextWrap: {
    paddingVertical: 10,
    flex: 1,
  },
  changeDurationWrap: {
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.primary,
    margin: 5,
    aspectRatio: 1,
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    color: COLORS.accent,
  },
  textCenter: {
    textAlign: "center",
    fontSize: 20,
    color: COLORS.accent,
    width: "100%",
  },
});