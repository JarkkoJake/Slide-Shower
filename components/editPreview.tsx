import { StyleSheet, TouchableOpacity, View, Text, Alert, Image } from "react-native";
import { COLORS } from "../colors";

interface props {
  imageIndex: number;
  setImageIndex: React.Dispatch<React.SetStateAction<number>>;
  images: slideImage[];
  setImages: React.Dispatch<React.SetStateAction<slideImage[]>>;
  imageURI: string;
  pickImage: (image: slideImage, multiple: boolean) => void;
};

export const EditPreview = (props: props) => {
  return <View style={styles.wrap}>
    <View style={{width: 50}}>
      {props.imageIndex > 0 && <TouchableOpacity
        style={styles.arrowButton}
        onPress={() => props.setImageIndex(i => i - 1)}
      >
        <Text style={styles.arrowButtonText}>{"<"}</Text>
      </TouchableOpacity>}
    </View>

    <TouchableOpacity
      style={styles.imageWrap}
      onPress={() => props.pickImage(props.images[props.imageIndex], false)}
      onLongPress={() => {if (props.imageURI == "") props.pickImage(props.images[props.imageIndex], true)}}
    >
      {props.imageURI == "" ? <><Text style={styles.text}>Lisää kuva</Text><Text style={[styles.text, styles.smallText]}>Paina pitkään lisätäksesi useamman kuvan kerrallaa ilman rajausta</Text></> : <Image source={{uri: props.imageURI}} style={styles.image}/>}
    </TouchableOpacity>

    <View style={{width: 50}}>
      {props.imageIndex < props.images.length && <TouchableOpacity
        style={styles.arrowButton}
        onPress={() => {
          if (props.imageURI == "") Alert.alert("Tyhjä kuva", "Valitse aijempi kuva ennen uuden lisäämistä.");
          else {
            if (props.imageIndex == props.images.length - 1) props.setImages(i => [...i, {imageURI: "", duration: 5}]);
            props.setImageIndex(i => i + 1);
          }
        }}>
          <Text style={styles.arrowButtonText}>{">"}</Text>
        </TouchableOpacity>}
    </View>
  </View>
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  arrowButton: {
    margin: 5,
    height: 40,
    width: 40,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.secondary,
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    color: COLORS.accent,
  },
  smallText: {
    fontSize: 14,
    textAlign: "center",
    width: "80%",
  },
  arrowButtonText: {
    fontSize: 40,
    fontWeight: "bold",
    color: COLORS.accent,
  },
  imageWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});